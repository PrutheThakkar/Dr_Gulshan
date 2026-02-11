import React, { useState } from "react";
import { graphql, navigate } from "gatsby";
import Layout from "../components/LayoutNew";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const WEBSITE_URL = process.env.GATSBY_BASE_URL;
const CF7_FORM_ID = process.env.GATSBY_CF7_FORM_ID || "78"; // post=78 from screenshot

const ContactPage = ({ data }) => {
  const page = data?.allWpPage?.edges?.[0]?.node;

  const heroTitle =
    page?.anotherPageTitle?.pegeTitle || "Trusted Cardiac Surgery Care in Mumbai";

  const sectionSubtitle =
    page?.contactPage?.contactSectionSubtitle || "REACH OUT";

  const sectionTitle =
    page?.contactPage?.contactSectionTitle || "Book an Appointment";

 const mapLink =
  "https://www.google.com/maps?q=Wockhardt%20Hospital%20Mumbai%20Central&output=embed";

  const [formMessage, setFormMessage] = useState("");

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    phone: Yup.string().required("Phone Number is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const handleFormSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      setFormMessage("");

      if (!WEBSITE_URL) {
        setFormMessage("Missing GATSBY_BASE_URL in .env");
        setSubmitting(false);
        return;
      }

      const bodyFormData = new FormData();

      // IMPORTANT: CF7 field names must match CF7 form tags
      bodyFormData.set("first-name", values.firstName);
      bodyFormData.set("last-name", values.lastName);
      bodyFormData.set("phone", values.phone);
      bodyFormData.set("email", values.email);
      bodyFormData.set("message", values.message);
      bodyFormData.set("_wpcf7_unit_tag", `wpcf7-f${CF7_FORM_ID}-o1`);

      const response = await axios.post(
        `${WEBSITE_URL}/wp-json/contact-form-7/v1/contact-forms/${CF7_FORM_ID}/feedback`,
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
          withCredentials: false,
        }
      );

      if (response?.data?.status === "validation_failed") {
        setFormMessage(response?.data?.message || "Validation failed.");
        setSubmitting(false);
        return;
      }

      if (response?.data?.status === "mail_sent") {
        resetForm();
        setSubmitting(false);
        navigate("/thank-you/"); // change to your slug if needed
        return;
      }

      setFormMessage(response?.data?.message || "Something went wrong.");
      setSubmitting(false);
    } catch (error) {
      // ✅ show real error (CORS / forbidden / etc)
      console.error("CF7 submit error:", error);

      const status = error?.response?.status;
      const data = error?.response?.data;
      const msg =
        data?.message ||
        (status ? `Request failed (HTTP ${status})` : "") ||
        error?.message ||
        "Unknown error";

      setFormMessage(msg);
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="inner-hero-sec">
        <div className="container">
          <div className="page-title">
            <h1>{heroTitle}</h1>
          </div>
        </div>
      </section>

      <section className="appointment-section">
        <div className="container">
          <div className="section-header">
            <span className="subtitle">{sectionSubtitle}</span>
            <h2 className="title">{sectionTitle}</h2>
          </div>

          <div className="appointment-grid">
            <div className="appointment-left">
              <ul className="contact-info">
                <li><span className="icon">📞</span><a href="tel:+918447914579">+91 8447914579</a></li>
                <li><span className="icon">✉️</span><a href="mailto:appointment@drgulshanrohra.com">appointment@drgulshanrohra.com</a></li>
                <li><span className="icon">📍</span>Wockhardt Hospital - Mumbai Central</li>
              </ul>

              <div className="map-wrapper">
                <iframe title="map" src={mapLink} loading="lazy"></iframe>
              </div>
            </div>

            <div className="appointment-right">
              <Formik
                initialValues={{ firstName: "", lastName: "", phone: "", email: "", message: "" }}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="appointment-form">
                    <div className="form-group">
                      <label>First Name*</label>
                      <Field type="text" name="firstName" placeholder="Enter First Name" />
                      <ErrorMessage name="firstName" component="div" className="error" />
                    </div>

                    <div className="form-group">
                      <label>Last Name*</label>
                      <Field type="text" name="lastName" placeholder="Enter Last Name" />
                      <ErrorMessage name="lastName" component="div" className="error" />
                    </div>

                    <div className="form-group">
                      <label>Mobile Number*</label>
                      <Field type="tel" name="phone" placeholder="Enter Phone Number" />
                      <ErrorMessage name="phone" component="div" className="error" />
                    </div>

                    <div className="form-group">
                      <label>Mail ID*</label>
                      <Field type="email" name="email" placeholder="Enter Email" />
                      <ErrorMessage name="email" component="div" className="error" />
                    </div>

                    <div className="form-group">
                      <label>Your Message*</label>
                      <Field as="textarea" name="message" rows="3" placeholder="Enter your message" />
                      <ErrorMessage name="message" component="div" className="error" />
                    </div>

                    <div className="btn-wrap">
                      <button type="submit" className="btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Your Message"}
                      </button>
                    </div>

                    {formMessage && (
                      <div className="wpcf7-response-output" style={{ color: "red", marginTop: 12 }}>
                        {formMessage}
                      </div>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          <div className="blob blob-top">
            <img src={require("../images/contact-bubble.png").default} alt="3D Heart Illustration" />
          </div>
          <div className="blob blob-bottom" />
        </div>
      </section>
    </Layout>
  );
};

export const query = graphql`
  query MyQuery {
    allWpPage(filter: { databaseId: { eq: 243 } }) {
      edges {
        node {
          id
          title
          anotherPageTitle { pegeTitle }
          contactPage { contactSectionSubtitle contactSectionTitle mapLink }
        }
      }
    }
  }
`;

export default ContactPage;
