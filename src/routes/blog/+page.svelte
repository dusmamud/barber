<script lang="ts">
	import PageHead from '#lib/components/PageHead.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { blogPosts } from '#lib/data/site.js';
	import { reveal } from '#lib/motion.js';
	import { ArrowRight, Clock } from 'lucide-svelte';
</script>

<PageHead
	title="From The Chair — Barber Blog"
	description="Straight from the barber’s chair: how to ask for the perfect fade, beard care in five steps, and what a hot towel shave is really like."
	path="/blog"
/>

<div class="bg-ink py-16 text-white sm:py-20">
	<div class="mx-auto max-w-6xl px-5" use:reveal>
		<p class="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Latest News</p>
		<h1 class="mt-3 font-display text-4xl font-bold sm:text-5xl">From The Chair</h1>
		<p class="mt-4 max-w-2xl leading-relaxed text-white/70">
			What we know, written down — so your next cut is even better than the last one.
		</p>
		<nav class="mt-6 text-xs text-white/50" aria-label="Breadcrumb">
			<a href="/" class="hover:text-white">Home</a> <span aria-hidden="true">/</span> Blog
		</nav>
	</div>
</div>

<div class="mx-auto grid max-w-6xl gap-6 px-5 py-12 sm:py-16 md:grid-cols-3">
	{#each blogPosts as post}
		<article class="group border border-neutral-200 bg-white" use:reveal>
			<a href="/blog/{post.slug}" class="block">
				<Picture
					name={post.image}
					alt={post.alt}
					widths={[480, 800]}
					sizes="(max-width: 768px) 100vw, 33vw"
					cls="block aspect-[16/9] w-full overflow-hidden"
				/>
			</a>
			<div class="p-6">
				<p class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-text">
					{post.date} <span aria-hidden="true">·</span>
					<span class="flex items-center gap-1 normal-case tracking-normal text-neutral-400">
						<Clock class="h-3.5 w-3.5" /> {post.readMin} min read
					</span>
				</p>
				<h2 class="mt-3 font-display text-xl font-bold leading-snug text-ink">
					<a href="/blog/{post.slug}" class="group-hover:text-accent-text">{post.title}</a>
				</h2>
				<p class="mt-2 text-sm leading-relaxed text-neutral-500">{post.excerpt}</p>
				<a
					href="/blog/{post.slug}"
					class="mt-4 inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-ink hover:text-accent-text"
				>
					READ MORE <ArrowRight class="h-3.5 w-3.5" />
				</a>
			</div>
		</article>
	{/each}
</div>
