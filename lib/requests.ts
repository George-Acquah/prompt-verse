'use client'

export const fetchTrendingTags = async (limit = 5) => {
  try {
    const response = await fetch(`/api/tags?limit=${limit}`);

    if (!response.ok) {
      throw new Error("Fetch failed");
    }

    return await response.json() as string[];
  } catch (err) {
    console.log(err);
    throw err;
  }
};
