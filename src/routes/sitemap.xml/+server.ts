export const prerender = true;

const BASE = 'https://barber-8da.pages.dev';
const lastmod = new Date().toISOString().split('T')[0];

const pages: { loc: string; priority: string; changefreq: string }[] = [
	{ loc: '/', priority: '1.0', changefreq: 'weekly' },
	{ loc: '/services', priority: '0.9', changefreq: 'monthly' },
	{ loc: '/barbers', priority: '0.9', changefreq: 'monthly' },
	{ loc: '/gallery', priority: '0.8', changefreq: 'monthly' },
	{ loc: '/book', priority: '0.9', changefreq: 'weekly' },
	{ loc: '/products', priority: '0.8', changefreq: 'monthly' },
	{ loc: '/faq', priority: '0.7', changefreq: 'monthly' },
	{ loc: '/contact', priority: '0.8', changefreq: 'monthly' },
	{ loc: '/blog', priority: '0.8', changefreq: 'weekly' },
	{ loc: '/blog/ask-for-the-perfect-fade', priority: '0.6', changefreq: 'monthly' },
	{ loc: '/blog/beard-care-five-steps', priority: '0.6', changefreq: 'monthly' },
	{ loc: '/blog/hot-towel-shave-guide', priority: '0.6', changefreq: 'monthly' },
	{ loc: '/privacy', priority: '0.3', changefreq: 'yearly' },
	{ loc: '/terms', priority: '0.3', changefreq: 'yearly' }
];

export function GET() {
	const urls = pages
		.map(
			(p) =>
				`\t<url>\n\t\t<loc>${BASE}${p.loc}</loc>\n\t\t<lastmod>${lastmod}</lastmod>\n\t\t<changefreq>${p.changefreq}</changefreq>\n\t\t<priority>${p.priority}</priority>\n\t</url>`
		)
		.join('\n');
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
	return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
