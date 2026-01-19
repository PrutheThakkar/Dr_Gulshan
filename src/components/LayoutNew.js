import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"

import Header from "./HeaderNew"
import Footer from "./FooterNew"
// import Preloader from "./preloader"

import "../css/about.css"
import "../css/blog.css"
import "../css/common.css"
import "../css/contact.css"
import "../css/expertise.css"
import "../css/home.css"
import "../css/ui-fixer.css"
import "../css/google-reviews.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  useEffect(() => {
    if (typeof window === "undefined") return

    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      {/* <Preloader /> */}
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <main id="smooth-wrapper">{children}</main>
      <Footer />
    </>
  )
}

export default Layout
