<script lang="ts">
	import { page } from '$app/state';
	import PageHead from '#lib/components/PageHead.svelte';
	import Picture from '#lib/components/Picture.svelte';
	import { barbers, inr, services, site } from '#lib/data/site.js';
	import { CalendarCheck, Check, ChevronLeft, Download, Phone } from 'lucide-svelte';
	import { onMount } from 'svelte';

	type Booking = {
		ref: string;
		serviceId: string;
		barberId: string;
		date: string;
		time: string;
		name: string;
	};

	const KEY = 'barber-bookings-v1';
	const SLOTS = [
		'9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
		'4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
	];

	let step = $state(1);
	let serviceId = $state('');
	let barberId = $state('');
	let date = $state('');
	let time = $state('');
	let name = $state('');
	let phone = $state('');
	let notes = $state('');
	let error = $state('');
	let confirmed = $state<Booking | null>(null);
	let savedBookings = $state<Booking[]>([]);
	let dateInput: HTMLInputElement | undefined = $state();
	let stepHeading: HTMLHeadingElement | undefined = $state();

	const service = $derived(services.find((s) => s.id === serviceId));
	const barber = $derived(barbers.find((b) => b.id === barberId));
	const todayStr = () => {
		const d = new Date();
		return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
	};

	onMount(() => {
		if (dateInput) dateInput.min = todayStr();
		const q = page.url.searchParams;
		const qs = q.get('service');
		const qb = q.get('barber');
		if (qs && services.some((s) => s.id === qs)) serviceId = qs;
		if (qb === 'any') barberId = 'any';
		else if (qb && barbers.some((b) => b.id === qb)) barberId = qb;
		if (serviceId && barberId) step = 3;
		else if (serviceId) step = 2;
		try {
			const raw = localStorage.getItem(KEY);
			if (raw) {
				const parsed: unknown = JSON.parse(raw);
				if (Array.isArray(parsed)) {
					savedBookings = parsed.filter(
						(b): b is Booking =>
							typeof b === 'object' && b !== null && typeof (b as Booking).ref === 'string'
					);
				}
			}
		} catch {
			savedBookings = [];
		}
	});

	function isSunday(d: string) {
		return new Date(d + 'T00:00:00').getDay() === 0;
	}
	function isPast(d: string) {
		return d < todayStr();
	}
	function slotTaken(d: string, t: string) {
		// Mock availability — deterministic so a slot never flips between renders.
		let h = 0;
		for (const c of d + t) h = (h * 31 + c.charCodeAt(0)) % 997;
		return h % 5 === 0;
	}

	function next() {
		error = '';
		if (step === 1 && !serviceId) {
			error = 'Please pick a service first.';
			return;
		}
		if (step === 2 && !barberId) {
			error = 'Please pick a barber — or “Any available”.';
			return;
		}
		if (step === 3) {
			if (!date) {
				error = 'Please pick a date.';
				return;
			}
			if (isPast(date)) {
				error = 'That date is in the past — please pick today or later.';
				return;
			}
			if (isSunday(date)) {
				error = 'We are closed on Sundays. Please pick a Monday to Saturday.';
				return;
			}
			if (!time) {
				error = 'Please pick a time slot.';
				return;
			}
			if (slotTaken(date, time)) {
				error = 'That slot just got taken — please pick another time.';
				return;
			}
		}
		step = Math.min(4, step + 1);
		stepHeading?.focus();
	}

	function back() {
		error = '';
		step = Math.max(1, step - 1);
		stepHeading?.focus();
	}

	function fmtDate(d: string) {
		return new Date(d + 'T00:00:00').toLocaleDateString('en-IN', {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}

	function slotTo24(t: string) {
		const [h, rest] = t.split(':');
		const mins = rest.slice(0, 2);
		const ampm = rest.slice(3);
		let hour = parseInt(h, 10);
		if (ampm === 'PM' && hour !== 12) hour += 12;
		if (ampm === 'AM' && hour === 12) hour = 0;
		return { hour, mins };
	}

	function googleCal(b: Booking) {
		const s = service ?? services[0];
		const { hour, mins } = slotTo24(b.time);
		const ymd = b.date.replaceAll('-', '');
		const start = `${ymd}T${String(hour).padStart(2, '0')}${mins}00`;
		const endHour = hour + Math.floor((parseInt(mins, 10) + s.durationMin) / 60);
		const endMins = (parseInt(mins, 10) + s.durationMin) % 60;
		const end = `${ymd}T${String(endHour).padStart(2, '0')}${String(endMins).padStart(2, '0')}00`;
		const params = new URLSearchParams({
			action: 'TEMPLATE',
			text: `Barber — ${s.title}`,
			dates: `${start}/${end}`,
			details: `Booking ${b.ref} at Barber, Bandra West. ${barber?.name ? 'Barber: ' + barber.name + '. ' : ''}Reschedule free up to 2 hours before — call ${site.phone}.`,
			location: site.address
		});
		return `https://calendar.google.com/calendar/render?${params.toString()}`;
	}

	function downloadIcs(b: Booking) {
		const s = service ?? services[0];
		const { hour, mins } = slotTo24(b.time);
		const ymd = b.date.replaceAll('-', '');
		const start = `${ymd}T${String(hour).padStart(2, '0')}${mins}00`;
		const endHour = hour + Math.floor((parseInt(mins, 10) + s.durationMin) / 60);
		const endMins = (parseInt(mins, 10) + s.durationMin) % 60;
		const end = `${ymd}T${String(endHour).padStart(2, '0')}${String(endMins).padStart(2, '0')}00`;
		const ics = [
			'BEGIN:VCALENDAR',
			'VERSION:2.0',
			'PRODID:-//Barber//Booking//EN',
			'BEGIN:VEVENT',
			`UID:${b.ref}@barber.shop`,
			`DTSTART:${start}`,
			`DTEND:${end}`,
			`SUMMARY:Barber — ${s.title}`,
			`DESCRIPTION:Booking ${b.ref}. ${barber?.name ? 'Barber: ' + barber.name + '. ' : ''}Reschedule free up to 2 hours before — call ${site.phone}.`,
			`LOCATION:${site.address}`,
			'END:VEVENT',
			'END:VCALENDAR'
		].join('\r\n');
		const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
		const a = document.createElement('a');
		a.href = url;
		a.download = `barber-booking-${b.ref}.ics`;
		a.click();
		URL.revokeObjectURL(url);
	}

	function confirm() {
		error = '';
		const cleanName = name.trim();
		if (cleanName.length < 2) {
			error = 'Please enter your name.';
			return;
		}
		const digits = phone.replace(/\D/g, '');
		const valid = digits.length === 10 || (digits.length === 12 && digits.startsWith('91'));
		if (!valid) {
			error = 'Please enter a valid 10-digit Indian mobile number.';
			return;
		}
		const booking: Booking = {
			ref: 'BRB-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
			serviceId,
			barberId,
			date,
			time,
			name: cleanName
		};
		confirmed = booking;
		savedBookings = [booking, ...savedBookings].slice(0, 5);
		try {
			localStorage.setItem(KEY, JSON.stringify(savedBookings));
		} catch {
			// booking still confirmed on screen
		}
	}

	function resetAll() {
		step = 1;
		serviceId = '';
		barberId = '';
		date = '';
		time = '';
		name = '';
		phone = '';
		notes = '';
		error = '';
		confirmed = null;
	}

	const steps = ['Service', 'Barber', 'Date & time', 'Details'];
	const upcoming = $derived(savedBookings.filter((b) => !isPast(b.date)));
</script>

<PageHead
	title="Book an Appointment — Barber | Bandra West, Mumbai"
	description="Book a haircut, fade, shave or beard trim in two minutes. Pick your service, your barber and a time — no advance payment, reschedule free up to 2 hours before."
	path="/book"
/>

<div class="bg-ink py-16 text-white sm:py-20">
	<div class="mx-auto max-w-6xl px-5">
		<p class="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Book Appointment</p>
		<h1 class="mt-3 font-display text-4xl font-bold sm:text-5xl">Reserve Your Chair</h1>
		<p class="mt-4 max-w-2xl leading-relaxed text-white/70">
			Service, barber, date and time — done in about two minutes. We call you back to
			confirm, and you pay at the shop. No advance needed.
		</p>
		<nav class="mt-6 text-xs text-white/50" aria-label="Breadcrumb">
			<a href="/" class="hover:text-white">Home</a> <span aria-hidden="true">/</span> Book
		</nav>
	</div>
</div>

<div class="mx-auto max-w-4xl px-5 py-12 sm:py-16">
	{#if confirmed}
		<div class="border border-neutral-200 bg-white p-6 text-center sm:p-10" role="status">
			<span
				class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white"
			>
				<Check class="h-8 w-8" />
			</span>
			<h2 class="mt-5 font-display text-3xl font-bold text-ink">You’re booked in!</h2>
			<p class="mt-2 text-sm text-neutral-500">
				Booking reference <span class="font-bold text-ink">{confirmed.ref}</span> — show this
				at the shop.
			</p>

			<div class="mx-auto mt-8 max-w-md border border-neutral-200 bg-mist p-6 text-left">
				<dl class="space-y-3 text-sm">
					<div class="flex justify-between gap-4">
						<dt class="text-neutral-500">Service</dt>
						<dd class="font-bold text-ink">
							{service?.title} · {service ? inr(service.price) : ''} · {service?.duration}
						</dd>
					</div>
					<div class="flex justify-between gap-4">
						<dt class="text-neutral-500">Barber</dt>
						<dd class="font-bold text-ink">
							{confirmed.barberId === 'any' ? 'First available' : (barber?.name ?? '—')}
						</dd>
					</div>
					<div class="flex justify-between gap-4">
						<dt class="text-neutral-500">When</dt>
						<dd class="text-right font-bold text-ink">
							{fmtDate(confirmed.date)}<br />{confirmed.time}
						</dd>
					</div>
					<div class="flex justify-between gap-4">
						<dt class="text-neutral-500">Name</dt>
						<dd class="font-bold text-ink">{confirmed.name}</dd>
					</div>
				</dl>
			</div>

			<p class="mx-auto mt-6 max-w-md text-sm leading-relaxed text-neutral-500">
				We will call you to confirm. Running late or need to move it? Call
				<a href={site.phoneHref} class="font-semibold text-ink">{site.phone}</a>
				— rescheduling is free up to 2 hours before your slot.
			</p>

			<div class="mt-8 flex flex-wrap justify-center gap-3">
				<a
					href={googleCal(confirmed)}
					target="_blank"
					rel="noopener noreferrer"
					class="btn-hard inline-flex items-center gap-2 border border-ink bg-ink px-6 py-3 text-xs font-bold tracking-[0.2em] text-white"
				>
					<CalendarCheck class="h-4 w-4" /> ADD TO GOOGLE CALENDAR
				</a>
				<button
					type="button"
					class="btn-hard inline-flex items-center gap-2 border border-ink bg-white px-6 py-3 text-xs font-bold tracking-[0.2em] text-ink"
					onclick={() => downloadIcs(confirmed!)}
				>
					<Download class="h-4 w-4" /> DOWNLOAD .ICS
				</button>
			</div>
			<button
				type="button"
				class="mt-6 text-sm font-bold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-text"
				onclick={resetAll}
			>
				Book another appointment
			</button>
		</div>
	{:else}
		<!-- Progress -->
		<ol class="flex items-center gap-2 sm:gap-3" aria-label="Booking progress">
			{#each steps as label, i}
				<li class="flex flex-1 items-center gap-2">
					<span
						class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold {step > i + 1
							? 'bg-accent text-white'
							: step === i + 1
								? 'bg-ink text-white'
								: 'bg-neutral-200 text-neutral-500'}"
						aria-current={step === i + 1 ? 'step' : undefined}
					>
						{step > i + 1 ? '✓' : i + 1}
					</span>
					<span class="hidden text-xs font-bold sm:block {step === i + 1 ? 'text-ink' : 'text-neutral-400'}">
						{label}
					</span>
					{#if i < steps.length - 1}
						<span class="h-px flex-1 bg-neutral-200" aria-hidden="true"></span>
					{/if}
				</li>
			{/each}
		</ol>

		<p class="mt-6 text-sm text-red-700" role="alert" aria-live="polite">{error}</p>

		<!-- Step 1: service -->
		{#if step === 1}
			<h2 bind:this={stepHeading} tabindex="-1" class="mt-2 font-display text-2xl font-bold text-ink">
				1 · Pick a service
			</h2>
			<div class="mt-6 grid gap-4 sm:grid-cols-2">
				{#each services as s}
					<button
						type="button"
						class="flex items-start gap-4 border bg-white p-4 text-left transition-colors {serviceId === s.id
							? 'border-ink ring-2 ring-ink'
							: 'border-neutral-200 hover:border-ink'}"
						aria-pressed={serviceId === s.id}
						onclick={() => {
							serviceId = s.id;
							error = '';
						}}
					>
						<Picture
							name={s.image}
							alt=""
							widths={[480]}
							sizes="96px"
							cls="block h-20 w-20 shrink-0 overflow-hidden"
						/>
						<span>
							<span class="block font-display text-lg font-bold text-ink">{s.title}</span>
							<span class="mt-0.5 block text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">
								{inr(s.price)} · {s.duration}
							</span>
							<span class="mt-1.5 block text-sm leading-relaxed text-neutral-500">{s.description}</span>
						</span>
					</button>
				{/each}
			</div>
		{/if}

		<!-- Step 2: barber -->
		{#if step === 2}
			<h2 bind:this={stepHeading} tabindex="-1" class="mt-2 font-display text-2xl font-bold text-ink">
				2 · Pick your barber
			</h2>
			<div class="mt-6 grid gap-4 sm:grid-cols-2">
				<button
					type="button"
					class="flex items-center gap-4 border bg-white p-4 text-left transition-colors {barberId === 'any'
						? 'border-ink ring-2 ring-ink'
						: 'border-neutral-200 hover:border-ink'}"
					aria-pressed={barberId === 'any'}
					onclick={() => {
						barberId = 'any';
						error = '';
					}}
				>
					<span class="flex h-20 w-20 shrink-0 items-center justify-center bg-mist font-display text-2xl font-bold text-ink">?</span>
					<span>
						<span class="block font-display text-lg font-bold text-ink">Any available</span>
						<span class="mt-1 block text-sm leading-relaxed text-neutral-500">
							First free chair at your time — we match you to the right barber for your cut.
						</span>
					</span>
				</button>
				{#each barbers as b}
					<button
						type="button"
						class="flex items-start gap-4 border bg-white p-4 text-left transition-colors {barberId === b.id
							? 'border-ink ring-2 ring-ink'
							: 'border-neutral-200 hover:border-ink'}"
						aria-pressed={barberId === b.id}
						onclick={() => {
							barberId = b.id;
							error = '';
						}}
					>
						<Picture
							name={b.image}
							alt=""
							widths={[480]}
							sizes="96px"
							cls="block h-20 w-20 shrink-0 overflow-hidden"
						/>
						<span>
							<span class="block font-display text-lg font-bold text-ink">{b.name}</span>
							<span class="mt-0.5 block text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">
								{b.role} · ★ {b.rating.toFixed(1)}
							</span>
							<span class="mt-1 block text-sm leading-relaxed text-neutral-500">
								{b.specialties.join(' · ')} — off {b.daysOff}
							</span>
						</span>
					</button>
				{/each}
			</div>
		{/if}

		<!-- Step 3: date & time -->
		{#if step === 3}
			<h2 bind:this={stepHeading} tabindex="-1" class="mt-2 font-display text-2xl font-bold text-ink">
				3 · Pick a date & time
			</h2>
			<div class="mt-6 border border-neutral-200 bg-white p-6">
				<label for="book-date" class="block text-sm font-bold text-ink">Date</label>
				<input
					id="book-date"
					type="date"
					bind:this={dateInput}
					bind:value={date}
					onchange={() => {
						time = '';
						error = '';
					}}
					class="mt-2 w-full max-w-xs border border-neutral-300 px-4 py-3 text-base"
					aria-describedby="date-hint"
				/>
				<p id="date-hint" class="mt-2 text-xs leading-relaxed text-neutral-400">
					Monday to Saturday, 9:00 AM – 9:00 PM. We are closed on Sundays.
				</p>
				{#if date && !isPast(date) && !isSunday(date)}
					<fieldset class="mt-6">
						<legend class="text-sm font-bold text-ink">Time slots — {fmtDate(date)}</legend>
						<div class="mt-3 flex flex-wrap gap-2">
							{#each SLOTS as slot}
								{@const taken = slotTaken(date, slot)}
								<button
									type="button"
									disabled={taken}
									class="min-h-11 border px-4 py-2.5 text-sm font-semibold {time === slot
										? 'border-ink bg-ink text-white'
										: taken
											? 'cursor-not-allowed border-neutral-100 bg-neutral-50 text-neutral-300 line-through'
											: 'border-neutral-300 text-ink hover:border-ink'}"
									aria-pressed={time === slot}
									aria-label={taken ? `${slot} — already booked` : slot}
									onclick={() => {
										time = slot;
										error = '';
									}}
								>
									{slot}
								</button>
							{/each}
						</div>
						<p class="mt-3 text-xs text-neutral-400">
							Struck-through slots are already booked. Same-day slots show up to 30 minutes
							before the hour.
						</p>
					</fieldset>
				{/if}
			</div>
		{/if}

		<!-- Step 4: details -->
		{#if step === 4}
			<h2 bind:this={stepHeading} tabindex="-1" class="mt-2 font-display text-2xl font-bold text-ink">
				4 · Your details
			</h2>
			<div class="mt-6 border border-neutral-200 bg-white p-6">
				<div class="mb-6 bg-mist p-4 text-sm leading-relaxed">
					<p><span class="font-bold text-ink">{service?.title}</span> · {service ? inr(service.price) : ''} · {service?.duration}</p>
					<p class="mt-1">
						{barberId === 'any' ? 'First available barber' : barber?.name} · {date ? fmtDate(date) : ''} · {time}
					</p>
				</div>
				<div class="grid gap-5 sm:grid-cols-2">
					<div>
						<label for="book-name" class="block text-sm font-bold text-ink">Your name</label>
						<input
							id="book-name"
							type="text"
							bind:value={name}
							autocomplete="name"
							placeholder="e.g. Rahul Kapoor"
							class="mt-2 w-full border border-neutral-300 px-4 py-3 text-base"
						/>
					</div>
					<div>
						<label for="book-phone" class="block text-sm font-bold text-ink">Mobile number</label>
						<input
							id="book-phone"
							type="tel"
							bind:value={phone}
							autocomplete="tel"
							inputmode="tel"
							placeholder="98765 43210"
							class="mt-2 w-full border border-neutral-300 px-4 py-3 text-base"
						/>
						<p class="mt-1.5 text-xs text-neutral-400">We call only to confirm your booking.</p>
					</div>
				</div>
				<div class="mt-5">
					<label for="book-notes" class="block text-sm font-bold text-ink">
						Anything we should know? <span class="font-normal text-neutral-400">(optional)</span>
					</label>
					<textarea
						id="book-notes"
						bind:value={notes}
						rows="3"
						placeholder="e.g. First time — please keep it simple, I have a cowlick on the left."
						class="mt-2 w-full border border-neutral-300 px-4 py-3 text-base"
					></textarea>
				</div>
				<p class="mt-5 text-xs leading-relaxed text-neutral-400">
					No payment needed now — pay at the shop by UPI, card or cash. Reschedule free up
					to 2 hours before your slot.
				</p>
			</div>
		{/if}

		<!-- Nav buttons -->
		<div class="mt-8 flex flex-wrap items-center gap-3">
			{#if step > 1}
				<button
					type="button"
					class="btn-hard inline-flex min-h-12 items-center gap-2 border border-ink bg-white px-6 py-3 text-xs font-bold tracking-[0.2em] text-ink"
					onclick={back}
				>
					<ChevronLeft class="h-4 w-4" /> BACK
				</button>
			{/if}
			{#if step < 4}
				<button
					type="button"
					class="btn-hard inline-block min-h-12 border border-ink bg-ink px-8 py-3 text-xs font-bold tracking-[0.2em] text-white"
					onclick={next}
				>
					CONTINUE
				</button>
			{:else}
				<button
					type="button"
					class="btn-hard inline-block min-h-12 border border-ink bg-ink px-8 py-3 text-xs font-bold tracking-[0.2em] text-white"
					onclick={confirm}
				>
					CONFIRM BOOKING
				</button>
			{/if}
			<a
				href={site.phoneHref}
				class="ml-auto inline-flex min-h-12 items-center gap-2 text-sm font-bold text-ink hover:text-accent-text"
			>
				<Phone class="h-4 w-4" /> Prefer to call? {site.phone}
			</a>
		</div>
	{/if}

	<!-- My bookings -->
	{#if upcoming.length > 0 && !confirmed}
		<section class="mt-14 border border-neutral-200 bg-white p-6" aria-labelledby="my-bookings">
			<h2 id="my-bookings" class="font-display text-xl font-bold text-ink">Your bookings</h2>
			<p class="mt-1 text-sm text-neutral-500">Saved on this device — show the reference at the shop.</p>
			<ul class="mt-5 space-y-3">
				{#each upcoming as b}
					{@const s = services.find((x) => x.id === b.serviceId)}
					{@const bb = barbers.find((x) => x.id === b.barberId)}
					<li class="flex flex-wrap items-center justify-between gap-3 border border-neutral-100 bg-mist p-4 text-sm">
						<span>
							<span class="font-bold text-ink">{s?.title ?? 'Haircut'}</span> · {fmtDate(b.date)} · {b.time}<br />
							<span class="text-neutral-500">
								{b.barberId === 'any' ? 'First available' : (bb?.name ?? '')} · Ref {b.ref}
							</span>
						</span>
						<button
							type="button"
							class="border border-ink bg-white px-4 py-2.5 text-xs font-bold tracking-[0.15em] text-ink hover:bg-ink hover:text-white"
							onclick={() => {
								serviceId = b.serviceId;
								barberId = b.barberId;
								date = '';
								time = '';
								step = 3;
								window.scrollTo({ top: 0, behavior: 'smooth' });
							}}
						>
							BOOK AGAIN
						</button>
					</li>
				{/each}
			</ul>
		</section>
	{/if}
</div>
