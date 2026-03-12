import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./index.css";

export const meta: Route.MetaFunction = () => [
	{ title: "Poran Dip — Developer & Music Producer" },
	{
		name: "description",
		content:
			"Portfolio of Poran Dip — CS student, web developer, music producer, and tech enthusiast.",
	},
	{
		name: "keywords",
		content: "Poran Dip, Portfolio, Developer, Web Developer, Music Producer",
	},
	{ name: "author", content: "Poran Dip" },

	{ property: "og:title", content: "Poran Dip Portfolio" },
	{
		property: "og:description",
		content: "Check out my projects, music, and more!",
	},
	{ property: "og:type", content: "website" },
	{ property: "og:url", content: "https://porandip.vercel.app/" },
	{
		property: "og:image",
		content: "https://porandip.vercel.app/thumbnail.png",
	},

	{ name: "twitter:card", content: "summary_large_image" },
	{ name: "twitter:title", content: "Poran Dip Portfolio" },
	{
		name: "twitter:description",
		content: "Check out my projects, music, and more!",
	},
	{
		name: "twitter:image",
		content: "https://porandip.vercel.app/thumbnail.png",
	},

	{ name: "theme-color", content: "#ffffff" },
];

export const links: Route.LinksFunction = () => [
	{ rel: "icon", href: "/favicon.ico" },
	{ rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
	{ rel: "manifest", href: "/site.webmanifest" },
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="scroll-smooth" suppressHydrationWarning>
			<head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<Meta />
				<Links />

				<script
					dangerouslySetInnerHTML={{
						__html: `
              document.documentElement.classList.toggle(
                "dark",
                localStorage.theme === "dark" ||
                (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
              );
            `,
					}}
				/>
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	if (isRouteErrorResponse(error)) {
		return (
			<main className="container mx-auto p-8 text-center">
				<h1 className="text-4xl font-bold">{error.status}</h1>
				<p>{error.statusText}</p>
			</main>
		);
	}

	const isDev = import.meta.env.DEV;
	const message = error instanceof Error ? error.message : "Unknown error";
	const stack = error instanceof Error ? error.stack : undefined;

	return (
		<main className="container mx-auto p-8 text-center">
			<h1 className="text-4xl font-bold">Something went wrong</h1>
			<p>{message}</p>

			{isDev && stack && (
				<pre className="mt-6 w-full max-w-3xl mx-auto p-4 overflow-x-auto rounded-lg bg-black/80 text-red-300 text-left text-sm">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}
