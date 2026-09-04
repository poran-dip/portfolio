import { Footer, Navbar, ScrollToTop } from "@/components";
import {
  AboutMe,
  ContactMe,
  HeroSection,
  Projects,
  Timeline,
} from "@/components/home";
import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Poran Dip — Developer & Music Producer" },
    {
      name: "description",
      content:
        "Portfolio of Poran Dip — CS student, web developer, music producer, and tech enthusiast.",
    },
  ];
}

const Home = () => {
  return (
    <div className="min-h-screen bg-abyss flex flex-col items-center">
      <Navbar />
      <HeroSection />
      <main className="w-full flex flex-col items-center">
        <AboutMe />
        <Projects />
        <Timeline />
        <ContactMe />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Home;
