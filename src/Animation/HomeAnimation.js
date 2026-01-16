import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export const initHeroAnimation = () => {
  // ✅ Gatsby SSR safety
  if (typeof window === "undefined") return

  gsap.registerPlugin(ScrollTrigger)

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
     HERO TIMELINE
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
       HEART FLOAT
    ========================= */
    gsap.to(heart, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })
  }

  /* =========================
     MOUSE MOVE PARALLAX
  ========================= */
  if (heart && heroImage) {
    const onMove = e => {
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

    const onLeave = () => {
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

    /* =====================================================
     SYMPTOMS SECTION (SMOOTH + BLUR REVEAL)
  ===================================================== */
  if (document.querySelector(".symptoms-section")) {
    gsap.timeline({
      scrollTrigger: {
        trigger: ".symptoms-section",
        start: "top 85%",
        toggleActions: "play none none reverse"
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
        { y: 40, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power2.out"
        },
        "-=0.6"
      )
      .fromTo(
        ".symptoms-section .subtitle",
        { y: 35, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power2.out"
        },
        "-=0.5"
      )
      .from(".symptoms-section .symptoms-list li", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.15
      }, "-=0.4")
  }


    /* =====================================================
     VIDEO SECTION (SMOOTH + BLUR REVEAL)
  ===================================================== */
  if (document.querySelector(".video-section")) {
    gsap.timeline({
      scrollTrigger: {
        trigger: ".video-section",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })
      // Title – blur → clear
      .fromTo(
        ".video-section .title",
        {
          y: 40,
          opacity: 0,
          filter: "blur(8px)"
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.2,
          ease: "power2.out"
        }
      )

      // Subtitle – softer blur
      .fromTo(
        ".video-section .subtitle",
        {
          y: 30,
          opacity: 0,
          filter: "blur(6px)"
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.2,
          ease: "power2.out"
        },
        "-=0.5"
      )

      // Video reveal with clip-path expansion
      .fromTo(
        ".video-section .inner-video-section",
        {
          clipPath: "polygon(32% 35%, 69% 35%, 69% 66%, 32% 66%)",
          opacity: 0,
          y: 80
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out"
        },
        "-=0.4"
      )
  }


    /* =====================================================
     EXPERTISE SLIDER (SMOOTH + BLUR)
  ===================================================== */
  if (document.querySelector(".expertise-slider")) {
    gsap.timeline({
      scrollTrigger: {
        trigger: ".expertise-slider",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })
      // Title – blur → clear
      .fromTo(
        ".expertise-slider .title",
        {
          y: 35,
          opacity: 0,
          filter: "blur(8px)"
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power2.out"
        }
      )

      // Subtitle – softer blur
      .fromTo(
        ".expertise-slider .subtitle",
        {
          y: 30,
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
        "-=0.5"
      )

      // Treatments container fade
      .from(
        ".expertise-slider .treatments-care",
        {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out"
        },
        "-=0.4"
      )

      // Cards – alternate slide + scale
      .fromTo(
        ".treatments-care .care-card",
        {
          x: (i) => (i % 2 === 0 ? -60 : 60),
          opacity: 0,
          scale: 0.96
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.12
        },
        "-=1"
      )
  }

    /* =====================================================
     EXPERTISE SWIPER
  ===================================================== */
  if (document.querySelector(".expertise-Swiper")) {
    // Initial state
    gsap.set(".expertise-Swiper .expertise-card", {
      y: 60,
      opacity: 0,
      scale: 0.95,
      rotationX: -10,
      transformPerspective: 800
    })

    // Reveal animation
    gsap.timeline({
      scrollTrigger: {
        trigger: ".expertise-Swiper",
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    }).to(".expertise-Swiper .expertise-card", {
      y: 0,
      opacity: 1,
      scale: 1,
      rotationX: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.2
    })
  }


  /* =================================================
     8. PATIENTS SWIPER (SMOOTH + BLUR)
  ================================================= */
  const patientsSection = document.querySelector(".patients-diary")
  if (patientsSection) {
    const patients = gsap.timeline({
      scrollTrigger: {
        trigger: ".patients-diary",
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    })

    patients
      // Section container
      .from(".patients-diary", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      })

      // Title – blur → clear
      .fromTo(
        ".patients-diary .title",
        {
          y: 35,
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
        "-=0.6"
      )

      // Subtitle – softer blur
      .fromTo(
        ".patients-diary .subtitle",
        {
          y: 30,
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
        "-=0.5"
      )

      // Slides – smooth 3D reveal
      .fromTo(
        ".patients-diary .swiper-slide",
        {
          rotationY: -45,
          opacity: 0,
          scale: 0.9,
          transformPerspective: 1000
        },
        {
          rotationY: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2
        },
        "-=0.3"
      )
  }

/* ==============================
     GOOGLE REVIEWS SECTION (SMOOTH MEDICAL MOTION)
  ============================== */
  const googleReviewsSection = document.querySelector(".google-reviews")
  if (googleReviewsSection) {
    const googleReviewsTL = gsap.timeline({
      scrollTrigger: {
        trigger: ".google-reviews",
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    })

    googleReviewsTL
      // Header – blur → clear
      .fromTo(
        ".google-reviews .reviews-header",
        {
          opacity: 0,
          y: 40,
          filter: "blur(8px)"
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power2.out"
        }
      )

      // Review cards – smooth rise
      .from(
        ".google-reviews .review-card",
        {
          opacity: 0,
          scale: 0.96,
          y: 30,
          stagger: 0.15,
          duration: 0.7,
          ease: "power2.out"
        },
        "-=0.4"
      )

      // Stars – gentle trust pulse
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

    // ==============================
    // MEDICAL GRADIENT BACKGROUND (SUBTLE FILL)
    // ==============================
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

    // ==============================
    // PINK LINE PROGRESS (SOFT SWEEP)
    // ==============================
    gsap.to(".google-reviews .pink-line", {
      width: "100%",
      boxShadow: "0 0 10px rgba(255, 107, 107, 0.5)",
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".google-reviews",
        start: "top 85%",
        end: "top 25%",
        scrub: 0.6
      }
    })

    // ==============================
    // REVIEW CARDS PARALLAX (VERY SUBTLE)
    // ==============================
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

/* ==============================
     LATEST UPDATE BLOG SECTION
  ============================== */
  gsap.set(".blog-card", { opacity: 0, scale: 0.95, y: 60, rotationX: 15, transformStyle: "preserve-3d" })

  const latestUpdateTL = gsap.timeline({
    scrollTrigger: { trigger: ".latest-update", start: "top 85%", end: "top 20%", toggleActions: "play none none reverse" }
  })

  latestUpdateTL
    .fromTo(".latest-update .subtitle", { y: 30, opacity: 0, filter: "blur(6px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "power2.out" })
    .fromTo(".latest-update .title", { y: 35, opacity: 0, filter: "blur(8px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }, "-=0.4")
    .to(".latest-update .blog-card", { opacity: 1, scale: 1, y: 0, rotationX: 0, duration: 0.8, ease: "power2.out", stagger: 0.15 }, "-=0.3")
    .to(".latest-update .blog-card .icon", { scale: 1, rotation: 0, opacity: 1, duration: 0.5, stagger: 0.2, ease: "power2.out" }, "-=0.6")
    .to(".latest-update .blog-card .read-more", { y: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: "power2.out" }, "-=0.4")

  gsap.utils.toArray(".latest-update .blog-card").forEach((card) => {
    card.addEventListener("mouseenter", () => gsap.to(card, { scale: 1.03, rotateY: 3, duration: 0.4, ease: "power2.out" }))
    card.addEventListener("mouseleave", () => gsap.to(card, { scale: 1, rotateY: 0, duration: 0.4, ease: "power2.out" }))
  })

  gsap.to(".latest-update .blog-image", { yPercent: -15, scale: 1.03, scrollTrigger: { trigger: ".latest-update", start: "top 80%", end: "bottom 20%", scrub: true } })

  gsap.utils.toArray(".latest-update .heart-icon").forEach((heart, i) => {
    gsap.to(heart, { y: -12, rotation: 360, duration: 3 + (i * 0.5), ease: "sine.inOut", repeat: -1, yoyo: true })
  })

  /* ==============================
     FAQ SECTION
  ============================== */
  gsap.fromTo(".faq-section .section-header", { y: 35, opacity: 0, filter: "blur(8px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: ".faq-section", start: "top 75%" } })

  gsap.fromTo(".faq-item", { y: 25, opacity: 0, scale: 0.97, filter: "blur(6px)" }, { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.7, ease: "power2.out", stagger: 0.15, scrollTrigger: { trigger: ".faq-list", start: "top 75%" } })

  /* ==============================
     FOOTER SECTION
  ============================== */
  const footerTL = gsap.timeline({ scrollTrigger: { trigger: ".site-footer", start: "top 80%" } })
  footerTL.from(".footer-col", { y: 35, opacity: 0, filter: "blur(6px)", duration: 0.6, ease: "power2.out", stagger: 0.08 })
    // .from(".footer-title", { x: -15, opacity: 0, filter: "blur(4px)", duration: 0.5, ease: "power2.out", stagger: 0.1 }, "-=0.5")
    // .from(".footer-links li", { y: 12, opacity: 0, duration: 0.35, ease: "power2.out", stagger: 0.06 }, "-=0.4")
    // .from(".footer-address p", { y: 15, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.35")
    // .from(".footer-map-link a", { scale: 0.95, opacity: 0, duration: 0.45, ease: "power2.out" }, "-=0.3")
    // .from(".footer-social a", { y: 15, opacity: 0, scale: 0.9, duration: 0.4, stagger: 0.08, ease: "power2.out" }, "-=0.35")
    .from(".footer-bottom", { y: 15, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")

  /* ==============================
     VIDEO SECTION
  ============================== */
  const video = document.querySelector(".gsap-video")
  if (video) {
    ScrollTrigger.create({
      trigger: ".video-section",
      start: "top 70%",
      end: "bottom top",
      onEnter: () => video.play(),
      onEnterBack: () => video.play(),
      onLeave: () => video.pause(),
      onLeaveBack: () => video.pause()
    })

    gsap.fromTo(video, { y: "-4%" }, { y: "4%", ease: "none", scrollTrigger: { trigger: ".video-section", start: "top bottom", end: "bottom top", scrub: true } })

    gsap.fromTo(".video-section .section-header", { y: 30, opacity: 0, filter: "blur(6px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: ".video-section", start: "top 80%" } })
  }



    /* =========================
       CLEANUP (VERY IMPORTANT)
    ========================= */
    return () => {
      heroImage.removeEventListener("mousemove", onMove)
      heroImage.removeEventListener("mouseleave", onLeave)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }
}
