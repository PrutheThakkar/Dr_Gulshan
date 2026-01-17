// import { useState } from "react";
// import axios from "axios";

// export const useAuthToken = () => {
//   // State variables
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Function to get JWT token
//   const getToken = async () => {
//     setLoading(true);
//     setError(null);

//     console.log("BASE_URL:", process.env.GATSBY_BASE_URL);
//     console.log("USERNAME:", process.env.GATSBY_WP_USERNAME);

//     try {
//       const res = await axios.post(
//         `${process.env.GATSBY_BASE_URL}/wp-json/jwt-auth/v1/token`,
//         {
//           username: process.env.GATSBY_WP_USERNAME,
//           password: process.env.GATSBY_WP_PASSWORD,
//         }
//       );

//       console.log("JWT response:", res.data);
//       setToken(res.data.token);
//     } catch (err) {
//       console.error("JWT ERROR:", err.response?.data || err.message);
//       setError("JWT Auth failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { token, loading, error, getToken };
// };
