import './style.css'
import Link from '../Link'
import { OpenMenu, CloseMenu } from '../../actions'

import menu from '../../../menu.md';


export default ({ menuOpened }) => {
  return (
    <header class={{
      'site-header': true,
      opened: menuOpened
    }}>
      <Link to="/" class="logo">
        <img class="v2 mobile" src={require('./logo-big.svg')} alt="hyperapp v2" />
        <img class="v2 desktop" src={require('./hyperapp-logo-v2.svg')} alt="hyperapp v2" />
        <img class="v1" src={require('./hyperapp-logo-v1.svg')} alt="hyperapp v1" />
      </Link>
      <button class="menu-toggler" aria-expanded={menuOpened} aria-controls="menu" onclick={menuOpened ? CloseMenu : OpenMenu}>
        Menu
        {menuOpened
          ? <img src={require('./close.svg')} alt="Close menu" />
          : <img src={require('./menu.svg')} alt="Open menu" />
        }
      </button>
      <nav
        id="menu"
        class={{
          menu: true,
          opened: menuOpened
        }}
        innerHTML={menu}
      />
    </header>
  )
}
