import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import dimensions from "styles/dimensions"
import Layout from "components/Layout"
import PostCard from "components/PostCard"

const BlogTitle = styled("h1")`
  margin-bottom: 1em;
`

const BlogGrid = styled("div")`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2.5em;

  @media (max-width: 1050px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1.5em;
  }

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    grid-template-columns: 1fr;
    grid-gap: 2.5em;
  }
`

const Blog = ({ posts, meta }) => {
  const postCards = posts.edges.map(({ node }, i) => {
    return (
      <PostCard
        key={i}
        author={node.author}
        category={node.kinds}
        title={node.title}
        date={node.date}
        description={node.ACFPostFields.body}
        uid={node.slug}
      />
    )
  })
  return (
    <>
      <Helmet
        title={meta.title}
        meta={[
          {
            name: `description`,
            content: meta.metaDesc,
          },
          {
            property: `og:title`,
            content: meta.title,
          },
          {
            property: `og:description`,
            content: meta.metaDesc,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          {
            name: `twitter:card`,
            content: `summary`,
          },
          // {
          //   name: `twitter:creator`,
          //   content: meta.author,
          // },
          {
            name: `twitter:title`,
            content: meta.title,
          },
          {
            name: `twitter:description`,
            content: meta.metaDesc,
          },
        ].concat(meta)}
      />
      <Layout>
        <BlogTitle>Blog</BlogTitle>
        <BlogGrid>{postCards}</BlogGrid>
      </Layout>
    </>
  )
}

export default ({ data }) => {
  const posts = data.posts
  const meta = data.blog.seo
  if (!posts) return null

  return <Blog posts={posts} meta={meta} />
}

Blog.propTypes = {
  posts: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired,
}

export const query = graphql`
  query ProjectsQuery {
    blog: wpPage(slug: { eq: "blog" }) {
      seo {
        metaDesc
        metaKeywords
        opengraphAuthor
        title
        twitterDescription
        twitterImage {
          sourceUrl
        }
      }
    }
    posts: allWpPost {
      edges {
        node {
          date
          title
          author {
            node {
              firstName
              lastName
            }
          }
          kinds {
            nodes {
              name
            }
          }
          ACFPostFields {
            body
          }
          slug
        }
      }
    }
  }
`
