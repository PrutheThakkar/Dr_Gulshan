import React, { useState, useEffect, useRef } from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import gsap from "gsap";
import Logo from "../images/gulshan-rohra-logo.svg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expertiseOpen, setExpertiseOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  /* ====================== CURSOR REFS (ADDED) ====================== */
  const cursorRef = useRef(null);
  const magnifierRef = useRef(null);

  /* ====================== STICKY HEADER (UNCHANGED) ====================== */
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 120);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ====================== PRELOADER LOGIC (ADDED) ====================== */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const runPreloader = () => {
      const preloader = document.getElementById("preloader");
      if (!preloader) return;

      setTimeout(() => {
        preloader.classList.add("open");

        setTimeout(() => {
          preloader.style.display = "none";
          if (window.lenis) window.lenis.start();
        }, 1300);
      }, 900);
    };

    if (document.readyState === "complete") {
      runPreloader();
    } else {
      window.addEventListener("load", runPreloader);
    }

    return () => window.removeEventListener("load", runPreloader);
  }, []);

  /* ====================== CUSTOM CURSOR LOGIC (ADDED) ====================== */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const cursor = cursorRef.current;
    const magnifier = magnifierRef.current;
    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const setX = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
    const setY = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });

    const setMagX = magnifier
      ? gsap.quickTo(magnifier, "x", { duration: 0.35, ease: "power3.out" })
      : null;
    const setMagY = magnifier
      ? gsap.quickTo(magnifier, "y", { duration: 0.35, ease: "power3.out" })
      : null;

    const mouseMove = e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", mouseMove);

    const animate = () => {
      setX(mouseX);
      setY(mouseY);
      if (magnifier) {
        setMagX(mouseX);
        setMagY(mouseY);
      }
      requestAnimationFrame(animate);
    };
    animate();

    const hoverTargets = document.querySelectorAll("a, button, .clickable");

    hoverTargets.forEach(el => {
      el.addEventListener("mouseenter", () => {
        gsap.to(cursor, { scale: 1.5, opacity: 0.5, duration: 0.3 });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
      });
    });

    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  /* ====================== GRAPHQL DATA (UNCHANGED) ====================== */
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
  `);

  const menuItems = data?.wpMenu?.menuItems?.nodes || [];
  const expertiseItems = data?.allWpExpertise?.edges || [];

  const mid = Math.ceil(expertiseItems.length / 2);
  const firstColumn = expertiseItems.slice(0, mid);
  const secondColumn = expertiseItems.slice(mid);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
    document.body.classList.toggle("no-scroll");
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setExpertiseOpen(false);
    document.body.classList.remove("no-scroll");
  };

  return (
    <>
      {/* ================= CURSOR (ADDED) ================= */}
      {/* <div className="image-cursor" ref={cursorRef}>
        <img
          src="https://darkblue-cat-525235.hostingersite.com/wp-content/uploads/2026/01/cursor-red.png"
          alt="cursor"
        />
      </div> */}
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
        <div className="container header-inner">
          {/* LOGO */}
          <div className="logo">
            <Link to="/" onClick={closeMenu}>
              <img src={Logo} alt="Gulshan Rohra" />
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <div
            className={`menu-toggle ${menuOpen ? "clicked" : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* ================= DESKTOP MENU ================= */}
          <nav className="main-nav desktop-menu">
            <ul>
              {menuItems.map(item => {
                const slug = item.connectedNode?.node?.slug;

                // Expertise dropdown
                if (item.label.toLowerCase() === "expertise") {
                  return (
                    <li
                      key={item.id}
                      className={`has-dropdown ${expertiseOpen ? "open" : ""}`}
                      onMouseEnter={() => {
                        if (window.innerWidth >= 992) setExpertiseOpen(true);
                      }}
                      onMouseLeave={() => {
                        if (window.innerWidth >= 992) setExpertiseOpen(false);
                      }}
                    >
                      <Link
                        to="/expertise"
                        className="expertise-toggle"
                        onClick={closeMenu}
                      >
                        Expertise
                        <span className="arrow">
                          {/* Add your arrow SVG icon here */}
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
                  );
                }

                return (
                  <li key={item.id}>
                    <Link
                      to={slug === "home" ? "/" : `/${slug}`} // Update the Home slug to always go to root "/"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
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
          <nav className={`mobile-menu ${menuOpen ? "open" : ""}`}>
            <ul>
              {menuItems.map(item => {
                const slug = item.connectedNode?.node?.slug;

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
                      </button>

                      <div
                        className={`mobile-expertise-list ${expertiseOpen ? "open" : ""}`}
                      >
                        {expertiseItems.map(({ node }) => (
                          <Link
                            key={node.id}
                            to={`/expertise/${node.slug}`}
                            onClick={() => {
                              setExpertiseOpen(false);
                              closeMenu();
                            }}
                          >
                            {node.title}
                          </Link>
                        ))}
                      </div>
                    </li>
                  );
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
                );
              })}

              <li>
                <Link to="/contact-us" className="btn-primary" onClick={closeMenu}>
                  Reach Out
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
