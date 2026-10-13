import type { Metadata } from "next";
import { StudioChrome } from "@/components/studio/studio-chrome";

export const metadata: Metadata = {
  title: "AI Studio",
  description: "Lokalny panel sterowania ComfyUI",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <StudioChrome>{children}</StudioChrome>;
}
