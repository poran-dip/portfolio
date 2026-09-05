import { execSync } from "node:child_process";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// Runs once per build, not per request — the values below get baked into the
// bundle as literal strings via Vite's `define` (a plain build-time text
// substitution, same idea as webpack's DefinePlugin). Every fresh deploy
// re-runs this, so it always reflects the commit that was actually built.
const getGitCommitHash = (): string => {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch {
    return "unknown";
  }
};

const getGitCommitDate = (): string => {
  try {
    return execSync("git log -1 --format=%cI").toString().trim();
  } catch {
    return "";
  }
};

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  define: {
    __BUILD_COMMIT__: JSON.stringify(getGitCommitHash()),
    __BUILD_COMMIT_DATE__: JSON.stringify(getGitCommitDate()),
  },
});
