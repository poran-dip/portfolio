const FunFacts = () => {
  return (
    <div>
      <h4 className="text-xl font-bold text-foam">Fun Facts About Me</h4>

      <div className="mt-4 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass rounded-xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="glass-panel flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg">
              🌱
            </span>
            <p className="font-semibold text-foam">Radish Enjoyer</p>
          </div>
          <p className="text-sm text-mist">
            Big Genshin fan — my little{" "}
            <a
              href="https://youtu.be/7zkCp_kVtj4"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bioglow underline decoration-dotted transition-colors duration-200 hover:text-jelly"
            >
              radish god Nahida
            </a>{" "}
            and her explosive radishes make monsters go boom.
          </p>
        </div>

        <div className="glass rounded-xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="glass-panel flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg">
              🥔
            </span>
            <p className="font-semibold text-foam">Anime Enthusiast</p>
          </div>
          <p className="text-sm text-mist">
            Team Light Yagami for{" "}
            <a
              href="https://youtu.be/KC6T3_O2iWc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bioglow underline decoration-dotted transition-colors duration-200 hover:text-jelly"
            >
              professional chip eating
            </a>
            . If I were an isekai MC, I'd wish to reincarnate as an axolotl.
          </p>
        </div>

        <div className="glass rounded-xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="glass-panel flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg text-foam">
              ♘
            </span>
            <p className="font-semibold text-foam">Brilliant Blunderer</p>
          </div>
          <p className="text-sm text-mist">
            <a
              href="https://anarchychess.fandom.com/wiki/%22Google_en_passant%22_Comment_Chain"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bioglow underline decoration-dotted transition-colors duration-200 hover:text-jelly"
            >
              Holy hell!
            </a>{" "}
            New chess menace casually sitting at 1950 Elo just dropped{" "}
            <a
              href="https://www.chess.com/member/porandip/stats/rapid?days=0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bioglow underline decoration-dotted transition-colors duration-200 hover:text-jelly"
            >
              (top 0.5% worldwide)
            </a>
          </p>
        </div>

        <div className="glass rounded-xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="glass-panel flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg">
              🐀
            </span>
            <p className="font-semibold text-foam">OG Story Weaver</p>
          </div>
          <p className="text-sm text-mist">
            Been crafting digital tales since age 10 with Twine. My{" "}
            <a
              href="/flea-market.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bioglow underline decoration-dotted transition-colors duration-200 hover:text-jelly"
            >
              "Rat Killers" flea market
            </a>{" "}
            game was peak childhood entrepreneurship.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FunFacts;
