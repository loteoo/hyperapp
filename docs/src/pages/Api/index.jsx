import content from './api.md'
export default () => <div>
  <nav class="secondary-menu">
    <a href="#h">h()</a>
    <a href="#app">app()</a>
    <a href="#lazy">Lazy()</a>
    <a href="#actions">Actions</a>
    <a href="#effects">Effects</a>
    <a href="#subscriptions">Subscriptions</a>
  </nav>
  <div innerHTML={content} />
</div>


