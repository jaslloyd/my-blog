Welcome back, today I am going to be discussing Gatsby and specifically how to create a Gatsby blog. I am going to be migrating this blog from WordPress to Gatsby in the near future so I taught it would be good to document the process.

## What is Gatsby

> Gatsby is a blazing fast modern site generator for React.

Site generator means it will generate a website bundle that you can deploy to any service that supports static hosting e.g Zeit Now, Netlify, Github Pages etc.

One very important note about Gatsby pages are created at build time not at run time or when the user requests them like PHP or other service side frameworks. Gatsby does have some support for part of server-side rendering but I won't be diving into that. A lot of the power of Gatsby comes from this build time creation.

## Requirements

1. Install the latest Node LTS version here , (we need npm)
2. Install the Gatsby CLI tool via `npm install -g gatsby-cli`
3. Create a new Gatsby project using the blog starter as a template: `gatsby new my-blog https://github.com/gatsbyjs/gatsby-starter-blog`
4. Go to the directory `cd my-blog`
5. Boot up the live server via `npm start`

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
    - **``src/components**``: This is where the components that build up our pages go
      - **`layout.js`**``: Layout components are for sections of a site that you want to share across multiple pages. (Header, Footer, Sidebar, Nav menu etc...)
    - **`utils`** -
      - **`global.css**` - Commonly a place for global styles
2.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

3.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

4.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

5.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

### Data in Gatsby

Data in Gatsby can be considered “everything that lives outside a React component”. Data can also live in file types like Markdown, CSV, etc. as well as databases and APIs of all sorts. Gatsby’s data layer lets you pull data from these (and any other source) directly into your components—in the shape and form you want.

There are mainly two ways to pull data into Gatsby:

- createPages API to pull unstructured data into Gatsby pages directly
- GraphQL

#### How to Pull Data into Pages / Components

There are a few ways to pull data from a variety of sources into your pages / components:

- page query - You might have an about page which exports a pageQuery that is a graphql quering for some data e.g:

  ```js
  // Header.js
  const Header = ({ data }) => <h1>Site: {data.site.siteMetadata.title}</h1>
  // ....
  export const query = graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `
  ```

  At build time, Gatsby will look through your pages / components and see if it finds an exported graphql string. When it finds it, it will run it and provide the data to the component via Props on the data property. So for the above example Query, it looks at the siteMetadata in gatsby-config.js and takes the title and inject it into the about.js component via data object. (The nice thing is how you access the data is mirrored the way your query looks e.g: `data.site.siteMetadata.title`)

  _Note: You can only have one page query per file_

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
      render={data => (
        <header>
          <h1>{data.site.siteMetadata.title}</h1>
        </header>
      )}
    />
  )
  ```

- useStaticQuery Hooks - which is exact same as StaticQuery above but it provides you the data directly to use inside your function components.

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

_Note_: StaticQuery / useStaticQuery doesn't accept variables.

Variables can be added to page queries but not static queries.

// CreatePage API details....

## Conclusion

That is it for the first post about migrating Wordpress to Gatsby, this was an introduction to Gatsby I know there wasn't much migrating happening in this post but getting a grasp on Gatsby concepts will save you a lot of headache later. Understanding the power it gives you and its limitations is very important. We now have a template blog in which we can use and customize in the future, we will also work on import data from Wordpress later but this is a good starting point on our migration.

Until next time,

Jason
