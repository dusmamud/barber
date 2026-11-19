<script lang="ts">
	import Picture from '#lib/components/Picture.svelte';
	import ServiceIcon from '#lib/components/ServiceIcon.svelte';
	import { aboutPoints, navLinks, news, products, services, site } from '#lib/data/site.js';
	import { Check, Clock, Mail, MapPin, Menu, Phone, Play, ShoppingBag, X } from 'lucide-svelte';

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Barbershop',
		name: site.name,
		description: site.tagline,
		telephone: site.phone,
		email: site.email,
		address: site.address,
		openingHours: 'Mo-Sa 09:00-21:00',
		priceRange: '$12 - $70'
	};

	let menuOpen = $state(false);
	let cart = $state<string[]>([]);
	let showVideo = $state(false);
	let booked = $state(false);

	let name = $state('');
	let phone = $state('');
	let serviceId = $state(services[0].id);
	let date = $state('');
	let time = $state('10:00 AM');
	let errors = $state<{ name?: string; phone?: string; date?: string }>({});

	const today = new Date().toISOString().split('T')[0];
	const times = [
		'9:00 AM',
		'10:00 AM',
		'11:00 AM',
		'12:00 PM',
		'2:00 PM',
		'3:00 PM',
		'4:00 PM',
		'5:00 PM',
		'6:00 PM',
		'7:00 PM',
		'8:00 PM'
	] as const;

	const cartCount = $derived(cart.length);
	const selectedService = $derived(services.find((s) => s.id === serviceId) ?? services[0]);

	function toggleCart(id: string) {
		cart = cart.includes(id) ? cart.filter((c) => c !== id) : [...cart, id];
	}

	function submitBooking(event: SubmitEvent) {
		event.preventDefault();
		const next: typeof errors = {};
		if (name.trim().length < 2) next.name = 'Please enter your name.';
		if (phone.replace(/\D/g, '').length < 10) next.phone = 'Please enter a valid phone number.';
		if (!date) next.date = 'Please pick a date.';
		errors = next;
		booked = Object.keys(next).length === 0;
	}

	function resetBooking() {
		booked = false;
		name = '';
		phone = '';
		date = '';
	}
</script>

<svelte:head>
	<title>Barber — Real Cuts By Real Professionals</title>
	<meta
		name="description"
		content="Real cuts by real professionals. Haircuts, shaving, beard trimming and moustache styling — plus beard care products, in a classic barbershop."
	/>
	<meta property="og:title" content="Barber — Real Cuts By Real Professionals" />
	<meta
		property="og:description"
		content="So fresh and so clean. Book an appointment with a real professional."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:image" content="/images/hero-barber-1200.jpg" />
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<!-- Header -->
<header class="sticky top-0 z-50 border-b border-neutral-100 bg-white/95 backdrop-blur">
	<div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20">
		<a href="#home" class="flex items-center gap-2" aria-label="Barber — home">
			<span class="flex h-9 w-9 items-center justify-center bg-accent text-white">
				<ServiceIcon icon="scissors-logo" cls="h-5 w-5" />
			</span>
			<span class="font-display text-2xl font-bold tracking-wide">BARBER</span>
		</a>

		<nav class="hidden items-center gap-8 lg:flex" aria-label="Primary">
			{#each navLinks as link, i}
				<a
					href={link.href}
					class="py-2 text-sm font-medium transition-colors {i === 0
						? 'border-b-2 border-accent text-ink'
						: 'text-neutral-500 hover:text-ink'}"
					aria-current={i === 0 ? 'page' : undefined}
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<div class="flex items-center gap-2 sm:gap-3">
			<a
				href="#products"
				class="relative flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-accent"
				aria-label="Cart, {cartCount} item{cartCount === 1 ? '' : 's'}"
			>
				<ShoppingBag class="h-5 w-5" />
				{#if cartCount > 0}
					<span
						class="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-white"
					>
						{cartCount}
					</span>
				{/if}
			</a>
			<button
				type="button"
				class="flex h-11 w-11 items-center justify-center text-ink lg:hidden"
				aria-expanded={menuOpen}
				aria-label={menuOpen ? 'Close menu' : 'Open menu'}
				onclick={() => (menuOpen = !menuOpen)}
			>
				{#if menuOpen}<X class="h-6 w-6" />{:else}<Menu class="h-6 w-6" />{/if}
			</button>
		</div>
	</div>

	{#if menuOpen}
		<nav class="border-t border-neutral-100 bg-white px-5 py-3 lg:hidden" aria-label="Mobile">
			{#each navLinks as link}
				<a
					href={link.href}
					class="block py-3 text-base font-medium text-neutral-700 hover:text-ink"
					onclick={() => (menuOpen = false)}
				>
					{link.label}
				</a>
			{/each}
		</nav>
	{/if}
</header>

<main>
	<!-- Hero -->
	<section id="home" class="bg-white" aria-labelledby="hero-heading">
		<div class="mx-auto grid max-w-6xl gap-10 px-5 py-10 sm:py-14 lg:grid-cols-2 lg:gap-14 lg:py-16">
			<Picture
				name="hero-barber"
				alt="Bearded barber in a hat trimming a seated client’s hair in a classic barbershop"
				widths={[480, 800, 1200]}
				sizes="(max-width: 1024px) 100vw, 50vw"
				eager
				cls="block aspect-[4/5] w-full overflow-hidden"
			/>

			<div class="relative flex flex-col items-start justify-center">
				<div class="absolute -top-2 right-0 hidden h-24 w-24 sm:block" aria-hidden="true">
					<svg viewBox="0 0 100 100" class="spin-slow h-24 w-24 text-accent">
						<defs>
							<path
								id="stamp-circle"
								d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
							/>
						</defs>
						<text font-size="10" letter-spacing="2.5" fill="currentColor">
							<textPath href="#stamp-circle">REAL CUTS • BARBER SHOP • EST. 2010 •</textPath>
						</text>
					</svg>
					<span class="absolute inset-0 flex items-center justify-center text-accent">
						<ServiceIcon icon="scissors-logo" cls="h-7 w-7" />
					</span>
				</div>

				<p class="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
					So Fresh And So Clean
				</p>
				<h1
					id="hero-heading"
					class="mt-4 font-display text-5xl font-bold leading-[1.05] text-ink sm:text-6xl"
				>
					Real Cuts By Real Professionals
				</h1>
				<p class="mt-6 max-w-md text-base leading-relaxed text-neutral-500">
					Sed a magna semper porta purus eu ullamcorper ligula. Nam sit amet consectetur
					sapien etiam dui ipsum venenatis turpis at dignissim.
				</p>
				<a
					href="#booking"
					class="btn-hard mt-8 inline-block border border-ink bg-white px-8 py-3.5 text-xs font-bold tracking-[0.2em] text-ink"
				>
					BOOK APPOINTMENT
				</a>
				<p class="mt-6 flex items-center gap-2 text-sm text-neutral-500">
					<Phone class="h-4 w-4 text-accent" />
					Or call us at
					<a href="tel:+919876543210" class="font-semibold text-ink hover:text-accent">
						{site.phone}
					</a>
				</p>
			</div>
		</div>
	</section>

	<!-- Services -->
	<section id="services" class="bg-ink py-16 text-white sm:py-20" aria-labelledby="services-heading">
		<div class="mx-auto max-w-6xl px-5">
			<div class="flex flex-wrap items-end justify-between gap-6">
				<div>
					<p class="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Our Handling</p>
					<h2 id="services-heading" class="mt-3 font-display text-4xl font-bold sm:text-5xl">
						Our Services
					</h2>
				</div>
				<a
					href="#booking"
					class="btn-hard-light inline-block border border-white/50 px-6 py-3 text-xs font-bold tracking-[0.2em] text-white"
				>
					EXPLORE MORE
				</a>
			</div>

			<div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{#each services as service}
					<article class="bg-white text-ink transition-transform duration-200 hover:-translate-y-1">
						<div class="relative">
							<Picture
								name={service.image}
								alt={service.alt}
								widths={[480, 800]}
								sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
								cls="block aspect-[4/3] w-full overflow-hidden"
							/>
							<span
								class="absolute -bottom-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center bg-accent text-white"
							>
								<ServiceIcon icon={service.icon} cls="h-7 w-7" />
							</span>
						</div>
						<div class="px-5 pb-8 pt-12 text-center">
							<h3 class="font-display text-xl font-bold">{service.title}</h3>
							<p class="mt-2 text-sm leading-relaxed text-neutral-500">{service.description}</p>
							<p class="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
								{service.price} · {service.duration}
							</p>
						</div>
					</article>
				{/each}
			</div>

			<div class="mt-16 h-px bg-white/10" aria-hidden="true"></div>

			<!-- Products -->
			<div id="products" class="scroll-mt-24 pt-14" aria-labelledby="products-heading">
				<div class="flex flex-wrap items-end justify-between gap-6">
					<div>
						<p class="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Our Shop</p>
						<h2 id="products-heading" class="mt-3 font-display text-4xl font-bold sm:text-5xl">
							Check Our Products
						</h2>
					</div>
					<a
						href="#booking"
						class="btn-hard-light inline-block border border-white/50 px-6 py-3 text-xs font-bold tracking-[0.2em] text-white"
					>
						MORE PRODUCTS
					</a>
				</div>

				<div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{#each products as product}
						<article>
							<div class="relative">
								<Picture
									name={product.image}
									alt={product.alt}
									widths={[480, 800]}
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
									cls="block aspect-[4/3] w-full overflow-hidden"
								/>
								<span
									class="absolute left-3 top-3 bg-accent px-2 py-1 text-[10px] font-bold tracking-[0.2em] text-white"
								>
									SALE
								</span>
							</div>
							<h3 class="mt-4 font-display text-lg font-bold">{product.name}</h3>
							<p class="mt-1 text-sm">
								<span class="font-semibold text-white">{product.price}</span>
								<span class="ml-2 text-neutral-500 line-through">{product.oldPrice}</span>
							</p>
							<button
								type="button"
								class="btn-hard-light mt-4 border px-5 py-2.5 text-[11px] font-bold tracking-[0.2em] {cart.includes(
									product.id
								)
									? 'border-accent bg-accent text-white'
									: 'border-white/50 text-white hover:border-white'}"
								aria-pressed={cart.includes(product.id)}
								onclick={() => toggleCart(product.id)}
							>
								{cart.includes(product.id) ? 'ADDED TO CART' : 'ADD TO CART'}
							</button>
						</article>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- About / film -->
	<section id="about" class="scroll-mt-24 bg-white py-16 sm:py-20" aria-labelledby="about-heading">
		<div class="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
			<div class="relative mx-auto w-full max-w-md lg:mx-0">
				{#if showVideo}
					<div
						class="flex aspect-[4/5] w-full flex-col items-center justify-center bg-ink px-8 text-center text-white"
					>
						<Play class="h-10 w-10 text-accent" />
						<p class="mt-4 font-display text-2xl font-bold">Barbershop film</p>
						<p class="mt-2 text-sm leading-relaxed text-white/70">
							Mock preview — the real film plays here once the client approves it.
						</p>
						<button
							type="button"
							class="mt-6 border border-white/50 px-5 py-2.5 text-xs font-bold tracking-[0.2em] hover:border-white"
							onclick={() => (showVideo = false)}
						>
							CLOSE PREVIEW
						</button>
					</div>
				{:else}
					<Picture
						name="about-video"
						alt="Barber’s hands cutting a client’s hair with scissors, face in profile"
						widths={[480, 800, 1200]}
						sizes="(max-width: 1024px) 100vw, 50vw"
						cls="block aspect-[4/5] w-full overflow-hidden"
					/>
					<button
						type="button"
						class="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-ink shadow-lg transition-transform hover:scale-105"
						aria-label="Play barbershop film preview"
						onclick={() => (showVideo = true)}
					>
						<Play class="ml-1 h-6 w-6 fill-current" />
					</button>
				{/if}
			</div>

			<div>
				<p class="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Modern Haircut</p>
				<h2 id="about-heading" class="mt-4 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
					Phasellus Dignissim Tellus Pellentesque
				</h2>
				<p class="mt-6 leading-relaxed text-neutral-500">
					Sed a magna semper porta purus eu ullamcorper ligula. Nam sit amet consectetur
					sapien etiam dui ipsum venenatis turpis at dignissim. Every chair, every cut,
					every finish — done by hand, done properly.
				</p>
				<ul class="mt-6 space-y-3">
					{#each aboutPoints as point}
						<li class="flex items-start gap-3 text-sm font-medium text-ink">
							<Check class="mt-0.5 h-5 w-5 shrink-0 text-accent" />
							{point}
						</li>
					{/each}
				</ul>
				<div class="mt-8 flex flex-wrap items-center gap-6">
					<a
						href="#booking"
						class="btn-hard inline-block border border-ink bg-white px-8 py-3.5 text-xs font-bold tracking-[0.2em] text-ink"
					>
						BOOK APPOINTMENT
					</a>
					<a href="#services" class="text-sm font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">
						Explore services
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- News -->
	<section id="news" class="scroll-mt-24 bg-mist py-16" aria-labelledby="news-heading">
		<div class="mx-auto max-w-6xl px-5">
			<p class="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Latest News</p>
			<h2 id="news-heading" class="mt-3 font-display text-4xl font-bold text-ink">From The Chair</h2>
			<div class="mt-10 grid gap-5 md:grid-cols-3">
				{#each news as item}
					<article class="border border-neutral-200 bg-white p-6">
						<p class="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{item.date}</p>
						<h3 class="mt-3 font-display text-xl font-bold leading-snug text-ink">{item.title}</h3>
						<p class="mt-2 text-sm leading-relaxed text-neutral-500">{item.excerpt}</p>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- Booking -->
	<section id="booking" class="scroll-mt-24 bg-ink py-16 text-white sm:py-20" aria-labelledby="booking-heading">
		<div class="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-5">
			<div class="lg:col-span-2">
				<p class="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Book Appointment</p>
				<h2 id="booking-heading" class="mt-4 font-display text-4xl font-bold sm:text-5xl">
					Reserve Your Chair
				</h2>
				<p class="mt-5 leading-relaxed text-white/70">
					Pick a service, a day and a time — we will call you back to confirm. No payment
					needed to book; this is a mock form, nothing is charged.
				</p>
				<ul class="mt-8 space-y-4 text-sm">
					<li class="flex items-center gap-3">
						<Phone class="h-5 w-5 shrink-0 text-accent" />
						<a href="tel:+919876543210" class="hover:text-accent">{site.phone}</a>
					</li>
					<li class="flex items-center gap-3">
						<Mail class="h-5 w-5 shrink-0 text-accent" />
						<a href="mailto:hello@barber.shop" class="hover:text-accent">{site.email}</a>
					</li>
					<li class="flex items-start gap-3">
						<MapPin class="mt-0.5 h-5 w-5 shrink-0 text-accent" />
						<span>{site.address}</span>
					</li>
					<li class="flex items-center gap-3">
						<Clock class="h-5 w-5 shrink-0 text-accent" />
						<span>{site.hours}</span>
					</li>
				</ul>
			</div>

			<div class="bg-white p-6 text-ink sm:p-8 lg:col-span-3">
				{#if booked}
					<div class="flex min-h-80 flex-col items-start justify-center">
						<span class="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white">
							<Check class="h-7 w-7" />
						</span>
						<h3 class="mt-5 font-display text-3xl font-bold">You’re booked in, {name.trim()}!</h3>
						<p class="mt-3 leading-relaxed text-neutral-500">
							{selectedService.title} — {selectedService.price} · {selectedService.duration} —
							on {date} at {time}. We will call {phone} to confirm your appointment.
						</p>
						<button
							type="button"
							class="btn-hard mt-7 border border-ink bg-white px-6 py-3 text-xs font-bold tracking-[0.2em]"
							onclick={resetBooking}
						>
							BOOK ANOTHER
						</button>
					</div>
				{:else}
					<form onsubmit={submitBooking} novalidate>
						<div class="grid gap-5 sm:grid-cols-2">
							<div>
								<label for="booking-name" class="mb-2 block text-sm font-semibold">Your name</label>
								<input
									id="booking-name"
									type="text"
									autocomplete="name"
									placeholder="Arjun Sharma"
									bind:value={name}
									class="w-full border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-accent"
								/>
								{#if errors.name}<p class="mt-1 text-xs font-medium text-red-600">{errors.name}</p>{/if}
							</div>
							<div>
								<label for="booking-phone" class="mb-2 block text-sm font-semibold">Phone</label>
								<input
									id="booking-phone"
									type="tel"
									autocomplete="tel"
									placeholder="+91 98765 43210"
									bind:value={phone}
									class="w-full border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-accent"
								/>
								{#if errors.phone}<p class="mt-1 text-xs font-medium text-red-600">{errors.phone}</p>{/if}
							</div>
							<div>
								<label for="booking-service" class="mb-2 block text-sm font-semibold">Service</label>
								<select
									id="booking-service"
									bind:value={serviceId}
									class="w-full border border-neutral-300 bg-white px-4 py-3 text-sm outline-none focus:border-accent"
								>
									{#each services as service}
										<option value={service.id}>
											{service.title} — {service.price} · {service.duration}
										</option>
									{/each}
								</select>
							</div>
							<div>
								<label for="booking-date" class="mb-2 block text-sm font-semibold">Date</label>
								<input
									id="booking-date"
									type="date"
									min={today}
									bind:value={date}
									class="w-full border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-accent"
								/>
								{#if errors.date}<p class="mt-1 text-xs font-medium text-red-600">{errors.date}</p>{/if}
							</div>
							<div class="sm:col-span-2">
								<label for="booking-time" class="mb-2 block text-sm font-semibold">Time</label>
								<select
									id="booking-time"
									bind:value={time}
									class="w-full border border-neutral-300 bg-white px-4 py-3 text-sm outline-none focus:border-accent"
								>
									{#each times as slot}
										<option value={slot}>{slot}</option>
									{/each}
								</select>
							</div>
						</div>
						<button
							type="submit"
							class="btn-hard mt-7 w-full border border-ink bg-ink px-8 py-3.5 text-xs font-bold tracking-[0.2em] text-white sm:w-auto"
						>
							CONFIRM BOOKING
						</button>
					</form>
				{/if}
			</div>
		</div>
	</section>
</main>

<!-- Footer -->
<footer id="contact" class="scroll-mt-24 bg-[#0c0c0d] pt-16 text-white" aria-label="Footer">
	<div class="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2 lg:grid-cols-4">
		<div>
			<a href="#home" class="flex items-center gap-2" aria-label="Barber — back to top">
				<span class="flex h-9 w-9 items-center justify-center bg-accent text-white">
					<ServiceIcon icon="scissors-logo" cls="h-5 w-5" />
				</span>
				<span class="font-display text-2xl font-bold tracking-wide">BARBER</span>
			</a>
			<p class="mt-4 text-sm leading-relaxed text-white/60">
				Real cuts by real professionals. A classic barbershop — fresh, clean, and sharp,
				every single time.
			</p>
			<div class="mt-5 flex gap-3">
				<a
					href="https://www.facebook.com"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Barber on Facebook"
					class="flex h-11 w-11 items-center justify-center border border-white/20 text-white/80 hover:border-accent hover:text-accent"
				>
					<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
				</a>
				<a
					href="https://www.instagram.com"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Barber on Instagram"
					class="flex h-11 w-11 items-center justify-center border border-white/20 text-white/80 hover:border-accent hover:text-accent"
				>
					<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
				</a>
				<a
					href="https://www.x.com"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Barber on X"
					class="flex h-11 w-11 items-center justify-center border border-white/20 text-white/80 hover:border-accent hover:text-accent"
				>
					<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
				</a>
			</div>
		</div>

		<nav aria-label="Footer">
			<h3 class="font-display text-lg font-bold">Quick Links</h3>
			<ul class="mt-4 space-y-2.5 text-sm text-white/60">
				{#each navLinks as link}
					<li><a href={link.href} class="hover:text-accent">{link.label}</a></li>
				{/each}
			</ul>
		</nav>

		<div>
			<h3 class="font-display text-lg font-bold">Services</h3>
			<ul class="mt-4 space-y-2.5 text-sm text-white/60">
				{#each services as service}
					<li>
						<a href="#services" class="hover:text-accent">
							{service.title} — {service.price}
						</a>
					</li>
				{/each}
			</ul>
		</div>

		<div>
			<h3 class="font-display text-lg font-bold">Contact</h3>
			<ul class="mt-4 space-y-3 text-sm text-white/60">
				<li class="flex items-start gap-3">
					<MapPin class="mt-0.5 h-4 w-4 shrink-0 text-accent" />
					<span>{site.address}</span>
				</li>
				<li class="flex items-center gap-3">
					<Phone class="h-4 w-4 shrink-0 text-accent" />
					<a href="tel:+919876543210" class="hover:text-accent">{site.phone}</a>
				</li>
				<li class="flex items-center gap-3">
					<Mail class="h-4 w-4 shrink-0 text-accent" />
					<a href="mailto:hello@barber.shop" class="hover:text-accent">{site.email}</a>
				</li>
				<li class="flex items-center gap-3">
					<Clock class="h-4 w-4 shrink-0 text-accent" />
					<span>{site.hours}</span>
				</li>
			</ul>
		</div>
	</div>

	<div class="mx-auto mt-12 max-w-6xl px-5">
		<div class="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/50">
			<p>© 2026 Barber. All rights reserved.</p>
			<p>Mock website — demo content only.</p>
		</div>
	</div>
</footer>
