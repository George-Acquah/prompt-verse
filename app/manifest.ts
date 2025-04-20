import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CraftPrompt",
    short_name: "Prompts",
    description: "Explore, create and share your favourite AI prompts.",
    id: "/",
    start_url: "/",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        form_factor: "narrow",
        platform: "android",
        sizes: "1170x2532",
        type: "image/png",
        src: "/screen-mob.png",
      },
      {
        form_factor: "wide",
        platform: "windows",

        sizes: "3012x1882",
        src: "/screen-desktop.png",
        type: "image/png",
      },
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
  };
}
