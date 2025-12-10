import { GlassButton } from "./ui/GlassButton"
import { GlassCard } from "./ui/GlassCard"
import { GlassHeading } from "./ui/GlassHeading"
import { GlassLink } from "./ui/GlassLink"
import { GlassParagraph } from "./ui/GlassParagraph"
import { Code2, Gamepad2, Github, Music2, Linkedin, Instagram, Youtube, Twitter, Star, Music, Gamepad2Icon, Ellipsis } from "lucide-react"

const AboutMe = () => {
  return (
    <GlassCard hoverable={false} id="about" className="scroll-mt-20">
      <GlassHeading>ABOUT ME</GlassHeading>
      <div className="mt-6 space-y-8">
        {/* Story */}
        <div className="relative">
          <GlassHeading level={3}>My Story</GlassHeading>
          <GlassParagraph className="mt-4 text-lg leading-relaxed">
            Hey there! I'm Poran Dip, a 21-year-old CS student from Guwahati, Assam, living my best life 
            building pixel-perfect web apps, dropping hard-hitting EDM tracks, and crafting immersive 
            gaming experiences. I'm all about that sweet spot where creativity meets code.
          </GlassParagraph>
        </div>

        <div>
          <GlassHeading level={3}>My Skill Trees</GlassHeading>
          
          <div className="mt-6 grid gap-6 md:grid-cols-4">
            {/* Web Dev */}
            <GlassCard className="from-blue-400/80! to-purple-500/80!">
              <div className="flex space-x-4 items-center">
                <Code2 className="h-5 w-5 text-blue-50" />
                <GlassHeading level={5} className="font-bold! text-blue-50!">Web Wizardry</GlassHeading>
              </div>
              <GlassParagraph className="mt-2 text-base text-blue-50!">
                React, TypeScript, TailwindCSS, Vite, Node.js, Prisma, Flask, MongoDB, Postgres, Supabase, Custom UI Components
              </GlassParagraph>
            </GlassCard>

            {/* Music */}
            <GlassCard className="from-pink-400/80! to-red-500/80!">
              <div className="flex space-x-4 items-center">
                <Music className="h-5 w-5 text-rose-50" />
                <GlassHeading level={5} className="font-bold! text-rose-50!">Music Alchemy</GlassHeading>
              </div>
              <GlassParagraph className="mt-2 text-base text-rose-50!">
                EDM, Electro Pop, Lo-Fi, J-Pop, Game OST, and more; FL Studio, Piano, Music Theory, Sound Design, Mixing & Mastering
              </GlassParagraph>
            </GlassCard>

            {/* Game Dev */}
            <GlassCard className="from-green-400/80! to-emerald-500/80!">
              <div className="flex space-x-4 items-center">
                <Gamepad2Icon className="h-5 w-5 text-lime-50" />
                <GlassHeading level={5} className="font-bold! text-lime-50!">Game Dev Forge</GlassHeading>
              </div>
              <GlassParagraph className="mt-2 text-base text-lime-50!">
                Visual Novels, FPS Battlers (newbie); RenPy, Twine, Unity (basics); Programming, Art & Animations, OST Production
              </GlassParagraph>
            </GlassCard>

            {/* Misc */}
            <GlassCard className="from-yellow-400/80! to-orange-500/80!">
              <div className="flex space-x-4 items-center">
                <Ellipsis className="h-5 w-5 text-amber-50" />
                <GlassHeading level={5} className="font-bold! text-amber-50!">Misc Arcana</GlassHeading>
              </div>
              <GlassParagraph className="mt-2 text-base text-amber-50!">
                YOLO-based Object Detection, LAN & WiFi Networking, AI Chatbot Prototypes, SBC Deployments (Jetson Nano)
              </GlassParagraph>
            </GlassCard>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <GlassHeading level={3}>My Online Presence</GlassHeading>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <GlassLink href="https://github.com/poran-dip" className="flex items-center gap-2 justify-center p-3 rounded-lg hover:bg-white/10 transition-all">
              <Github className="w-6 h-6" />
              <div className="flex flex-col ml-4 items-center">
                <span className="text-sm">GitHub</span>
                <span className="text-xs opacity-60 text-center">code heaven</span>
              </div>
            </GlassLink>
            
            <GlassLink href="https://linkedin.com/in/poran-dip/" className="flex items-center gap-2 justify-center p-3 rounded-lg hover:bg-white/10 transition-all">
              <Linkedin className="w-6 h-6" />
              <div className="flex flex-col ml-4 items-center">
                <span className="text-sm">LinkedIn</span>
                <span className="text-xs opacity-60 text-center">professional me</span>
              </div>
            </GlassLink>

            <GlassLink href="https://open.spotify.com/artist/07acxSnyhPk5oDLqfgfEgM" className="flex items-center gap-2 justify-center p-3 rounded-lg hover:bg-white/10 transition-all">
              <Music2 className="w-6 h-6" />
              <div className="flex flex-col ml-4 items-center">
                <span className="text-sm">Spotify</span>
                <span className="text-xs opacity-60 text-center">my beats</span>
              </div>
            </GlassLink>

            <GlassLink href="https://littleradishes.itch.io/" className="flex items-center gap-2 justify-center p-3 rounded-lg hover:bg-white/10 transition-all">
              <Gamepad2 className="w-6 h-6" />
              <div className="flex flex-col ml-4 items-center">
                <span className="text-sm">Itch.io</span>
                <span className="text-xs opacity-60 text-center">game experiments</span>
              </div>
            </GlassLink>
            
            <GlassLink href="https://youtube.com/@poran_dip" className="flex items-center gap-2 justify-center p-3 rounded-lg hover:bg-white/10 transition-all">
              <Youtube className="w-6 h-6" />
              <div className="flex flex-col ml-4 items-center">
                <span className="text-sm">YouTube</span>
                <span className="text-xs opacity-60 text-center">coming soon</span>
              </div>
            </GlassLink>

            <GlassLink href="https://instagram.com/poran_dip" className="flex items-center gap-2 justify-center p-3 rounded-lg hover:bg-white/10 transition-all">
              <Instagram className="w-6 h-6" />
              <div className="flex flex-col ml-4 items-center">
                <span className="text-sm">Instagram</span>
                <span className="text-xs opacity-60 text-center">music vibes</span>
              </div>
            </GlassLink>
            
            <GlassLink href="https://hoyolab.com/accountCenter/postList?id=342955108" className="flex items-center gap-2 justify-center p-3 rounded-lg hover:bg-white/10 transition-all">
              <Star className="w-6 h-6" />
              <div className="flex flex-col ml-4 items-center">
                <span className="text-sm">HoYoLAB</span>
                <span className="text-xs opacity-60 text-center">gacha life</span>
              </div>
            </GlassLink>
            
            <GlassLink href="https://x.com/poran_dip" className="flex items-center gap-2 justify-center p-3 rounded-lg hover:bg-white/10 transition-all">
              <Twitter className="w-6 h-6" />
              <div className="flex flex-col ml-4 items-center">
                <span className="text-sm">X</span>
                <span className="text-xs opacity-60 text-center">digital graveyard</span>
              </div>
            </GlassLink>
          </div>
        </div>

        {/* Fun facts */}
        <div>
          <GlassHeading level={3}>Random Fun Facts About Me</GlassHeading>
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlassCard className="flex flex-col from-green-500/60! to-emerald-600/60!">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🌱</span>
                <GlassHeading level={5}>Radish Enjoyer</GlassHeading>
              </div>
              <GlassParagraph className="mt-2 text-lime-50!">
                Big Genshin fan! My little <a href="https://youtu.be/7zkCp_kVtj4" className="hover:text-green-400 hover:underline" target="_blank">radish God Nahida</a> and her explosive radishes make monsters go boom!
              </GlassParagraph>
            </GlassCard>
            
            <GlassCard className="flex flex-col from-red-500/60! to-orange-600/60!">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🥔</span>
                <GlassHeading level={5}>Anime Enthusiast</GlassHeading>
              </div>
              <GlassParagraph className="mt-2 text-red-50!">
                Team Light Yagami for <a href="https://youtu.be/KC6T3_O2iWc" target="_blank" className="hover:text-orange-400 hover:underline">professional chip eating</a>. If I was an isekai MC, I'd wish to reincarnate as an axolotl.
              </GlassParagraph>
            </GlassCard>
            
            <GlassCard className="flex flex-col from-slate-500/60! to-gray-600/60!">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">♘</span>
                <GlassHeading level={5}>Brilliant Blunderer</GlassHeading>
              </div>
              <GlassParagraph className="mt-2 text-slate-50!">
                <a href="https://anarchychess.fandom.com/wiki/%22Google_en_passant%22_Comment_Chain" target="_blank" className="hover:text-yellow-500 hover:underline">Holy hell!</a> New chess menace casually sitting at 1950 Elo just dropped <a href="https://www.chess.com/member/porandip/stats/rapid?days=0" target="_blank" className="hover:text-yellow-500 hover:underline">(top 0.5% worldwide)</a>
              </GlassParagraph>
            </GlassCard>
            
            <GlassCard className="flex flex-col from-purple-500/60! to-indigo-600/60!">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🐀</span>
                <GlassHeading level={5}>OG Story Weaver</GlassHeading>
              </div>
              <GlassParagraph className="mt-2 text-purple-50!">
                Been crafting digital tales since age 10 with Twine. My "Rat Killers" flea market game was peak childhood entrepreneurship
              </GlassParagraph>
            </GlassCard>
          </div>
        </div>
            <div className="mt-6 grid md:grid-cols-2 gap-6">
            <GlassLink href="Poran_Dip_Resume.pdf" download variant="internal"><GlassButton className="w-full cursor-pointer" variant="success">Download My Resume</GlassButton></GlassLink>
            <GlassLink href="#testimonials" variant="internal"><GlassButton variant="secondary" className="w-full cursor-pointer">View Testimonials</GlassButton></GlassLink>
          </div>
      </div>
    </GlassCard>
  )
}

export default AboutMe
