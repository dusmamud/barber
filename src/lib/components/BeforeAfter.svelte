<script lang="ts">
	import Picture from '#lib/components/Picture.svelte';

	let {
		name,
		alt,
		beforeLabel = 'Before',
		afterLabel = 'After'
	}: { name: string; alt: string; beforeLabel?: string; afterLabel?: string } = $props();

	// Position of the divider, in percent (0–100).
	let position = $state(50);
</script>

<div class="relative overflow-hidden" role="group" aria-label="Before and after comparison slider">
	<!-- After (full colour) — bottom layer -->
	<Picture
		name={name}
		alt={alt}
		widths={[480, 800, 1200]}
		sizes="(max-width: 768px) 100vw, 768px"
		cls="block aspect-[16/10] w-full overflow-hidden"
	/>
	<!-- Before (muted, unstyled look) — top layer, clipped to the left of the divider -->
	<div
		class="absolute inset-0"
		style="clip-path: inset(0 {100 - position}% 0 0)"
		aria-hidden="true"
	>
		<div class="h-full w-full grayscale">
			<Picture
				name={name}
				alt=""
				widths={[480, 800, 1200]}
				sizes="(max-width: 768px) 100vw, 768px"
				cls="block aspect-[16/10] w-full overflow-hidden"
			/>
		</div>
	</div>

	<span
		class="absolute left-3 top-3 bg-ink/85 px-2.5 py-1 text-xs font-bold tracking-[0.15em] text-white"
		aria-hidden="true">{beforeLabel.toUpperCase()}</span
	>
	<span
		class="absolute right-3 top-3 bg-accent px-2.5 py-1 text-xs font-bold tracking-[0.15em] text-white"
		aria-hidden="true">{afterLabel.toUpperCase()}</span
	>

	<!-- Divider line -->
	<div
		class="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.25)]"
		style="left: {position}%"
		aria-hidden="true"
	></div>
	<div
		class="pointer-events-none absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lg"
		style="left: {position}%"
		aria-hidden="true"
	>
		<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<path d="m9 6-4 6 4 6" /><path d="m15 6 4 6-4 6" />
		</svg>
	</div>

	<label class="sr-only" for="before-after-slider">Drag to compare before and after</label>
	<input
		id="before-after-slider"
		type="range"
		min="0"
		max="100"
		step="1"
		bind:value={position}
		class="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
		aria-label="Before and after comparison — drag to reveal the after photo"
	/>
</div>
