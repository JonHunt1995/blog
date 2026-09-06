import { config, fields, collection } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

export default config({
  storage: {
    kind: import.meta.env.PROD ? 'cloud' : 'local',
  },
  cloud: {
    project: 'just-me/blog',
  },
  collections: {
    blog: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        subtitle: fields.text({ label: 'Subtitle', validation: { isRequired: false } }),
        description: fields.text({ label: 'Description (Meta & Cards)', multiline: true, validation: { isRequired: false } }),
        date: fields.date({ label: 'Published Date', defaultValue: { kind: 'today' } }),
        updated: fields.date({ label: 'Updated Date' }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Tech', value: 'tech' },
            { label: 'Life', value: 'life' },
          ],
          defaultValue: 'tech',
        }),
        author: fields.text({ label: 'Author', defaultValue: 'Jon Hunt' }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'src/assets/images/blog',
          publicPath: '../../assets/images/blog/',
        }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        mathjax: fields.checkbox({ label: 'MathJax', defaultValue: false }),
        content: fields.markdoc({
          label: 'Content',
          extension: 'md',
          options: {
            image: {
              directory: 'src/assets/images/blog',
              publicPath: '../../assets/images/blog/',
            },
          },
          components: {
            Figure: block({
              label: 'Image with Caption',
              schema: {
                src: fields.image({
                  label: 'Image',
                  directory: 'src/assets/images/blog',
                  publicPath: '../../assets/images/blog/',
                }),
                alt: fields.text({ label: 'Alt Text' }),
                caption: fields.text({ label: 'Caption' }),
              },
            }),
          },
        }),
      },
    }),
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        tagline: fields.text({ label: 'Tagline / Subtitle', validation: { isRequired: false } }),
        description: fields.text({ label: 'Short Description', multiline: true }),
        date: fields.date({ label: 'Date', defaultValue: { kind: 'today' } }),
        tags: fields.array(fields.text({ label: 'Tech / Tag' }), {
          label: 'Technologies & Skills',
          itemLabel: (props) => props.value,
        }),
        heroImage: fields.image({
          label: 'Hero / Cover Image',
          directory: 'src/assets/images/projects',
          publicPath: '../../assets/images/projects/',
        }),
        githubUrl: fields.text({ label: 'GitHub Repository URL', validation: { isRequired: false } }),
        demoUrl: fields.text({ label: 'Live Demo URL', validation: { isRequired: false } }),
        highlights: fields.array(fields.text({ label: 'Highlight' }), {
          label: 'Key Highlights / Features',
          itemLabel: (props) => props.value,
        }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        content: fields.markdoc({
          label: 'Project Case Study / Details',
          extension: 'md',
          options: {
            image: {
              directory: 'src/assets/images/projects',
              publicPath: '../../assets/images/projects/',
            },
          },
          components: {
            Figure: block({
              label: 'Image with Caption',
              schema: {
                src: fields.image({
                  label: 'Image',
                  directory: 'src/assets/images/projects',
                  publicPath: '../../assets/images/projects/',
                }),
                alt: fields.text({ label: 'Alt Text' }),
                caption: fields.text({ label: 'Caption' }),
              },
            }),
          },
        }),
      },
    }),
  },
});
