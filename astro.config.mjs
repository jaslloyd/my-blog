// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';
import { transformerMetaHighlight } from '@shikijs/transformers';
import lineHighlight from './src/plugins/line-highlight.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://thedeployguy.com',
	// Gatsby served every page at /<slug>/, so keep the trailing slash.
	trailingSlash: 'always',
	integrations: [sitemap()],
	markdown: {
		processor: satteri({ mdastPlugins: [lineHighlight] }),
		shikiConfig: {
			// Same Night Owl palette the Gatsby site used for code blocks.
			theme: 'night-owl',
			transformers: [transformerMetaHighlight()],
		},
	},
});
