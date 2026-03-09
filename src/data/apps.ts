export type Platform = "ios" | "android";

export type PolicySection = {
  id: string;
  title: string;
  content: string;
};

export type MobileApp = {
  slug: string;
  name: string;
  shortDescription: string;
  platforms: Platform[];
  appStoreUrl?: string;
  playStoreUrl?: string;
  privacyPolicy: {
    language: "pl" | "en";
    lastUpdated: string;
    sections: PolicySection[];
  };
};

export const mobileApps: MobileApp[] = [
  {
    slug: "sample-mobile-app",
    name: "Sample Mobile App",
    shortDescription:
      "Przykładowa aplikacja mobilna używana do testowania procesu publikacji oraz stron z polityką prywatności.",
    platforms: ["ios", "android"],
    appStoreUrl: "",
    playStoreUrl: "",
    privacyPolicy: {
      language: "en",
      lastUpdated: "2026-03-09",
      sections: [
        {
          id: "introduction",
          title: "1. Introduction",
          content:
            "This Privacy Policy explains how the Sample Mobile App (“the App”) collects, uses and protects your information. By using the App, you agree to the collection and use of information in accordance with this policy.",
        },
        {
          id: "data-collected",
          title: "2. Data we collect",
          content:
            "The App is designed to collect only the minimum amount of data required to function properly. Depending on how you use the App, this may include: basic device information (such as device model and operating system version) and anonymised usage analytics. The App does not knowingly collect personally identifiable information such as your name, email address or phone number.",
        },
        {
          id: "analytics",
          title: "3. Analytics and third-party services",
          content:
            "If analytics are enabled, we may use privacy-focused analytics tools to understand how the App is used (for example, which screens are most popular). This information is collected in an aggregated and anonymised form and is not used to identify individual users.",
        },
        {
          id: "data-use",
          title: "4. How we use data",
          content:
            "Any collected data is used solely to improve the stability, performance and user experience of the App, fix bugs and plan future features. We do not sell your data to third parties.",
        },
        {
          id: "data-retention",
          title: "5. Data retention",
          content:
            "We retain analytics and diagnostic data only for as long as necessary to fulfil the purposes outlined in this policy, unless a longer retention period is required by law.",
        },
        {
          id: "children",
          title: "6. Children’s privacy",
          content:
            "The App is not directed to children under the age specified by applicable law in your jurisdiction. We do not knowingly collect personal information from children. If you believe that we might have collected such information, please contact us so we can delete it.",
        },
        {
          id: "changes",
          title: "7. Changes to this policy",
          content:
            "We may update this Privacy Policy from time to time. We will update the “Last updated” date at the top of this page when changes are made. Your continued use of the App after any changes means you accept the updated policy.",
        },
        {
          id: "contact",
          title: "8. Contact",
          content:
            "If you have any questions about this Privacy Policy or how data is handled in the App, you can contact the developer at the email address provided in the store listing.",
        },
      ],
    },
  },
];

export function getMobileAppBySlug(slug: string): MobileApp | undefined {
  return mobileApps.find((app) => app.slug === slug);
}

