import Hero from '../sections/Hero.jsx'
import About from '../sections/About.jsx'
import Strengths from '../sections/Strengths.jsx'
import Beyond from '../sections/Beyond.jsx'
import Projects from '../sections/Projects.jsx'
import Experience from '../sections/Experience.jsx'
import Contact from '../sections/Contact.jsx'
import '../Home.css'
import '../sections.css'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Strengths />
      <Beyond />
      <Projects />
      <Experience />
      <Contact />
    </>
  )
}
