import React, { useState, useEffect, useRef } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import gsap from "gsap"
import Logo from "../images/gulshan-rohra-logo.svg"

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [expertiseOpen, setExpertiseOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)

  /* ======================
     CURSOR REFS (ADDED)
  ====================== */
  const cursorRef = useRef(null)
  const magnifierRef = useRef(null)

  /* ======================
     STICKY HEADER (UNCHANGED)
  ====================== */
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 120)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  /* ======================
     PRELOADER LOGIC (ADDED)
  ====================== */
  useEffect(() => {
    if (typeof window === "undefined") return

    const runPreloader = () => {
      const preloader = document.getElementById("preloader")
      if (!preloader) return

      setTimeout(() => {
        preloader.classList.add("open")

        setTimeout(() => {
          preloader.style.display = "none"
          if (window.lenis) window.lenis.start()
        }, 1300)

      }, 900)
    }

    if (document.readyState === "complete") {
      runPreloader()
    } else {
      window.addEventListener("load", runPreloader)
    }

    return () => window.removeEventListener("load", runPreloader)
  }, [])

  /* ======================
     CUSTOM CURSOR LOGIC (ADDED)
  ====================== */
  useEffect(() => {
    if (typeof window === "undefined") return

    const cursor = cursorRef.current
    const magnifier = magnifierRef.current
    if (!cursor) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    const setX = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" })
    const setY = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" })

    const setMagX = magnifier
      ? gsap.quickTo(magnifier, "x", { duration: 0.35, ease: "power3.out" })
      : null
    const setMagY = magnifier
      ? gsap.quickTo(magnifier, "y", { duration: 0.35, ease: "power3.out" })
      : null

    const mouseMove = e => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener("mousemove", mouseMove)

    const animate = () => {
      setX(mouseX)
      setY(mouseY)
      if (magnifier) {
        setMagX(mouseX)
        setMagY(mouseY)
      }
      requestAnimationFrame(animate)
    }
    animate()

    const hoverTargets = document.querySelectorAll("a, button, .clickable")

    hoverTargets.forEach(el => {
      el.addEventListener("mouseenter", () => {
        gsap.to(cursor, { scale: 1.5, opacity: 0.5, duration: 0.3 })
      })
      el.addEventListener("mouseleave", () => {
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 })
      })
    })

    return () => window.removeEventListener("mousemove", mouseMove)
  }, [])

  /* ======================
     GRAPHQL DATA (UNCHANGED)
  ====================== */
  const data = useStaticQuery(graphql`
    query HeaderMenuAndExpertise {
      wpMenu(slug: { eq: "header-menu" }) {
        menuItems {
          nodes {
            id
            label
            connectedNode {
              node {
                ... on WpPage {
                  slug
                }
              }
            }
          }
        }
      }
      allWpExpertise {
        edges {
          node {
            id
            title
            slug
          }
        }
      }
    }
  `)

  const menuItems = data?.wpMenu?.menuItems?.nodes || []
  const expertiseItems = data?.allWpExpertise?.edges || []

  const mid = Math.ceil(expertiseItems.length / 2)
  const firstColumn = expertiseItems.slice(0, mid)
  const secondColumn = expertiseItems.slice(mid)

  const toggleMenu = () => {
    setMenuOpen(prev => !prev)
    document.body.classList.toggle("no-scroll")
  }

  const closeMenu = () => {
    setMenuOpen(false)
    setExpertiseOpen(false)
    document.body.classList.remove("no-scroll")
  }

  return (
    <>
      {/* ================= CURSOR (ADDED) ================= */}
      <div className="image-cursor" ref={cursorRef}>
        <img
          src="https://darkblue-cat-525235.hostingersite.com/wp-content/uploads/2026/01/cursor-red.png"
          alt="cursor"
        />
      </div>
      <div className="magnifier" ref={magnifierRef}></div>

      {/* ================= PRELOADER (ADDED) ================= */}
      <div id="preloader">
        <div className="curtain curtain-left"></div>
        <div className="curtain curtain-right"></div>

        <div className="preloader-inner">
          <div className="ecg">
            <span></span>
          </div>
          <p className="loading-text">Loading...</p>
        </div>
      </div>

      {/* ================= ORIGINAL HEADER (UNCHANGED) ================= */}
      <header className={`site-header ${isSticky ? "is-sticky" : ""}`}>
        {/* 🔴 YOUR ORIGINAL CODE CONTINUES EXACTLY AS-IS 🔴 */}

      <div className="container header-inner">
        {/* LOGO */}
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            <img src={Logo} alt="Gulshan Rohra" />
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        {/* MOBILE TOGGLE */}
        <div
          className={`menu-toggle ${menuOpen ? "clicked" : ""}`}
          onClick={toggleMenu}
        >
          <span></span><span></span><span></span>
        </div>

        {/* ================= DESKTOP MENU ================= */}
        <nav className="main-nav desktop-menu">
          <ul>
            {menuItems.map(item => {
              const slug = item.connectedNode?.node?.slug

              // Expertise dropdown
              if (item.label.toLowerCase() === "expertise") {
                return (
                  <li
                    key={item.id}
                    className={`has-dropdown ${expertiseOpen ? "open" : ""}`}
                    onMouseEnter={() => {
                      if (window.innerWidth >= 992) setExpertiseOpen(true)
                    }}
                    onMouseLeave={() => {
                      if (window.innerWidth >= 992) setExpertiseOpen(false)
                    }}
                  >
                    <Link
                      to="/expertise"
                      className="expertise-toggle"
                      onClick={closeMenu}
                    >
                      Expertise
                      <span class="arrow">
                        <svg width="38" height="35" viewBox="0 0 38 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g filter="url(#filter0_d_325_724)">
                            <path
                              d="M12.3082 11.3059C12.5055 11.11 12.7732 11 13.0523 11C13.3314 11 13.599 11.11 13.7964 11.3059L19.0064 16.4779L24.2163 11.3059C24.4148 11.1156 24.6807 11.0103 24.9566 11.0127C25.2326 11.015 25.4966 11.1249 25.6917 11.3186C25.8869 11.5124 25.9976 11.7744 26 12.0484C26.0024 12.3223 25.8963 12.5863 25.7045 12.7833L19.7505 18.6941C19.5531 18.89 19.2854 19 19.0064 19C18.7273 19 18.4596 18.89 18.2622 18.6941L12.3082 12.7833C12.1108 12.5874 12 12.3217 12 12.0446C12 11.7676 12.1108 11.5019 12.3082 11.3059Z"
                              fill="#9E0101" />
                          </g>
                          <defs>
                            <filter id="filter0_d_325_724" x="0" y="3" width="38" height="32" filterUnits="userSpaceOnUse"
                              color-interpolation-filters="sRGB">
                              <feFlood flood-opacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha" />
                              <feOffset dy="4" />
                              <feGaussianBlur stdDeviation="6" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_325_724" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_325_724" result="shape" />
                            </filter>
                          </defs>
                        </svg>

                      </span>
                    </Link>

                    <div className="expertise-dropdown">
                      <div className="dropdown-inner">
                        <div className="column">
                          {firstColumn.map(({ node }) => (
                            <Link
                              key={node.id}
                              to={`/expertise/${node.slug}`}
                              onClick={closeMenu}
                            >
                              {node.title}
                            </Link>
                          ))}
                        </div>

                        <div className="column">
                          {secondColumn.map(({ node }) => (
                            <Link
                              key={node.id}
                              to={`/expertise/${node.slug}`}
                              onClick={closeMenu}
                            >

                              {node.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                )
              }

              return (
                <li key={item.id}>
                  <Link to={slug === "Home" ? "/" : `/${slug}`}>
                    {item.label}
                  </Link>
                </li>
              )
            })}

            <li>
              <Link to="/contact-us" className="btn-primary">
                Reach Out
                <span></span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* ================= MOBILE MENU ================= */}
        {/* ================= MOBILE MENU ================= */}
        <nav className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <ul>
            {menuItems.map(item => {
              const slug = item.connectedNode?.node?.slug

              if (item.label.toLowerCase() === "expertise") {
                return (
                  <li
                    key={item.id}
                    className={`mobile-dropdown ${expertiseOpen ? "open" : ""}`}
                  >
                    <button
                      className="mobile-expertise-toggle"
                      onClick={() => setExpertiseOpen(prev => !prev)}
                    >
                      Expertise
                       <span class="arrow">
                        <svg width="38" height="35" viewBox="0 0 38 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g filter="url(#filter0_d_325_724)">
                            <path
                              d="M12.3082 11.3059C12.5055 11.11 12.7732 11 13.0523 11C13.3314 11 13.599 11.11 13.7964 11.3059L19.0064 16.4779L24.2163 11.3059C24.4148 11.1156 24.6807 11.0103 24.9566 11.0127C25.2326 11.015 25.4966 11.1249 25.6917 11.3186C25.8869 11.5124 25.9976 11.7744 26 12.0484C26.0024 12.3223 25.8963 12.5863 25.7045 12.7833L19.7505 18.6941C19.5531 18.89 19.2854 19 19.0064 19C18.7273 19 18.4596 18.89 18.2622 18.6941L12.3082 12.7833C12.1108 12.5874 12 12.3217 12 12.0446C12 11.7676 12.1108 11.5019 12.3082 11.3059Z"
                              fill="#9E0101" />
                          </g>
                          <defs>
                            <filter id="filter0_d_325_724" x="0" y="3" width="38" height="32" filterUnits="userSpaceOnUse"
                              color-interpolation-filters="sRGB">
                              <feFlood flood-opacity="0" result="BackgroundImageFix" />
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha" />
                              <feOffset dy="4" />
                              <feGaussianBlur stdDeviation="6" />
                              <feComposite in2="hardAlpha" operator="out" />
                              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_325_724" />
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_325_724" result="shape" />
                            </filter>
                          </defs>
                        </svg>

                      </span>
                    </button>

                    {/* ALWAYS RENDERED – REQUIRED FOR SMOOTH ANIMATION */}
                    <div
                      className={`mobile-expertise-list ${expertiseOpen ? "open" : ""
                        }`}
                    >
                      {expertiseItems.map(({ node }) => (
                        <Link
                          key={node.id}
                          to={`/expertise/${node.slug}`}
                          onClick={() => {
                            setExpertiseOpen(false)
                            closeMenu()
                          }}
                        >
                          {node.title}
                        </Link>
                      ))}
                    </div>
                  </li>
                )
              }

              return (
                <li key={item.id}>
                  <Link
                    to={slug === "home" ? "/" : `/${slug}`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}

            <li>
              <Link
                to="/contact-us"
                className="btn-primary"
                onClick={closeMenu}
              >
                Reach Out
                <span><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.9418 0.45079C15.8681 0.273128 15.7269 0.131947 15.5492 0.0581664C15.4618 0.0209101 15.3679 0.00114878 15.2729 0H0.731297C0.538463 0 0.353527 0.0766031 0.217173 0.212957C0.080819 0.349311 0.00421586 0.534247 0.00421586 0.727081C0.00421586 0.919915 0.080819 1.10485 0.217173 1.2412C0.353527 1.37756 0.538463 1.45416 0.731297 1.45416H13.5207L0.215069 14.7525C0.146921 14.8201 0.0928307 14.9005 0.0559177 14.9891C0.0190048 15.0777 0 15.1727 0 15.2687C0 15.3647 0.0190048 15.4597 0.0559177 15.5483C0.0928307 15.6369 0.146921 15.7173 0.215069 15.7849C0.282661 15.8531 0.363077 15.9072 0.451678 15.9441C0.54028 15.981 0.635314 16 0.731297 16C0.82728 16 0.922314 15.981 1.01092 15.9441C1.09952 15.9072 1.17993 15.8531 1.24752 15.7849L14.5458 2.47935V15.2687C14.5458 15.4615 14.6224 15.6465 14.7588 15.7828C14.8951 15.9192 15.0801 15.9958 15.2729 15.9958C15.4658 15.9958 15.6507 15.9192 15.787 15.7828C15.9234 15.6465 16 15.4615 16 15.2687V0.727081C15.9989 0.632068 15.9791 0.538202 15.9418 0.45079Z" fill="#F8F3F7"/>
</svg>
</span>
              </Link>
            </li>
          </ul>
        </nav>

      </div>
    </header>
   </>
  )
}

export default Header
