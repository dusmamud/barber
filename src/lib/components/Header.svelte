<script lang="ts">
	import { page } from '$app/state';
	import ServiceIcon from '#lib/components/ServiceIcon.svelte';
	import { navLinks, site } from '#lib/data/site.js';
	import { cart } from '#lib/stores/cart.svelte.js';
	import { Menu, Phone, ShoppingBag, X } from 'lucide-svelte';

	let menuOpen = $state(false);
	let menuButton: HTMLButtonElement | undefined = $state();

	function closeMenu(returnFocus = false) {
		menuOpen = false;
		if (returnFocus) menuButton?.focus();
	}

	function onMenuKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') closeMenu(true);
	}

	$effect(() => {
		if (menuOpen) document.addEventListener('keydown', onMenuKeydown);
		else document.removeEventListener('keydown', onMenuKeydown);
		return () => document.removeEventListener('keydown', onMenuKeydown);
	});
</script>

<header class="sticky top-0 z-50 border-b border-neutral-100 bg-white/95 backdrop-blur">
	<div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20">
		<a href="/" class="flex items-center gap-2" aria-label="Barber — home">
			<span class="flex h-9 w-9 items-center justify-center bg-accent text-white">
				<ServiceIcon icon="scissors-logo" cls="h-5 w-5" />
			</span>
			<span class="font-display text-2xl font-bold tracking-wide">BARBER</span>
		</a>

		<nav class="hidden items-center gap-7 lg:flex" aria-label="Primary">
			{#each navLinks as link}
				{@const active =
					link.href === '/'
						? page.url.pathname === '/'
						: page.url.pathname === link.href ||
							page.url.pathname.startsWith(link.href + '/')}
				<a
					href={link.href}
					class="py-3 text-sm font-medium transition-colors {active
						? 'border-b-2 border-accent text-ink'
						: 'text-neutral-500 hover:text-ink'}"
					aria-current={active ? 'page' : undefined}
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<div class="flex items-center gap-1 sm:gap-2">
			<a
				href={site.phoneHref}
				class="hidden h-11 w-11 items-center justify-center text-ink transition-colors hover:text-accent md:flex"
				aria-label="Call {site.phone}"
			>
				<Phone class="h-5 w-5" />
			</a>
			<button
				type="button"
				class="relative flex h-11 min-w-11 items-center justify-center px-1 text-ink transition-colors hover:text-accent"
				aria-label="Open cart, {cart.count} item{cart.count === 1 ? '' : 's'}"
				onclick={() => (cart.open = true)}
			>
				<ShoppingBag class="h-5 w-5" />
				{#if cart.count > 0}
					<span
						class="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-white"
					>
						{cart.count}
					</span>
				{/if}
			</button>
			<a
				href="/book"
				class="btn-hard ml-1 hidden border border-ink bg-ink px-5 py-2.5 text-xs font-bold tracking-[0.15em] text-white sm:inline-block"
			>
				BOOK NOW
			</a>
			<button
				type="button"
				bind:this={menuButton}
				class="flex h-11 w-11 items-center justify-center text-ink lg:hidden"
				aria-expanded={menuOpen}
				aria-label={menuOpen ? 'Close menu' : 'Open menu'}
				onclick={() => (menuOpen = !menuOpen)}
			>
				{#if menuOpen}<X class="h-6 w-6" />{:else}<Menu class="h-6 w-6" />{/if}
			</button>
		</div>
	</div>

	{#if menuOpen}
		<nav class="border-t border-neutral-100 bg-white px-5 py-2 lg:hidden" aria-label="Mobile">
			{#each navLinks as link}
				<a
					href={link.href}
					class="block py-3.5 text-base font-medium text-neutral-700 hover:text-ink"
					onclick={() => closeMenu()}
				>
					{link.label}
				</a>
			{/each}
			<a
				href="/book"
				class="mt-2 mb-3 block bg-ink py-3.5 text-center text-xs font-bold tracking-[0.2em] text-white"
				onclick={() => closeMenu()}
			>
				BOOK APPOINTMENT
			</a>
		</nav>
	{/if}
</header>
