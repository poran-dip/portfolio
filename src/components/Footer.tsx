const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center w-full p-4 text-black dark:text-white space-y-2">
      <p className="text-sm">© {new Date().getFullYear()} Poran Dip</p>
      <div className="flex space-x-6 text-sm">
        <a href="https://github.com/poran-dip" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
        <a href="https://www.linkedin.com/in/poran-dip/" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
      </div>
      <p className="text-xs opacity-75 font-bold">
        Built with <a href="https://vite.dev/" target="_blank" rel="noopener noreferrer" className="hover:underline">Vite</a>
        {" + "}<a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="hover:underline">React</a>
        {" + "}<a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">TailwindCSS</a></p>
    </footer>
  )
}

export default Footer
