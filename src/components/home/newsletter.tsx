const Newsletter = () => {
  return (
    <div className="w-full">
      <section
        id="newsletter"
        className="scroll-mt-12 md:scroll-mt-14 mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16"
      >
        <h2 className="font-bold whitespace-nowrap text-2xl">
          <span className="text-jelly">&gt; </span>
          <span className="text-bioglow">./</span>
          <span className="text-foam">newsletter</span>
        </h2>
        <div className="mt-6 flex flex-col gap-2">
          <p className="text-foam">
            Subscribe to my newsletter and follow along as I share updates on my
            projects and whatever I'm building next.
          </p>
          <p className="text-sm sm:text-base italic text-mist">
            Coming soon, stay tuned!
          </p>
        </div>
      </section>
    </div>
  );
};

export default Newsletter;
