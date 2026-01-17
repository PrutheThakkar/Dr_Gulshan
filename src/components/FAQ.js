import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"

const FaqSection = ({ limit = null }) => {
  const [activeIndex, setActiveIndex] = useState(null)

  const data = useStaticQuery(graphql`
    query FaqSectionQuery {
      allWpFaq {
        nodes {
          faqSectionNew {
            faq {
              faqQuestion
              faqAnswer
            }
          }
        }
      }
    }
  `)

  let faqs =
    data?.allWpFaq?.nodes?.flatMap(
      node => node?.faqSectionNew?.faq || []
    ) || []

  // ✅ LIMIT HANDLING
  if (limit) {
    faqs = faqs.slice(0, limit)
  }

  if (faqs.length === 0) return null

  const handleClick = index => {
    setActiveIndex(prev => (prev === index ? null : index))
  }

  return (
    <section className="faq-section">
      <div className="container">
        <div className="section-header">
          <span className="subtitle">WHAT PEOPLE</span>
          <h2 className="title">Usually Asked</h2>
        </div>

        <ul className="faq-list">
          {faqs.map((item, index) => (
            <li
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
            >
              <div
                className="faq-question"
                onClick={() => handleClick(index)}
              >
                <span>{item.faqQuestion}</span>
                <div className="faq-icon"></div>
              </div>

              <div className="faq-answer">
                <p>{item.faqAnswer}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default FaqSection
