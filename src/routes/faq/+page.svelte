<script lang="ts">
	import PageHead from '#lib/components/PageHead.svelte';
	import { faqs, site } from '#lib/data/site.js';
	import { reveal } from '#lib/motion.js';

	const faqLd = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((f) => ({
			'@type': 'Question',
			name: f.q,
			acceptedAnswer: { '@type': 'Answer', text: f.a }
		}))
	};
</script>

<PageHead
	title="FAQ — Barber | Bandra West, Mumbai"
	description="Walk-ins, kids cuts, payment, cancellations, parking and gift cards — everything you need to know before your first visit to Barber, Bandra West."
	path="/faq"
/>

<div class="bg-ink py-16 text-white sm:py-20">
	<div class="mx-auto max-w-6xl px-5" use:reveal>
		<p class="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Good To Know</p>
		<h1 class="mt-3 font-display text-4xl font-bold sm:text-5xl">Frequently Asked Questions</h1>
		<p class="mt-4 max-w-2xl leading-relaxed text-white/70">
			Everything about your visit — before you even sit in the chair.
		</p>
		<nav class="mt-6 text-xs text-white/50" aria-label="Breadcrumb">
			<a href="/" class="hover:text-white">Home</a> <span aria-hidden="true">/</span> FAQ
		</nav>
	</div>
</div>

<div class="mx-auto max-w-3xl px-5 py-12 sm:py-16">
	<div class="space-y-4">
		{#each faqs as faq, i}
			<details class="group border border-neutral-200 bg-white p-5 sm:p-6" open={i === 0} use:reveal>
				<summary
					class="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-ink sm:text-lg"
				>
					{faq.q}
					<span
						class="text-xl font-normal text-accent-text transition-transform group-open:rotate-45"
						aria-hidden="true">+</span
					>
				</summary>
				<p class="mt-3 text-sm leading-relaxed text-neutral-500 sm:text-base">{faq.a}</p>
			</details>
		{/each}
	</div>

	<div class="mt-12 border border-neutral-200 bg-mist p-6 text-center sm:p-8" use:reveal>
		<h2 class="font-display text-2xl font-bold text-ink">Still wondering something?</h2>
		<p class="mt-2 text-sm leading-relaxed text-neutral-500">
			Call us or message on WhatsApp — a real person answers during shop hours.
		</p>
		<div class="mt-6 flex flex-wrap justify-center gap-3">
			<a
				href={site.phoneHref}
				class="btn-hard inline-block border border-ink bg-ink px-6 py-3 text-xs font-bold tracking-[0.2em] text-white"
			>
				CALL {site.phone}
			</a>
			<a
				href={site.whatsapp}
				target="_blank"
				rel="noopener noreferrer"
				class="btn-hard inline-block border border-ink bg-white px-6 py-3 text-xs font-bold tracking-[0.2em] text-ink"
			>
				WHATSAPP US
			</a>
		</div>
	</div>
</div>

{@html `<script type="application/ld+json">${JSON.stringify(faqLd)}</script>`}
