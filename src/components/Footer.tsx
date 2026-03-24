import { glass } from "@/styles/glass";
import { GlassHeading, GlassLink, GlassParagraph } from "./ui";

const Footer = () => {
  return (
    <footer
      className={`
        ${glass.base}
        mt-16 p-8 rounded-t-3xl w-full space-y-4
        bg-linear-to-t from-zinc-200/80 to-zinc-100/60
        dark:from-zinc-900/80 dark:to-zinc-800/60
        text-gray-800 dark:text-white
        flex flex-col items-center justify-center
      `}
    >
      <GlassHeading level={5}>
        © {new Date().getFullYear()} Poran Dip
      </GlassHeading>
      <div className="flex flex-col items-center">
        <GlassParagraph className="text-sm opacity-75 font-bold">
          Built with <GlassLink href="https://react.dev/">React</GlassLink>
          {" + "}
          <GlassLink href="https://reactrouter.com/">React Router</GlassLink>
          {" + "}
          <GlassLink href="https://tailwindcss.com/">TailwindCSS</GlassLink>
        </GlassParagraph>
        <GlassParagraph className="text-base">And lots of 💚</GlassParagraph>
      </div>
    </footer>
  );
};

export default Footer;
