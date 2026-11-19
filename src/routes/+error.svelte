<script lang="ts">
	import { page } from '$app/state';
	import PageHead from '#lib/components/PageHead.svelte';
	import ServiceIcon from '#lib/components/ServiceIcon.svelte';

	const is404 = page.status === 404;
</script>

<PageHead
	title={is404 ? 'Page not found — Barber' : 'Something went wrong — Barber'}
	description={is404
		? 'That page does not exist — but a fresh cut does. Head home or book a chair.'
		: 'Something went wrong on our side. Head home or book a chair.'}
	path={page.url.pathname}
/>

<div class="mx-auto flex max-w-3xl flex-col items-center px-5 py-20 text-center sm:py-28">
	<span class="flex h-16 w-16 items-center justify-center bg-accent text-white">
		<ServiceIcon icon="scissors-logo" cls="h-8 w-8" />
	</span>
	<p class="mt-6 font-display text-7xl font-bold text-ink sm:text-8xl">
		{is404 ? '404' : page.status}
	</p>
	<h1 class="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
		{is404 ? 'This page got trimmed off.' : 'Something went wrong.'}
	</h1>
	<p class="mt-4 max-w-md leading-relaxed text-neutral-500">
		{is404
			? 'The page you are looking for does not exist or was moved. The good news: a fresh cut still does.'
			: 'We hit a snag on our side. Try again, or head home — the chairs are still open.'}
	</p>
	<div class="mt-8 flex flex-wrap justify-center gap-3">
		<a
			href="/"
			class="btn-hard inline-block border border-ink bg-ink px-8 py-3.5 text-xs font-bold tracking-[0.2em] text-white"
		>
			BACK HOME
		</a>
		<a
			href="/book"
			class="btn-hard inline-block border border-ink bg-white px-8 py-3.5 text-xs font-bold tracking-[0.2em] text-ink"
		>
			BOOK APPOINTMENT
		</a>
	</div>
	<p class="mt-8 text-sm text-neutral-400">
		Looking for something?
		<a href="/services" class="font-semibold text-ink underline">Services</a> ·
		<a href="/barbers" class="font-semibold text-ink underline">Barbers</a> ·
		<a href="/gallery" class="font-semibold text-ink underline">Gallery</a> ·
		<a href="/faq" class="font-semibold text-ink underline">FAQ</a>
	</p>
</div>
