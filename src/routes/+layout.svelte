<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import CartDrawer from '#lib/components/CartDrawer.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import Header from '#lib/components/Header.svelte';
	import StickyBar from '#lib/components/StickyBar.svelte';
	import { initSmoothScroll } from '#lib/motion.js';
	import { onMount } from 'svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	onMount(() => initSmoothScroll());
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href={favicon} />
	<meta name="theme-color" content="#131315" />
</svelte:head>

<div id="top">
	<Header />
	<main>
		{@render children()}
	</main>
	<Footer />
	<CartDrawer />
	<StickyBar />
</div>
