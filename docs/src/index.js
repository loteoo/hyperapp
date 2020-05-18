/* eslint-disable indent */
import { app } from 'hyperapp'


// Components
import Header from './components/Header'


import Home from './pages/Home'
import Reference from './pages/Reference'
import Tutorial from './pages/Tutorial'
import FourOhFour from './pages/FourOhFour'


// Initialize the app on the #app div
app({
  init: {
    menuOpened: false,
    count: 0
  },
  view: (state) => {
    console.log(state);

    return (
      <div
        id="top"
        class={{
          app: true,
          noBodyScroll: state.menuOpened
        }}
      >
        <Header {...state} />
        <main class="main-content">
          {
            window.location.pathname === '/' ? <Home {...state} />
              : window.location.pathname === '/reference' ? <Reference {...state} />
              : window.location.pathname === '/tutorial' ? <Tutorial {...state} />
              : <FourOhFour {...state} />
          }
          {/* {Reference(state)} */}
        </main>
      </div>
    )
  },
  node: document.getElementById('app-container')
})
