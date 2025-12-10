import Navbar from "../components/Navbar"
import AboutMe from "../components/AboutMe"
import Projects from "../components/Projects"
import ContactMe from "../components/ContactMe"
import Footer from "../components/Footer"
import HeroCard from "../components/Hero"
import { GlassLayout } from "../components/GlassLayout"
import ScrollToTopButton from "../components/ScrollToTop"
import Newsletter from "../components/Newsletter"
import Testimonials from "../components/Testimonials"

const HomePage = () => {
  return (
    <GlassLayout className="mx-auto flex flex-col justify-start items-center">
      <Navbar />
      <HeroCard />
      <main className="mt-12 px-6 w-full md:max-w-7xl space-y-12 items-center">
        <Projects />
        <AboutMe />
        <ContactMe />
        <Testimonials />
        <Newsletter />
      </main>     
      <Footer />
      <ScrollToTopButton />
    </GlassLayout>
  )
}

export default HomePage
