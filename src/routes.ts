import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/home.tsx"),
  route("/blog", "pages/blog.tsx"),
  route("*", "pages/not-found.tsx"),
] satisfies RouteConfig;
