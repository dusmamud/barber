<script lang="ts">
	import { error } from '@sveltejs/kit';
	import PageHead from '#lib/components/PageHead.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { blogPosts, site } from '#lib/data/site.js';
	import { ArrowLeft, Clock } from 'lucide-svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const post = blogPosts.find((p) => p.slug === data.slug);
	if (!post) error(404, 'Article not found');

	const articleLd = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: post.title,
		description: post.excerpt,
		image: `${site.url}/images/${post.image}-1200.jpg`,
		author: { '@type': 'Organization', name: site.name },
		datePublished: '2026-11-12'
	};
</script>

<PageHead
	title="{post.title} — Barber"
	description={post.excerpt}
	path="/blog/{post.slug}"
	image="{post.image}-1200.jpg"
	type="article"
/>

<article class="mx-auto max-w-3xl px-5 py-14 sm:py-20">
	<nav class="text-xs text-neutral-400" aria-label="Breadcrumb">
		<a href="/" class="hover:text-ink">Home</a> <span aria-hidden="true">/</span>
		<a href="/blog" class="hover:text-ink">Blog</a> <span aria-hidden="true">/</span>
		<span class="text-neutral-500">{post.title}</span>
	</nav>

	<h1 class="mt-6 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
		{post.title}
	</h1>
	<p class="mt-4 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
		<span class="font-semibold text-accent-text">{post.date}</span>
		<span aria-hidden="true">·</span>
		<span class="flex items-center gap-1"><Clock class="h-4 w-4" /> {post.readMin} min read</span>
		<span aria-hidden="true">·</span>
		<span>By the Barber team</span>
	</p>

	<Picture
		name={post.image}
		alt={post.alt}
		widths={[800, 1200, 1600]}
		sizes="(max-width: 768px) 100vw, 768px"
		cls="mt-8 block aspect-[16/9] w-full overflow-hidden"
	/>

	<div class="mt-8 space-y-5 text-base leading-relaxed text-neutral-600">
		{#each post.body as paragraph}
			<p>{paragraph}</p>
		{/each}
	</div>

	<div class="mt-12 border border-neutral-200 bg-mist p-6 sm:p-8">
		<h2 class="font-display text-2xl font-bold text-ink">Ready for the chair?</h2>
		<p class="mt-2 text-sm leading-relaxed text-neutral-500">
			Book online in two minutes — or walk in. Either way, bring this article up and your
			barber will know exactly what you mean.
		</p>
		<a
			href="/book"
			class="btn-hard mt-5 inline-block border border-ink bg-ink px-6 py-3 text-xs font-bold tracking-[0.2em] text-white"
		>
			BOOK APPOINTMENT
		</a>
	</div>

	<p class="mt-10">
		<a
			href="/blog"
			class="inline-flex items-center gap-2 text-sm font-bold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-text"
		>
			<ArrowLeft class="h-4 w-4" /> Back to all articles
		</a>
	</p>
</article>

{@html `<script type="application/ld+json">${JSON.stringify(articleLd)}</script>`}
