<script lang="ts">
	import { site } from '#lib/data/site.js';

	let {
		title,
		description,
		path = '/',
 
		image = 'hero-barber-1200.jpg',
		type = 'website'
	}: {
		title: string;
		description: string;
		path?: string;
		image?: string;
		type?: 'website' | 'article';
	} = $props();

	const url = $derived(`${site.url}${path}`);
	const imageUrl = $derived(`${site.url}/images/${image}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:locale" content="en_IN" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
</svelte:head>
