import type { Route } from "./+types/blog";
import { GlassHeading, GlassLayout, GlassParagraph } from "@/components/ui";
import { Footer, Navbar } from "@/components";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Blog | Poran Dip" },
    {
      name: "description",
      content: "Coming soon!",
    },
  ];
}

const BlogPage = () => {
  return (
    <GlassLayout className="mx-auto flex flex-col justify-between items-center">
      <Navbar />
      <main className="mt-24 px-6 w-full md:max-w-7xl space-y-12 items-center">
        <section id="placeholder">
          <GlassHeading>Blog</GlassHeading>
          <GlassParagraph className="text-xl! pt-6">
            Coming soon (hopefully)!
          </GlassParagraph>
        </section>
      </main>
      <Footer />
    </GlassLayout>
  );
};

export default BlogPage;
