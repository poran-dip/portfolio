import { Gamepad2, Link, Music2, Star } from "lucide-react";
import type { SocialLink } from "@/types/social";

export const socialLinks: SocialLink[] = [
  {
    href: "https://github.com/poran-dip",
    Icon: Link,
    platform: "GitHub",
    description: "code heaven",
  },
  {
    href: "https://linkedin.com/in/poran-dip/",
    Icon: Link,
    platform: "Linkedin",
    description: "professional me",
  },
  {
    href: "https://open.spotify.com/artist/07acxSnyhPk5oDLqfgfEgM",
    Icon: Music2,
    platform: "Spotify",
    description: "my beats",
  },
  {
    href: "https://littleradishes.itch.io/",
    Icon: Gamepad2,
    platform: "Itch.io",
    description: "game experiments",
  },
  {
    href: "https://youtube.com/@poran_dip",
    Icon: Link,
    platform: "YouTube",
    description: "coming soon",
  },
  {
    href: "https://instagram.com/poran_dip",
    Icon: Link,
    platform: "Instagram",
    description: "music vibes",
  },
  {
    href: "https://hoyolab.com/accountCenter/postList?id=342955108",
    Icon: Star,
    platform: "HoYoLAB",
    description: "gacha life",
  },
  {
    href: "https://x.com/poran_dip",
    Icon: Link,
    platform: "X",
    description: "digital graveyard",
  },
];
