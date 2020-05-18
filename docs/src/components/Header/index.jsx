

import { OpenMenu, CloseMenu } from '../../actions'

import homeLinks from '../../pages/Home/menu.md'
import apiLinks from '../../pages/Reference/menu.md'
import tutoLinks from '../../pages/Tutorial/menu.md'

const SmartLink = ({ to, ...props }, children) => (
  <a
    class={{
      active: window.location.pathname === to
    }}
    href={to}
    {...props}
  >
    {children}
  </a>
)

const RoutedMenu = ({ route, ...props}, children) => window.location.pathname === route && (
  <div
    class="sub-links"
    {...props}
  >
    {children}
  </div>
)


export default ({ menuOpened }) => {
  return (
    <header class={{
      'site-header': true,
      opened: menuOpened
    }}>
      <SmartLink to="/" class="logo">
        <img class="v2" src={require('./hyperapp-logo-v2.svg')} alt="hyperapp v2" />
        <img class="v1" src={require('./hyperapp-logo-v1.svg')} alt="hyperapp v1" />
      </SmartLink>
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
      >
        <div class="main-links">
          <SmartLink to="/">Quickstart</SmartLink>
          <SmartLink to="/reference">Reference</SmartLink>
          <SmartLink to="/tutorial">Tutorial</SmartLink>
        </div>
        <RoutedMenu route="/" innerHTML={homeLinks} />
        <RoutedMenu route="/reference" innerHTML={apiLinks} />
        <RoutedMenu route="/tutorial" innerHTML={tutoLinks} />
      </nav>

    </header>
  )
}
