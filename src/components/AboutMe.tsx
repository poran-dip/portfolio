const AboutMe = () => {
  return (
    <section
      id="about"
      className="w-full p-6 rounded-2xl shadow-xl bg-zinc-100 text-gray-800 
                 dark:bg-zinc-900 dark:text-white transition-all duration-300 
                 hover:shadow-2xl dark:shadow-white/20 dark:hover:shadow-white/30"
    >
      <h1 className="text-3xl font-bold mb-4">ABOUT ME</h1>

      <div className="space-y-6">
        {/* Story */}
        <div>
          <h2 className="text-xl font-semibold mb-2">My Story</h2>
          <p className="opacity-80">
            I’m Poran Dip, a Computer Science student passionate about building pixel-perfect web
            apps, crafting immersive music, and exploring game development. I love creating
            experiences that merge creativity and technology.
          </p>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Skills</h2>
          <ul className="list-disc list-inside opacity-80">
            <li>Web Development (React, Tailwind, Supabase)</li>
            <li>Music Production (EDM, mixing & mastering)</li>
            <li>Game Development (Unity, basic)</li>
            <li>AI/ML (beginner)</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Social Links</h2>
          <div className="flex space-x-4">
            <a
              href="https://github.com/poran-dip"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-500"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/poran-dip/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-500"
            >
              LinkedIn
            </a>
            <a
              href="https://www.twitter.com/poran_dip"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-500"
            >
              Twitter
            </a>
          </div>
        </div>

        {/* Fun facts */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Fun Facts</h2>
          <ul className="list-disc list-inside opacity-80">
            <li>I’m a proud <a href="https://youtu.be/7zkCp_kVtj4" target="_blank" className="underline">Radish Enjoyer</a></li>
            <li>I’ve produced over 50 EDM tracks (150+ unfinished)</li>
            <li>I still have a huge anime to-watch list</li>
            <li>I play Genshin Impact way too much</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default AboutMe
