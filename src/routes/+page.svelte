<script lang="ts">
	import { motion } from '@humanspeak/svelte-motion';
	import Picture from '#lib/components/Picture.svelte';
	import ServiceIcon from '#lib/components/ServiceIcon.svelte';
	import TestimonialCarousel from '#lib/components/TestimonialCarousel.svelte';
	import { barbers, blogPosts, faqs, gallery, inr, products, services, site, testimonials } from '#lib/data/site.js';
	import { openNow, reveal } from '#lib/motion.js';
	import { cart } from '#lib/stores/cart.svelte.js';
	import {
		ArrowRight,
		CalendarCheck,
		Check,
		Clock,
		Mail,
		MapPin,
		MessageCircle,
		Phone,
		Star
	} from 'lucide-svelte';
	import { onMount } from 'svelte';

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Barbershop',
		name: site.name,
		description: site.tagline,
		url: site.url,
		image: `${site.url}/images/hero-barber-1200.jpg`,
		telephone: site.phone,
		email: site.email,
		priceRange: '₹199 - ₹2,499',
		address: {
			'@type': 'PostalAddress',
			streetAddress: 'Shop 12, Linking Road, Bandra West',
			addressLocality: 'Mumbai',
			postalCode: '400050',
			addressCountry: 'IN'
		},
		geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
		hasMap: site.mapsUrl,
		openingHoursSpecification: [
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
				opens: '09:00',
				closes: '21:00'
			}
		],
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: site.rating,
			reviewCount: site.reviewCount
		},
		sameAs: [site.instagram, site.facebook, site.twitter]
	};

	let isOpen = $state<boolean | null>(null);
	onMount(() => {
		isOpen = openNow();
	});

	const featuredServices = ['haircut', 'skin-fade', 'shaving', 'hair-beard-combo']
		.map((id) => services.find((s) => s.id === id)!)
		.filter(Boolean);
	const featuredProducts = products;
</script>

<svelte:head>
	<title>Barber — Real Cuts By Real Professionals | Bandra West, Mumbai</title>
	<meta
		name="description"
		content="Real cuts by real professionals in Bandra West, Mumbai. Haircuts, skin fades, hot towel shaves and beard trims from ₹199. Book online in two minutes — walk-ins welcome."
	/>
	<link rel="canonical" href={site.url + '/'} />
	<meta property="og:title" content="Barber — Real Cuts By Real Professionals" />
	<meta
		property="og:description"
		content="So fresh and so clean. Haircuts, fades and hot towel shaves in Bandra West, Mumbai. Book online."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content={site.url + '/'} />
	<meta property="og:image" content={site.url + '/images/hero-barber-1200.jpg'} />
	<meta property="og:locale" content="en_IN" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Barber — Real Cuts By Real Professionals" />
	<meta
		name="twitter:description"
		content="Haircuts, skin fades and hot towel shaves in Bandra West, Mumbai. Book online in two minutes."
	/>
	<meta name="twitter:image" content={site.url + '/images/hero-barber-1200.jpg'} />
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<!-- Hero -->
<section class="bg-white" aria-labelledby="hero-heading">
	<div class="mx-auto grid max-w-6xl gap-10 px-5 py-10 sm:py-14 lg:grid-cols-2 lg:gap-14 lg:py-16">
		<motion.div
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: 'easeOut' }}
		>
			<Picture
				name="hero-barber"
				alt="Bearded barber in a hat trimming a seated client’s hair in a classic barbershop"
				widths={[480, 800, 1200]}
				sizes="(max-width: 1024px) 100vw, 50vw"
				eager
				cls="block aspect-[4/5] w-full overflow-hidden"
			/>
		</motion.div>

		<motion.div
			class="relative flex flex-col items-start justify-center"
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
		>
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

			<p class="text-xs font-semibold uppercase tracking-[0.25em] text-accent-text">
				So Fresh And So Clean
			</p>
			<h1
				id="hero-heading"
				class="mt-4 font-display text-4xl font-bold leading-[1.05] text-ink sm:text-6xl"
			>
				Real Cuts By Real Professionals
			</h1>
			<p class="mt-6 max-w-md text-base leading-relaxed text-neutral-500">
				Sharp fades, classic cuts and hot towel shaves — done by hand, in the heart of
				Bandra West. No rush, no shortcuts, just a fresh cut every single time.
			</p>

			<div class="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
				<span class="flex items-center gap-1" aria-label="Rated {site.rating} out of 5 stars">
					{#each Array.from({ length: 5 }) as _}
						<Star class="h-4 w-4 fill-accent text-accent" />
					{/each}
				</span>
				<span class="font-semibold text-ink">{site.rating} · {site.reviewCount} reviews</span>
				{#if isOpen !== null}
					<span
						class="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold {isOpen
							? 'bg-green-100 text-green-800'
							: 'bg-neutral-100 text-neutral-600'}"
					>
						<span
							class="h-2 w-2 rounded-full {isOpen ? 'bg-green-600' : 'bg-neutral-400'}"
							aria-hidden="true"
						></span>
						{isOpen ? 'Open now' : 'Closed — opens 9 AM'}
					</span>
				{/if}
			</div>

			<div class="mt-8 flex flex-wrap gap-3">
				<motion.a
					href="/book"
					class="btn-hard inline-block border border-ink bg-ink px-8 py-3.5 text-xs font-bold tracking-[0.2em] text-white"
					whileTap={{ scale: 0.97 }}
				>
					BOOK APPOINTMENT
				</motion.a>
				<a
					href={site.whatsapp}
					target="_blank"
					rel="noopener noreferrer"
					class="btn-hard inline-flex items-center gap-2 border border-ink bg-white px-8 py-3.5 text-xs font-bold tracking-[0.2em] text-ink"
				>
					<MessageCircle class="h-4 w-4" /> WHATSAPP US
				</a>
			</div>
			<p class="mt-6 flex items-center gap-2 text-sm text-neutral-500">
				<Phone class="h-4 w-4 text-accent" />
				Or call us at
				<a href={site.phoneHref} class="font-semibold text-ink hover:text-accent">
					{site.phone}
				</a>
			</p>
		</motion.div>
	</div>
</section>

<!-- Services -->
<section class="bg-ink py-16 text-white sm:py-20" aria-labelledby="services-heading">
	<div class="mx-auto max-w-6xl px-5">
		<div class="flex flex-wrap items-end justify-between gap-6" use:reveal>
			<div>
				<p class="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Our Handling</p>
				<h2 id="services-heading" class="mt-3 font-display text-4xl font-bold sm:text-5xl">
					Our Services
				</h2>
				<p class="mt-3 max-w-lg text-sm leading-relaxed text-white/60">
					Every service includes a consultation, a wash and a styled finish. Prices are
					final — no surprises at the chair.
				</p>
			</div>
			<a
				href="/services"
				class="btn-hard-light inline-block border border-white/50 px-6 py-3 text-xs font-bold tracking-[0.2em] text-white"
			>
				EXPLORE MORE
			</a>
		</div>

		<div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each featuredServices as service}
				<article
					class="bg-white text-ink transition-transform duration-200 hover:-translate-y-1"
					use:reveal
				>
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
							{inr(service.price)} · {service.duration}
						</p>
						<a
							href="/book?service={service.id}"
							class="mt-4 inline-block border-b-2 border-accent pb-0.5 text-xs font-bold tracking-[0.2em] text-ink hover:text-accent-text"
						>
							BOOK THIS
						</a>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- Products -->
<section class="bg-coal py-16 text-white sm:py-20" aria-labelledby="products-heading">
	<div class="mx-auto max-w-6xl px-5">
		<div class="flex flex-wrap items-end justify-between gap-6" use:reveal>
			<div>
				<p class="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Our Shop</p>
				<h2 id="products-heading" class="mt-3 font-display text-4xl font-bold sm:text-5xl">
					Check Our Products
				</h2>
				<p class="mt-3 max-w-lg text-sm leading-relaxed text-white/60">
					The same oils, pomades and tools we use on your hair — to take home.
				</p>
			</div>
			<a
				href="/products"
				class="btn-hard-light inline-block border border-white/50 px-6 py-3 text-xs font-bold tracking-[0.2em] text-white"
			>
				MORE PRODUCTS
			</a>
		</div>

		<div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each featuredProducts as product}
				<article use:reveal>
					<div class="relative">
						<Picture
							name={product.image}
							alt={product.alt}
							widths={[480, 800]}
							sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
							cls="block aspect-[4/3] w-full overflow-hidden"
						/>
						{#if product.badge}
							<span
								class="absolute left-3 top-3 bg-accent-text px-2 py-1 text-xs font-bold tracking-[0.2em] text-white"
							>
								{product.badge}
							</span>
						{/if}
					</div>
					<h3 class="mt-4 font-display text-lg font-bold">{product.name}</h3>
					<p class="mt-1 text-sm leading-relaxed text-white/60">{product.description}</p>
					<p class="mt-2 text-sm">
						<span class="font-semibold text-white">{inr(product.price)}</span>
						{#if product.oldPrice}
							<span class="ml-2 text-neutral-500 line-through">{inr(product.oldPrice)}</span>
						{/if}
					</p>
					<button
						type="button"
						class="btn-hard-light mt-4 border px-5 py-2.5 text-xs font-bold tracking-[0.2em] {cart.has(
							product.id
						)
							? 'border-accent bg-accent text-white'
							: 'border-white/50 text-white hover:border-white'}"
						aria-pressed={cart.has(product.id)}
						onclick={() => {
							if (!cart.has(product.id)) cart.add(product.id);
							cart.open = true;
						}}
					>
						{cart.has(product.id) ? 'IN CART — VIEW' : 'ADD TO CART'}
					</button>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- Barbers preview -->
<section class="bg-white py-16 sm:py-20" aria-labelledby="barbers-heading">
	<div class="mx-auto max-w-6xl px-5">
		<div class="flex flex-wrap items-end justify-between gap-6" use:reveal>
			<div>
				<p class="text-xs font-semibold uppercase tracking-[0.25em] text-accent-text">
					Real Professionals
				</p>
				<h2 id="barbers-heading" class="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">
					Meet Your Barber
				</h2>
				<p class="mt-3 max-w-lg text-sm leading-relaxed text-neutral-500">
					Clients follow a barber, not a shop. Pick your chair — every barber lists their
					specialties and their day off.
				</p>
			</div>
			<a
				href="/barbers"
				class="btn-hard inline-block border border-ink bg-white px-6 py-3 text-xs font-bold tracking-[0.2em] text-ink"
			>
				MEET THE TEAM
			</a>
		</div>

		<div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each barbers as barber}
				<article class="group" use:reveal>
					<a href="/barbers" class="block" aria-label="{barber.name} — {barber.role}">
						<Picture
							name={barber.image}
							alt={barber.alt}
							widths={[480, 800]}
							sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
							cls="block aspect-[4/5] w-full overflow-hidden"
						/>
					</a>
					<h3 class="mt-4 font-display text-xl font-bold text-ink">{barber.name}</h3>
					<p class="text-sm font-semibold text-accent-text">{barber.role}</p>
					<p class="mt-2 flex items-center gap-1.5 text-sm text-neutral-500">
						<Star class="h-4 w-4 fill-accent text-accent" />
						{barber.rating.toFixed(1)} · {barber.cuts.toLocaleString('en-IN')}+ cuts · {barber.experience}
					</p>
					<p class="mt-2 text-sm leading-relaxed text-neutral-500">
						{barber.specialties.join(' · ')}
					</p>
					<a
						href="/book?barber={barber.id}"
						class="mt-3 inline-block border-b-2 border-accent pb-0.5 text-xs font-bold tracking-[0.2em] text-ink hover:text-accent-text"
					>
						BOOK WITH {barber.name.split(' ')[0].toUpperCase()}
					</a>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- Gallery preview -->
<section class="bg-mist py-16 sm:py-20" aria-labelledby="gallery-heading">
	<div class="mx-auto max-w-6xl px-5">
		<div class="flex flex-wrap items-end justify-between gap-6" use:reveal>
			<div>
				<p class="text-xs font-semibold uppercase tracking-[0.25em] text-accent-text">
					Our Work
				</p>
				<h2 id="gallery-heading" class="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">
					Fresh Out Of The Chair
				</h2>
			</div>
			<a
				href="/gallery"
				class="btn-hard inline-block border border-ink bg-white px-6 py-3 text-xs font-bold tracking-[0.2em] text-ink"
			>
				VIEW GALLERY
			</a>
		</div>
		<div class="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3">
			{#each gallery as item}
				<a href="/gallery" class="group relative block overflow-hidden" use:reveal>
					<Picture
						name={item.image}
						alt={item.alt}
						widths={[480, 800]}
						sizes="(max-width: 1024px) 50vw, 33vw"
						cls="block aspect-[4/3] w-full overflow-hidden transition-transform duration-300 group-hover:scale-105"
					/>
					<span
						class="absolute bottom-3 left-3 bg-ink/85 px-3 py-1.5 text-xs font-bold tracking-[0.15em] text-white"
					>
						{item.title}
					</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- Testimonials -->
<section class="bg-white py-16 sm:py-20" aria-labelledby="reviews-heading">
	<div class="mx-auto max-w-6xl px-5">
		<div class="text-center" use:reveal>
			<p class="text-xs font-semibold uppercase tracking-[0.25em] text-accent-text">
				What Clients Say
			</p>
			<h2 id="reviews-heading" class="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">
				{site.rating} Stars, {site.reviewCount} Reviews
			</h2>
			<p class="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-neutral-500">
				Real words from real chairs. Every review below names the barber who did the cut.
			</p>
		</div>
		<div class="mt-12" use:reveal>
			<TestimonialCarousel />
		</div>
		<p class="mt-8 text-center text-sm text-neutral-500">
			{testimonials.length} of {site.reviewCount} reviews shown ·
			<a href="/barbers" class="font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-text">
				book the barber they loved
			</a>
		</p>
	</div>
</section>

<!-- About -->
<section class="bg-white py-16 sm:py-20" aria-labelledby="about-heading">
	<div class="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
		<div class="relative mx-auto w-full max-w-md lg:mx-0" use:reveal>
			<Picture
				name="about-video"
				alt="Barber’s hands cutting a client’s hair with scissors, face in profile"
				widths={[480, 800, 1200]}
				sizes="(max-width: 1024px) 100vw, 50vw"
				cls="block aspect-[4/5] w-full overflow-hidden"
			/>
			<div class="absolute -bottom-5 left-5 bg-ink px-5 py-4 text-white shadow-lg">
				<p class="font-display text-3xl font-bold">15+ years</p>
				<p class="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
					Behind the chair
				</p>
			</div>
		</div>

		<div use:reveal>
			<p class="text-xs font-semibold uppercase tracking-[0.25em] text-accent-text">
				Modern Haircut
			</p>
			<h2 id="about-heading" class="mt-4 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
				A Chair, A Blade, And Fifteen Years Of Craft
			</h2>
			<p class="mt-6 leading-relaxed text-neutral-500">
				Barber opened on Linking Road in 2010 with two chairs and one rule: no client
				leaves until the cut is right. Fifteen years later there are four chairs, four
				barbers — and the same rule. Every chair, every cut, every finish — done by hand,
				done properly.
			</p>
			<ul class="mt-6 space-y-3">
				{#each ['Expert barbers with 10+ years of craft', 'Premium oils, pomades and tools — in shop and to take home', 'Clean chairs, hot towels and a fresh cut, every single time'] as point}
					<li class="flex items-start gap-3 text-sm font-medium text-ink">
						<Check class="mt-0.5 h-5 w-5 shrink-0 text-accent" />
						{point}
					</li>
				{/each}
			</ul>
			<div class="mt-8 grid grid-cols-3 gap-4 border-t border-neutral-100 pt-6">
				<div>
					<p class="font-display text-3xl font-bold text-ink">12k+</p>
					<p class="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">Cuts done</p>
				</div>
				<div>
					<p class="font-display text-3xl font-bold text-ink">{site.rating}★</p>
					<p class="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">Average rating</p>
				</div>
				<div>
					<p class="font-display text-3xl font-bold text-ink">4</p>
					<p class="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400">Master barbers</p>
				</div>
			</div>
			<div class="mt-8 flex flex-wrap items-center gap-6">
				<a
					href="/book"
					class="btn-hard inline-block border border-ink bg-ink px-8 py-3.5 text-xs font-bold tracking-[0.2em] text-white"
				>
					BOOK APPOINTMENT
				</a>
				<a href="/barbers" class="text-sm font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-text">
					Meet the team
				</a>
			</div>
		</div>
	</div>
</section>

<!-- FAQ preview -->
<section class="bg-mist py-16 sm:py-20" aria-labelledby="faq-heading">
	<div class="mx-auto max-w-3xl px-5">
		<div class="text-center" use:reveal>
			<p class="text-xs font-semibold uppercase tracking-[0.25em] text-accent-text">
				Good To Know
			</p>
			<h2 id="faq-heading" class="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">
				Questions, Answered
			</h2>
		</div>
		<div class="mt-10 space-y-4">
			{#each faqs.slice(0, 3) as faq}
				<details class="group border border-neutral-200 bg-white p-5" use:reveal>
					<summary
						class="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-ink"
					>
						{faq.q}
						<span class="text-xl font-normal text-accent-text transition-transform group-open:rotate-45" aria-hidden="true">+</span>
					</summary>
					<p class="mt-3 text-sm leading-relaxed text-neutral-500">{faq.a}</p>
				</details>
			{/each}
		</div>
		<p class="mt-8 text-center">
			<a
				href="/faq"
				class="inline-flex items-center gap-2 text-sm font-bold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-text"
			>
				See all {faqs.length} questions <ArrowRight class="h-4 w-4" />
			</a>
		</p>
	</div>
</section>

<!-- News / blog -->
<section class="bg-white py-16 sm:py-20" aria-labelledby="news-heading">
	<div class="mx-auto max-w-6xl px-5">
		<div class="flex flex-wrap items-end justify-between gap-6" use:reveal>
			<div>
				<p class="text-xs font-semibold uppercase tracking-[0.25em] text-accent-text">Latest News</p>
				<h2 id="news-heading" class="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">
					From The Chair
				</h2>
			</div>
			<a
				href="/blog"
				class="btn-hard inline-block border border-ink bg-white px-6 py-3 text-xs font-bold tracking-[0.2em] text-ink"
			>
				ALL ARTICLES
			</a>
		</div>
		<div class="mt-12 grid gap-6 md:grid-cols-3">
			{#each blogPosts as item}
				<article class="group border border-neutral-200 bg-white" use:reveal>
					<a href="/blog/{item.slug}" class="block">
						<Picture
							name={item.image}
							alt={item.alt}
							widths={[480, 800]}
							sizes="(max-width: 768px) 100vw, 33vw"
							cls="block aspect-[16/9] w-full overflow-hidden"
						/>
					</a>
					<div class="p-6">
						<p class="text-xs font-semibold uppercase tracking-[0.2em] text-accent-text">{item.date}</p>
						<h3 class="mt-3 font-display text-xl font-bold leading-snug text-ink">
							<a href="/blog/{item.slug}" class="group-hover:text-accent-text">{item.title}</a>
						</h3>
						<p class="mt-2 text-sm leading-relaxed text-neutral-500">{item.excerpt}</p>
						<a
							href="/blog/{item.slug}"
							class="mt-4 inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-ink hover:text-accent-text"
						>
							READ MORE <ArrowRight class="h-3.5 w-3.5" />
						</a>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<!-- Booking CTA -->
<section class="bg-ink py-16 text-white sm:py-20" aria-labelledby="booking-heading">
	<div class="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-5">
		<div class="lg:col-span-2" use:reveal>
			<p class="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Book Appointment</p>
			<h2 id="booking-heading" class="mt-4 font-display text-4xl font-bold sm:text-5xl">
				Reserve Your Chair
			</h2>
			<p class="mt-5 leading-relaxed text-white/70">
				Pick a service, pick your barber, pick a time — done in two minutes. We call you
				back to confirm, and you pay at the shop. No advance needed.
			</p>
			<ul class="mt-8 space-y-4 text-sm">
				<li class="flex items-center gap-3">
					<Phone class="h-5 w-5 shrink-0 text-accent" />
					<a href={site.phoneHref} class="hover:text-accent">{site.phone}</a>
				</li>
				<li class="flex items-center gap-3">
					<Mail class="h-5 w-5 shrink-0 text-accent" />
					<a href="mailto:{site.email}" class="hover:text-accent">{site.email}</a>
				</li>
				<li class="flex items-start gap-3">
					<MapPin class="mt-0.5 h-5 w-5 shrink-0 text-accent" />
					<span>{site.address}</span>
				</li>
				<li class="flex items-center gap-3">
					<Clock class="h-5 w-5 shrink-0 text-accent" />
					<span>{site.hours} · {site.sunday}</span>
				</li>
			</ul>
		</div>

		<div class="flex flex-col items-start justify-center bg-white p-6 text-ink sm:p-10 lg:col-span-3" use:reveal>
			<p class="font-display text-3xl font-bold leading-snug">
				Your chair is waiting.<br />Pick a time that suits you.
			</p>
			<p class="mt-4 leading-relaxed text-neutral-500">
				Service, barber, date and time — the whole booking takes about two minutes, and
				you can reschedule free up to 2 hours before your slot.
			</p>
			<div class="mt-8 flex flex-wrap gap-3">
				<a
					href="/book"
					class="btn-hard inline-flex items-center gap-2 border border-ink bg-ink px-8 py-3.5 text-xs font-bold tracking-[0.2em] text-white"
				>
					<CalendarCheck class="h-4 w-4" /> BOOK ONLINE
				</a>
				<a
					href={site.whatsapp}
					target="_blank"
					rel="noopener noreferrer"
					class="btn-hard inline-flex items-center gap-2 border border-ink bg-white px-8 py-3.5 text-xs font-bold tracking-[0.2em] text-ink"
				>
					<MessageCircle class="h-4 w-4" /> BOOK ON WHATSAPP
				</a>
			</div>
			<p class="mt-6 text-sm text-neutral-500">
				Walk-ins welcome · Usually seated within 20 minutes · {site.hoursShort}
			</p>
		</div>
	</div>
</section>
