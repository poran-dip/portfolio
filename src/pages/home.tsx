import type { Route } from "./+types/home";
import { GlassLayout } from "@/components/ui";
import { Footer, Navbar, ScrollToTop } from "@/components";
import {
	AboutMe,
	ContactMe,
	HeroSection,
	Newsletter,
	Projects,
	Testimonials,
	Timeline,
} from "@/components/home";

export function meta({}: Route.MetaArgs) {
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
		<GlassLayout className="mx-auto flex flex-col justify-start items-center">
			<Navbar />
			<HeroSection />
			<main className="mt-12 px-6 w-full md:max-w-7xl space-y-12 items-center">
				<Projects />
				<Timeline />
				<AboutMe />
				<ContactMe />
				<Testimonials />
				<Newsletter />
			</main>
			<Footer />
			<ScrollToTop />
		</GlassLayout>
	);
};

export default Home;
