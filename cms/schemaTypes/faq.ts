import { defineType } from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Pertanyaan',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'answer',
      title: 'Jawaban',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'question',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'language',
      title: 'Bahasa',
      type: 'string',
      options: {
        list: [
          { title: 'Indonesia', value: 'id' },
          { title: 'English', value: 'en' }
        ],
        layout: 'radio',
      },
      initialValue: 'id',
    }
  ]
})