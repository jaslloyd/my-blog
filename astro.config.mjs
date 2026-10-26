// @ts-check
import { defineConfig } from 'astro/config';
import { transformerMetaHighlight } from '@shikijs/transformers';
import remarkLineHighlight from './src/plugins/remark-line-highlight.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://thedeployguy.com',
	// Gatsby served every page at /<slug>/, so keep the trailing slash.
	trailingSlash: 'always',
	markdown: {
		remarkPlugins: [remarkLineHighlight],
		shikiConfig: {
			// Same Night Owl palette the Gatsby site used for code blocks.
			theme: 'night-owl',
			transformers: [transformerMetaHighlight()],
		},
	},
});
