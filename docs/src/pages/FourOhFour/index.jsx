import { code } from './code'
import './style.css'

export default () => (
  <div class="four-oh-four-page">
    <h1>this page doesn't exist, please check your URL and try again</h1>
    <a class="back-link" href="/">go back</a>
    <div class="code-background">{code + code + code + code}</div>
  </div>
)
