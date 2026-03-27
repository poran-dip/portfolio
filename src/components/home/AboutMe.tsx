import {
  Code2,
  Gamepad2,
  Github,
  Music2,
  Linkedin,
  Instagram,
  Youtube,
  Twitter,
  Star,
  Music,
  Gamepad2Icon,
  Settings,
} from "lucide-react";
import {
  GlassButton,
  GlassCard,
  GlassHeading,
  GlassParagraph,
} from "@/components/ui";
import SocialLink, { type SocialLinkProps } from "./SocialLink";

const AboutMe = () => {
  const socialLinks: SocialLinkProps[] = [
    {
      href: "https://github.com/poran-dip",
      Icon: Github,
      platform: "GitHub",
      description: "code heaven",
    },
    {
      href: "https://linkedin.com/in/poran-dip/",
      Icon: Linkedin,
      platform: "LinkedIn",
      description: "professional me",
    },
    {
      href: "https://open.spotify.com/artist/07acxSnyhPk5oDLqfgfEgM",
      Icon: Music2,
      platform: "Spotify",
      description: "my beats",
    },
    {
      href: "https://littleradishes.itch.io/",
      Icon: Gamepad2,
      platform: "Itch.io",
      description: "game experiments",
    },
    {
      href: "https://youtube.com/@poran_dip",
      Icon: Youtube,
      platform: "YouTube",
      description: "coming soon",
    },
    {
      href: "https://instagram.com/poran_dip",
      Icon: Instagram,
      platform: "Instagram",
      description: "music vibes",
    },
    {
      href: "https://hoyolab.com/accountCenter/postList?id=342955108",
      Icon: Star,
      platform: "HoYoLAB",
      description: "gacha life",
    },
    {
      href: "https://x.com/poran_dip",
      Icon: Twitter,
      platform: "X",
      description: "digital graveyard",
    },
  ];

  return (
    <section id="about" className="scroll-mt-8 py-4 md:py-12 lg:py-16">
      <div className="flex items-center gap-4">
        <GlassHeading level={3} className="font-bold whitespace-nowrap">
          ABOUT ME
        </GlassHeading>
        <div className="h-px flex-1 bg-white/20" />
      </div>

      <div className="mt-6 flex flex-col gap-12">
        {/* Story */}
        <div className="mt-2 relative">
          <GlassHeading level={4}>My Story</GlassHeading>
          <GlassParagraph className="mt-4">
            Hey there! I'm Poran Dip, a 22-year-old CS student from Guwahati,
            Assam, living my best life building pixel-perfect web apps, dropping
            hard-hitting EDM tracks, and crafting immersive gaming experiences.
            I'm all about that sweet spot where creativity meets code.
          </GlassParagraph>
        </div>

        <div>
          <GlassHeading level={4}>Skill Trees</GlassHeading>

          <div className="mt-6 grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {/* Web Dev */}
            <GlassCard className="p-4 md:p-5 flex flex-col gap-3 from-violet-400/80! to-blue-500/80!">
              <div className="flex items-center gap-4">
                <Code2 className="h-5 w-5 text-indigo-50" />
                <GlassHeading level={6} className="text-indigo-50!">
                  Full-Stack Atelier
                </GlassHeading>
              </div>
              <GlassParagraph className="text-indigo-50!">
                TypeScript, Python · React, Next.js, TailwindCSS, React Router,
                Vite · Node.js, Express, Socket.IO, Flask · PostgreSQL, Prisma
              </GlassParagraph>
            </GlassCard>

            {/* Music */}
            <GlassCard className="p-4 md:p-5 flex flex-col gap-3 from-indigo-400/80! to-sky-500/80!">
              <div className="flex items-center gap-4">
                <Settings className="h-5 w-5 text-blue-50" />
                <GlassHeading level={6} className="text-blue-50!">
                  Developer Toolkit
                </GlassHeading>
              </div>
              <GlassParagraph className="text-blue-50!">
                Git, GitHub, GitHub Actions · Docker · CLI Tooling (Chalk,
                Commander) · Browser Extensions (MV3) · npm Package Publishing
              </GlassParagraph>
            </GlassCard>

            {/* Game Dev */}
            <GlassCard className="p-4 md:p-5 flex flex-col gap-3 from-cyan-400/80! to-emerald-500/80!">
              <div className="flex items-center gap-4">
                <Music className="h-5 w-5 text-teal-50" />
                <GlassHeading level={6} className="text-teal-50!">
                  Music Production Lab
                </GlassHeading>
              </div>
              <GlassParagraph className="text-teal-50!">
                EDM, Electropop, Lo-Fi, J-Pop, Game OST · FL Studio, Sylenth1,
                Piano · Sound Design, Mixing, Mastering, Music Theory
              </GlassParagraph>
            </GlassCard>

            {/* Misc */}
            <GlassCard className="p-4 md:p-5 flex flex-col gap-3 from-teal-400/80! to-green-500/80!">
              <div className="flex items-center gap-4">
                <Gamepad2Icon className="h-5 w-5 text-emerald-50" />
                <GlassHeading level={6} className="text-emerald-50!">
                  Game Dev Forge
                </GlassHeading>
              </div>
              <GlassParagraph className="text-emerald-50!">
                Visual Novels, FPS Prototypes · Ren'Py, Twine, Unity ·
                Programming, Art, Animation, Soundtrack Production
              </GlassParagraph>
            </GlassCard>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <GlassHeading level={4}>Online Presence</GlassHeading>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            {socialLinks.map((link) => (
              <SocialLink key={link.platform} {...link} />
            ))}
          </div>
        </div>

        {/* Fun facts */}
        <div>
          <GlassHeading level={4}>Random Fun Facts</GlassHeading>
          <div className="mt-6 grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <GlassCard className="p-4 md:p-5 flex flex-col gap-3 from-lime-500/60! to-emerald-600/60!">
              <div className="flex items-center gap-3">
                <span className="text-xl">🌱</span>
                <GlassHeading level={6} className="text-green-50!">
                  Radish Enjoyer
                </GlassHeading>
              </div>
              <GlassParagraph className="text-green-50!">
                Big Genshin fan! My little{" "}
                <a
                  href="https://youtu.be/7zkCp_kVtj4"
                  className="underline decoration-dotted decoration-green-200 dark:decoration-green-400 hover:text-green-200 dark:hover:text-green-400 hover:decoration-solid"
                  target="_blank"
                >
                  radish God Nahida
                </a>{" "}
                and her explosive radishes make monsters go boom!
              </GlassParagraph>
            </GlassCard>

            <GlassCard className="p-4 md:p-5 flex flex-col gap-3 from-teal-500/60! to-sky-600/60!">
              <div className="flex items-center gap-3">
                <span className="text-xl">🥔</span>
                <GlassHeading level={6} className="text-cyan-50!">
                  Anime Enthusiast
                </GlassHeading>
              </div>
              <GlassParagraph className="text-cyan-50!">
                Team Light Yagami for{" "}
                <a
                  href="https://youtu.be/KC6T3_O2iWc"
                  target="_blank"
                  className="underline decoration-dotted decoration-cyan-200 dark:decoration-cyan-400 hover:text-cyan-200 dark:hover:text-cyan-400 hover:decoration-solid"
                >
                  professional chip eating
                </a>
                . If I was an isekai MC, I'd wish to reincarnate as an axolotl.
              </GlassParagraph>
            </GlassCard>

            <GlassCard className="p-4 md:p-5 flex flex-col gap-3 from-indigo-500/60! to-purple-600/60!">
              <div className="flex items-center gap-3">
                <span className="text-xl">♘</span>
                <GlassHeading level={6} className="text-violet-50!">
                  Brilliant Blunderer
                </GlassHeading>
              </div>
              <GlassParagraph className="text-violet-50!">
                <a
                  href="https://anarchychess.fandom.com/wiki/%22Google_en_passant%22_Comment_Chain"
                  target="_blank"
                  className="underline decoration-dotted decoration-violet-200 dark:decoration-violet-400 hover:text-violet-200 dark:hover:text-violet-400 hover:decoration-solid"
                >
                  Holy hell!
                </a>{" "}
                New chess menace casually sitting at 1950 Elo just dropped{" "}
                <a
                  href="https://www.chess.com/member/porandip/stats/rapid?days=0"
                  target="_blank"
                  className="underline decoration-dotted decoration-violet-200 dark:decoration-violet-400 hover:text-violet-200 dark:hover:text-violet-400 hover:decoration-solid"
                >
                  (top 0.5% worldwide)
                </a>
              </GlassParagraph>
            </GlassCard>

            <GlassCard className="p-4 md:p-5 flex flex-col gap-3 from-fuchsia-500/60! to-rose-600/60!">
              <div className="flex items-center gap-3">
                <span className="text-xl">🐀</span>
                <GlassHeading level={6} className="text-pink-50!">
                  OG Story Weaver
                </GlassHeading>
              </div>
              <GlassParagraph className="text-pink-50!">
                Been crafting digital tales since age 10 with Twine. My{" "}
                <a
                  href="/flea-market.html"
                  target="_blank"
                  className="underline decoration-dotted decoration-pink-200 dark:decoration-pink-400 hover:text-pink-200 dark:hover:text-pink-400 hover:decoration-solid"
                >
                  "Rat Killers" flea market
                </a>{" "}
                game was peak childhood entrepreneurship
              </GlassParagraph>
            </GlassCard>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="pt-3 sm:pt-6 flex flex-col sm:flex-row gap-3 sm:gap-6 sm:justify-center">
          <a href="Poran_Dip_Resume.pdf">
            <GlassButton className="w-full sm:w-40 lg:w-48 cursor-pointer text-sm lg:text-base h-10 lg:h-12">
              View Resume
            </GlassButton>
          </a>
          <a href="/#testimonials">
            <GlassButton
              variant="success"
              className="w-full sm:w-40 lg:w-48 cursor-pointer text-sm lg:text-base h-10 lg:h-12"
            >
              Testimonials
            </GlassButton>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
