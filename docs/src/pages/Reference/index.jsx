import content from './reference.md'

export default (state) => (
  <div>
    <div class="markdown-content" innerHTML={content} />
  </div>
)
