export const prerender = true;

export function entries() {
	return [{ slug: 'ask-for-the-perfect-fade' }, { slug: 'beard-care-five-steps' }, { slug: 'hot-towel-shave-guide' }];
}

export function load({ params }: { params: { slug: string } }) {
	return { slug: params.slug };
}
