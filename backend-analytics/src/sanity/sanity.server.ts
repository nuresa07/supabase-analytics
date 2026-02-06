import { createClient } from "@sanity/client";

export const sanityServer = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: "production",
  apiVersion: "2025-09-09",
  useCdn: false,
  token: process.env.SANITY_EDITOR_TOKEN!, // Token aman, hanya di backend
});
