// Barber — single mock-data file. Client design approve karega tabhi real
// data se swap hoga. Saara page content yahin se aata hai.
// Prices are in Indian rupees (₹). All content is mock/demo content.
export const site = {
	name: 'Barber',
	tagline: 'Real Cuts By Real Professionals',
	phone: '+91 98765 43210',
	phoneHref: 'tel:+919876543210',
	email: 'hello@barber.shop',
	address: 'Shop 12, Linking Road, Bandra West, Mumbai 400050',
	shortAddress: 'Linking Road, Bandra West, Mumbai',
	hours: 'Mon – Sat, 9:00 AM – 9:00 PM IST',
	hoursShort: 'Mon–Sat · 9 AM – 9 PM',
	sunday: 'Sundays closed',
	url: 'https://barber-8da.pages.dev',
	whatsapp: 'https://wa.me/919876543210?text=Hi%20Barber!%20I%20want%20to%20book%20a%20chair.',
	mapsUrl:
		'https://www.google.com/maps/search/?api=1&query=Linking+Road+Bandra+West+Mumbai+400050',
	mapEmbed:
		'https://www.google.com/maps?q=Linking%20Road%2C%20Bandra%20West%2C%20Mumbai%20400050&output=embed',
	instagram: 'https://www.instagram.com/barber.bandra',
	facebook: 'https://www.facebook.com/barber.bandra',
	twitter: 'https://x.com/barberbandra',
	geo: { lat: 19.0596, lng: 72.8295 },
	rating: 4.9,
	reviewCount: 312,
	est: 2010
} as const;

export const inr = (n: number) => '₹' + n.toLocaleString('en-IN');

export const navLinks = [
	{ label: 'Home', href: '/' },
	{ label: 'Services', href: '/services' },
	{ label: 'Barbers', href: '/barbers' },
	{ label: 'Gallery', href: '/gallery' },
	{ label: 'Products', href: '/products' },
	{ label: 'Blog', href: '/blog' },
	{ label: 'FAQ', href: '/faq' },
	{ label: 'Contact', href: '/contact' }
] as const;

export type ServiceIcon = 'scissors' | 'razor' | 'beard' | 'moustache';

export type Service = {
	id: string;
	title: string;
	description: string;
	price: number;
	duration: string;
	durationMin: number;
	image: string;
	icon: ServiceIcon;
	alt: string;
	category: 'Hair' | 'Beard & Shave' | 'Combos';
	popular?: boolean;
};

export const services: Service[] = [
	{
		id: 'haircut',
		title: 'Haircut',
		description:
			'Consultation, precision cut, wash and a styled finish — tailored to your face shape and hair type.',
		price: 499,
		duration: '45 min',
		durationMin: 45,
		image: 'service-haircut',
		icon: 'scissors',
		alt: 'Barber cutting a client’s hair with scissors and comb',
		category: 'Hair',
		popular: true
	},
	{
		id: 'skin-fade',
		title: 'Skin Fade',
		description:
			'A sharp, blended skin fade with crisp lines — low, mid or high, finished with a razor-sharp lineup.',
		price: 549,
		duration: '45 min',
		durationMin: 45,
		image: 'gallery-fade',
		icon: 'scissors',
		alt: 'Young man showing a sharp skin fade haircut from the side',
		category: 'Hair',
		popular: true
	},
	{
		id: 'shaving',
		title: 'Hot Towel Shave',
		description:
			'Classic straight-razor shave with hot towels, pre-shave oil and a cooling beard balm finish.',
		price: 399,
		duration: '30 min',
		durationMin: 30,
		image: 'service-shaving',
		icon: 'razor',
		alt: 'Barber shaving a client’s beard with a straight razor',
		category: 'Beard & Shave'
	},
	{
		id: 'beard-trimming',
		title: 'Beard Trimming',
		description:
			'Beard sculpted to shape, neckline cleaned up, finished with beard oil and a hot-towel press.',
		price: 349,
		duration: '30 min',
		durationMin: 30,
		image: 'service-beard',
		icon: 'beard',
		alt: 'Barber trimming a client’s full beard with scissors',
		category: 'Beard & Shave'
	},
	{
		id: 'moustache',
		title: 'Moustache',
		description:
			'Moustache shaped, waxed and styled — from a neat handlebar to a sharp pencil line.',
		price: 199,
		duration: '20 min',
		durationMin: 20,
		image: 'service-moustache',
		icon: 'moustache',
		alt: 'Barber trimming a client’s moustache with small scissors',
		category: 'Beard & Shave'
	},
	{
		id: 'kids-cut',
		title: 'Kids Cut',
		description:
			'Patient, gentle cuts for kids under 12 — first-haircut certificate included, parents welcome on the chair.',
		price: 299,
		duration: '30 min',
		durationMin: 30,
		image: 'gallery-kids',
		icon: 'scissors',
		alt: 'Happy young boy getting a stylish haircut in a barber chair',
		category: 'Hair'
	},
	{
		id: 'hair-beard-combo',
		title: 'Hair + Beard Combo',
		description:
			'Our best value: a full haircut plus a beard trim and hot-towel finish in one sitting.',
		price: 799,
		duration: '60 min',
		durationMin: 60,
		image: 'gallery-beard',
		icon: 'beard',
		alt: 'Man with a sculpted beard and lined-up haircut',
		category: 'Combos',
		popular: true
	},
	{
		id: 'full-grooming',
		title: 'The Full Works',
		description:
			'Haircut, hot towel shave, beard sculpt, facial massage and styling — the complete 75-minute reset.',
		price: 999,
		duration: '75 min',
		durationMin: 75,
		image: 'gallery-shave',
		icon: 'razor',
		alt: 'Barber giving a client a hot-towel straight-razor shave',
		category: 'Combos'
	}
];

export type Product = {
	id: string;
	name: string;
	description: string;
	price: number;
	oldPrice?: number;
	image: string;
	alt: string;
	badge?: 'SALE' | 'NEW' | 'BESTSELLER';
};

export const products: Product[] = [
	{
		id: 'cedarwood-beard-oil',
		name: 'Cedarwood Beard Oil',
		description: 'Cold-pressed cedarwood and jojoba oil — softens the beard, calms the skin underneath.',
		price: 899,
		oldPrice: 1199,
		image: 'product-1',
		alt: 'Beard oil bottle and pomade tins on a wooden barbershop table',
		badge: 'SALE'
	},
	{
		id: 'barber-pro-dryer',
		name: 'Barber Pro Hair Dryer',
		description: 'Salon-grade 2200W dryer with a concentrator nozzle — the same one on our stations.',
		price: 2499,
		image: 'product-2',
		alt: 'Hair dryer, scissors and comb on a wooden barbershop table',
		badge: 'BESTSELLER'
	},
	{
		id: 'beard-care-gift-box',
		name: 'Beard Care Gift Box',
		description: 'Oil, balm and a wooden comb in a keepsake box — ready to gift, or to keep for yourself.',
		price: 1499,
		oldPrice: 1999,
		image: 'product-3',
		alt: 'Open black gift box with beard care bottles and jars',
		badge: 'SALE'
	},
	{
		id: 'barber-tee-pomade',
		name: 'Barber Tee + Pomade',
		description: 'Our heavyweight shop tee with a tin of matte clay pomade — the uniform, to take home.',
		price: 999,
		image: 'product-4',
		alt: 'Folded white t-shirt and pomade tin on a wooden table',
		badge: 'NEW'
	}
];

export const giftCards = [
	{ id: 'gc-500', amount: 500, label: '₹500 Gift Card', note: 'A clean cut for someone you like.' },
	{ id: 'gc-1000', amount: 1000, label: '₹1,000 Gift Card', note: 'Two cuts, or a cut and a shave.' },
	{ id: 'gc-2000', amount: 2000, label: '₹2,000 Gift Card', note: 'The full works, twice over.' }
] as const;

export const memberships = [
	{
		id: 'sharp-monthly',
		name: 'Sharp Monthly',
		price: 899,
		period: 'per month',
		points: ['2 haircuts a month', 'Free beard line-up between cuts', '10% off all products']
	},
	{
		id: 'full-works-club',
		name: 'The Full Works Club',
		price: 1499,
		period: 'per month',
		points: ['2 haircuts + 1 hot towel shave', 'Priority booking on Saturdays', '15% off all products']
	}
] as const;

export type Barber = {
	id: string;
	name: string;
	role: string;
	experience: string;
	specialties: string[];
	rating: number;
	cuts: number;
	daysOff: string;
	bio: string;
	image: string;
	alt: string;
};

export const barbers: Barber[] = [
	{
		id: 'arjun',
		name: 'Arjun Mehta',
		role: 'Founder · Master Barber',
		experience: '14 years',
		specialties: ['Skin fades', 'Beard sculpting', 'Classic cuts'],
		rating: 4.9,
		cuts: 9200,
		daysOff: 'Sundays',
		bio: 'Arjun opened Barber in 2010 after a decade behind the chair in London and Mumbai. He still cuts every day — and still inspects every fade before a client leaves the chair.',
		image: 'barber-arjun',
		alt: 'Arjun Mehta, founder and master barber, in a black apron'
	},
	{
		id: 'rohan',
		name: 'Rohan D’Souza',
		role: 'Senior Barber',
		experience: '8 years',
		specialties: ['Textured crops', 'Modern fades', 'Hair colour'],
		rating: 4.9,
		cuts: 6100,
		daysOff: 'Mondays',
		bio: 'Rohan is the one to ask for when you want something new. Textured crops, sharp mid-fades and honest advice on what will actually suit you.',
		image: 'barber-rohan',
		alt: 'Rohan D’Souza, senior barber, holding scissors and comb'
	},
	{
		id: 'vikram',
		name: 'Vikram Singh',
		role: 'Master Barber',
		experience: '20 years',
		specialties: ['Hot towel shaves', 'Classic tapers', 'Moustache styling'],
		rating: 5.0,
		cuts: 12400,
		daysOff: 'Tuesdays',
		bio: 'Twenty years, one chair, zero shortcuts. Vikram’s hot towel shave is the reason half of Bandra books a Saturday slot a week ahead.',
		image: 'barber-vikram',
		alt: 'Vikram Singh, master barber with a grey-flecked beard'
	},
	{
		id: 'kabir',
		name: 'Kabir Khan',
		role: 'Barber & Stylist',
		experience: '6 years',
		specialties: ['Skin fades', 'Line-ups', 'Kids cuts'],
		rating: 4.8,
		cuts: 3800,
		daysOff: 'Wednesdays',
		bio: 'Kabir is the youngest chair in the shop and the most requested by under-25s. Razor-sharp line-ups, patient kids cuts, and a playlist you will ask about.',
		image: 'barber-kabir',
		alt: 'Kabir Khan, barber and stylist, in a black apron'
	}
];

export const gallery: { id: string; title: string; category: string; image: string; alt: string }[] = [
	{ id: 'fade', title: 'Skin Fade', category: 'Fade', image: 'gallery-fade', alt: 'Young man showing a sharp skin fade haircut from the side' },
	{ id: 'beard', title: 'Beard Sculpt', category: 'Beard', image: 'gallery-beard', alt: 'Man with a sculpted full beard and lined-up haircut' },
	{ id: 'kids', title: 'Kids Cut', category: 'Kids', image: 'gallery-kids', alt: 'Happy young boy getting a stylish haircut' },
	{ id: 'taper', title: 'Classic Taper', category: 'Classic', image: 'gallery-taper', alt: 'Man with a classic taper haircut and side part' },
	{ id: 'shave', title: 'Hot Towel Shave', category: 'Shave', image: 'gallery-shave', alt: 'Barber giving a client a hot-towel straight-razor shave' },
	{ id: 'lineup', title: 'Razor Line-up', category: 'Fade', image: 'gallery-lineup', alt: 'Close-up of a precise hairline lineup being done with a trimmer' }
];

export const galleryCategories = ['All', 'Fade', 'Beard', 'Kids', 'Classic', 'Shave'] as const;

export type Testimonial = {
	id: string;
	name: string;
	role: string;
	rating: number;
	quote: string;
	service: string;
	barber: string;
	avatar?: string;
	initials: string;
};

export const testimonials: Testimonial[] = [
	{
		id: 'rahul',
		name: 'Rahul Kapoor',
		role: 'Regular since 2021 · Bandra West',
		rating: 5,
		quote:
			'Best fade in Bandra, and I have tried them all. Arjun remembers exactly how I like it — I just sit down and he gets to work.',
		service: 'Skin Fade',
		barber: 'Arjun Mehta',
		avatar: 'avatar-rahul',
		initials: 'RK'
	},
	{
		id: 'sameer',
		name: 'Sameer Khan',
		role: 'First visit · Khar',
		rating: 5,
		quote:
			'Booked online in two minutes, was in the chair on time, and the hot towel shave is worth every rupee. This is my shop now.',
		service: 'Hot Towel Shave',
		barber: 'Vikram Singh',
		avatar: 'avatar-sameer',
		initials: 'SK'
	},
	{
		id: 'ayaan',
		name: 'Ayaan Sheikh',
		role: 'Regular since 2019 · Bandra West',
		rating: 5,
		quote:
			'My son’s first haircut was here, and now he asks for Kabir by name. Patient, gentle, and the cut always looks sharp.',
		service: 'Kids Cut',
		barber: 'Kabir Khan',
		avatar: 'avatar-ayaan',
		initials: 'AS'
	},
	{
		id: 'dev',
		name: 'Dev Patel',
		role: 'Regular since 2022 · Santacruz',
		rating: 5,
		quote:
			'The Full Works before my wedding was the best money I spent that week. Ninety minutes of calm, and I walked out looking like a different man.',
		service: 'The Full Works',
		barber: 'Rohan D’Souza',
		initials: 'DP'
	},
	{
		id: 'imran',
		name: 'Imran Ali',
		role: 'First visit · Bandra East',
		rating: 4,
		quote:
			'Walked in on a Saturday without a booking and still got a chair in twenty minutes. Clean shop, honest prices, great beard trim.',
		service: 'Beard Trimming',
		barber: 'Arjun Mehta',
		initials: 'IA'
	}
];

export const faqs: { q: string; a: string }[] = [
	{
		q: 'Do I need an appointment, or can I walk in?',
		a: 'Both work. Appointments get priority — book online or call us and your chair is ready when you arrive. Walk-ins are welcome and usually seated within 20 minutes, except on Saturday afternoons when we are at our busiest.'
	},
	{
		q: 'Are you open on Sundays?',
		a: 'No, we are closed on Sundays. We are open Monday to Saturday, 9:00 AM to 9:00 PM. The last booking slot of the day is 8:00 PM so every cut finishes unhurried.'
	},
	{
		q: 'Do you cut kids’ hair?',
		a: 'Yes — kids under 12 get a dedicated 30-minute slot with a patient barber, a first-haircut certificate, and a parent is welcome to sit on the chair with them.'
	},
	{
		q: 'What payment methods do you accept?',
		a: 'UPI, all major cards, cash, and net banking. Booking online needs no payment — you pay at the shop after your cut.'
	},
	{
		q: 'Can I cancel or reschedule my booking?',
		a: 'Yes, free of charge up to 2 hours before your slot — just call us or message us on WhatsApp and we will move it. No-shows on two consecutive bookings may need a small advance for the next one.'
	},
	{
		q: 'Can I request a specific barber?',
		a: 'Absolutely — pick your barber when you book. Each barber lists their specialties and their day off on the Barbers page, so you can match the right chair to your cut.'
	},
	{
		q: 'Where do I park?',
		a: 'There is paid street parking on Linking Road right outside the shop, and a public parking lot 2 minutes away near Bandra station. The shop is a 5-minute walk from Bandra railway station (West).'
	},
	{
		q: 'Do you sell gift cards?',
		a: 'Yes — ₹500, ₹1,000 and ₹2,000 gift cards, valid for a year on any service or product. Pick one up in the shop or add it to your cart on the Products page.'
	}
];

export const aboutPoints = [
	'Expert barbers with 10+ years of craft',
	'Premium oils, pomades and tools — in shop and to take home',
	'Clean chairs, hot towels and a fresh cut, every single time'
] as const;

export type BlogPost = {
	slug: string;
	date: string;
	title: string;
	excerpt: string;
	image: string;
	alt: string;
	readMin: number;
	body: string[];
};

export const blogPosts: BlogPost[] = [
	{
		slug: 'ask-for-the-perfect-fade',
		date: '12 Nov 2026',
		title: 'How to ask your barber for the perfect fade',
		excerpt:
			'Low, mid or high? Skin or taper? Bring a photo, know three words, and you will never leave with the wrong fade again.',
		image: 'gallery-fade',
		alt: 'Young man showing a sharp skin fade haircut from the side',
		readMin: 4,
		body: [
			'Most bad fades are not bad cutting — they are bad briefs. Your barber can only cut what you describe, so walk in with three things decided: the height of the fade, the finish on top, and how sharp you want the lineup.',
			'Height first. A low fade keeps the blend near the ears and looks conservative — good for offices. A mid fade sits at the temple and suits almost everyone. A high fade climbs above the temples and looks bold; it grows out faster, so book every two weeks if you choose it.',
			'Then the top. Short on top with a fade looks clean and needs little styling. Longer on top gives you texture to play with, but ask for the sides to be blended into it, not disconnected, unless you want a hard part.',
			'Finally, bring a photo. Two photos, ideally — one from the front and one from the side. A photo of a cut on hair like yours is worth a thousand words, and every good barber would rather see it than guess.'
		]
	},
	{
		slug: 'beard-care-five-steps',
		date: '28 Oct 2026',
		title: 'Beard care in five steps, from the chair',
		excerpt:
			'Wash it less, oil it daily, and stop trimming the neckline yourself. The five habits that keep a beard looking sculpted.',
		image: 'gallery-beard',
		alt: 'Man with a sculpted full beard and lined-up haircut',
		readMin: 3,
		body: [
			'A good beard is 20% cutting and 80% care. The barbershop sets the shape; your bathroom keeps it. Here is the routine we give every bearded client.',
			'One: wash it two or three times a week, not daily — daily shampoo strips the natural oils and leaves the beard wiry. Two: beard oil every morning, two or three drops worked into the skin underneath, not just the hair.',
			'Three: comb it down, then shape it up — a wooden comb distributes oil evenly and trains the hair to sit where you want it. Four: trim only the strays between visits, never the neckline — one wrong line at home takes three weeks to grow back.',
			'Five: come in every three weeks. A beard trim is a 30-minute reset that keeps the shape you paid for, and it costs less than the products you would waste fixing it yourself.'
		]
	},
	{
		slug: 'hot-towel-shave-guide',
		date: '09 Oct 2026',
		title: 'Hot towel shave: what actually happens in the chair',
		excerpt:
			'Steam, oil, a straight razor and thirty minutes of calm. Why the oldest service in the shop is also the most relaxing.',
		image: 'gallery-shave',
		alt: 'Barber giving a client a hot-towel straight-razor shave',
		readMin: 4,
		body: [
			'The hot towel shave is the oldest service in our shop and the one clients describe as a holiday. Here is exactly what happens, so first-timers know what to expect.',
			'It starts with hot towels — two of them, steamed and pressed onto the face to soften the beard and open the pores. Then pre-shave oil, then lather worked in with a brush, not a can.',
			'The shave itself is a straight razor, two passes: one with the grain, one across it. A good barber never presses — the weight of the razor does the work. Between passes, another hot towel. After: cold towel, then balm.',
			'Thirty minutes, no phone, no talking unless you want to. Most clients book it the same time every month. Book the last slot of the day if you can — you will not want to rush anywhere afterwards.'
		]
	}
];

export const news: { date: string; title: string; excerpt: string; slug: string }[] = [
	{
		date: '12 Nov 2026',
		title: 'How to ask your barber for the perfect fade',
		excerpt: 'Low, mid or high? Skin or taper? Bring a photo, know three words, and you will never leave with the wrong fade again.',
		slug: 'ask-for-the-perfect-fade'
	},
	{
		date: '28 Oct 2026',
		title: 'Beard care in five steps, from the chair',
		excerpt: 'Wash it less, oil it daily, and stop trimming the neckline yourself. The five habits that keep a beard looking sculpted.',
		slug: 'beard-care-five-steps'
	},
	{
		date: '09 Oct 2026',
		title: 'Hot towel shave: what actually happens in the chair',
		excerpt: 'Steam, oil, a straight razor and thirty minutes of calm. Why the oldest service in the shop is also the most relaxing.',
		slug: 'hot-towel-shave-guide'
	}
];

export const firstVisit = [
	'Arrive 5 minutes early — your barber will talk through the cut before touching a clipper.',
	'Bring a photo of the cut you want. It helps more than any description.',
	'Tell us about your hair: cowlicks, thinning spots, what you hate. We cut around all of it.',
	'No payment needed to book. Pay at the shop by UPI, card or cash.'
] as const;

export const walkInPolicy =
	'Walk-ins are welcome and usually seated within 20 minutes. Appointments always get priority, and Saturday afternoons are the busiest — book ahead if you are coming then.';
