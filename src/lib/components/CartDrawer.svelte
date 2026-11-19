<script lang="ts">
	import Picture from '#lib/components/Picture.svelte';
	import { inr, site } from '#lib/data/site.js';
	import { cart, catalogLookup } from '#lib/stores/cart.svelte.js';
	import { Check, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-svelte';

	let placed = $state(false);
	let orderRef = $state('');
	let closeButton: HTMLButtonElement | undefined = $state();

	const lines = $derived(
		cart.lines
			.map((l) => ({ ...l, item: catalogLookup(l.id)! }))
			.filter((l) => l.item)
	);

	function close() {
		cart.open = false;
		placed = false;
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') close();
	}

	$effect(() => {
		if (cart.open) {
			document.addEventListener('keydown', onKeydown);
			closeButton?.focus();
			document.body.style.overflow = 'hidden';
		} else {
			document.removeEventListener('keydown', onKeydown);
			document.body.style.overflow = '';
		}
		return () => {
			document.removeEventListener('keydown', onKeydown);
			document.body.style.overflow = '';
		};
	});

	function placeOrder() {
		orderRef = 'BRB-' + Math.random().toString(36).slice(2, 8).toUpperCase();
		placed = true;
		cart.clear();
	}
</script>

{#if cart.open}
	<div
		class="fixed inset-0 z-[70] bg-black/50"
		aria-hidden="true"
		onclick={close}
		role="presentation"
	></div>
	<div
		class="fixed inset-0 z-[80] flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
		role="dialog"
		aria-modal="true"
		aria-label="Shopping cart"
	>
		<div class="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
			<h2 class="flex items-center gap-2 font-display text-xl font-bold">
				<ShoppingBag class="h-5 w-5" /> Your Cart
				{#if cart.count > 0}<span class="text-sm font-normal text-neutral-500">({cart.count})</span>{/if}
			</h2>
			<button
				type="button"
				bind:this={closeButton}
				class="flex h-11 w-11 items-center justify-center text-ink hover:text-accent"
				aria-label="Close cart"
				onclick={close}
			>
				<X class="h-6 w-6" />
			</button>
		</div>

		{#if placed}
			<div class="flex flex-1 flex-col items-start justify-center px-6" role="status">
				<span class="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white">
					<Check class="h-7 w-7" />
				</span>
				<h3 class="mt-5 font-display text-2xl font-bold">Order placed — {orderRef}</h3>
				<p class="mt-3 leading-relaxed text-neutral-500">
					Thanks! Pick your order up at the shop — {site.shortAddress} — and pay there by
					UPI, card or cash. We will call {site.phone} if anything is out of stock.
				</p>
				<button
					type="button"
					class="btn-hard mt-7 border border-ink bg-white px-6 py-3 text-xs font-bold tracking-[0.2em]"
					onclick={close}
				>
					CONTINUE SHOPPING
				</button>
			</div>
		{:else if lines.length === 0}
			<div class="flex flex-1 flex-col items-center justify-center px-6 text-center">
				<ShoppingBag class="h-10 w-10 text-neutral-300" />
				<p class="mt-4 font-display text-xl font-bold">Your cart is empty</p>
				<p class="mt-2 text-sm leading-relaxed text-neutral-500">
					Beard oils, pomades and gift boxes — add something sharp to take home.
				</p>
				<a
					href="/products"
					class="btn-hard mt-6 border border-ink bg-ink px-6 py-3 text-xs font-bold tracking-[0.2em] text-white"
					onclick={close}
				>
					BROWSE PRODUCTS
				</a>
			</div>
		{:else}
			<ul class="flex-1 divide-y divide-neutral-100 overflow-y-auto px-5">
				{#each lines as line (line.id)}
					<li class="flex gap-4 py-4">
						<Picture
							name={line.item.image}
							alt={line.item.name}
							widths={[480]}
							sizes="96px"
							cls="block h-24 w-24 shrink-0 overflow-hidden"
						/>
						<div class="min-w-0 flex-1">
							<p class="font-display text-base font-bold leading-snug">{line.item.name}</p>
							<p class="mt-1 text-sm font-semibold">{inr(line.item.price)}</p>
							<div class="mt-3 flex items-center gap-2">
								<button
									type="button"
									class="flex h-9 w-9 items-center justify-center border border-neutral-300 hover:border-ink"
									aria-label="Decrease quantity of {line.item.name}"
									onclick={() => cart.setQty(line.id, line.qty - 1)}
								>
									<Minus class="h-4 w-4" />
								</button>
								<span class="w-6 text-center text-sm font-semibold" aria-label="Quantity"
									>{line.qty}</span
								>
								<button
									type="button"
									class="flex h-9 w-9 items-center justify-center border border-neutral-300 hover:border-ink"
									aria-label="Increase quantity of {line.item.name}"
									onclick={() => cart.setQty(line.id, line.qty + 1)}
								>
									<Plus class="h-4 w-4" />
								</button>
								<button
									type="button"
									class="ml-auto flex h-9 w-9 items-center justify-center text-neutral-400 hover:text-red-600"
									aria-label="Remove {line.item.name} from cart"
									onclick={() => cart.remove(line.id)}
								>
									<Trash2 class="h-4 w-4" />
								</button>
							</div>
						</div>
						<p class="text-sm font-bold">{inr(line.item.price * line.qty)}</p>
					</li>
				{/each}
			</ul>
			<div class="border-t border-neutral-100 px-5 py-5">
				<p class="flex justify-between text-sm">
					<span class="text-neutral-500">Subtotal</span>
					<span class="font-bold">{inr(cart.subtotal)}</span>
				</p>
				<p class="mt-1 text-xs leading-relaxed text-neutral-400">
					No payment online — pay at the shop when you collect your order.
				</p>
				<button
					type="button"
					class="btn-hard mt-4 w-full border border-ink bg-ink py-3.5 text-xs font-bold tracking-[0.2em] text-white"
					onclick={placeOrder}
				>
					PLACE ORDER · {inr(cart.subtotal)}
				</button>
			</div>
		{/if}
	</div>
{/if}
