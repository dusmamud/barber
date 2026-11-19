<script lang="ts">
	import PageHead from '#lib/components/PageHead.svelte';
	import { site } from '#lib/data/site.js';
</script>

<PageHead
	title="Privacy Policy — Barber"
	description="How Barber handles your information when you book online or visit the shop. We collect only what a booking needs, and we never sell your data."
	path="/privacy"
/>

<div class="mx-auto max-w-3xl px-5 py-14 sm:py-20">
	<p class="text-xs font-semibold uppercase tracking-[0.25em] text-accent-text">Legal</p>
	<h1 class="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">Privacy Policy</h1>
	<p class="mt-3 text-sm text-neutral-400">Last updated: 19 November 2026</p>

	<div class="prose-legal mt-10 space-y-8 text-sm leading-relaxed text-neutral-600 sm:text-base">
		<section>
			<h2 class="font-display text-xl font-bold text-ink">What we collect</h2>
			<p class="mt-2">
				When you book an appointment, we ask for your name and phone number — only what we
				need to hold your chair and confirm your booking. If you buy products, we keep your
				order details until you collect them. We do not ask for payment details online.
			</p>
		</section>
		<section>
			<h2 class="font-display text-xl font-bold text-ink">How we use it</h2>
			<p class="mt-2">
				Your details are used to manage your booking, remind you about it, and contact you
				if a slot changes. We may message you about your booking on WhatsApp if you booked
				through WhatsApp. We do not sell, rent or share your details with anyone else.
			</p>
		</section>
		<section>
			<h2 class="font-display text-xl font-bold text-ink">Your choices</h2>
			<p class="mt-2">
				You can ask us to delete your booking details at any time by calling
				<a href={site.phoneHref} class="font-semibold text-ink underline">{site.phone}</a>
				or writing to
				<a href="mailto:{site.email}" class="font-semibold text-ink underline">{site.email}</a>.
				Bookings are kept on your own device in your browser (local storage) for the cart —
				clearing your browser data clears them.
			</p>
		</section>
		<section>
			<h2 class="font-display text-xl font-bold text-ink">Photos</h2>
			<p class="mt-2">
				We sometimes photograph finished cuts for our gallery. We only do this with your
				permission, and you can ask us to remove a photo of you at any time.
			</p>
		</section>
	</div>
</div>
