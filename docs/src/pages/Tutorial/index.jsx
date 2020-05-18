import content from './tutorial.md'

export default (state) => (
  <div>
    <div class="markdown-content" innerHTML={content} />
  </div>
)
