<script lang="ts">
	import { site } from '#lib/data/site.js';
	import { CalendarCheck, Phone } from 'lucide-svelte';
</script>

<div
	class="fixed inset-x-0 bottom-0 z-[60] border-t border-neutral-200 bg-white/97 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur lg:hidden"
>
	<div class="grid grid-cols-2 gap-3 px-4 py-3">
		<a
			href="/book"
			class="flex min-h-12 items-center justify-center gap-2 bg-ink text-xs font-bold tracking-[0.15em] text-white"
		>
			<CalendarCheck class="h-4 w-4" /> BOOK NOW
		</a>
		<a
			href={site.phoneHref}
			class="flex min-h-12 items-center justify-center gap-2 border-2 border-ink text-xs font-bold tracking-[0.15em] text-ink"
		>
			<Phone class="h-4 w-4" /> CALL NOW
		</a>
	</div>
</div>
