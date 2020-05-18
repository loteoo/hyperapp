import content from './home.md'


const GithubLogo = () => <svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'><title>ionicons-v5_logos</title><path d='M256,32C132.3,32,32,134.9,32,261.7c0,101.5,64.2,187.5,153.2,217.9a17.56,17.56,0,0,0,3.8.4c8.3,0,11.5-6.1,11.5-11.4,0-5.5-.2-19.9-.3-39.1a102.4,102.4,0,0,1-22.6,2.7c-43.1,0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1,1.4-14.1h.1c22.5,2,34.3,23.8,34.3,23.8,11.2,19.6,26.2,25.1,39.6,25.1a63,63,0,0,0,25.6-6c2-14.8,7.8-24.9,14.2-30.7-49.7-5.8-102-25.5-102-113.5,0-25.1,8.7-45.6,23-61.6-2.3-5.8-10-29.2,2.2-60.8a18.64,18.64,0,0,1,5-.5c8.1,0,26.4,3.1,56.6,24.1a208.21,208.21,0,0,1,112.2,0c30.2-21,48.5-24.1,56.6-24.1a18.64,18.64,0,0,1,5,.5c12.2,31.6,4.5,55,2.2,60.8,14.3,16.1,23,36.6,23,61.6,0,88.2-52.4,107.6-102.3,113.3,8,7.1,15.2,21.1,15.2,42.5,0,30.7-.3,55.5-.3,63,0,5.4,3.1,11.5,11.4,11.5a19.35,19.35,0,0,0,4-.4C415.9,449.2,480,363.1,480,261.7,480,134.9,379.7,32,256,32Z'/></svg>

const TwitterLogo = () => <svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'><title>ionicons-v5_logos</title><path d='M496,109.5a201.8,201.8,0,0,1-56.55,15.3,97.51,97.51,0,0,0,43.33-53.6,197.74,197.74,0,0,1-62.56,23.5A99.14,99.14,0,0,0,348.31,64c-54.42,0-98.46,43.4-98.46,96.9a93.21,93.21,0,0,0,2.54,22.1,280.7,280.7,0,0,1-203-101.3A95.69,95.69,0,0,0,36,130.4C36,164,53.53,193.7,80,211.1A97.5,97.5,0,0,1,35.22,199v1.2c0,47,34,86.1,79,95a100.76,100.76,0,0,1-25.94,3.4,94.38,94.38,0,0,1-18.51-1.8c12.51,38.5,48.92,66.5,92.05,67.3A199.59,199.59,0,0,1,39.5,405.6,203,203,0,0,1,16,404.2,278.68,278.68,0,0,0,166.74,448c181.36,0,280.44-147.7,280.44-275.8,0-4.2-.11-8.4-.31-12.5A198.48,198.48,0,0,0,496,109.5Z'/></svg>

const SlackLogo = () => <svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'><title>ionicons-v5_logos</title><path d='M126.12,315.1A47.06,47.06,0,1,1,79.06,268h47.06Z'/><path d='M149.84,315.1a47.06,47.06,0,0,1,94.12,0V432.94a47.06,47.06,0,1,1-94.12,0Z'/><path d='M196.9,126.12A47.06,47.06,0,1,1,244,79.06v47.06Z'/><path d='M196.9,149.84a47.06,47.06,0,0,1,0,94.12H79.06a47.06,47.06,0,0,1,0-94.12Z'/><path d='M385.88,196.9A47.06,47.06,0,1,1,432.94,244H385.88Z'/><path d='M362.16,196.9a47.06,47.06,0,0,1-94.12,0V79.06a47.06,47.06,0,1,1,94.12,0Z'/><path d='M315.1,385.88A47.06,47.06,0,1,1,268,432.94V385.88Z'/><path d='M315.1,362.16a47.06,47.06,0,0,1,0-94.12H432.94a47.06,47.06,0,1,1,0,94.12Z'/></svg>


export default (state) => (
  <div>
    <div class="hero">
      <h1>Hyperapp<sup><a href="#"><code>2.0.4</code></a></sup></h1>
      <h2>The tiny framework for building web interfaces</h2>
      <div class="social">
        <GithubLogo />
        <TwitterLogo />
        <SlackLogo />
      </div>
    </div>
    <hr />
    <div class="features-grid">
      <div class="feature">
        <img style={{ width: '8rem' }} src={require('../../assets/faster-than-react.svg')} alt="faster than react" />
        <h2>2x</h2>
        <p>faster than react</p>
      </div>
      <div class="feature">
        <img style={{ marginTop: '1rem' }} src={require('../../assets/so-small-cant-even.svg')} alt="it's so small, I can't even" />
        <h2>1.8kB</h2>
        <p>smaller than a favicon</p>
      </div>
      <div class="feature">
        <img style={{ width: '4rem' }} src={require('../../assets/time-to-interactive.svg')} alt="time to interactive" />
        <h2>10ms</h2>
        <p>time to interactive</p>
      </div>
    </div>
    <hr />
    {/* <div class="info-grid">
      <img src={require('../../assets/do-more-with-less.svg')} alt="do more with less" />
      <h2>do more with less</h2>
      <p>We have minimized the concepts you need to learn to be productive. views, actions, effects, and subscriptions are all pretty easy to get to grips with and work together seamlessly.</p>
      <img src={require('../../assets/write-what-not-how.svg')} alt="write what, not how" />
      <h2>write what, not how</h2>
      <p>With a declarative syntax that's easy to read and natural to write, Hyperapp is your tool of choice to develop purely functional, feature-rich, browser-based applications.</p>
      <img src={require('../../assets/hypercharged.svg')} alt="hypercharged" />
      <h2>hypercharged</h2>
      <p>Hyperapp is a modern VDOM engine, state management solution, and application design pattern all-in-one. once you learn to use it, there'll be no end to what you can do.</p>
    </div> */}
    <div innerHTML={content} />
  </div>
)
