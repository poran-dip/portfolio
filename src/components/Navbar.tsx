import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="p-4 w-full flex items-center justify-between">
      <h1 className="
      text-black dark:text-white text-2xl transition-colors 
        duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r 
      hover:from-blue-300 hover:to-blue-700 hover:bg-[length:200%_200%] 
        hover:animate-gradient-shimmer font-bold cursor-default select-none">
      Poran Dip
      </h1>
      <div className="space-x-16 text-xl">
        <a href="#about" className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400">ABOUT</a>
        <a href="#projects" className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400">PROJECTS</a>
        <a href="https://open.spotify.com/artist/07acxSnyhPk5oDLqfgfEgM" target="_blank" rel="noopener noreferrer" className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400">MUSIC</a>
        <a href="#contact" className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400">CONTACT</a>
      </div>
      <ThemeToggle />
    </nav>
  )
}

export default Navbar
