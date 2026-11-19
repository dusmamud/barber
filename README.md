# Barber — Real Cuts By Real Professionals

**Live:** https://barber-8da.pages.dev · **Repo:** https://github.com/dusmamud/barber

Classic barbershop website, built to match the reference design: white header +
hero, dark Services and Products sections, Modern Haircut about section, news,
booking form and footer.

## Stack

- SvelteKit 3 + Svelte 5 (runes only) + TypeScript (strict)
- Tailwind CSS 4 + `@sveltejs/adapter-static` (prerendered, SSR on)
- Playfair Display (headings) + Inter (body), self-hosted via `@fontsource`
- Icons: custom SVG set (`src/lib/components/ServiceIcon.svelte`) + Lucide
- Images: generated masters in `masters/*.png`, converted to AVIF / WebP / JPG
  at 480 / 800 / 1200 / 1600w by `scripts/convert-images.mjs` (sharp),
  rendered with the reusable `Picture.svelte` component (`<picture>`, no JS detection)

## Content

All content is mock data in one file — `src/lib/data/site.ts`. Client design
approve karega tabhi real data se swap hoga. Booking form aur cart bhi mock
hain: kuch charge nahi hota, kuch server par nahi jaata.

## Commands

```bash
npm install          # dependencies
npm run dev          # dev server
npm run build        # static build -> build/
npm run check        # svelte-check, 0 errors expected
node scripts/convert-images.mjs   # masters/*.png -> static/images/*
```

## Structure

```
src/lib/data/site.ts          # saara mock content (ek hi file)
src/lib/components/Picture.svelte
src/lib/components/ServiceIcon.svelte
src/routes/+page.svelte       # poora one-page site
src/routes/sitemap.xml/+server.ts
static/images/                # converted AVIF / WebP / JPG
masters/                      # original PNG masters (build me nahi jaate)
```
