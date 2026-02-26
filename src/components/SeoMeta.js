import React from "react";
// import useGTM from '../hooks/useGTM';
// import { useSiteMetadata } from "../hooks/use-site-metadata"

const Seo = ({ bodyClass, title, description, seoData, children, visibility = true, pageUrl = "https://dr-gulshan.vercel.app/" }) => {
  // const { title: defaultTitle, description: defaultDescription, image, siteUrl } = useSiteMetadata()
  // const seo = {
  //   title: title || defaultTitle,
  //   description: description || defaultDescription,
  //   image: image,
  //   url: siteUrl,
  // }

  const shortUrl = (fullUrl) => {
    var url = fullUrl;
    try {
      const urlObject = new URL(url);
      url = urlObject.pathname ? urlObject.pathname : url;
    } catch (error) {
      url = fullUrl;
    }
    return url;
  };

  function replaceSlashWithUrl(obj) {
    for (var key in obj) {
      if (typeof obj[key] === 'string') {

        if (obj[key].startsWith('/')) {
          obj[key] = "https://dr-gulshan.vercel.app/" + obj[key];
        }
      } else if (typeof obj[key] === 'object') {
        replaceSlashWithUrl(obj[key]);
      }
    }
    return obj

  }

  var jsonSchema = seoData && seoData.schema ? seoData.schema.raw : "{}";
  var jsonObject = JSON.parse(jsonSchema);
  if (jsonObject && Object.keys(jsonObject).length !== 0) {
    jsonObject = replaceSlashWithUrl(jsonObject);
  }

//   useGTM();

  return (
    <>
      <html lang="en" />
      <body className={bodyClass || ""} />
      <meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />

      <title>{seoData && seoData.title ? seoData.title : title}</title>
      <meta name="description" content={seoData && seoData.metaDesc ? seoData.metaDesc : description} />

      {visibility ? (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      ) : (
        <meta name="robots" content="noindex,nofollow" />
      )}

      {/* <link rel="canonical" href={seoData && seoData.canonical ?  (seoData.canonical ==="/home/") ? "https://dr-gulshan.vercel.app//": "https://dr-gulshan.vercel.app/"+seoData.canonical : "https://dr-gulshan.vercel.app/"+pageUrl}></link> */}

      <link rel="canonical" href={"https://dr-gulshan.vercel.app/" + shortUrl(pageUrl)}></link>

      <meta property="og:locale" content={"en_US"} />
      <meta property="og:type" content={"Website"} />
      <meta property="og:title" content={seoData && seoData.title ? seoData.title : title} />
      <meta property="og:description" content={seoData && seoData.metaDesc ? seoData.metaDesc : description} />
      {/* <meta property="og:url" content={seoData && seoData.opengraphUrl ? (seoData.opengraphUrl ==="/home/") ? "https://dr-gulshan.vercel.app//": "https://dr-gulshan.vercel.app/"+seoData.opengraphUrl : "https://dr-gulshan.vercel.app/"+pageUrl} /> */}

      <meta property="og:url" content={"https://dr-gulshan.vercel.app/" + shortUrl(pageUrl)} />


      <meta property="og:site_name" content={seoData && seoData.opengraphSiteName ? seoData.opengraphSiteName : "Achievers"} />

      <meta property="og:image" content={seoData && seoData.opengraphImage ? seoData.opengraphImage.mediaItemUrl : "https://drgulshanrohra.com/wp-content/uploads/2026/02/Heart-Banner-2.png"} />
      <meta property="og:image:width" content={seoData && seoData.opengraphImage ? seoData.opengraphImage.width : 200} />
      <meta property="og:image:height" content={seoData && seoData.opengraphImage ? seoData.opengraphImage.height : 200} />
      <meta property="og:image:type" content={seoData && seoData?.mediaType ? seoData.mediaType : "image/png"} />
      <meta
        property="article:modified_time"
        content={seoData && seoData.opengraphModifiedTime}
      />
      <meta name="twitter:card" content="summary_large_image"></meta>
      <meta name="twitter:site" content={seoData && seoData.opengraphSiteName ? seoData.opengraphSiteName : "hacker"} />
      <meta property="twitter:image" content={seoData && seoData.opengraphImage ? seoData.opengraphImage.mediaItemUrl : "https://drgulshanrohra.com/wp-content/uploads/2026/02/Heart-Banner-2.png"} />
      <meta property="twitter:title" content={seoData && seoData.title ? seoData.title : title} />
      <meta property="twitter:description" content={seoData && seoData.metaDesc ? seoData.metaDesc : description} />
      {/* <meta
        name="google-site-verification"
        content="4KgWrYQfz8sTPAgJGMlDVKzR-OLGh6yRTd5kmLV1Xlw"
      /> */}

      <script type="application/ld+json">{Object.keys(jsonObject).length !== 0 ? JSON.stringify(jsonObject, null, 2) : "{}"}</script>
      <meta name="facebook-domain-verification" content="kawzjy7hiq1mu860t3smo0itt0it3q" />
      {/* <script type="application/ld+json">{JSON.stringify(seoData && seoData.schema ? seoData.schema : "{}")}</script> */}
      {children}
    </>
  );
};
export default Seo;
