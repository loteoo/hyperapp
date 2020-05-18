import content from './tutorial.md'

export default (state) => (
  <div>
    <div innerHTML={content} />
  </div>
)
