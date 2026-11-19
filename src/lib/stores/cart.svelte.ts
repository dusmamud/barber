// Cart store — Svelte 5 runes, persisted to localStorage (mock shop, nothing
// is charged). Products and gift cards are looked up from the single
// mock-data file.
import { giftCards, products } from '#lib/data/site.js';

const isBrowser = typeof window !== 'undefined';

export type CatalogItem = { id: string; name: string; price: number; image: string };

export function catalogLookup(id: string): CatalogItem | undefined {
	const p = products.find((x) => x.id === id);
	if (p) return { id: p.id, name: p.name, price: p.price, image: p.image };
	const g = giftCards.find((x) => x.id === id);
	if (g) return { id: g.id, name: g.label, price: g.amount, image: 'product-3' };
	return undefined;
}

export type CartLine = { id: string; qty: number };

const KEY = 'barber-cart-v1';

function load(): CartLine[] {
	if (!isBrowser) return [];
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed: unknown = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed
			.filter(
				(l): l is CartLine =>
					typeof l === 'object' &&
					l !== null &&
					typeof (l as CartLine).id === 'string' &&
					typeof (l as CartLine).qty === 'number'
			)
			.filter((l) => catalogLookup(l.id))
			.map((l) => ({ id: l.id, qty: Math.min(9, Math.max(1, Math.floor(l.qty))) }));
	} catch {
		return [];
	}
}

class CartStore {
	lines = $state<CartLine[]>(load());
	open = $state(false);

	count = $derived(this.lines.reduce((n, l) => n + l.qty, 0));

	subtotal = $derived(
		this.lines.reduce((sum, l) => {
			const item = catalogLookup(l.id);
			return sum + (item ? item.price * l.qty : 0);
		}, 0)
	);

	has(id: string) {
		return this.lines.some((l) => l.id === id);
	}

	qty(id: string) {
		return this.lines.find((l) => l.id === id)?.qty ?? 0;
	}

	add(id: string) {
		const line = this.lines.find((l) => l.id === id);
		if (line) line.qty = Math.min(9, line.qty + 1);
		else this.lines = [...this.lines, { id, qty: 1 }];
		this.save();
	}

	setQty(id: string, qty: number) {
		if (qty <= 0) this.lines = this.lines.filter((l) => l.id !== id);
		else {
			const line = this.lines.find((l) => l.id === id);
			if (line) line.qty = Math.min(9, qty);
		}
		this.save();
	}

	remove(id: string) {
		this.lines = this.lines.filter((l) => l.id !== id);
		this.save();
	}

	clear() {
		this.lines = [];
		this.save();
	}

	private save() {
		if (!isBrowser) return;
		try {
			localStorage.setItem(KEY, JSON.stringify(this.lines));
		} catch {
			// storage full or unavailable — cart still works in memory
		}
	}
}

export const cart = new CartStore();
