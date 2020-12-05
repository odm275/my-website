import React from "react"
import Img from "gatsby-image"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import styled from "@emotion/styled"
import colors from "styles/colors"
import { Link, graphql } from "gatsby"
import Button from "components/_ui/Button"
import Layout from "components/Layout"
import parse from "html-react-parser"

// Gatsby Image is weird and    width: 100%;
// height: 85%; in .gatsby-image-wrapper
// help make it work inside the container
const ProjectHeroContainer = styled("div")`
  background: ${colors.grey200};
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
  position: relative;
  padding-top: 2.25em;
  margin-bottom: 3.5em;

  .gatsby-image-wrapper {
    max-width: 600px;
    width: 100%;
    height: 100%;
  }
`

const ProjectTitle = styled("h2")`
  max-width: 550px;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 2rem;
`

const ProjectBody = styled("div")`
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

const WorkLink = styled(Link)`
  margin-top: 3em;
  display: block;
  text-align: center;
`

const Project = ({ project }) => {
  return (
    <>
      <Helmet
      // title={`${project.project_title[0].text} | Prist, Gatsby & Prismic Starter`}
      // titleTemplate={`%s | ${meta.title}`}
      // meta={[
      //     {
      //         name: `description`,
      //         content: meta.description,
      //     },
      //     {
      //         property: `og:title`,
      //         content: `${project.project_title[0].text} | Prist, Gatsby & Prismic Starter`,
      //     },
      //     {
      //         property: `og:description`,
      //         content: meta.description,
      //     },
      //     {
      //         property: `og:type`,
      //         content: `website`,
      //     },
      //     {
      //         name: `twitter:card`,
      //         content: `summary`,
      //     },
      //     {
      //         name: `twitter:creator`,
      //         content: meta.author,
      //     },
      //     {
      //         name: `twitter:title`,
      //         content: meta.title,
      //     },
      //     {
      //         name: `twitter:description`,
      //         content: meta.description,
      //     },
      // ].concat(meta)}
      />
      <Layout>
        <ProjectTitle>{project.title}</ProjectTitle>
        {project.heroImage && (
          <ProjectHeroContainer>
            <Img fluid={project.heroImage.localFile.childImageSharp.fluid} />
          </ProjectHeroContainer>
        )}
        <ProjectBody>
          {parse(project.description)}
          <WorkLink to={"/work"}>
            <Button className="Button--secondary">See other work</Button>
          </WorkLink>
        </ProjectBody>
      </Layout>
    </>
  )
}

export default ({ data }) => {
  // const projectContent = data.prismic.allProjects.edges[0].node
  // const meta = data.site.siteMetadata
  const { title, ACFProjectFields } = data.project
  const props = { title, ...ACFProjectFields }
  return <Project project={props} />
}

export const query = graphql`
  query ProjectQuery($slug: String) {
    project: wpProject(slug: { eq: $slug }) {
      title
      ACFProjectFields {
        description
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
