<script lang="ts">
	import PageHead from '#lib/components/PageHead.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import ServiceIcon from '#lib/components/ServiceIcon.svelte';
	import { inr, services, site } from '#lib/data/site.js';
	import { reveal } from '#lib/motion.js';

	const categories = ['All', 'Hair', 'Beard & Shave', 'Combos'] as const;
	let category = $state<(typeof categories)[number]>('All');

	const shown = $derived(
		category === 'All' ? services : services.filter((s) => s.category === category)
	);

	const serviceLd = {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		itemListElement: services.map((s, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			item: {
				'@type': 'Service',
				name: s.title,
				description: s.description,
				offers: { '@type': 'Offer', price: s.price, priceCurrency: 'INR' }
			}
		}))
	};
</script>

<PageHead
	title="Services & Prices — Barber | Bandra West, Mumbai"
	description="Haircuts, skin fades, hot towel shaves and beard trims from ₹199 in Bandra West, Mumbai. Every service with price and duration — book online in two minutes."
	path="/services"
/>

<div class="bg-ink py-16 text-white sm:py-20">
	<div class="mx-auto max-w-6xl px-5" use:reveal>
		<p class="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Our Handling</p>
		<h1 class="mt-3 font-display text-4xl font-bold sm:text-5xl">Services & Prices</h1>
		<p class="mt-4 max-w-2xl leading-relaxed text-white/70">
			Every service includes a consultation, a wash and a styled finish. Prices are final —
			no surprises at the chair. Walk-ins welcome, appointments get priority.
		</p>
		<nav class="mt-6 text-xs text-white/50" aria-label="Breadcrumb">
			<a href="/" class="hover:text-white">Home</a> <span aria-hidden="true">/</span> Services
		</nav>
	</div>
</div>

<div class="mx-auto max-w-6xl px-5 py-12 sm:py-16">
	<div class="flex flex-wrap gap-2" role="group" aria-label="Filter services by category">
		{#each categories as c}
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

	<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each shown as service}
			<article class="border border-neutral-200 bg-white" use:reveal>
				<div class="relative">
					<Picture
						name={service.image}
						alt={service.alt}
						widths={[480, 800]}
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
						cls="block aspect-[4/3] w-full overflow-hidden"
					/>
					<span
						class="absolute -bottom-6 left-5 flex h-12 w-12 items-center justify-center bg-accent text-white"
					>
						<ServiceIcon icon={service.icon} cls="h-6 w-6" />
					</span>
					{#if service.popular}
						<span
							class="absolute right-3 top-3 bg-ink px-2 py-1 text-xs font-bold tracking-[0.15em] text-white"
						>
							MOST BOOKED
						</span>
					{/if}
				</div>
				<div class="p-5 pt-10">
					<div class="flex items-baseline justify-between gap-3">
						<h2 class="font-display text-xl font-bold text-ink">{service.title}</h2>
						<p class="shrink-0 font-display text-xl font-bold text-accent-text">
							{inr(service.price)}
						</p>
					</div>
					<p class="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
						{service.category} · {service.duration}
					</p>
					<p class="mt-3 text-sm leading-relaxed text-neutral-500">{service.description}</p>
					<a
						href="/book?service={service.id}"
						class="btn-hard mt-5 inline-block border border-ink bg-ink px-6 py-3 text-xs font-bold tracking-[0.2em] text-white"
					>
						BOOK THIS · {inr(service.price)}
					</a>
				</div>
			</article>
		{/each}
	</div>

	<div class="mt-14 border border-neutral-200 bg-mist p-6 sm:p-8" use:reveal>
		<h2 class="font-display text-2xl font-bold text-ink">Good to know</h2>
		<ul class="mt-4 grid gap-3 text-sm leading-relaxed text-neutral-600 sm:grid-cols-2">
			<li>· All prices include GST. No hidden charges, ever.</li>
			<li>· Every cut ends with a styled finish — walk out ready.</li>
			<li>· Running late? Call us — we hold your chair for 10 minutes.</li>
			<li>· Reschedule free up to 2 hours before your slot.</li>
		</ul>
		<p class="mt-6 text-sm">
			Not sure what to ask for?
			<a
				href="/blog/ask-for-the-perfect-fade"
				class="inline-block py-1 font-bold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-text"
			>
				Read how to ask for the perfect fade
			</a>
		</p>
	</div>
</div>

{@html `<script type="application/ld+json">${JSON.stringify(serviceLd)}</script>`}
