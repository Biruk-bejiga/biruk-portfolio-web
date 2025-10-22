import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import Stats from '../components/Stats'
import Testimonials from '../components/Testimonials'
import Services from '../components/Services'
import Contact from '../components/Contact'

export default function Page() {
  return (
    <div>
      <Hero />
      <Stats id="stats" />
      <About id="about" />
      <Projects id="projects" />
      <Testimonials id="testimonials" />
      <Services id="services" />
      <Contact id="contact" />
    </div>
  )
}
