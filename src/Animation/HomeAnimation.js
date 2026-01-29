import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export const initHeroAnimation = () => {
  // ✅ Gatsby SSR safety
  if (typeof window === "undefined") return

  gsap.registerPlugin(ScrollTrigger)

  /* =========================
     RESPONSIVE HELPER
  ========================= */
  const isMobile = () => window.innerWidth <= 768
  const isTablet = () => window.innerWidth > 768 && window.innerWidth <= 1024
  const isDesktop = () => window.innerWidth > 1024

  // Get trigger points based on device
  const getTriggerStart = (desktopValue, mobileValue) => {
    return isMobile() ? mobileValue : desktopValue
  }

  // Mobile: Sequential triggers - each section starts when previous ends
  // Desktop: Standard scroll triggers
  const getSequentialTrigger = (sectionClass, desktopStart = "top 95%") => {
    if (isMobile()) {
      // For mobile, trigger when section reaches center of viewport
      return "-10% 90%"
    }
    return desktopStart
  }

  /* =========================
     ELEMENTS (SAFE QUERIES)
  ========================= */
  const heading = document.querySelector(".hero-section h1")
  const para = document.querySelector(".hero-para")
  const heart = document.getElementById("heartImage")
  const heroImage = document.querySelector(".hero-image")

  if (!heading) return

  /* =========================
     SPLIT H1 INTO LETTERS
  ========================= */
  const headingText = heading.textContent.trim()
  heading.textContent = ""

  headingText.split("").forEach(char => {
    if (char === " ") {
      heading.append(" ")
    } else {
      const span = document.createElement("span")
      span.classList.add("char")
      span.textContent = char
      heading.appendChild(span)
    }
  })

  /* =========================
     SPLIT PARAGRAPH INTO WORDS
  ========================= */
  if (para && para.textContent.trim()) {
    const paraText = para.textContent.trim()
    para.textContent = ""

    paraText.split(" ").forEach(word => {
      const span = document.createElement("span")
      span.classList.add("word")
      span.innerHTML = `${word}&nbsp;`
      para.appendChild(span)
    })
  }

  /* =========================
     INITIAL STATES
  ========================= */
  gsap.set(".site-header", { y: -80, opacity: 0 })
  gsap.set(".main-nav ul li", { y: -20, opacity: 0 })

  gsap.set(".char", {
    y: 20,
    opacity: 0,
    scale: 1.02,
    filter: "blur(4px)",
    transformOrigin: "50% 50%"
  })

  gsap.set(".hero-para .word", {
    opacity: 0,
    y: 8,
    color: "#d3d3d3"
  })

  gsap.set(".hero-section .btn-primary", {
    y: 20,
    opacity: 0,
    scale: 0.95
  })

  if (heart) {
    gsap.set(heart, {
      scale: 0.6,
      opacity: 0,
      y: 30
    })
  }

  /* =========================
     HERO TIMELINE (SECTION 1)
  ========================= */
  const heroTL = gsap.timeline({ delay: 0.3 })

  heroTL
    .to(".site-header", {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    })
    .to(".main-nav ul li", {
      y: 0,
      opacity: 1,
      stagger: 0.08,
      duration: 0.4,
      ease: "power3.out"
    }, "-=0.6")
    .to(".char", {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      stagger: 0.03,
      duration: 0.9,
      ease: "power3.out"
    })
    .to(".hero-para .word", {
      opacity: 1,
      y: 0,
      color: "#3f3f3f",
      stagger: 0.04,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.8")
    .to(".hero-section .btn-primary", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.6)"
    }, "-=0")

  if (heart) {
    heroTL.to(heart, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    }, "-=1.3")

    /* =========================
       HEART FLOAT (Desktop only)
    ========================= */
    if (isDesktop()) {
      gsap.to(heart, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })
    }
  }

  /* =========================
     MOUSE MOVE PARALLAX (Desktop only)
  ========================= */
  let onMove = null
  let onLeave = null

  if (heart && heroImage && isDesktop()) {
    onMove = (e) => {
      const rect = heroImage.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const moveX = (x - rect.width / 2) / 12
      const moveY = (y - rect.height / 2) / 12

      gsap.to(heart, {
        x: moveX,
        y: moveY,
        rotateY: moveX * 0.4,
        rotateX: -moveY * 0.4,
        scale: 1.05,
        duration: 0.4,
        ease: "power3.out"
      })
    }

    onLeave = () => {
      gsap.to(heart, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out"
      })
    }

    heroImage.addEventListener("mousemove", onMove)
    heroImage.addEventListener("mouseleave", onLeave)
  }

  /* =====================================================
     2. SYMPTOMS SECTION (SMOOTH + BLUR REVEAL)
     Mobile: Animates right after hero (both visible on screen)
     Desktop: Standard scroll trigger
  ===================================================== */
  if (document.querySelector(".symptoms-section")) {
    if (isMobile()) {
      // On mobile, add to hero timeline since both sections are visible
      heroTL
        .from(".symptoms-section", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=1") // Start 0.2s after hero completes
        .fromTo(
          ".symptoms-section .title",
          { 
            y: 20, 
            opacity: 0, 
            filter: "blur(3px)"
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.5,
            ease: "power2.out"
          },
          "-=0.4"
        )
        .fromTo(
          ".symptoms-section .subtitle",
          { 
            y: 15, 
            opacity: 0, 
            filter: "blur(2px)"
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.5,
            ease: "power2.out"
          },
          "-=0.3"
        )
        .from(".symptoms-section .symptoms-list li", {
          y: 10,
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.08
        }, "-=0.3")
    } else {
      // Desktop: separate scroll-triggered timeline
      gsap.timeline({
        scrollTrigger: {
          trigger: ".symptoms-section",
          start: "80% 95%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        }
      })
        .from(".symptoms-section", {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power2.out"
        })
        .fromTo(
          ".symptoms-section .title",
          { 
            y: 40, 
            opacity: 0, 
            filter: "blur(8px)" 
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.7,
            ease: "power2.out"
          },
          "-=0.4"
        )
        .fromTo(
          ".symptoms-section .subtitle",
          { 
            y: 35, 
            opacity: 0, 
            filter: "blur(6px)" 
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.7,
            ease: "power2.out"
          },
          "-=0.3"
        )
        .from(".symptoms-section .symptoms-list li", {
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.15
        }, "-=0.3")
    }
  }

  /* =====================================================
     3. VIDEO SECTION (SMOOTH + BLUR REVEAL)
  ===================================================== */
  if (document.querySelector(".video-section")) {
    gsap.timeline({
      scrollTrigger: {
        trigger: ".video-section",
        start: getSequentialTrigger(".video-section", "top 80%"),
        end: isMobile() ? "bottom 60%" : "bottom 20%",
        toggleActions: "play none none none"
      }
    })
      .fromTo(
        ".video-section .title",
        {
          y: isMobile() ? 20 : 40,
          opacity: 0,
          filter: isMobile() ? "blur(3px)" : "blur(8px)"
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: isMobile() ? 0.5 : 0.7,
          ease: "power2.out"
        }
      )
      .fromTo(
        ".video-section .subtitle",
        {
          y: isMobile() ? 15 : 30,
          opacity: 0,
          filter: isMobile() ? "blur(2px)" : "blur(6px)"
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: isMobile() ? 0.5 : 0.7,
          ease: "power2.out"
        },
        "-=0.3"
      )
      .fromTo(
        ".video-section .inner-video-section",
        {
          clipPath: isMobile() 
            ? "polygon(20% 30%, 80% 30%, 80% 70%, 20% 70%)" 
            : "polygon(32% 35%, 69% 35%, 69% 66%, 32% 66%)",
          opacity: 0,
          y: isMobile() ? 30 : 80
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          opacity: 1,
          y: 0,
          duration: isMobile() ? 0.8 : 1,
          ease: "power2.out"
        },
        "-=0.3"
      )
  }

  /* =====================================================
     4. EXPERTISE SLIDER (SMOOTH + BLUR)
  ===================================================== */
  if (document.querySelector(".expertise-slider")) {
    gsap.timeline({
      scrollTrigger: {
        trigger: ".expertise-slider",
        start: getSequentialTrigger(".expertise-slider", "top 80%"),
        end: isMobile() ? "bottom 60%" : "bottom 20%",
        toggleActions: "play none none none"
      }
    })
      .fromTo(
        ".expertise-slider .title",
        {
          y: isMobile() ? 20 : 35,
          opacity: 0,
          filter: isMobile() ? "blur(3px)" : "blur(8px)"
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: isMobile() ? 0.5 : 0.7,
          ease: "power2.out"
        }
      )
      .fromTo(
        ".expertise-slider .subtitle",
        {
          y: isMobile() ? 15 : 30,
          opacity: 0,
          filter: isMobile() ? "blur(2px)" : "blur(6px)"
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: isMobile() ? 0.5 : 0.7,
          ease: "power2.out"
        },
        "-=0.3"
      )
      .from(
        ".expertise-slider .treatments-care",
        {
          opacity: 0,
          duration: isMobile() ? 0.4 : 0.6,
          ease: "power2.out"
        },
        "-=0.2"
      )
      .fromTo(
        ".treatments-care .care-card",
        {
          x: isMobile() ? 0 : (i) => (i % 2 === 0 ? -60 : 60),
          y: isMobile() ? 20 : 0,
          opacity: 0,
          scale: 0.96
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: isMobile() ? 0.5 : 0.7,
          ease: "power2.out",
          stagger: isMobile() ? 0.06 : 0.12
        },
        "-=0.5"
      )
  }

  /* =====================================================
     EXPERTISE SWIPER
  ===================================================== */
  if (document.querySelector(".expertise-Swiper")) {
    gsap.set(".expertise-Swiper .expertise-card", {
      y: isMobile() ? 30 : 60,
      opacity: 0,
      scale: 0.95,
      rotationX: isMobile() ? 0 : -10,
      transformPerspective: 800
    })

    gsap.timeline({
      scrollTrigger: {
        trigger: ".expertise-Swiper",
        start: getSequentialTrigger(".expertise-Swiper", "top 75%"),
        end: isMobile() ? "bottom 60%" : "bottom 20%",
        toggleActions: "play none none none"
      }
    }).to(".expertise-Swiper .expertise-card", {
      y: 0,
      opacity: 1,
      scale: 1,
      rotationX: 0,
      duration: isMobile() ? 0.5 : 0.7,
      ease: "power3.out",
      stagger: isMobile() ? 0.1 : 0.2
    })
  }

  /* =================================================
     5. PATIENTS SWIPER (SMOOTH + BLUR)
  ================================================= */
  const patientsSection = document.querySelector(".patients-diary")
  if (patientsSection) {
    const patients = gsap.timeline({
      scrollTrigger: {
        trigger: ".patients-diary",
        start: getSequentialTrigger(".patients-diary", "top 85%"),
        end: isMobile() ? "bottom 60%" : "bottom 20%",
        toggleActions: "play none none none"
      }
    })

    patients
      .from(".patients-diary", {
        y: isMobile() ? 30 : 80,
        opacity: 0,
        duration: isMobile() ? 0.6 : 1,
        ease: "power2.out"
      })
      .fromTo(
        ".patients-diary .title",
        {
          y: isMobile() ? 20 : 35,
          opacity: 0,
          filter: isMobile() ? "blur(3px)" : "blur(8px)"
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: isMobile() ? 0.5 : 0.7,
          ease: "power2.out"
        },
        "-=0.3"
      )
      .fromTo(
        ".patients-diary .subtitle",
        {
          y: isMobile() ? 15 : 30,
          opacity: 0,
          filter: isMobile() ? "blur(2px)" : "blur(6px)"
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: isMobile() ? 0.5 : 0.7,
          ease: "power2.out"
        },
        "-=0.3"
      )
      .fromTo(
        ".patients-diary .swiper-slide",
        {
          rotationY: 0,
          opacity: 0,
          scale: 0.95,
          y: isMobile() ? 20 : 30,
          transformPerspective: 1000
        },
        {
          rotationY: 0,
          opacity: 1,
          scale: 1,
          y: 0,
          duration: isMobile() ? 0.5 : 0.8,
          ease: "power2.out",
          stagger: isMobile() ? 0.1 : 0.2
        },
        "-=0.3"
      )
  }

  /* ==============================
     6. GOOGLE REVIEWS SECTION (SMOOTH MEDICAL MOTION)
  ============================== */
  const googleReviewsSection = document.querySelector(".google-reviews")
  if (googleReviewsSection) {
    const googleReviewsTL = gsap.timeline({
      scrollTrigger: {
        trigger: ".google-reviews",
        start: getSequentialTrigger(".google-reviews", "top 85%"),
        end: isMobile() ? "bottom 60%" : "bottom 20%",
        toggleActions: "play none none none"
      }
    })

    googleReviewsTL
      .fromTo(
        ".google-reviews .reviews-header",
        {
          opacity: 0,
          y: isMobile() ? 20 : 40,
          filter: isMobile() ? "blur(3px)" : "blur(8px)"
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: isMobile() ? 0.5 : 0.7,
          ease: "power2.out"
        }
      )
      .from(
        ".google-reviews .review-card",
        {
          opacity: 0,
          scale: 0.96,
          y: isMobile() ? 15 : 30,
          stagger: isMobile() ? 0.08 : 0.15,
          duration: isMobile() ? 0.5 : 0.7,
          ease: "power2.out"
        },
        "-=0.3"
      )
      .to(
        ".google-reviews .stars",
        {
          scale: 1.04,
          duration: 0.5,
          ease: "power1.inOut",
          yoyo: true,
          repeat: 1
        },
        "-=0.3"
      )

    // Gradient background (Desktop only for better performance)
    if (isDesktop()) {
      gsap.to(".google-reviews .scroll-review-shadow", {
        width: "100%",
        scaleX: 1.02,
        boxShadow: "0 10px 25px rgba(237, 83, 83, 0.12)",
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".google-reviews",
          start: "top 90%",
          end: "top 30%",
          scrub: 0.8
        }
      })
    }

    // Pink line progress
    gsap.to(".google-reviews .pink-line", {
      width: "100%",
      boxShadow: "0 0 10px rgba(255, 107, 107, 0.5)",
      duration: isMobile() ? 0.8 : 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".google-reviews",
        start: getSequentialTrigger(".google-reviews", "top 85%"),
        end: isMobile() ? "bottom 60%" : "top 25%",
        scrub: isMobile() ? 0.3 : 0.6
      }
    })

    // Review cards parallax (Desktop only)
    if (isDesktop()) {
      ScrollTrigger.create({
        trigger: ".google-review-swiper",
        start: "top 65%",
        end: "bottom 40%",
        scrub: true,
        onUpdate: (self) => {
          gsap.to(".google-reviews .review-card", {
            y: self.progress * -15,
            rotateX: self.progress * 3,
            transformPerspective: 1000,
            stagger: 0.04,
            overwrite: "auto"
          })
        }
      })
    }
  }

  /* ==============================
     7. LATEST UPDATE BLOG SECTION
  ============================== */
  gsap.set(".blog-card", {
    opacity: 0,
    scale: 0.95,
    y: isMobile() ? 30 : 60,
    rotationX: isMobile() ? 0 : 15,
    transformStyle: "preserve-3d"
  })

  const latestUpdateTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".latest-update",
      start: getSequentialTrigger(".latest-update", "top 85%"),
      end: isMobile() ? "bottom 60%" : "top 20%",
      toggleActions: "play none none none"
    }
  })

  latestUpdateTL
    .fromTo(
      ".latest-update .subtitle",
      { 
        y: isMobile() ? 15 : 30, 
        opacity: 0, 
        filter: isMobile() ? "blur(2px)" : "blur(6px)" 
      },
      { 
        y: 0, 
        opacity: 1, 
        filter: "blur(0px)", 
        duration: isMobile() ? 0.4 : 0.6, 
        ease: "power2.out" 
      }
    )
    .fromTo(
      ".latest-update .title",
      { 
        y: isMobile() ? 20 : 35, 
        opacity: 0, 
        filter: isMobile() ? "blur(3px)" : "blur(8px)" 
      },
      { 
        y: 0, 
        opacity: 1, 
        filter: "blur(0px)", 
        duration: isMobile() ? 0.5 : 0.8, 
        ease: "power2.out" 
      },
      "-=0.2"
    )
    .to(
      ".latest-update .blog-card",
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotationX: 0,
        duration: isMobile() ? 0.5 : 0.8,
        ease: "power2.out",
        stagger: isMobile() ? 0.08 : 0.15
      },
      "-=0.3"
    )
    .to(
      ".latest-update .blog-card .icon",
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: isMobile() ? 0.4 : 0.5,
        stagger: isMobile() ? 0.1 : 0.2,
        ease: "power2.out"
      },
      "-=0.4"
    )
    .to(
      ".latest-update .blog-card .read-more",
      {
        y: 0,
        opacity: 1,
        duration: isMobile() ? 0.4 : 0.5,
        stagger: isMobile() ? 0.06 : 0.12,
        ease: "power2.out"
      },
      "-=0.3"
    )

  // Card hover effects (Desktop only)
  if (isDesktop()) {
    gsap.utils.toArray(".latest-update .blog-card").forEach((card) => {
      card.addEventListener("mouseenter", () =>
        gsap.to(card, { scale: 1.03, rotateY: 3, duration: 0.4, ease: "power2.out" })
      )
      card.addEventListener("mouseleave", () =>
        gsap.to(card, { scale: 1, rotateY: 0, duration: 0.4, ease: "power2.out" })
      )
    })
  }

  // Parallax effect (Desktop only)
  if (isDesktop()) {
    gsap.to(".latest-update .blog-image", {
      yPercent: -15,
      scale: 1.03,
      scrollTrigger: {
        trigger: ".latest-update",
        start: "top 80%",
        end: "bottom 20%",
        scrub: true
      }
    })
  }

  // Heart icon animation
  gsap.utils.toArray(".latest-update .heart-icon").forEach((heartIcon, i) => {
    gsap.to(heartIcon, {
      y: isMobile() ? -8 : -12,
      rotation: 360,
      duration: 3 + (i * 0.5),
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    })
  })

  /* ==============================
     8. FAQ SECTION
  ============================== */
  gsap.fromTo(
    ".faq-section .section-header",
    { 
      y: isMobile() ? 20 : 35, 
      opacity: 0, 
      filter: isMobile() ? "blur(3px)" : "blur(8px)" 
    },
    {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: isMobile() ? 0.5 : 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".faq-section",
        start: getSequentialTrigger(".faq-section", "top 75%"),
        end: isMobile() ? "bottom 60%" : "bottom 20%"
      }
    }
  )

  gsap.fromTo(
    ".faq-item",
    { 
      y: isMobile() ? 15 : 25, 
      opacity: 0, 
      scale: 0.97, 
      filter: isMobile() ? "blur(2px)" : "blur(6px)" 
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: isMobile() ? 0.5 : 0.7,
      ease: "power2.out",
      stagger: isMobile() ? 0.08 : 0.15,
      scrollTrigger: {
        trigger: ".faq-list",
        start: getSequentialTrigger(".faq-list", "top 75%"),
        end: isMobile() ? "bottom 60%" : "bottom 20%"
      }
    }
  )

  /* ==============================
     FOOTER SECTION
  ============================== */
  const footerTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".site-footer",
      start: getSequentialTrigger(".site-footer", "top 80%"),
      end: isMobile() ? "bottom 60%" : "bottom 20%"
    }
  })

  footerTL
    .from(".footer-col", {
      y: isMobile() ? 20 : 35,
      opacity: 0,
      filter: isMobile() ? "blur(2px)" : "blur(6px)",
      duration: isMobile() ? 0.4 : 0.6,
      ease: "power2.out",
      stagger: 0.08
    })
    .from(".footer-bottom", {
      y: isMobile() ? 10 : 15,
      opacity: 0,
      duration: isMobile() ? 0.4 : 0.5,
      ease: "power2.out"
    }, "-=0.3")

  /* ==============================
     VIDEO SECTION PLAYBACK
  ============================== */
  const video = document.querySelector(".gsap-video")
  if (video) {
    ScrollTrigger.create({
      trigger: ".video-section",
      start: getTriggerStart("top 70%", "top 80%"),
      end: "bottom top",
      onEnter: () => video.play(),
      onEnterBack: () => video.play(),
      onLeave: () => video.pause(),
      onLeaveBack: () => video.pause()
    })

    // Parallax effect (Desktop only for better performance)
    if (isDesktop()) {
      gsap.fromTo(
        video,
        { y: "-4%" },
        {
          y: "4%",
          ease: "none",
          scrollTrigger: {
            trigger: ".video-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      )
    }

    gsap.fromTo(
      ".video-section .section-header",
      { 
        y: isMobile() ? 15 : 30, 
        opacity: 0, 
        filter: isMobile() ? "blur(2px)" : "blur(6px)" 
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: isMobile() ? 0.4 : 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".video-section",
          start: getTriggerStart("top 80%", "top 90%")
        }
      }
    )
  }

  /* =========================
     CLEANUP & RESIZE HANDLER
  ========================= */
  const cleanup = () => {
    if (heroImage && onMove && onLeave) {
      heroImage.removeEventListener("mousemove", onMove)
      heroImage.removeEventListener("mouseleave", onLeave)
    }
    ScrollTrigger.getAll().forEach(t => t.kill())
  }

  // Refresh ScrollTrigger on resize (debounced)
  let resizeTimer
  const handleResize = () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 250)
  }
  
  window.addEventListener("resize", handleResize)

  return cleanup
}