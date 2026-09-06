import type { ExperienceEntry } from "@/types/experience.types";

export const experiences: ExperienceEntry[] = [
  {
    id: "networking-nic",
    title: "Networking Intern",
    date: "Jul 2026 · 1 mo",
    location: "National Informatics Centre (NIC), MeitY",
    description: [
      "Designed and simulated a multi-VLAN network topology in Cisco Packet Tracer, implementing inter-VLAN routing, static routing, subnetting, and CIDR",
      'Co-authored the "Logical Network Design" section of a report on "Network Infrastructure and E-Governance of NKN"',
    ],
    link: "https://nic.gov.in/",
  },
  {
    id: "web-wing-coding-club-aec",
    title: "Web Wing Coordinator",
    date: "Aug 2025 - Jul 2026 · 1 yr",
    location: "Coding Club, Assam Engineering College",
    description: [
      "Organized and judged hackathons and coding events for the Coding Club",
      "Curated problem statements for the flagship hackathon Codestellation and engineered a secure, tamper-proof countdown API for timed release",
      "Mentored juniors in web development and competitive programming through structured sessions",
    ],
    link: "https://coding.aec.ac.in/",
  },
  {
    id: "full-stack-edge-systems-tih",
    title: "Full-Stack & Edge Systems Intern",
    date: "Jul 2025 · 1 mo",
    location: "Technology Innovation Hub (TIH), IIT Guwahati",
    description: [
      "Designed and delivered ODStream, a real-time LAN multi-user object detection platform, from scratch in 17 days — initially commissioned for an underwater drone application",
      "Ported the system to a Jetson Nano edge backend with Intel RealSense support, collaborating with mentors to optimize on-device inference",
    ],
    link: "https://iitg.ac.in/tihue/",
  },
];
