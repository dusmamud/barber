export const prerender = true;

const lastmod = new Date().toISOString().split('T')[0];

export function GET() {
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\t<url>\n\t\t<loc>https://barber-8da.pages.dev/</loc>\n\t\t<lastmod>${lastmod}</lastmod>\n\t\t<changefreq>monthly</changefreq>\n\t\t<priority>1.0</priority>\n\t</url>\n</urlset>\n`;
	return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
