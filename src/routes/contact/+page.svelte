<script lang="ts">
	import PageHead from '#lib/components/PageHead.svelte';
	import { firstVisit, site, walkInPolicy } from '#lib/data/site.js';
	import { reveal } from '#lib/motion.js';
	import { Check, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-svelte';

	const hours = [
		{ day: 'Monday – Friday', time: '9:00 AM – 9:00 PM' },
		{ day: 'Saturday', time: '9:00 AM – 9:00 PM' },
		{ day: 'Sunday', time: 'Closed' }
	];
</script>

<PageHead
	title="Contact & Visit Us — Barber | Bandra West, Mumbai"
	description="Find Barber on Linking Road, Bandra West, Mumbai. Hours, directions, parking, walk-in policy and first-visit info. Call {site.phone} or message on WhatsApp."
	path="/contact"
/>

<div class="bg-ink py-16 text-white sm:py-20">
	<div class="mx-auto max-w-6xl px-5" use:reveal>
		<p class="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Find Us</p>
		<h1 class="mt-3 font-display text-4xl font-bold sm:text-5xl">Contact & Visit Us</h1>
		<p class="mt-4 max-w-2xl leading-relaxed text-white/70">
			{site.address}. Five minutes from Bandra station (West), right on Linking Road.
		</p>
		<nav class="mt-6 text-xs text-white/50" aria-label="Breadcrumb">
			<a href="/" class="hover:text-white">Home</a> <span aria-hidden="true">/</span> Contact
		</nav>
	</div>
</div>

<div class="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:py-16 lg:grid-cols-2">
	<div use:reveal>
		<h2 class="font-display text-2xl font-bold text-ink">The shop</h2>
		<ul class="mt-6 space-y-5 text-sm leading-relaxed text-neutral-600">
			<li class="flex items-start gap-3">
				<MapPin class="mt-0.5 h-5 w-5 shrink-0 text-accent" />
				<span>
					{site.address}<br />
					<a
						href={site.mapsUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="font-bold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-text"
					>
						Get directions on Google Maps
					</a>
				</span>
			</li>
			<li class="flex items-center gap-3">
				<Phone class="h-5 w-5 shrink-0 text-accent" />
				<a href={site.phoneHref} class="font-semibold text-ink hover:text-accent-text">{site.phone}</a>
			</li>
			<li class="flex items-center gap-3">
				<MessageCircle class="h-5 w-5 shrink-0 text-accent" />
				<a
					href={site.whatsapp}
					target="_blank"
					rel="noopener noreferrer"
					class="font-semibold text-ink hover:text-accent-text">Chat with us on WhatsApp</a
				>
			</li>
			<li class="flex items-center gap-3">
				<Mail class="h-5 w-5 shrink-0 text-accent" />
				<a href="mailto:{site.email}" class="font-semibold text-ink hover:text-accent-text">
					{site.email}
				</a>
			</li>
			<li class="flex items-start gap-3">
				<Clock class="mt-0.5 h-5 w-5 shrink-0 text-accent" />
				<span>
					{#each hours as h}
						<span class="flex justify-between gap-6">
							<span>{h.day}</span><span class="font-semibold text-ink">{h.time}</span>
						</span>
					{/each}
				</span>
			</li>
		</ul>

		<div class="mt-8 border border-neutral-200 bg-mist p-6">
			<h3 class="font-display text-lg font-bold text-ink">Walk-ins & parking</h3>
			<p class="mt-2 text-sm leading-relaxed text-neutral-600">{walkInPolicy}</p>
			<p class="mt-3 text-sm leading-relaxed text-neutral-600">
				Paid street parking is available on Linking Road right outside the shop, and there
				is a public parking lot 2 minutes away near Bandra station.
			</p>
		</div>

		<div class="mt-6 border border-neutral-200 bg-white p-6">
			<h3 class="font-display text-lg font-bold text-ink">First visit?</h3>
			<ul class="mt-3 space-y-2.5">
				{#each firstVisit as tip}
					<li class="flex items-start gap-3 text-sm leading-relaxed text-neutral-600">
						<Check class="mt-0.5 h-5 w-5 shrink-0 text-accent" /> {tip}
					</li>
				{/each}
			</ul>
			<a
				href="/book"
				class="btn-hard mt-6 inline-block border border-ink bg-ink px-6 py-3 text-xs font-bold tracking-[0.2em] text-white"
			>
				BOOK YOUR FIRST CUT
			</a>
		</div>
	</div>

	<div use:reveal>
		<iframe
			title="Map — Barber, Linking Road, Bandra West, Mumbai"
			src={site.mapEmbed}
			class="h-[420px] w-full border border-neutral-200"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		></iframe>
		<p class="mt-3 text-xs leading-relaxed text-neutral-400">
			Map loads from Google Maps. If it does not load, use the
			<a
				href={site.mapsUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="font-semibold text-ink underline">directions link</a
			>
			above.
		</p>
	</div>
</div>
