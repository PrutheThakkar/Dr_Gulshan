import React, { useEffect, useRef } from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import LatestUpdate from "../components/LatestUpdate";
import ExpertiseSection from "../components/ExpertiseSection";
import PatientsDiary from "../components/PatientsDiary";
import GoogleReviews from "../components/GoogleReviews";
import FaqSection from "../components/FAQ";
import Layout from "../components/LayoutNew";
import { initHeroAnimation } from "../Animation/HomeAnimation"

const HomePage = ({ data }) => {
  // const { heroRef, heartRef } = useGsapAnimations();
  const homePage = data?.allWpPage?.nodes?.[0]?.homePage;
  const expertisePosts = data?.allWpExpertise?.edges || []
  const faqs = data?.allWpFaq?.nodes?.[0]?.faqSectionNew?.faq || [];

  const videoRef = useRef(null);
  const videoSectionRef = useRef(null);

     useEffect(() => {
    const cleanup = initHeroAnimation()
    return cleanup
  }, [])


  useEffect(() => {
    if (!videoSectionRef.current || !videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current.play().catch(() => { });
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(videoSectionRef.current);

    return () => observer.disconnect();
  }, []);

  if (!homePage) {
    return <p>Loading homepage content...</p>;
  }

  return (
    <Layout>
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-inner">
          <div className="hero-content">
            <h1>
              {homePage.pageTitle ||
                "Your heart is special, preserve it with us"}
            </h1>
            <p className="sub-title hero-para">
              {homePage.pageSubtitle ||
                "Under the care of Dr. Gulshan Rohra..."}
            </p>
            <Link to={homePage.pageLink || "/about-us"} className="btn-primary">
              Know More <span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.9491 0.394441C13.8845 0.238987 13.761 0.115454 13.6056 0.0508956C13.5291 0.0182963 13.4469 0.00100518 13.3638 0H0.639885C0.471155 0 0.309336 0.0670277 0.190026 0.186338C0.0707166 0.305647 0.00368888 0.467466 0.00368888 0.636196C0.00368888 0.804926 0.0707166 0.966744 0.190026 1.08605C0.309336 1.20536 0.471155 1.27239 0.639885 1.27239H11.8306L0.188186 12.9084C0.128556 12.9676 0.0812268 13.0379 0.048928 13.1154C0.0166292 13.193 0 13.2761 0 13.3601C0 13.4441 0.0166292 13.5273 0.048928 13.6048C0.0812268 13.6823 0.128556 13.7527 0.188186 13.8118C0.247328 13.8714 0.317692 13.9188 0.395219 13.9511C0.472745 13.9834 0.555899 14 0.639885 14C0.72387 14 0.807025 13.9834 0.884551 13.9511C0.962077 13.9188 1.03244 13.8714 1.09158 13.8118L12.7276 2.16943V13.3601C12.7276 13.5288 12.7946 13.6907 12.9139 13.81C13.0333 13.9293 13.1951 13.9963 13.3638 13.9963C13.5325 13.9963 13.6944 13.9293 13.8137 13.81C13.933 13.6907 14 13.5288 14 13.3601V0.636196C13.999 0.55306 13.9817 0.470926 13.9491 0.394441Z"
                fill="#9E0101" />
            </svg>
          </span>
            </Link>
          </div>
          <div className="hero-image">
            <img
              src="https://darkblue-cat-525235.hostingersite.com/wp-content/uploads/2026/01/Comp-1.gif"
              alt="3D Heart Illustration"
              id="heartImage"
              loading="lazy"
            />
          </div>

        </div>
      </section>

      {/* SYMPTOMS SECTION */}
      <section className="symptoms-section pseudo-animate">
        <div className="section-header">
          <span className="subtitle">SIGNS That</span>
          <h2 className="title">Your Heart Needs Attention</h2>
        </div>

        <div className="inner-container">
          <ul className="symptoms-list">
            {homePage.symptoms?.map((item, index) => {
              const image = getImage(item?.symptomsImage?.node);
              if (!image) return null;

              return (
                <li key={index}>
                  <a href="#">
                    <div className="image-icon">
                      <GatsbyImage
                        image={image}
                        alt={item?.symptomsName || "Symptom icon"}
                        
                      />
                    </div>
                    <span>{item?.symptomsName}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className="video-section" ref={videoSectionRef}>
        <div className="inner-container">
          <div className="section-header">
            <span className="subtitle">
              {homePage.drgulshanrohraSubtitle ||
                "CardioThoracic Surgeon"}
            </span>
            <h2 className="title">
              {homePage.drgulshanrohraTitle ||
                "Dr. Gulshan Rohra - Cardiothoracic Surgeon"}
            </h2>
          </div>

          <div className="inner-video-section">
            {homePage.drgulshanrohraVideo?.node?.mediaItemUrl ? (
              <video
                ref={videoRef}
                className="video"
                src={homePage.drgulshanrohraVideo.node.mediaItemUrl}
                muted
                playsInline
                preload="metadata"
                controls
              />
            ) : (
              <div className="video placeholder">Video coming soon</div>
            )}
          </div>
        </div>
      </section>

      {/* OTHER SECTIONS */}
     <ExpertiseSection expertiseData={expertisePosts} />

      <PatientsDiary patientDiary={homePage} />

      <GoogleReviews />

     <LatestUpdate posts={data.allWpPost.edges} />

      {/* FAQ SECTION */}
    <FaqSection limit={4} />

    </Layout>
  );
};

export const query = graphql`
 query MyQuery {
  allWpPage(filter: {databaseId: {eq: 10}}) {
    nodes {
      homePage {
        pageLink
        pageSubtitle
        pageTitle
        symptoms {
          symptomsImage {
            node {
              id
              gatsbyImage(width: 190, height: 190, placeholder: DOMINANT_COLOR, quality: 100)
            }
          }
          symptomsName
        }
        drgulshanrohraTitle
        drgulshanrohraSubtitle
        drgulshanrohraVideo {
          node {
            mediaItemUrl
          }
        }
        expertiseSubtitle
        expertiseTitle
        expertiseSlider {
          title
          sliderImage {
            node {
              id
              gatsbyImage(
                width: 531
                height: 417
                quality: 100
                fit: COVER
                formats: AUTO
                layout: CONSTRAINED
              )
            }
          }
        }
        prePostOperative {
          title
          paragraph
        }
        patientSDiaryTitle
        patientSDiarySubtitle
        videoSection {
          testimonialSubtitle
          testimonialTitle
          testimonialVideo {
            node {
              mediaItemUrl
            }
          }
          testimonialVideoUrl
        }
      }
    }
  }
  allWpPost {
    edges {
      node {
        title
        featuredImage {
          node {
            link
            mediaItemUrl
            altText
          }
        }
      }
    }
  }
  allWpFaq {
  nodes {
    faqSectionNew {
      faq {
        faqAnswer
        faqQuestion
      }
    }
  }
}

 allWpExpertise {
      edges {
        node {
          title
          slug
          featuredImage {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
    }
}
`;

export default HomePage;
