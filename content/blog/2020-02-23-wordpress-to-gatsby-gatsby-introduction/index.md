---
title: "WordPress to Gatsby: Gatsby Introduction"
date: "2020-02-23"
description: ""
---

Welcome back, today I am going to starting a new series on migrating a WordPress Site/Blog to Gatsby. I am in the process of migrating this blog to Gatsby so I taught it would be good to document the process. Today I am going be discussing Gatsby and specifically how to create a starter blog up and running so we have something to start migrating to.

## What is Gatsby

> Gatsby is a blazing fast modern site generator for React.

Site generator means it will generate a website bundle that you can deploy to any service that supports static hosting e.g Zeit Now, Netlify, GitHub Pages etc.

One very important note about Gatsby pages are created at build time not at run time or when the user requests them like PHP or other service side frameworks. Gatsby does have some support for server-side rendering but I won't be diving into that. A lot of the power of Gatsby comes from this build time creation.

Gatsby has an extensive set of plugins [available](https://www.gatsbyjs.org/plugins/) as well as [starter templates](https://www.gatsbyjs.org/starters/?v=2) which can help speed up your website development.

## Requirements

1. Install the latest Node LTS version [here](https://nodejs.org/en/)
2. Install the Gatsby CLI tool via `npm install -g gatsby-cli`
3. Create a new Gatsby project using the blog starter as a template: `gatsby new my-blog https://github.com/gatsbyjs/gatsby-starter-blog`
4. Go to the directory `cd my-blog`
5. Boot up the live server via `npm start`

After these steps you have a decent looking Blog! You may be a bit overwhelmed with all the files and folders but I am going to dig into some of these in the next section.

## Gatsby concepts

Let's dive into the directory structure

```
├── src
├──── pages
├───── 404.js
├───── index.js
├──── components
├───── layout.js
├──── utils
├───── global.css
├── gatsby-browser.js
├── gatsby-config.js
├── gatsby-node.js
├── gatsby-ssr.js
```

1.  **`/src/*.js`**: Any React component defined in here will automatically become a page. e.g `src/pages/about.js` will map to `/about`. index.js will be the homepage
    - **`src/components`**: This is where the components that build up our pages go
      - **`layout.js`**: Layout components are for sections of a site that you want to share across multiple pages. (Header, Footer, Sidebar, Nav menu etc...)
    - **`utils`** -
      - **`global.css`** - Commonly a place for global styles
2.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

3.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

4.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

5.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

### Data in Gatsby

Data in Gatsby can be considered “everything that lives outside a React component”. Data can also live in file types like Markdown, CSV, etc. as well as databases and APIs of all sorts. Gatsby’s data layer lets you pull data from these (and any other source) directly into your components—in the shape and form you want.

There are two main ways to pull data into Gatsby:

1. createPages API to pull unstructured data into Gatsby pages directly.
2. GraphQL to pull data from any resource you like.

#### How to Pull Data into Pages / Components

There are a few ways to pull data from a variety of sources into your pages/components:

- page query - Is when you have a Gatsby page that exports a GraphQL query, e.g An about page which exports a pageQuery to query for some site metadata:

  ```js
  // Header.js
  const Header = ({ data }) => <h1>Site: {data.site.siteMetadata.title}</h1>
  // ....
  export const pageQuery = graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `
  ```

At build time, Gatsby will look through your pages/components and see if it finds an exported GraphQL string. When it finds one, it will run it and provide the data to the component via Props on the data property. So for the above example pageQuery, it looks at the `siteMetadata` in gatsby-config.js and takes the title and inject it into the about.js component via data object. (The nice thing is, how you access the data is like your query e.g: `data.site.siteMetadata.title`)

**Note**: You can only have one page query per file

- StaticQuery - which a component that takes a query as an argument and provides the data via a render prop.

  ```jsx
  import React from "react"
  import { StaticQuery, graphql } from "gatsby"
  export default () => (
    <StaticQuery
      query={graphql`
        query HeadingQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={(data) => (
        <header>
          <h1>{data.site.siteMetadata.title}</h1>
        </header>
      )}
    />
  )
  ```

- useStaticQuery Hooks - which is exactly the same as StaticQuery above but it provides you the data directly to use inside your function components.

  ```jsx
  import React from "react"
  import { useStaticQuery, graphql } from "gatsby"
  export default () => {
    const data = useStaticQuery(graphql`
      query HeaderQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `)
    return (
      <header>
        <h1>{data.site.siteMetadata.title}</h1>
      </header>
    )
  }
  ```

**Note**: StaticQuery / useStaticQuery doesn't accept variables whereas page queries can.

### How pages/posts are created in Gatsby

I have already discussed one way to create pages in Gatsby and that was placing JavaScript files inside the pages directory. That is great for mostly static pages but for something like blog posts where the content is a bit more structured and freeform we need something different.

You could write the blog posts in HTML but can turn into a nightmare very quickly (making sure you use the right tags, formatting etc), another way we could write them is using Markdown. Markdown will give us a format to write our blog posts in and from the markdown we can use Gatsby plugins to transform it into structured HTML content. Gatsby plugin will also take care of putting the HTML version in the right place, That means the only things you need to worry about is writing your blog posts.

#### Markdown to HTML

As I said we can use plugins to convert Markdown to HTML. We can just focus on writing. Good news is the starter template we are using already comes with all this built-in. Let's quickly run through how this works:

1. Posts are created in `/content/blog` in markdown. e.g `/content/blog/2020-01-01-new-year-new-me/index.md`. (It is required/advised to have posts in a folder, the name doesn't matter but having them like I have means they are automatically ordered by date)

2. During Build time, Gatsby calls `createPages` in `gatsby-node.js`, which will:

   1. Use GraphQL to query for all the markdown files via allMarkdownRemark. This is provided by gatsby-transformer-remark which allows you to query for markdown files, it also converts the pages into HTML.
   2. It then goes through each of the posts it finds and uses the createPage API (which is provided by Gatsby) to create a page with the post details.

3. Since the pages are created during build time, created pages are put directly into the public folder along with the rest of your app. This means you do not have a copy in /pages you only need to care and update files in the `content/blog` folder.

4. Posts can now be viewed within your website.

If you are wondering how the title of a post gets set or the date, well if you look at a post provided in the Gatsby starter template, all the files start with something like this:

```
---
title: "My First Post"
date: "2019-08-01"
---
```

This is called FrontMatter and is basically metadata for your posts, you can put whatever properties you want here and you will be able to query them in your script files.

I hope this gives you a better understanding of how pages go from Markdown to HTML, since all this ids provided by the template you will rarely have to change this behavior but I wanted to go through it as you may want to customize certain things down the line.

## Conclusion

That is it for the first post about migrating WordPress to Gatsby, this was an introduction to Gatsby I know there wasn't much migrating happening in this post but getting a grasp on Gatsby concepts will save you a lot of headaches later. Understanding the power it gives you and its limitations are very important. We now have a template blog in which we can use and customize in the future, we will also work on import data from WordPress later but this is a good starting point on our migration.

Until next time,

Jason
