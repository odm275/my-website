import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import styled from "@emotion/styled"
import Layout from "components/Layout"
import ProjectCard from "components/ProjectCard"

const WorkTitle = styled("h1")`
  margin-bottom: 1em;
`

const Work = ({ projects, meta }) => {
  const projectCards = projects.map((project, i) => {
    const { title, slug, kinds } = project.node
    const {
      previewThumbnail,
      previewDescription,
    } = project.node.ACFProjectFields

    return (
      <ProjectCard
        key={i}
        category={kinds}
        title={title}
        description={previewDescription}
        thumbnail={previewThumbnail}
        uid={slug}
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
        <WorkTitle>Work</WorkTitle>
        <>{projectCards}</>
      </Layout>
    </>
  )
}

export default ({ data }) => {
  const projects = data.projects.edges
  const meta = data.work.seo
  if (!projects) return null

  return <Work projects={projects} meta={meta} />
}

Work.propTypes = {
  projects: PropTypes.array.isRequired,
}

export const query = graphql`
  query WorkPage {
    work: wpPage(slug: { eq: "work" }) {
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
    projects: allWpProject {
      edges {
        node {
          slug
          title
          kinds {
            nodes {
              name
            }
          }
          ACFProjectFields {
            description
            previewDescription
            postDate
            previewThumbnail {
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
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
    }
  }
`
