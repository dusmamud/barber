// Barber — single mock-data file. Client design approve karega tabhi real
// data se swap hoga. Saara page content yahin se aata hai.
export const site = {
	name: 'Barber',
	tagline: 'Real Cuts By Real Professionals',
	phone: '+91 98765 43210',
	email: 'hello@barber.shop',
	address: 'Shop 12, Linking Road, Bandra West, Mumbai 400050',
	hours: 'Mon – Sat, 9:00 AM – 9:00 PM IST',
	url: 'https://barber.pages.dev'
} as const;

export const navLinks = [
	{ label: 'Home', href: '#home' },
	{ label: 'Services', href: '#services' },
	{ label: 'Products', href: '#products' },
	{ label: 'About', href: '#about' },
	{ label: 'News', href: '#news' },
	{ label: 'Contact', href: '#contact' }
] as const;

export type ServiceIcon = 'scissors' | 'razor' | 'beard' | 'moustache';

export const services: {
	id: string;
	title: string;
	description: string;
	price: string;
	duration: string;
	image: string;
	icon: ServiceIcon;
	alt: string;
}[] = [
	{
		id: 'haircut',
		title: 'Haircut',
		description: 'Duis porta ligula rhoncus euismod pretium tellus.',
		price: '$25',
		duration: '45 min',
		image: 'service-haircut',
		icon: 'scissors',
		alt: 'Barber cutting a client’s hair with scissors and comb'
	},
	{
		id: 'shaving',
		title: 'Shaving',
		description: 'Duis porta ligula rhoncus euismod pretium tellus.',
		price: '$20',
		duration: '30 min',
		image: 'service-shaving',
		icon: 'razor',
		alt: 'Barber shaving a client’s beard with a straight razor'
	},
	{
		id: 'beard-trimming',
		title: 'Beard Trimming',
		description: 'Duis porta ligula rhoncus euismod pretium tellus.',
		price: '$18',
		duration: '30 min',
		image: 'service-beard',
		icon: 'beard',
		alt: 'Barber trimming a client’s full beard with scissors'
	},
	{
		id: 'moustache',
		title: 'Moustache',
		description: 'Duis porta ligula rhoncus euismod pretium tellus.',
		price: '$12',
		duration: '20 min',
		image: 'service-moustache',
		icon: 'moustache',
		alt: 'Barber trimming a client’s moustache with small scissors'
	}
];

export const products: {
	id: string;
	name: string;
	price: string;
	oldPrice: string;
	image: string;
	alt: string;
}[] = [
	{
		id: 'neque-sodales',
		name: 'Neque Sodales',
		price: '$45.00',
		oldPrice: '$60.00',
		image: 'product-1',
		alt: 'Beard oil bottle and pomade tins on a wooden barbershop table'
	},
	{
		id: 'pellentesque-ullamcorper',
		name: 'Pellentesque Ullamcorper',
		price: '$45.00',
		oldPrice: '$60.00',
		image: 'product-2',
		alt: 'Hair dryer, scissors and comb on a wooden barbershop table'
	},
	{
		id: 'tristique-sollicitudin',
		name: 'Tristique Sollicitudin',
		price: '$70.00',
		oldPrice: '$85.00',
		image: 'product-3',
		alt: 'Open black gift box with beard care bottles and jars'
	},
	{
		id: 'turpis-cursus',
		name: 'Turpis Cursus',
		price: '$50.00',
		oldPrice: '$65.00',
		image: 'product-4',
		alt: 'Folded white t-shirt and pomade tin on a wooden table'
	}
];

export const aboutPoints = [
	'Expert barbers with 10+ years of craft',
	'Premium oils, pomades and tools — in shop and to take home',
	'Clean chairs, hot towels and a fresh cut, every single time'
] as const;

export const news: { date: string; title: string; excerpt: string }[] = [
	{
		date: '12 Nov 2026',
		title: 'Hot-towel shaves are back on the menu',
		excerpt: 'Our classic straight-razor shave now comes with a hot towel and beard oil finish.'
	},
	{
		date: '28 Oct 2026',
		title: 'New in the shop: beard care gift boxes',
		excerpt: 'Oil, balm and a wooden comb in one box — ready to gift, or to keep for yourself.'
	},
	{
		date: '09 Oct 2026',
		title: 'Extended hours for the festive season',
		excerpt: 'We now open at 9 AM on Saturdays so you can get a fresh cut before the weekend.'
	}
];
