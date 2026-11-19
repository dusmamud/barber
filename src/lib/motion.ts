// Motion helpers: Lenis smooth scroll + GSAP ScrollTrigger reveals.
// Everything is client-only (called from onMount / actions) and respects
// prefers-reduced-motion. No-JS / reduced-motion users see content as-is:
// reveals are applied with gsap.from at runtime, never hidden in CSS.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export function prefersReducedMotion(): boolean {
	return (
		typeof window !== 'undefined' &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches
	);
}

let lenis: Lenis | null = null;

export function initSmoothScroll(): () => void {
	if (typeof window === 'undefined' || prefersReducedMotion()) return () => {};
	gsap.registerPlugin(ScrollTrigger);
	lenis = new Lenis({ lerp: 0.1 });
	lenis.on('scroll', ScrollTrigger.update);
	const tick = (time: number) => lenis?.raf(time * 1000);
	gsap.ticker.add(tick);
	gsap.ticker.lagSmoothing(0);
	return () => {
		gsap.ticker.remove(tick);
		lenis?.destroy();
		lenis = null;
	};
}

export function scrollToId(id: string) {
	const el = document.getElementById(id);
	if (!el) return;
	if (lenis) lenis.scrollTo(el, { offset: -80 });
	else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

/** Scroll-reveal action: fade + rise once when the element enters view. */
export function reveal(node: HTMLElement, delay = 0) {
	if (prefersReducedMotion()) return {};
	gsap.registerPlugin(ScrollTrigger);
	const tween = gsap.from(node, {
		y: 28,
		opacity: 0,
		duration: 0.7,
		delay,
		ease: 'power3.out',
		immediateRender: false,
		scrollTrigger: { trigger: node, start: 'top 88%', once: true }
	});
	return {
		destroy() {
			tween.scrollTrigger?.kill();
			tween.kill();
		}
	};
}

/** "Open now" from the shop hours (Mon–Sat 9:00–21:00 IST). */
export function openNow(now = new Date()): boolean {
	const day = now.getDay();
	if (day === 0) return false;
	const minutes = now.getHours() * 60 + now.getMinutes();
	return minutes >= 9 * 60 && minutes < 21 * 60;
}
