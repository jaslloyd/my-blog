import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** Published posts, newest first. Hidden posts get no page, as on Gatsby. */
export async function getPosts(): Promise<Post[]> {
	const posts = await getCollection('blog', ({ data }) => !data.hidden);
	return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** "January 05, 2020", matching Gatsby's "MMMM DD, YYYY". */
export function formatDate(date: Date): string {
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
		timeZone: 'UTC',
	});
}

/** Plain-text excerpt for posts without a description, like Gatsby's `excerpt`. */
export function excerpt(post: Post, length = 140): string {
	const text = (post.body ?? '')
		.replace(/```[\s\S]*?```/g, '')
		.replace(/<[^>]+>/g, '')
		.replace(/!\[[^\]]*\]\([^)]*\)/g, '')
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/[#>*_`~]/g, '')
		.replace(/\s+/g, ' ')
		.trim();
	return text.length > length ? `${text.slice(0, length).trimEnd()}…` : text;
}

export function description(post: Post): string {
	return post.data.description || excerpt(post, 160);
}
