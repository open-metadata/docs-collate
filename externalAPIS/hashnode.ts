import { BLOG_API_BASE_URL } from "../constants/blog.constant";

export const getPosts = async (query: string) => {
  const response = await fetch(BLOG_API_BASE_URL, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });

  const data = await response.json();

  return data;
};
