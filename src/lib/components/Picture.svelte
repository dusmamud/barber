<script lang="ts">
	// Reusable responsive picture. Har image AVIF -> WebP -> JPG order me,
	// native <picture> se instant fallback (koi JS detection nahi).
	// Files: static/images/<name>-<width>.avif/.webp/.jpg
	let {
		name,
		alt,
		widths = [480, 800, 1200],
		sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
		eager = false,
		cls = ''
	}: {
		name: string;
		alt: string;
		widths?: number[];
		sizes?: string;
		eager?: boolean;
		cls?: string;
	} = $props();

	const avif = $derived(widths.map((w) => `/images/${name}-${w}.avif ${w}w`).join(', '));
	const webp = $derived(widths.map((w) => `/images/${name}-${w}.webp ${w}w`).join(', '));
	const jpg = $derived(widths.map((w) => `/images/${name}-${w}.jpg ${w}w`).join(', '));
	const fallback = $derived(`/images/${name}-${widths[Math.min(1, widths.length - 1)]}.jpg`);
</script>

<picture class={cls}>
	<source type="image/avif" srcset={avif} {sizes} />
	<source type="image/webp" srcset={webp} {sizes} />
	<source type="image/jpeg" srcset={jpg} {sizes} />
	<img
		src={fallback}
		{alt}
		class="h-full w-full object-cover"
		loading={eager ? 'eager' : 'lazy'}
		decoding="async"
		fetchpriority={eager ? 'high' : 'auto'}
	/>
</picture>
