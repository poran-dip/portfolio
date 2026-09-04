const Footer = () => {
  return (
    <footer className="glass mt-6 pt-12 pb-8 rounded-t-2xl w-full gap-4 bg-linear-to-t from-abyss to-surface text-mist flex flex-col items-center justify-center">
      <p className="text-base font-medium text-foam">
        © {new Date().getFullYear()} Poran Dip
      </p>
      <div className="flex flex-col items-center">
        <p className="text-sm opacity-80 font-bold">
          Built with{" "}
          <a
            href="https://react.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bioglow hover:text-jelly transition-colors duration-200"
          >
            React
          </a>
          {" + "}
          <a
            href="https://reactrouter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bioglow hover:text-jelly transition-colors duration-200"
          >
            React Router
          </a>
          {" + "}
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bioglow hover:text-jelly transition-colors duration-200"
          >
            TailwindCSS
          </a>
        </p>
        <p className="text-sm">And lots of 💚</p>
      </div>
    </footer>
  );
};

export default Footer;
