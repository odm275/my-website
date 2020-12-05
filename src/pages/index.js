import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { graphql, Link } from "gatsby"
import styled from "@emotion/styled"
import colors from "styles/colors"
import dimensions from "styles/dimensions"
import Button from "components/_ui/Button"
import About from "components/About"
import Layout from "components/Layout"
import ProjectCard from "components/ProjectCard"
import parse from "html-react-parser"

const Hero = styled("div")`
  padding-top: 2.5em;
  padding-bottom: 3em;
  margin-bottom: 6em;
  max-width: 830px;

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    margin-bottom: 3em;
  }

  h1 {
    margin-bottom: 1em;

    a {
      text-decoration: none;
      transition: all 100ms ease-in-out;

      &:nth-of-type(1) {
        color: ${colors.blue500};
      }
      &:nth-of-type(2) {
        color: ${colors.orange500};
      }
      &:nth-of-type(3) {
        color: ${colors.purple500};
      }
      &:nth-of-type(4) {
        color: ${colors.green500};
      }
      &:nth-of-type(5) {
        color: ${colors.teal500};
      }

      &:hover {
        cursor: pointer;
        transition: all 100ms ease-in-out;

        &:nth-of-type(1) {
          color: ${colors.blue600};
          background-color: ${colors.blue200};
        }
        &:nth-of-type(2) {
          color: ${colors.orange600};
          background-color: ${colors.orange200};
        }
        &:nth-of-type(3) {
          color: ${colors.purple600};
          background-color: ${colors.purple200};
        }
        &:nth-of-type(4) {
          color: ${colors.green600};
          background-color: ${colors.green200};
        }
        &:nth-of-type(5) {
          color: ${colors.teal600};
          background-color: ${colors.teal200};
        }
      }
    }
  }
`

const Section = styled("div")`
  margin-bottom: 10em;
  display: flex;
  flex-direction: column;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    margin-bottom: 4em;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`

const WorkAction = styled(Link)`
  font-weight: 600;
  text-decoration: none;
  color: currentColor;
  transition: all 150ms ease-in-out;
  margin-left: auto;

  @media (max-width: ${dimensions.maxwidthTablet}px) {
    margin: 0 auto;
  }

  span {
    margin-left: 1em;
    transform: translateX(-8px);
    display: inline-block;
    transition: transform 400ms ease-in-out;
  }

  &:hover {
    color: ${colors.blue500};
    transition: all 150ms ease-in-out;

    span {
      transform: translateX(0px);
      opacity: 1;
      transition: transform 150ms ease-in-out;
    }
  }
`

const RenderBody = ({ home, projects, meta }) => {
  const metaDataHelmet = (
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
  )

  const projectCards = projects.map((project, i) => {
    const { title, slug, kinds } = project.node
    const { previewThumbnail, description } = project.node.ACFProjectFields

    return (
      <ProjectCard
        key={i}
        category={kinds}
        title={title}
        description={description}
        thumbnail={previewThumbnail}
        uid={slug}
      />
    )
  })
  const socialMediaLinks = [
    home.socialMedia,
    home.socialMedia2,
    home.socialMedia3,
  ].filter(social => social !== null)

  return (
    <>
      {metaDataHelmet}
      <Hero>
        <div>{parse(home.intro)}</div>

        <a
          href={`mailto:${home.email}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button>Email Me</Button>
        </a>
      </Hero>
      <Section>
        {projectCards}
        <WorkAction to={"/work"}>
          See more work <span>&#8594;</span>
        </WorkAction>
      </Section>
      <Section>
        <div>About</div>
        <About bio={home.about} socialLinks={socialMediaLinks} />
      </Section>
    </>
  )
}

export default ({ data }) => {
  //Required check for no data being returned
  const home = data.homepage.ACFHomepageFields
  const meta = data.homepage.seo
  const projects = data.projects.edges

  if (!home || !projects) return null

  return (
    <Layout>
      <RenderBody home={home} projects={projects} meta={meta} />
    </Layout>
  )
}

RenderBody.propTypes = {
  home: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired,
}

export const query = graphql`
  query homepage {
    homepage: wpPage(slug: { eq: "homepage" }) {
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
      ACFHomepageFields {
        about
        email
        intro
        socialMedia {
          url
          title
          target
        }
        socialMedia2 {
          title
          url
          target
        }
        socialMedia3 {
          target
          url
          title
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
