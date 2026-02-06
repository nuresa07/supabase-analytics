import { createClient } from '@sanity/client';

export const sanity = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: 'production',
  token: import.meta.env.SANITY_EDITOR_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
})
