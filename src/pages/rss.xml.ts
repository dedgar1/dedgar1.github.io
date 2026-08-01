import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
	const posts = await getCollection('blog');

	return rss({
		title: 'straypackets.com',
		description: 'Thoughts slightly off center — software engineering, wisdom, and random observations.',
		site: context.site!,
		items: posts
			.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
			.map((post) => ({
				title: post.data.title,
				pubDate: post.data.pubDate,
				description: post.data.description,
				link: `/blog/${post.id}/`,
			})),
		customData: `<language>en-us</language>`,
	});
}