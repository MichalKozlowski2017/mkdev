export type ProjectType = "web" | "mobile" | "other";

export type Project = {
  slug: string;
  name: string;
  type: ProjectType;
  shortDescription: string;
  technologies: string[];
  href?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "portfolio",
    name: "Portfolio developera",
    type: "web",
    shortDescription:
      "Twoja główna strona jako developera – miejsce na projekty webowe, aplikacje mobilne i strony z politykami prywatności.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    featured: true,
  },
  {
    slug: "sample-mobile-app",
    name: "Przykładowa aplikacja mobilna",
    type: "mobile",
    shortDescription:
      "Demo aplikacji mobilnej, której privacy policy i inne dokumenty są hostowane na tej stronie.",
    technologies: ["React Native", "Expo"],
    featured: true,
  },
];

