# thedeployguy

Source for [thedeployguy.com](https://thedeployguy.com), a personal blog about programming, life, self-development and everything in-between. Built with [Astro](https://astro.build), migrated from the original Gatsby site ([jaslloyd/my-blog](https://github.com/jaslloyd/my-blog)).

## Development

Node is managed with [fnm](https://github.com/Schniz/fnm), which picks up `.node-version` when you `cd` in.

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run preview   # serve the build locally
```

## Writing a post

Each post is a folder in `src/content/blog/`, and the folder name is its URL:

```
src/content/blog/2026-10-26-my-new-post/
├── index.md
└── images/
    └── screenshot.png
```

```md
---
title: "My new post"
date: "2026-10-26"
description: "Optional summary for the home page, RSS and search results"
---

![Alt text](./images/screenshot.png)
```

Add `hidden: true` to the front matter to keep a post out of the build. Code blocks support Gatsby-style line highlighting, for example ` ```js{1,3-5} `.

## Deploying

Built and hosted on Netlify (`netlify.toml`). `public/_redirects` keeps the old WordPress and Gatsby-era URLs working, and `public/sw.js` removes the offline service worker the Gatsby site installed in readers' browsers.

## License

Posts are licensed under `LICENSE-posts`; the site code under `LICENSE-website`.
