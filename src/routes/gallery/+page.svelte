<script lang="ts">
	import PageHead from '#lib/components/PageHead.svelte';
	import BeforeAfter from '#lib/components/BeforeAfter.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { gallery, galleryCategories } from '#lib/data/site.js';
	import { reveal } from '#lib/motion.js';
	import { ChevronLeft, ChevronRight, X } from 'lucide-svelte';

	let category = $state<(typeof galleryCategories)[number]>('All');
	let lightbox = $state<number | null>(null);

	const shown = $derived(
		category === 'All' ? gallery : gallery.filter((g) => g.category === category)
	);

	function open(i: number) {
		lightbox = i;
	}
	function close() {
		lightbox = null;
	}
	function step(dir: 1 | -1) {
		if (lightbox === null) return;
		lightbox = (lightbox + dir + shown.length) % shown.length;
	}
	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') close();
		if (event.key === 'ArrowRight') step(1);
		if (event.key === 'ArrowLeft') step(-1);
	}

	$effect(() => {
		if (lightbox !== null) {
			document.addEventListener('keydown', onKeydown);
			document.body.style.overflow = 'hidden';
		} else {
			document.removeEventListener('keydown', onKeydown);
			document.body.style.overflow = '';
		}
		return () => {
			document.removeEventListener('keydown', onKeydown);
			document.body.style.overflow = '';
		};
	});
</script>

<PageHead
	title="Gallery — Barber | Bandra West, Mumbai"
	description="Real cuts from real chairs: skin fades, beard sculpts, kids cuts, classic tapers and hot towel shaves at Barber, Bandra West."
	path="/gallery"
/>

<div class="bg-ink py-16 text-white sm:py-20">
	<div class="mx-auto max-w-6xl px-5" use:reveal>
		<p class="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Our Work</p>
		<h1 class="mt-3 font-display text-4xl font-bold sm:text-5xl">Fresh Out Of The Chair</h1>
		<p class="mt-4 max-w-2xl leading-relaxed text-white/70">
			No stock photos — every picture here is a cut done in our shop. Tap any photo to see
			it up close.
		</p>
		<nav class="mt-6 text-xs text-white/50" aria-label="Breadcrumb">
			<a href="/" class="hover:text-white">Home</a> <span aria-hidden="true">/</span> Gallery
		</nav>
	</div>
</div>

<div class="mx-auto max-w-6xl px-5 py-12 sm:py-16">
	<div class="flex flex-wrap gap-2" role="group" aria-label="Filter gallery by category">
		{#each galleryCategories as c}
			<button
				type="button"
				class="min-h-11 border px-5 py-2.5 text-xs font-bold tracking-[0.15em] {category === c
					? 'border-ink bg-ink text-white'
					: 'border-neutral-300 text-ink hover:border-ink'}"
				aria-pressed={category === c}
				onclick={() => (category = c)}
			>
				{c.toUpperCase()}
			</button>
		{/each}
	</div>

	<div class="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
		{#each shown as item, i}
			<button
				type="button"
				class="group relative block overflow-hidden text-left"
				aria-label="View {item.title} photo full size"
				onclick={() => open(i)}
				use:reveal
			>
				<Picture
					name={item.image}
					alt={item.alt}
					widths={[480, 800, 1200]}
					sizes="(max-width: 1024px) 50vw, 33vw"
					cls="block aspect-[4/3] w-full overflow-hidden transition-transform duration-300 group-hover:scale-105"
				/>
				<span
					class="absolute bottom-3 left-3 bg-ink/85 px-3 py-1.5 text-xs font-bold tracking-[0.15em] text-white"
				>
					{item.title}
				</span>
			</button>
		{/each}
	</div>

	<section class="mt-16" aria-labelledby="before-after-heading" use:reveal>
		<h2 id="before-after-heading" class="font-display text-2xl font-bold text-ink sm:text-3xl">
			Before &amp; After
		</h2>
		<p class="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-500">
			Drag the handle to see the difference a proper fade makes. Same chair, same
			barber — thirty minutes apart.
		</p>
		<div class="mx-auto mt-6 max-w-3xl">
			<BeforeAfter name="gallery-fade" alt="Skin fade haircut — before and after comparison" />
		</div>
	</section>

	<p class="mt-10 text-center text-sm text-neutral-500">
		Like what you see?
		<a href="/book" class="inline-block py-1 font-bold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-text">
			Book the same chair
		</a>
	</p>
</div>

{#if lightbox !== null}
	<div
		class="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4"
		role="dialog"
		aria-modal="true"
		tabindex="-1"
		aria-label="{shown[lightbox].title} — full photo"
		onclick={(e) => {
			if (e.target === e.currentTarget) close();
		}}
		onkeydown={(e) => {
			if (e.key === 'Escape') close();
		}}
	>
		<button
			type="button"
			class="absolute right-4 top-4 flex h-11 w-11 items-center justify-center text-white hover:text-accent"
			aria-label="Close photo"
			onclick={close}
		>
			<X class="h-7 w-7" />
		</button>
		<button
			type="button"
			class="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white hover:text-accent sm:left-6"
			aria-label="Previous photo"
			onclick={(e) => {
				e.stopPropagation();
				step(-1);
			}}
		>
			<ChevronLeft class="h-8 w-8" />
		</button>
		<button
			type="button"
			class="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white hover:text-accent sm:right-6"
			aria-label="Next photo"
			onclick={(e) => {
				e.stopPropagation();
				step(1);
			}}
		>
			<ChevronRight class="h-8 w-8" />
		</button>
		<figure class="max-h-full max-w-3xl">
			<Picture
				name={shown[lightbox].image}
				alt={shown[lightbox].alt}
				widths={[800, 1200, 1600]}
				sizes="90vw"
				cls="block max-h-[75vh] w-auto overflow-hidden"
			/>
			<figcaption class="mt-3 text-center text-sm font-semibold text-white">
				{shown[lightbox].title} · {lightbox + 1} of {shown.length}
			</figcaption>
		</figure>
	</div>
{/if}
