<script lang="ts">
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import type { EmblaCarouselType } from 'embla-carousel';
	import Picture from '#lib/components/Picture.svelte';
	import { testimonials } from '#lib/data/site.js';
	import { ChevronLeft, ChevronRight, Star } from 'lucide-svelte';

	let emblaApi = $state<EmblaCarouselType | undefined>(undefined);
	let selected = $state(0);

	function onInit(event: CustomEvent<EmblaCarouselType>) {
		emblaApi = event.detail;
		emblaApi.on('select', () => {
			selected = emblaApi?.selectedScrollSnap() ?? 0;
		});
	}
</script>

<div class="relative">
	<div
		class="overflow-hidden"
		use:emblaCarouselSvelte={{ options: { loop: true, align: 'start' }, plugins: [] }}
		onemblaInit={onInit}
	>
		<div class="flex">
			{#each testimonials as t}
				<article class="min-w-0 shrink-0 grow-0 basis-full px-1 sm:basis-1/2 sm:px-3 lg:basis-1/3">
					<div class="flex h-full flex-col border border-neutral-200 bg-white p-6">
						<div class="flex gap-0.5" aria-label="Rated {t.rating} out of 5 stars">
							{#each Array.from({ length: 5 }) as _, i}
								<Star
									class="h-4 w-4 {i < t.rating
										? 'fill-accent text-accent'
										: 'fill-neutral-200 text-neutral-200'}"
								/>
							{/each}
						</div>
						<blockquote class="mt-4 flex-1 text-base leading-relaxed text-neutral-600">
							“{t.quote}”
						</blockquote>
						<div class="mt-6 flex items-center gap-3">
							{#if t.avatar}
								<Picture
									name={t.avatar}
									alt="Photo of {t.name}"
									widths={[480]}
									sizes="48px"
									cls="block h-12 w-12 shrink-0 overflow-hidden rounded-full"
								/>
							{:else}
								<span
									class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-white"
									aria-hidden="true">{t.initials}</span
								>
							{/if}
							<div>
								<p class="text-sm font-bold text-ink">{t.name}</p>
								<p class="text-xs text-neutral-500">{t.role}</p>
								<p class="mt-0.5 text-xs font-semibold text-accent-text">
									{t.service} · with {t.barber}
								</p>
							</div>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>

	<div class="mt-6 flex items-center justify-center gap-4">
		<button
			type="button"
			class="flex h-11 w-11 items-center justify-center border border-neutral-300 text-ink transition-colors hover:border-ink"
			aria-label="Previous testimonials"
			onclick={() => emblaApi?.scrollPrev()}
		>
			<ChevronLeft class="h-5 w-5" />
		</button>
		<div class="flex gap-2" role="tablist" aria-label="Choose testimonial">
			{#each testimonials as _, i}
				<button
					type="button"
					role="tab"
					aria-selected={selected === i}
					aria-label="Go to testimonial {i + 1}"
					class="h-2.5 rounded-full transition-all {selected === i
						? 'w-8 bg-accent'
						: 'w-2.5 bg-neutral-300 hover:bg-neutral-400'}"
					onclick={() => emblaApi?.scrollTo(i)}
				></button>
			{/each}
		</div>
		<button
			type="button"
			class="flex h-11 w-11 items-center justify-center border border-neutral-300 text-ink transition-colors hover:border-ink"
			aria-label="Next testimonials"
			onclick={() => emblaApi?.scrollNext()}
		>
			<ChevronRight class="h-5 w-5" />
		</button>
	</div>
</div>
