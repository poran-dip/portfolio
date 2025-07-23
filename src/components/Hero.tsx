const HeroCard = () => {
  return (
    <div className="flex w-full p-6 rounded-2xl shadow-xl bg-zinc-100 text-gray-800 dark:bg-zinc-900 dark:text-white transition-all duration-300 hover:shadow-2xl dark:shadow-white/20 dark:hover:shadow-white/30">
      <div className="flex-shrink-0 flex flex-col items-center mr-6">
        <img src="/profile.png" alt="Poran Dip avatar" className="w-64 h-64 object-cover rounded-full border-4 border-blue-500 shadow-md"/>
      </div>

      <div className="flex flex-col justify-between flex-1 space-y-4">
        <div>
          <h1 className="text-3xl font-bold">Poran Dip</h1>
          <p className="text-lg text-blue-500">CS Student • Web Developer • Music Producer</p>
          <p className="mt-2 text-base opacity-80">
            Pixel and Sonic Creations • Web and Game Development • Proud{" "}
            {/* Nahida spinning video */}
            <a href="https://youtu.be/7zkCp_kVtj4" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 hover:underline">Radish</a>{" "}
            Enjoyer • Welcome to My World!
          </p>
        </div>

        <div className="flex gap-4">
          <a href="#projects" className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
            View Projects
          </a>
          <a href="#contact" className="px-6 py-3 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition">
            Contact Me
          </a>
        </div>
      </div>
    </div>
  )
}

export default HeroCard
