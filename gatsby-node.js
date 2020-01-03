const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// Each export in this file will be run by Gatsby.

// Gatsby calls the createPages API (if present) at build time with injected parameters, actions and graphql.
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // This is where the BlogPostTemplate component gets used, it uses the createPath API to create a page in the pages folder.
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Get all the posts returned form the GraphQL Query
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      // All context values are made available to a template’s GraphQL queries as arguments prefaced with $
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // If the plugin being run is MarkdownRemark
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    // This function allows you to create additional fields on nodes created by other plugins.
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
