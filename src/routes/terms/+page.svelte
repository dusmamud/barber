<script lang="ts">
	import PageHead from '#lib/components/PageHead.svelte';
	import { site } from '#lib/data/site.js';
</script>

<PageHead
	title="Terms — Barber"
	description="The terms for booking, visiting and shopping at Barber, Bandra West. Simple, fair and in plain language."
	path="/terms"
/>

<div class="mx-auto max-w-3xl px-5 py-14 sm:py-20">
	<p class="text-xs font-semibold uppercase tracking-[0.25em] text-accent-text">Legal</p>
	<h1 class="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">Terms</h1>
	<p class="mt-3 text-sm text-neutral-400">Last updated: 19 November 2026</p>

	<div class="mt-10 space-y-8 text-sm leading-relaxed text-neutral-600 sm:text-base">
		<section>
			<h2 class="font-display text-xl font-bold text-ink">Bookings</h2>
			<p class="mt-2">
				Booking online is free and needs no payment. We hold your chair for 10 minutes past
				your slot. Rescheduling or cancelling is free up to 2 hours before your slot — call
				<a href={site.phoneHref} class="font-semibold text-ink underline">{site.phone}</a>
				or message us on WhatsApp.
			</p>
		</section>
		<section>
			<h2 class="font-display text-xl font-bold text-ink">Payment</h2>
			<p class="mt-2">
				You pay at the shop after your service, by UPI, card or cash. All prices include
				GST. Gift cards are valid for one year from purchase and cannot be exchanged for
				cash.
			</p>
		</section>
		<section>
			<h2 class="font-display text-xl font-bold text-ink">Products</h2>
			<p class="mt-2">
				Products bought online are collected at the shop. If a product is out of stock when
				you arrive, we will call you first and offer a refund or an alternative. Unopened
				products can be returned within 7 days with your order reference.
			</p>
		</section>
		<section>
			<h2 class="font-display text-xl font-bold text-ink">The shop</h2>
			<p class="mt-2">
				Children are welcome and must be accompanied by an adult. We are not liable for
				personal items left in the shop. Please let your barber know about any skin
				condition or allergy before a shave or a product is applied.
			</p>
		</section>
	</div>
</div>
