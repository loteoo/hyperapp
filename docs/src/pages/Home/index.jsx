import content from './home.md'

export default (state) => (
  <div>
    <div class="hero">
      <h1 class="main-title">The tiny framework for building web interfaces</h1>
      <div class="social">

      </div>
    </div>
    <hr />
    <div innerHTML={content} />
  </div>
)
