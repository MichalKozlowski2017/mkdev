import { z } from "zod";

export const heroBlockSchema = z.object({
  type: z.literal("hero"),
  headline: z.string(),
  subheadline: z.string().optional(),
});

export const proseBlockSchema = z.object({
  type: z.literal("prose"),
  body: z.string(),
});

export const contentBlockSchema = z.discriminatedUnion("type", [
  heroBlockSchema,
  proseBlockSchema,
]);

export const pageSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string().optional(),
  publishedAt: z.string().optional(),
  blocks: z.array(contentBlockSchema),
});

export const blogPostSchema = z.object({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string().optional(),
  publishedAt: z.string(),
  bodyMdx: z.string(),
});

export type ContentBlock = z.infer<typeof contentBlockSchema>;
export type Page = z.infer<typeof pageSchema>;
export type BlogPost = z.infer<typeof blogPostSchema>;

export const pageFrontmatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string().optional(),
  publishedAt: z.string().optional(),
  heroHeadline: z.string().optional(),
  heroSubheadline: z.string().optional(),
});

export const blogFrontmatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string().optional(),
  publishedAt: z.string(),
});

export const mobileAppFrontmatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  tagline: z.string().optional(),
  /** Niższa wartość = wyżej na liście. Bez pola — na końcu alfabetycznie. */
  sortOrder: z.coerce.number().optional(),
  googlePlayUrl: z.string().url().optional(),
  appStoreUrl: z.string().url().optional(),
  /** `slug` strony z `content/pages` (np. `privacy-moja-apka` → `/privacy-moja-apka`). */
  privacyPolicySlug: z.string().optional(),
});

export const mobileAppSchema = mobileAppFrontmatterSchema.extend({
  bodyMdx: z.string(),
  iconSrc: z.string().optional(),
  galleryImages: z.array(z.string()).default([]),
});

export type MobileApp = z.infer<typeof mobileAppSchema>;
