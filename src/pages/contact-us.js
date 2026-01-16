import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/LayoutNew";

const ContactPage = ({ data }) => {
  const page = data?.allWpPage?.edges?.[0]?.node

  const heroTitle =
    page?.anotherPageTitle?.pegeTitle ||
    "Trusted Cardiac Surgery Care in Mumbai"

  const sectionSubtitle =
    page?.contactPage?.contactSectionSubtitle || "REACH OUT"

  const sectionTitle =
    page?.contactPage?.contactSectionTitle || "Book an Appointment"

  const mapLink =
    page?.contactPage?.mapLink ||
    "https://www.google.com/maps?q=Wockhardt%20Hospital%20Mumbai%20Central&output=embed"

  return (
  
<Layout>
      {/* ================= HERO SECTION ================= */}
      <section className="inner-hero-sec">
        <div className="container">

          <div className="page-title">
            <h1>{heroTitle}</h1>
          </div>

        </div>
      </section>

      {/* ================= APPOINTMENT SECTION ================= */}
      <section className="appointment-section">
        <div className="container">

          {/* Header */}
          <div className="section-header">
            <span className="subtitle">{sectionSubtitle}</span>
            <h2 className="title">{sectionTitle}</h2>
          </div>

          <div className="appointment-grid">

            {/* LEFT SIDE */}
            <div className="appointment-left">

              <ul className="contact-info">
                <li>
                  <span className="icon">📞</span>
                  <a href="tel:+918447914579">+91 8447914579</a>
                </li>

                <li>
                  <span className="icon">✉️</span>
                  <a href="mailto:appointment@drgulshanrohra.com">
                    appointment@drgulshanrohra.com
                  </a>
                </li>

                <li>
                  <span className="icon">📍</span>
                  Wockhardt Hospital - Mumbai Central
                </li>
              </ul>

              {/* MAP */}
              <div className="map-wrapper">
                <iframe src="https://www.google.com/maps?q=Wockhardt%20Hospital%20Mumbai%20Central&output=embed"
                            loading="lazy">
                        </iframe>
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="appointment-right">
              <form className="appointment-form">

                <div className="form-group">
                  <label>First Name*</label>
                  <input type="text" required />
                </div>

                <div className="form-group">
                  <label>Last Name*</label>
                  <input type="text" required />
                </div>

                <div className="form-group">
                  <label>Mobile Number*</label>
                  <input type="tel" required />
                </div>

                <div className="form-group">
                  <label>Mail ID*</label>
                  <input type="email" required />
                </div>

                <div className="form-group">
                  <label>Your Message*</label>
                  <textarea rows="3" required />
                </div>

                <div className="btn-wrap">
                <a class="btn-primary" href="#">Send Your Message<span>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M13.9491 0.394441C13.8845 0.238987 13.761 0.115454 13.6056 0.0508956C13.5291 0.0182963 13.4469 0.00100518 13.3638 0H0.639885C0.471155 0 0.309336 0.0670277 0.190026 0.186338C0.0707166 0.305647 0.00368888 0.467466 0.00368888 0.636196C0.00368888 0.804926 0.0707166 0.966744 0.190026 1.08605C0.309336 1.20536 0.471155 1.27239 0.639885 1.27239H11.8306L0.188186 12.9084C0.128556 12.9676 0.0812268 13.0379 0.048928 13.1154C0.0166292 13.193 0 13.2761 0 13.3601C0 13.4441 0.0166292 13.5273 0.048928 13.6048C0.0812268 13.6823 0.128556 13.7527 0.188186 13.8118C0.247328 13.8714 0.317692 13.9188 0.395219 13.9511C0.472745 13.9834 0.555899 14 0.639885 14C0.72387 14 0.807025 13.9834 0.884551 13.9511C0.962077 13.9188 1.03244 13.8714 1.09158 13.8118L12.7276 2.16943V13.3601C12.7276 13.5288 12.7946 13.6907 12.9139 13.81C13.0333 13.9293 13.1951 13.9963 13.3638 13.9963C13.5325 13.9963 13.6944 13.9293 13.8137 13.81C13.933 13.6907 14 13.5288 14 13.3601V0.636196C13.999 0.55306 13.9817 0.470926 13.9491 0.394441Z"
                                            fill="#9E0101" />
                                    </svg>

                                </span></a>
                </div>

              </form>
            </div>

          </div>

          {/* Decorative blobs */}
          <div className="blob blob-top">
             <img
              src={require("../images/contact-bubble.png").default}
              alt="3D Heart Illustration"
             
            />
          </div>
          <div className="blob blob-bottom" />

        </div>
      </section>

   </Layout>
  )
}

export const query = graphql`
  query MyQuery {
    allWpPage(filter: { databaseId: { eq: 243 } }) {
      edges {
        node {
          id
          title
          anotherPageTitle {
            pegeTitle
          }
          contactPage {
            contactSectionSubtitle
            contactSectionTitle
            mapLink
          }
        }
      }
    }
  }
`


export default ContactPage
