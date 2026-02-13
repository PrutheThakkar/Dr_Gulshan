import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/LayoutNew";

const AboutPage = ({ data }) => {
  const pageNode = data?.allWpPage?.nodes?.[0];
  const aboutData = pageNode?.aboutUs;
  const heroDesktop = pageNode?.insidePageHeroSection?.backgroundImage?.desktop?.node;

  const heroImage = getImage(heroDesktop?.gatsbyImage);
  const gulshanImage = getImage(aboutData?.gulshanImage?.node?.gatsbyImage);

  // Dr. Gulshan Info Section
  const aboutDrImage = getImage(aboutData?.aboutDrImage?.node?.gatsbyImage);
  const aboutDrTitle = aboutData?.aboutDrTitle;
  const aboutDrSubtitle = aboutData?.aboutDrSubtitle;
  const aboutDrParagraph = aboutData?.aboutDrParagraph;

  // For Left Content and Right Image
  const leftContent = aboutData?.leftContent;
  const rightImage = getImage(aboutData?.rightImage?.node?.gatsbyImage);

  // For "Power" section data
  const thePowerSubtitle = aboutData?.thePowerSubtitle;
  const thePowerTitle = aboutData?.thePowerTitle;
  const thePowerList = aboutData?.thePowerList;

  if (!aboutData) {
    return <p>Loading About Page content...</p>;
  }

  return (
    <Layout>
      <>
        {/* ================= HERO SECTION ================= */}
        <section className="inner-hero-sec">
          {/* DESKTOP IMAGE */}
          {heroImage && (
            <GatsbyImage
              image={heroImage}
              alt={heroDesktop?.altText || "About page hero image"}
              className="inner-hero-img desktop-img"
              loading="eager"
            />
          )}

          {/* MOBILE IMAGE (STATIC URL) */}
          <img
            src="https://darkblue-cat-525235.hostingersite.com/wp-content/uploads/2026/01/inside-mobile-image.png" // 👈 your static mobile image path
            alt="About page mobile hero image"
            className="inner-hero-img mobile-img"
            loading="eager"
          />

          <div className="container">
            <div className="page-title">
              <h1>About Us</h1>
            </div>
          </div>
        </section>

        {/* ================= ABOUT DR GULSHAN ROHRA SECTION ================= */}
        <section className="expertise-main-page">
          <div className="inner-container">
            <div className="section-header">
              <span className="subtitle">About Dr. Gulshan Rohra</span>
              <h2 className="title">{aboutDrTitle}</h2> {/* About Dr. Title */}
              <h3 className="subtitle">{aboutDrSubtitle}</h3> {/* About Dr. Subtitle */}
            </div>

            <div className="img-wrap">
              {/* Dr. Image */}
              {aboutDrImage && (
                <GatsbyImage
                  image={aboutDrImage}
                  alt={aboutDrImage?.altText || "Dr. Gulshan Rohra"}
                  className="dr-image"
                  loading="eager"
                />
              )}
              <p className="dr-info">{aboutDrParagraph}</p> {/* About Dr. Paragraph */}
            </div>
          </div>
        </section>


        {/* ================= LEFT CONTENT & RIGHT IMAGE SECTION ================= */}
        <section className="gulshan-img-text-sec">
          <div className="container">
            <div className="left">
              <p>{leftContent}</p> {/* Left Content */}
            </div>
            <div className="right">
              {/* Right Image */}
              {rightImage && (
                <GatsbyImage
                  image={rightImage}
                  alt={aboutData?.rightImage?.node?.altText || "Right section image"}
                  className="right-img"
                  loading="eager"
                />
              )}
            </div>
          </div>
        </section>


        {/* ================= THE POWER SECTION ================= */}
        <section className="the-Right-Surgery">
          <div className="container">
            <div className="section-header">
              <span className="subtitle">{thePowerSubtitle}</span>
              <h2 className="title">{thePowerTitle}</h2>
            </div>

            <ul className="blog-wrapper">
              {thePowerList &&
                thePowerList.map((item, index) => (
                  <li key={index}>
                    {/* Static Image Fallback */}

                    <img
                      src="https://studiosentientdemo.com/wp-content/uploads/2026/02/Heart.png" // Replace with your static image path
                      alt="Static Power List Image"
                      className="power-list-img"
                      loading="eager"
                    />

                    <h3>{item?.title}</h3>
                    <p>{item?.paragraph}</p>
                  </li>
                ))}
            </ul>


            <div className="btn-wrap">
              <h2>Get Expert Guidance</h2>
              <a className="btn-primary" href="/contact-us">
                Book An Appointment
                <span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.9491 0.394441C13.8845 0.238987 13.761 0.115454 13.6056 0.0508956C13.5291 0.0182963 13.4469 0.00100518 13.3638 0H0.639885C0.471155 0 0.309336 0.0670277 0.190026 0.186338C0.0707166 0.305647 0.00368888 0.467466 0.00368888 0.636196C0.00368888 0.804926 0.0707166 0.966744 0.190026 1.08605C0.309336 1.20536 0.471155 1.27239 0.639885 1.27239H11.8306L0.188186 12.9084C0.128556 12.9676 0.0812268 13.0379 0.048928 13.1154C0.0166292 13.193 0 13.2761 0 13.3601C0 13.4441 0.0166292 13.5273 0.048928 13.6048C0.0812268 13.6823 0.128556 13.7527 0.188186 13.8118C0.247328 13.8714 0.317692 13.9188 0.395219 13.9511C0.472745 13.9834 0.555899 14 0.639885 14C0.72387 14 0.807025 13.9834 0.884551 13.9511C0.962077 13.9188 1.03244 13.8714 1.09158 13.8118L12.7276 2.16943V13.3601C12.7276 13.5288 12.7946 13.6907 12.9139 13.81C13.0333 13.9293 13.1951 13.9963 13.3638 13.9963C13.5325 13.9963 13.6944 13.9293 13.8137 13.81C13.933 13.6907 14 13.5288 14 13.3601V0.636196C13.999 0.55306 13.9817 0.470926 13.9491 0.394441Z"
                      fill="#9E0101"
                    ></path>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </section>

      </>
    </Layout>
  );
};



export const query = graphql`
 query MyQuery {
  wpPage(databaseId: {eq: 234}) {
    id
    title
    slug
    seo {
      canonical
      opengraphDescription
      opengraphImage {
        altText
         mediaItemUrl
        height
        width
        mediaType
      }
      opengraphSiteName
      opengraphTitle
      opengraphUrl
      opengraphType
      opengraphModifiedTime
    }
  }
  allWpPage(filter: {databaseId: {eq: 234}}) {
    nodes {
      aboutUs {
        aboutUsTitle
        aboutUsParagraph
        gulshanImage {
          node {
            altText
            gatsbyImage(
              width: 2048
              height: 2048
              quality: 100
              layout: CONSTRAINED
              placeholder: BLURRED
            )
          }
        }
        aboutDrTitle
        aboutDrSubtitle
        aboutDrParagraph
        aboutDrImage {
          node {
            altText
            gatsbyImage(
              height: 777
              width: 1663
              quality: 100
              placeholder: BLURRED
              layout: CONSTRAINED
            )
          }
        }
        leftContent
        rightImage {
          node {
            altText
            gatsbyImage(width: 781, height: 439, layout: CONSTRAINED, placeholder: BLURRED)
          }
        }
        thePowerSubtitle
        thePowerTitle
        thePowerList {
          title
          paragraph
          image {
            node {
              altText
              gatsbyImage(height: 10, width: 10, placeholder: BLURRED, layout: CONSTRAINED)
            }
          }
        }
      }
      insidePageHeroSection {
        backgroundImage {
          desktop {
            node {
              altText
              gatsbyImage(
                width: 1830
                height: 500
                quality: 100
                layout: CONSTRAINED
                placeholder: BLURRED
              )
            }
          }
        }
      }
    }
  }
}
`

export default AboutPage
