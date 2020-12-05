const path = require("path")

// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors
    }
    return result
  })

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await wrapper(
    graphql(`
      query ProjectQuery {
        projects: allWpProject {
          edges {
            node {
              slug
            }
          }
        }
      }
      query PostsQuery {
        posts: allWpPost {
          edges {
            node {
              slug
            }
          }
        }
      }
    `)
  )

  const projectsList = result.data.projects.edges

  const postsList = result.data.posts.edges

  const projectTemplate = require.resolve("./src/templates/project.jsx")
  const postTemplate = require.resolve("./src/templates/post.jsx")

  projectsList.forEach(({ node: { slug } }) => {
    // The slug you assigned in Wordpress is the slug!
    createPage({
      path: `/work/${slug}`,
      component: projectTemplate,
      context: {
        // Pass the unique slug through context so the template can filter by it
        slug,
      },
    })
  })

  postsList.forEach(({ node: { slug } }) => {
    // The slug you assigned in Wordpress is the slug!
    createPage({
      path: `/blog/${slug}`,
      component: postTemplate,
      context: {
        // Pass the unique slug through context so the template can filter by it
        slug,
      },
    })
  })
}
