// import React, { useEffect, useState } from "react";

// const Preloader = () => {
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoaded(true);
//       document.body.classList.remove("no-scroll");
//     }, 1800);

//     document.body.classList.add("no-scroll");
//     return () => clearTimeout(timer);
//   }, []);

//   if (loaded) return null;

//   return (
//     <div className="preloader">
//       <div className="loader-circle"></div>
//       <span>Loading</span>
//     </div>
//   );
// };

// export default Preloader;
