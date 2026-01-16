import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import Logo from "../images/gulshan-rohra-logo.svg"


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [expertiseOpen, setExpertiseOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
  const handleScroll = () => {
    setIsSticky(window.scrollY > 120);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  const data = useStaticQuery(graphql`
    query HeaderMenuAndExpertise {
      wpMenu(slug: { eq: "header-menu" }) {
        menuItems {
          nodes {
            id
            label
            path
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

  const openExpertise = () => setExpertiseOpen(true)
  const closeExpertise = () => setExpertiseOpen(false)

  const closeMenu = () => {
    setMenuOpen(false)
    setExpertiseOpen(false)
    document.body.classList.remove("no-scroll")
  }

  return (
    <header
  className={`site-header ${menuOpen ? "menu-open" : ""} ${
    isSticky ? "is-sticky" : ""
  }`}
>
      <div className="container header-inner">
        {/* Logo */}
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            <img src={Logo} alt="Heart Icon" width="354" height="103" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="menu-toggle"
          aria-label="Open Menu"
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation */}
        <nav className="main-nav">
          <ul>
            {menuItems.map(item => {
              if (item.label.toLowerCase() === "expertise") {
                return (
                  <li
                    key={item.id}
                    className={`has-dropdown ${expertiseOpen ? "open" : ""}`}
                    onMouseEnter={openExpertise}
                    onMouseLeave={closeExpertise}
                  >
                    {/* 🔥 CLICK → LISTING PAGE */}
                    <Link
                      to="/expertise"
                      className="expertise-toggle"
                      aria-expanded={expertiseOpen}
                      onClick={closeMenu}
                    >
                      Expertise
                      <span className="arrow">
                        <svg
                          width="38"
                          height="35"
                          viewBox="0 0 38 35"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g filter="url(#filter0_d_325_724)">
                            <path
                              d="M12.3082 11.3059C12.5055 11.11 12.7732 11 13.0523 11C13.3314 11 13.599 11.11 13.7964 11.3059L19.0064 16.4779L24.2163 11.3059C24.4148 11.1156 24.6807 11.0103 24.9566 11.0127C25.2326 11.015 25.4966 11.1249 25.6917 11.3186C25.8869 11.5124 25.9976 11.7744 26 12.0484C26.0024 12.3223 25.8963 12.5863 25.7045 12.7833L19.7505 18.6941C19.5531 18.89 19.2854 19 19.0064 19C18.7273 19 18.4596 18.89 18.2622 18.6941L12.3082 12.7833C12.1108 12.5874 12 12.3217 12 12.0446C12 11.7676 12.1108 11.5019 12.3082 11.3059Z"
                              fill="#9E0101"
                            />
                          </g>
                        </svg>
                      </span>
                    </Link>

                    {/* Dropdown */}
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
                  <Link to={item.path} onClick={closeMenu}>
                    {item.label}
                  </Link>
                </li>
              )
            })}

            {/* CTA */}
            <li>
              <Link to="#contact" className="btn-primary" onClick={closeMenu}>
                Reach Out <span></span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
