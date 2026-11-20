<script lang="ts">
	import PageHead from '#lib/components/PageHead.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { giftCards, inr, memberships, products, site } from '#lib/data/site.js';
	import { reveal } from '#lib/motion.js';
	import { cart } from '#lib/stores/cart.svelte.js';
	import { Gift, MessageCircle } from 'lucide-svelte';
</script>

<PageHead
	title="Products, Gift Cards & Memberships — Barber"
	description="Beard oils, pomades and barber tools from ₹999, gift cards from ₹500 and monthly memberships — all available at Barber, Bandra West, Mumbai."
	path="/products"
/>

<div class="bg-ink py-16 text-white sm:py-20">
	<div class="mx-auto max-w-6xl px-5" use:reveal>
		<p class="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Our Shop</p>
		<h1 class="mt-3 font-display text-4xl font-bold sm:text-5xl">Products & Gift Cards</h1>
		<p class="mt-4 max-w-2xl leading-relaxed text-white/70">
			The same oils, pomades and tools we use on your hair — to take home. Order online,
			collect at the shop, pay there by UPI, card or cash.
		</p>
		<nav class="mt-6 text-xs text-white/50" aria-label="Breadcrumb">
			<a href="/" class="hover:text-white">Home</a> <span aria-hidden="true">/</span> Products
		</nav>
	</div>
</div>

<div class="mx-auto max-w-6xl px-5 py-12 sm:py-16">
	<h2 class="font-display text-2xl font-bold text-ink sm:text-3xl" use:reveal>Shop the shelf</h2>
	<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
		{#each products as product}
			<article class="flex flex-col border border-neutral-200 bg-white" use:reveal>
				<div class="relative">
					<Picture
						name={product.image}
						alt={product.alt}
						widths={[480, 800]}
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
						cls="block aspect-[4/3] w-full overflow-hidden"
					/>
					{#if product.badge}
						<span
							class="absolute left-3 top-3 bg-accent-text px-2 py-1 text-xs font-bold tracking-[0.2em] text-white"
						>
							{product.badge}
						</span>
					{/if}
				</div>
				<div class="flex flex-1 flex-col p-5">
					<h3 class="font-display text-lg font-bold text-ink">{product.name}</h3>
					<p class="mt-1 flex-1 text-sm leading-relaxed text-neutral-500">{product.description}</p>
					<p class="mt-3 text-sm">
						<span class="font-bold text-ink">{inr(product.price)}</span>
						{#if product.oldPrice}
							<span class="ml-2 text-neutral-500 line-through">{inr(product.oldPrice)}</span>
						{/if}
					</p>
					<button
						type="button"
						class="btn-hard mt-4 border px-5 py-3 text-xs font-bold tracking-[0.2em] {cart.has(product.id)
							? 'border-accent bg-accent text-white'
							: 'border-ink bg-ink text-white'}"
						aria-pressed={cart.has(product.id)}
						onclick={() => {
							if (!cart.has(product.id)) cart.add(product.id);
							cart.open = true;
						}}
					>
						{cart.has(product.id) ? 'IN CART — VIEW' : 'ADD TO CART'}
					</button>
				</div>
			</article>
		{/each}
	</div>

	<!-- Gift cards -->
	<section class="mt-16" aria-labelledby="gift-cards-heading" use:reveal>
		<h2 id="gift-cards-heading" class="font-display text-2xl font-bold text-ink sm:text-3xl">
			Gift Cards
		</h2>
		<p class="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-500">
			A clean cut for someone you like. Valid for a year on any service or product — pick
			one up in the shop or add it to your cart here.
		</p>
		<div class="mt-8 grid gap-6 sm:grid-cols-3">
			{#each giftCards as card}
				<article class="border border-neutral-200 bg-mist p-6">
					<span class="flex h-12 w-12 items-center justify-center bg-accent text-white">
						<Gift class="h-6 w-6" />
					</span>
					<h3 class="mt-4 font-display text-xl font-bold text-ink">{card.label}</h3>
					<p class="mt-1 text-sm leading-relaxed text-neutral-500">{card.note}</p>
					<p class="mt-3 text-sm font-bold text-ink">{inr(card.amount)} · valid 1 year</p>
					<button
						type="button"
						class="btn-hard mt-5 w-full border border-ink bg-ink px-5 py-3 text-xs font-bold tracking-[0.2em] text-white"
						onclick={() => {
							if (!cart.has(card.id)) cart.add(card.id);
							cart.open = true;
						}}
					>
						{cart.has(card.id) ? 'IN CART — VIEW' : 'ADD GIFT CARD'}
					</button>
				</article>
			{/each}
		</div>
	</section>

	<!-- Memberships -->
	<section class="mt-16" aria-labelledby="memberships-heading" use:reveal>
		<h2 id="memberships-heading" class="font-display text-2xl font-bold text-ink sm:text-3xl">
			Memberships
		</h2>
		<p class="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-500">
			For regulars: pay once a month, never think about prices again. Start at the shop or
			message us on WhatsApp.
		</p>
		<div class="mt-8 grid gap-6 sm:grid-cols-2">
			{#each memberships as m}
				<article class="border border-neutral-200 bg-white p-6 sm:p-8">
					<div class="flex items-baseline justify-between gap-3">
						<h3 class="font-display text-xl font-bold text-ink">{m.name}</h3>
						<p class="font-display text-2xl font-bold text-accent-text">
							{inr(m.price)}<span class="text-sm font-normal text-neutral-400"> {m.period}</span>
						</p>
					</div>
					<ul class="mt-4 space-y-2">
						{#each m.points as p}
							<li class="flex items-start gap-2 text-sm text-neutral-600">
								<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true"></span>
								{p}
							</li>
						{/each}
					</ul>
					<a
						href="{site.whatsapp}?text={encodeURIComponent('Hi Barber! I want to join ' + m.name + '.')}"
						target="_blank"
						rel="noopener noreferrer"
						class="btn-hard mt-6 inline-flex items-center gap-2 border border-ink bg-white px-6 py-3 text-xs font-bold tracking-[0.2em] text-ink"
					>
						<MessageCircle class="h-4 w-4" /> JOIN ON WHATSAPP
					</a>
				</article>
			{/each}
		</div>
		<p class="mt-6 max-w-2xl text-sm leading-relaxed text-neutral-500">
			<strong class="font-semibold text-ink">Loyalty:</strong> every 10th cut is on us. Ask at
			the shop for your loyalty card — no app, no sign-up, just a stamp each visit.
		</p>
	</section>
</div>
