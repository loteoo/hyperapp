/* eslint-disable indent */
import { app } from 'hyperapp'

import { request } from './fx/http'

// App init imports
import { WindowScrolled, PopState } from './subscriptions'
import { WindowScroll, ParseUrl, SetSearchData } from './actions'
import { HighLight } from './effects'

// Components
import Header from './components/Header'
import Footer from './components/Footer'

import Home from './pages/Home'
import FourOhFour from './pages/FourOhFour'

// Initialize the app on the #app div
app({
  init: [
    ParseUrl({
        menuOpened: false,
        count: 0
      },
      window.location.pathname + window.location.search
    ),
    HighLight()
  ],
  view: (state) => {
    return (
      <div
        id="top"
        class={{
          app: true,
          noBodyScroll: state.menuOpened
        }}
      >
        <Header {...state} />
        <main key={state.location.path} class="main-content">
          {
            state.location.path === '/'
              ? <Home {...state} />
              : <FourOhFour {...state} />
          }
          <Footer />
        </main>
      </div>
    )
  },
  node: document.getElementById('app-container'),
  subscriptions: () => [
    WindowScrolled({ action: WindowScroll }),
    PopState({ action: ParseUrl })
  ]
})
