/**
 * Posts written for Gatsby mark highlighted lines on the language itself
 * (```js{1,3-5}). Move the braces into the code meta, where Shiki's
 * transformerMetaHighlight reads them, so the language is still recognised.
 *
 * A Sätteri mdast plugin (Astro 7's default Markdown processor).
 */
export default {
	name: 'line-highlight',
	code(node, ctx) {
		const brace = node.lang?.indexOf('{') ?? -1;
		if (brace === -1) return;
		// ```js{7, 15-20} splits at the space, so rejoin and drop whitespace.
		const meta = `${node.lang.slice(brace)} ${node.meta ?? ''}`.replace(/\s+/g, '');
		ctx.replaceNode(node, { ...node, lang: node.lang.slice(0, brace), meta });
	},
};
