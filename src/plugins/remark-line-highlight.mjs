import { visit } from 'unist-util-visit';

/**
 * Posts written for Gatsby mark highlighted lines on the language itself
 * (```js{1,3-5}). Move the braces into the code meta, where Shiki's
 * transformerMetaHighlight reads them, so the language is still recognised.
 */
export default function remarkLineHighlight() {
	return (tree) => {
		visit(tree, 'code', (node) => {
			const brace = node.lang?.indexOf('{') ?? -1;
			if (brace === -1) return;
			const spec = `${node.lang.slice(brace)} ${node.meta ?? ''}`;
			node.lang = node.lang.slice(0, brace);
			// ```js{7, 15-20} splits at the space, so rejoin and drop whitespace.
			node.meta = spec.replace(/\s+/g, '');
		});
	};
}
