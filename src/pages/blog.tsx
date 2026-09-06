import { Footer, Navbar } from "@/components";
import type { Route } from "./+types/blog";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Blog · Poran Dip" },
    {
      name: "description",
      content: "Blogs by Poran Dip — coming soon!",
    },
  ];
}

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-abyss flex flex-col justify-between items-center">
      <Navbar />
      <main className="mt-24 px-6 w-full md:max-w-7xl space-y-12 items-center">
        <section id="placeholder">
          <h2 className="font-bold whitespace-nowrap text-2xl">
            <span className="text-jelly">&gt; </span>
            <span className="text-bioglow">./</span>
            <span className="text-foam">blog</span>
          </h2>
          <p className="text-lg text-mist pt-6">Coming soon (hopefully)!</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
