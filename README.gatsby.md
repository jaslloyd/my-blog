Welcome back, today I am going to be discussing Gatsby and specifically how to create a Gatsby blog. I am going to be migrating this blog from WordPress to Gatsby in the near future so I taught it would be good to document the process.

What is Gatsby

//TODO: Fill out this section

Requirements
Install the latest Node LTS version here , (we need npm)
Install the Gatsby CLI tool via `npm install -g gatsby-cli`
Create a new Gatsby project using the blog starter as a template: `gatsby new my-blog https://github.com/gatsbyjs/gatsby-starter-blog`
Go to the directory `cd my-blog`
Boot up the live server via `npm start`
Gatsby concepts

Let's dive into the directory structure and how it works in Gatsby

```
├── src
├──── pages
├───── 404.js -> This is the file that will be served when a 404 hits.
├───── index.js -> This is the entry file into our app.
├──── components -> This is where the components that build up our pages go.
├───── layout.js -> Layout components are for sections of a site that you want to share across multiple pages. (Header, Footer, Sidebar, Nav menu etc...)
├──── styles
├───── global.css -> Commonly a place for global styles
├── gatsby-browser.js -> This is a file used by Gatsby, commonly styles(global.css) and Typography are imported here.
├── gatsby-config.js -> This is used for Metadata and for plugins
├── gatsby-node.js
├── gatsby-ssr.js

```

`src/pages/*.js` Any React component defined in here will automatically become a page. e.g `src/pages/about.js` will map to `/about`.

// Pages, CSS, GraphQL for dynamic content.

Data in Gatsby can be considered “everything that lives outside a React component”.

Data can also live in file types like Markdown, CSV, etc. as well as databases and APIs of all sorts.

Gatsby’s data layer lets you pull data from these (and any other source) directly into your components—in the shape and form you want.

There are mainly two ways to pull data into Gatsby:

- createPages API to pull unstructured data into Gatsby pages directly
- GraphQL

Places for Data
`gatsby-config.js`

- `siteMetadata` - This is a place for these common bits of data (siteTitle, decryptions etc)

How to Pull Data into Pages / Components

There are a few ways to pull data from a variety of sources into your pages / components:

- page query - You might have an about page which exports a pageQuery that is a graphql quering for some data e.g:

  ```js
  // About.js
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

  At build time, Gatsby will look through your pages / components and see if it finds an exported graphql string. When it finds it, it will run it and provide the data to the component via Props on the data property.

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

Conclusion

https://egghead.io/lessons/gatsby-add-a-list-of-posts-to-a-gatsby-blog-with-a-graphql-page-query
