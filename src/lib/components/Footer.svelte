<script lang="ts">
	import ServiceIcon from '#lib/components/ServiceIcon.svelte';
	import { inr, navLinks, services, site } from '#lib/data/site.js';
	import { ArrowUp, Clock, Mail, MapPin, Phone } from 'lucide-svelte';
</script>

<footer class="bg-[#0c0c0d] pb-20 pt-16 text-white lg:pb-0" aria-label="Footer">
	<div class="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2 lg:grid-cols-4">
		<div>
			<a href="/" class="flex items-center gap-2" aria-label="Barber — back to top">
				<span class="flex h-9 w-9 items-center justify-center bg-accent text-white">
					<ServiceIcon icon="scissors-logo" cls="h-5 w-5" />
				</span>
				<span class="font-display text-2xl font-bold tracking-wide">BARBER</span>
			</a>
			<p class="mt-4 text-sm leading-relaxed text-white/60">
				Real cuts by real professionals. A classic barbershop — fresh, clean, and sharp,
				every single time.
			</p>
			<div class="mt-5 flex gap-3">
				<a
					href={site.instagram}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Barber on Instagram"
					class="flex h-11 w-11 items-center justify-center border border-white/20 text-white/80 hover:border-accent hover:text-accent"
				>
					<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
				</a>
				<a
					href={site.facebook}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Barber on Facebook"
					class="flex h-11 w-11 items-center justify-center border border-white/20 text-white/80 hover:border-accent hover:text-accent"
				>
					<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
				</a>
				<a
					href={site.twitter}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Barber on X"
					class="flex h-11 w-11 items-center justify-center border border-white/20 text-white/80 hover:border-accent hover:text-accent"
				>
					<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
				</a>
			</div>
		</div>

		<nav aria-label="Footer">
			<h3 class="font-display text-lg font-bold">Quick Links</h3>
			<ul class="mt-4 space-y-1 text-sm text-white/60">
				{#each navLinks as link}
					<li><a href={link.href} class="block py-2.5 hover:text-accent">{link.label}</a></li>
				{/each}
			</ul>
		</nav>

		<div>
			<h3 class="font-display text-lg font-bold">Services</h3>
			<ul class="mt-4 space-y-1 text-sm text-white/60">
				{#each services.slice(0, 6) as service}
					<li>
						<a href="/services" class="block py-2.5 hover:text-accent">
							{service.title} — {inr(service.price)}
						</a>
					</li>
				{/each}
			</ul>
		</div>

		<div>
			<h3 class="font-display text-lg font-bold">Contact</h3>
			<ul class="mt-4 space-y-3 text-sm text-white/60">
				<li class="flex items-start gap-3">
					<MapPin class="mt-0.5 h-4 w-4 shrink-0 text-accent" />
					<span>
						{site.address}<br />
						<a
							href={site.mapsUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="font-semibold text-white/80 underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
						>
							Get directions
						</a>
					</span>
				</li>
				<li class="flex items-center gap-3">
					<Phone class="h-4 w-4 shrink-0 text-accent" />
					<a href={site.phoneHref} class="py-2 hover:text-accent">{site.phone}</a>
				</li>
				<li class="flex items-center gap-3">
					<Mail class="h-4 w-4 shrink-0 text-accent" />
					<a href="mailto:{site.email}" class="py-2 hover:text-accent">{site.email}</a>
				</li>
				<li class="flex items-center gap-3">
					<Clock class="h-4 w-4 shrink-0 text-accent" />
					<span>{site.hours} · {site.sunday}</span>
				</li>
			</ul>
		</div>
	</div>

	<div class="mx-auto mt-12 max-w-6xl px-5">
		<div
			class="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/50"
		>
			<p>© 2026 Barber. All rights reserved.</p>
			<nav class="flex flex-wrap items-center gap-5" aria-label="Legal">
				<a href="/privacy" class="py-2 hover:text-accent">Privacy Policy</a>
				<a href="/terms" class="py-2 hover:text-accent">Terms</a>
				<a href="/sitemap.xml" class="py-2 hover:text-accent">Sitemap</a>
				<a
					href="#top"
					class="flex items-center gap-1 py-2 hover:text-accent"
					aria-label="Back to top"
				>
					Back to top <ArrowUp class="h-3.5 w-3.5" />
				</a>
			</nav>
		</div>
	</div>
</footer>
