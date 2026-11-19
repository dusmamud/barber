<script lang="ts">
	// Custom SVG icons — sirf SVG, 24x24 grid, 2px stroke, round caps/joins,
	// ek hi stroke width poore set me, currentColor.
	import type { ServiceIcon } from '#lib/data/site.js';

	let { icon, cls = 'h-6 w-6' }: { icon: ServiceIcon | 'scissors-logo'; cls?: string } = $props();
</script>

{#if icon === 'scissors' || icon === 'scissors-logo'}
	<svg
		class={cls}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		<circle cx="6" cy="6" r="3" />
		<circle cx="6" cy="18" r="3" />
		<path d="M20 4 8.12 15.88" />
		<path d="M14.47 14.48 20 20" />
		<path d="M8.12 8.12 12 12" />
	</svg>
{:else if icon === 'razor'}
	<svg
		class={cls}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		<path d="M3 21 14.5 9.5" />
		<path d="M13 4.5 19.5 11 17 13.5 10.5 7Z" />
		<path d="m10.5 7-2-2" />
		<path d="m4 20 1.5-1.5" />
	</svg>
{:else if icon === 'beard'}
	<svg
		class={cls}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		<path d="M6 3v5.5a6 6 0 0 0 12 0V3" />
		<path d="M6 8.5c1.2 1 2.4 1.5 3.5 1.5" />
		<path d="M18 8.5c-1.2 1-2.4 1.5-3.5 1.5" />
		<path d="M12 10v3.5" />
		<path d="M9.5 15.5h5" />
	</svg>
{:else if icon === 'moustache'}
	<svg
		class={cls}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		<path d="M3 13c1.5-3.5 5-4.5 7.5-2.5.8.6 1.4 1.3 1.5 2.5" />
		<path d="M21 13c-1.5-3.5-5-4.5-7.5-2.5-.8.6-1.4 1.3-1.5 2.5" />
		<path d="M3 13c-.8 1.2-.5 2.6.7 3.2" />
		<path d="M21 13c.8 1.2.5 2.6-.7 3.2" />
	</svg>
{/if}
