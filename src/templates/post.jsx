import React from "react"
import Img from "gatsby-image"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import Moment from "react-moment"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import styled from "@emotion/styled"
import colors from "styles/colors"
import Layout from "components/Layout"
import parse from "html-react-parser"

const PostHeroContainer = styled("div")`
  max-height: 500px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 3em;

  img {
    width: 100%;
  }
`

const PostHeroAnnotation = styled("div")`
  padding-top: 0.25em;

  p {
    text-align: right;
    color: ${colors.grey600};
    font-weight: 400;
    font-size: 0.85rem;
  }

  a {
    color: currentColor;
  }
`

const PostCategory = styled("div")`
  margin-right: 2rem;
  font-weight: 600;
  color: ${colors.grey600};
`

const PostTitle = styled("h1")`
  max-width: 550px;
  margin: 0 auto;
  text-align: center;
`

const PostBody = styled("div")`
  max-width: 550px;
  margin: 0 auto;

  .block-img {
    margin-top: 3.5em;
    margin-bottom: 0.5em;

    img {
      width: 100%;
    }
  }
`

const PostMetas = styled("div")`
  max-width: 550px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  margin-bottom: 2em;
  justify-content: space-between;
  font-size: 0.85em;
  color: ${colors.grey600};
`

const PostAuthor = styled("div")`
  margin: 0;
`

const PostDate = styled("div")`
  margin: 0;
`

const PostCategoryContainer = styled("div")`
  display: flex;

  .category-container__category {
  }
`

const Post = ({ post, meta }) => {
  const postCategories = post.kinds.nodes.map(kind => (
    <PostCategory className="category-container__category">
      {kind.name}
    </PostCategory>
  ))
  return (
    <>
      <Helmet
      // title={`${post.post_title[0].text} | Prist, Gatsby & Prismic Starter`}
      // titleTemplate={`%s | ${meta.title}`}
      // meta={[
      //   {
      //     name: `description`,
      //     content: meta.description,
      //   },
      //   {
      //     property: `og:title`,
      //     content: `${post.post_title[0].text} | Prist, Gatsby & Prismic Starter`,
      //   },
      //   {
      //     property: `og:description`,
      //     content: meta.description,
      //   },
      //   {
      //     property: `og:type`,
      //     content: `website`,
      //   },
      //   {
      //     name: `twitter:card`,
      //     content: `summary`,
      //   },
      //   {
      //     name: `twitter:creator`,
      //     content: meta.author,
      //   },
      //   {
      //     name: `twitter:title`,
      //     content: meta.title,
      //   },
      //   {
      //     name: `twitter:description`,
      //     content: meta.description,
      //   },
      // ].concat(meta)}
      />
      <Layout>
        <PostCategoryContainer className="category-container">
          {postCategories}
        </PostCategoryContainer>
        <PostTitle>{post.title}</PostTitle>
        <PostMetas>
          <PostAuthor>{post.post_author}</PostAuthor>
          <PostDate>
            <Moment format="MMMM D, YYYY">{post.date}</Moment>
          </PostDate>
        </PostMetas>
        {post.heroImage && (
          <PostHeroContainer>
            <Img fluid={post.heroImage.localFile.childImageSharp.fluid} />
            <PostHeroAnnotation>
              {parse(post.heroAnnotation)}
            </PostHeroAnnotation>
          </PostHeroContainer>
        )}
        <PostBody>{parse(post.body)}</PostBody>
      </Layout>
    </>
  )
}

export default ({ data }) => {
  const { ACFPostFields, author, kinds, title, date } = data.post
  const postContent = { author, kinds, title, date, ...ACFPostFields }
  return <Post post={postContent} />
}

export const query = graphql`
  query PostQuery($slug: String) {
    post: wpPost(slug: { eq: $slug }) {
      title
      date
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
        previewDescription
        heroAnnotation
        heroImage {
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
