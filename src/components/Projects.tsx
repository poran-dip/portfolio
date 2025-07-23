const Projects = () => {
  return (
    <section id="projects" className="w-full p-6 rounded-2xl shadow-xl bg-zinc-100 
                                      text-gray-800 dark:bg-zinc-900 dark:text-white 
                                      transition-all duration-300 hover:shadow-2xl dark:shadow-white/20 dark:hover:shadow-white/30">
      <h1 className="text-3xl font-bold mb-4">PROJECTS</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-800 shadow hover:shadow-md transition">Eazydoc</div>
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-800 shadow hover:shadow-md transition">Underwater Object Detection</div>
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-800 shadow hover:shadow-md transition">Eatwise</div>
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-800 shadow hover:shadow-md transition">DailyJournal</div>
      </div>
    </section>
  )
}

export default Projects
