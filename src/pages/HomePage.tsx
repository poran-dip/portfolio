import Navbar from "../components/Navbar"
import AboutMe from "../components/AboutMe"
import Projects from "../components/Projects"
import ContactMe from "../components/ContactMe"
import Footer from "../components/Footer"
import HeroCard from "../components/Hero"

const HomePage = () => {
  return (
    <div className="w-full md:max-w-6xl mx-auto flex flex-col justify-start items-center space-y-6">
      <Navbar />
      <HeroCard />
      <main className="items-center w-full space-y-6">
        <AboutMe />
        <Projects />
        <ContactMe />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
