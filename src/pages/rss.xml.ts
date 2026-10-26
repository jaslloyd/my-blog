import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { description, getPosts } from '../lib/posts';

export async function GET(context: APIContext) {
	const posts = await getPosts();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site!,
		trailingSlash: true,
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.date,
			description: description(post),
			link: `/${post.id}/`,
		})),
	});
}
