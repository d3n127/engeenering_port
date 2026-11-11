import { useEffect } from 'react'
import { useRoute } from './router.jsx'
import Nav from './components/Nav.jsx'
import TabBar from './components/TabBar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import SectionPage from './pages/Section.jsx'
import Chess from './pages/Chess.jsx'
import Jogging from './pages/Jogging.jsx'
import Travel from './pages/Travel.jsx'
import Walking from './pages/Walking.jsx'
import Anime from './pages/Anime.jsx'
import NotFound from './pages/NotFound.jsx'
import './App.css'

const ROUTES = {
  '/': Home,
  /* one route per landing-page section */
  '/about': SectionPage,
  '/skills': SectionPage,
  '/beyond': SectionPage,
  '/projects': SectionPage,
  '/experience': SectionPage,
  '/contact': SectionPage,
  '/chess': Chess,
  '/jogging': Jogging,
  '/travel': Travel,
  '/walking': Walking,
  '/anime': Anime,
}

export default function App() {
  const route = useRoute()
  const Page = ROUTES[route] || NotFound
  const dark = route === '/chess' || route === '/jogging'

  useEffect(() => {
    document.body.classList.toggle('dark-page', dark)
    return () => document.body.classList.remove('dark-page')
  }, [dark])

  return (
    <>
      <Nav />
      <main id="top">
        <Page />
      </main>
      <Footer />
      <TabBar />
    </>
  )
}
