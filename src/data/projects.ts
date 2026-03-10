export type ProjectType = "web" | "mobile" | "other";

export type Project = {
  slug: string;
  name: string;
  type: ProjectType;
  shortDescription: string;
  technologies: string[];
  href?: string;
  featured?: boolean;
  logoSrc?: string;
  screenshots?: string[];
};

export const projects: Project[] = [
  {
    slug: "snacklab",
    name: "SnackLab",
    type: "mobile",
    shortDescription:
      "Aplikacja mobilna do tworzenia kreatywnych przepisów z 3–5 składników, które masz w lodówce. Przeglądanie bazy przepisów, generowanie przepisów z AI (OpenAI), ulubione i własne przepisy.",
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "React Navigation",
      "Zustand",
      "TanStack Query",
      "Supabase",
      "PostgreSQL",
      "OpenAI API",
    ],
    href: "https://github.com/MichalKozlowski2017/SnackLab",
    featured: true,
  },
  {
    slug: "formtrack",
    name: "formtrack",
    type: "mobile",
    shortDescription:
      "AI‑powered gym workout tracker – logowanie treningów, śledzenie postępów i generowanie planów treningowych z GPT‑4o. React Native (Expo) + Supabase.",
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "Supabase",
      "OpenAI / GPT-4o",
    ],
    href: "https://github.com/MichalKozlowski2017/formtrack",
    featured: true,
  },
  {
    slug: "mk-photography-portfolio",
    name: "mk-photography-portfolio",
    type: "web",
    shortDescription:
      "Portfolio fotograficzne w Next.js 16 z panelem admina do uploadu zdjęć, automatycznym wyciąganiem EXIF (aparat, obiektyw, przysłon, ISO, czas) i publiczną galerią.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Next-Auth",
      "Cloudinary",
      "exifr",
      "sharp",
      "Radix UI",
      "Tailwind CSS",
      "shadcn/ui",
      "Recharts",
    ],
    href: "https://github.com/MichalKozlowski2017/mk-photography-portfolio",
    featured: true,
  },
  {
    slug: "dealoot",
    name: "dealoot",
    type: "mobile",
    shortDescription:
      "Cross‑platformowa aplikacja (Android & iOS) agregująca promocje na gry, darmowe giveaways i oferty czasowe. CheapShark, GamerPower, ITAD. Hot Deals, wyszukiwarka, price alerts, EAS Build.",
    technologies: [
      "Expo",
      "React Native",
      "expo-router",
      "NativeWind",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
      "Reanimated",
      "EAS Build",
    ],
    href: "https://github.com/MichalKozlowski2017/dealoot",
    featured: true,
    logoSrc: "/dealoot/dealoot-logo-horizontal.svg",
    screenshots: [
      "/dealoot/dealoot-01.png",
      "/dealoot/dealoot-02.png",
      "/dealoot/dealoot-03.png",
      "/dealoot/dealoot-04.png",
      "/dealoot/dealoot-05.png",
      "/dealoot/dealoot-06.png",
      "/dealoot/dealoot-07.png",
    ],
  },
  {
    slug: "stacker",
    name: "Stacker",
    type: "other",
    shortDescription:
      "Focus stacking dla makrofotografii. Wrzuć zestaw klatek z różną ostrością i uzyskaj jeden ostry obraz. Obsługa RAW (CR2/CR3, NEF, ARW), wyrównanie FFT, blending Laplacian, eksport PNG/JPEG/TIFF. Działa natywnie na macOS.",
    technologies: [
      "Tauri 2",
      "Rust",
      "Svelte 5",
      "TypeScript",
      "rawloader",
      "rustfft",
      "rayon",
    ],
    href: "https://github.com/MichalKozlowski2017/Stacker",
    featured: true,
  },
];
