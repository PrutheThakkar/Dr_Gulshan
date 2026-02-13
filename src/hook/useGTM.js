// // src/hooks/useGTM.js

// import { useEffect } from "react";

// const useGTM = () => {
//   useEffect(() => {
//     // GTM code or initialization
//     const GTMCode = process.env.GATSBY_GTM_CODE;
//     const loadGTM = () => {
//       const script = document.createElement("script");
//       script.src = `https://www.googletagmanager.com/gtag/js?id=${GTMCode}`;
//       script.async = true;
//       document.head.appendChild(script);
      
//       script.onload = () => {
//         window.dataLayer = window.dataLayer || [];
//         window.dataLayer.push({
//           event: "gtm.start",
//           'gtm.start': new Date().getTime(),
//         });
//       };
//     };
    
//     window.addEventListener("load", loadGTM);

//     return () => window.removeEventListener("load", loadGTM);
//   }, []);
// };

// export default useGTM;
