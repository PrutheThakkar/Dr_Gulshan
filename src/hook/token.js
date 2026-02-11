import axios from "axios";

const WEBSITE_URL = process.env.GATSBY_BASE_URL;

export const getToken = async () => {
  const response = await axios({
    method: "POST",
    url: `${WEBSITE_URL}/wp-json/jwt-auth/v1/token`,
    data: {
      username: process.env.GATSBY_USERNAME,
      password: process.env.GATSBY_PASSWORD,
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response?.data?.token) {
    throw new Error("JWT token not returned");
  }

  return response.data.token;
};
