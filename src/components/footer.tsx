import { Link } from "lucide-react";
import { navLinks } from "@/data/nav-links";

const REPO_URL = "https://github.com/poran-dip/portfolio";

const formatCommitDate = (iso: string): string => {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
};

const Footer = () => {
  const commitDate = formatCommitDate(__BUILD_COMMIT_DATE__);

  return (
    <footer className="glass mt-6 w-full rounded-t-2xl bg-linear-to-t from-abyss to-surface text-mist">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-12">
          {/* Left: repo + build metadata */}
          <div className="flex flex-col gap-2">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 text-sm font-medium text-bioglow transition-colors duration-200 hover:text-jelly"
            >
              <Link className="h-4 w-4" />
              View this site's source
            </a>
            {commitDate && (
              <p className="text-xs text-mist">
                Last updated {commitDate}
                {__BUILD_COMMIT__ !== "unknown" && (
                  <>
                    {" · "}
                    <a
                      href={`${REPO_URL}/commit/${__BUILD_COMMIT__}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-dotted transition-colors duration-200 hover:text-bioglow"
                    >
                      {__BUILD_COMMIT__}
                    </a>
                  </>
                )}
              </p>
            )}
          </div>

          {/* Right: quick links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2 sm:justify-end">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="h-px w-full bg-mist/10" />

        <p className="text-center text-sm text-mist">
          © {new Date().getFullYear()} Poran Dip
        </p>
      </div>
    </footer>
  );
};

export default Footer;
