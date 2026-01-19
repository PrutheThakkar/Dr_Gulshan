import React, { useEffect } from "react"

const GoogleReviews = () => {
  useEffect(() => {
    // Avoid loading script multiple times
    if (document.getElementById("rplg-script")) {
      if (window.Rplg) {
        window.Rplg.init()
      }
      return
    }

    const script = document.createElement("script")
    script.id = "rplg-script"
    script.src =
      "https://darkblue-cat-525235.hostinger.com/wp-content/plugins/google-reviews/public/js/rplg.js"
    script.async = true

    script.onload = () => {
      if (window.Rplg) {
        window.Rplg.init()
      }
    }

    document.body.appendChild(script)
  }, [])

  return (
    <div
      className="rplg-widget"
      data-id="418"
      data-lang="en"
    />
  )
}

export default GoogleReviews
