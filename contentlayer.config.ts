import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeSlug from 'rehype-slug'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
    draft: { type: 'boolean', default: false },
    tags: { type: 'list', of: { type: 'string' }, required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace(/^blog\//, ''),
    },
    url: {
      type: 'string',
      resolve: (doc) => `/blog/${doc._raw.flattenedPath.replace(/^blog\//, '')}`,
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post],
  mdx: {
    // Temporarily omit remark-gfm due to a parser/runtime mismatch on Windows builds.
    // If you rely on GitHub-flavored markdown (tables, task lists), we can re-enable
    // remark-gfm after aligning plugin versions or applying a targeted fix.
    rehypePlugins: [rehypeSlug],
  },
  disableImportAliasWarning: true,
})
