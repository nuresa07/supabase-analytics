import { defineType } from "sanity";

export default defineType({
  name: "changelog",
  title: "Changelog",
  type: "document",
  fields: [
    {
      name: 'title',
      title: 'Judul Update',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug (url)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      }
    },
    {
      name: 'body',
      title: 'Isi',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'date',
      title: 'Tanggal Rilis',
      type: 'datetime',
    }
  ],
});