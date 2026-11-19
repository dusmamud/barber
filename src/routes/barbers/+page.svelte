<script lang="ts">
	import PageHead from '#lib/components/PageHead.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { barbers } from '#lib/data/site.js';
	import { reveal } from '#lib/motion.js';
	import { Star } from 'lucide-svelte';
</script>

<PageHead
	title="Our Barbers — Barber | Bandra West, Mumbai"
	description="Meet the four master barbers behind Barber, Bandra West. Specialties, experience and ratings — pick your barber and book with them directly."
	path="/barbers"
/>

<div class="bg-ink py-16 text-white sm:py-20">
	<div class="mx-auto max-w-6xl px-5" use:reveal>
		<p class="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Real Professionals</p>
		<h1 class="mt-3 font-display text-4xl font-bold sm:text-5xl">Meet Your Barber</h1>
		<p class="mt-4 max-w-2xl leading-relaxed text-white/70">
			Clients follow a barber, not a shop. Every barber below lists what they do best and
			which day they are off — so you always book the right chair.
		</p>
		<nav class="mt-6 text-xs text-white/50" aria-label="Breadcrumb">
			<a href="/" class="hover:text-white">Home</a> <span aria-hidden="true">/</span> Barbers
		</nav>
	</div>
</div>

<div class="mx-auto max-w-6xl px-5 py-12 sm:py-16">
	<div class="grid gap-10 md:grid-cols-2">
		{#each barbers as barber}
			<article class="grid gap-6 border border-neutral-200 bg-white p-6 sm:grid-cols-5" use:reveal>
				<div class="sm:col-span-2">
					<Picture
						name={barber.image}
						alt={barber.alt}
						widths={[480, 800]}
						sizes="(max-width: 768px) 100vw, 40vw"
						cls="block aspect-[4/5] w-full overflow-hidden"
					/>
				</div>
				<div class="sm:col-span-3">
					<h2 class="font-display text-2xl font-bold text-ink">{barber.name}</h2>
					<p class="mt-1 text-sm font-semibold text-accent-text">{barber.role}</p>
					<p class="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-500">
						<span class="flex items-center gap-1">
							<Star class="h-4 w-4 fill-accent text-accent" />
							{barber.rating.toFixed(1)}
						</span>
						<span>·</span>
						<span>{barber.cuts.toLocaleString('en-IN')}+ cuts</span>
						<span>·</span>
						<span>{barber.experience}</span>
					</p>
					<p class="mt-4 text-sm leading-relaxed text-neutral-600">{barber.bio}</p>
					<div class="mt-4 flex flex-wrap gap-2">
						{#each barber.specialties as s}
							<span
								class="border border-neutral-200 bg-mist px-2.5 py-1 text-xs font-semibold text-neutral-600"
							>
								{s}
							</span>
						{/each}
					</div>
					<p class="mt-4 text-xs text-neutral-400">Day off: {barber.daysOff} (shop closed Sundays)</p>
					<a
						href="/book?barber={barber.id}"
						class="btn-hard mt-5 inline-block border border-ink bg-ink px-6 py-3 text-xs font-bold tracking-[0.2em] text-white"
					>
						BOOK WITH {barber.name.split(' ')[0].toUpperCase()}
					</a>
				</div>
			</article>
		{/each}
	</div>
	<p class="mt-10 text-center text-sm text-neutral-500">
		Not sure who to pick?
		<a href="/book?barber=any" class="font-bold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-text">
			Book with the first available barber
		</a>
		— we match you to the right chair for your cut.
	</p>
</div>
