import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dealoot – Privacy Policy",
  description:
    "Privacy Policy for Dealoot, a cross-platform app for tracking game deals and free giveaways.",
};

const NAME = "Michał Kozłowski";
const EMAIL = "m.kozlowski87@gmail.com";
const WEBSITE = "Portfolio site (URL to be added)";

export default function DealootPrivacyPolicyPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
          Legal
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl">
          Privacy Policy – Dealoot
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Last updated: <span className="font-medium">March 2026</span>
        </p>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          This Privacy Policy describes how Dealoot (the &quot;App&quot;) and
          its accompanying website (the &quot;Site&quot;) collect, use, and
          protect information about you. By using Dealoot or visiting the Site,
          you agree to the practices described in this policy.
        </p>
      </header>

      <article className="prose prose-sm max-w-none dark:prose-invert prose-headings:scroll-mt-24 [&_ul]:space-y-2 [&_p]:mb-3">
        <h2>1. Data Controller</h2>
        <p>The data controller for Dealoot is:</p>
        <p>
          Name: {NAME}
          <br />
          Contact e-mail:{" "}
          <a href={`mailto:${EMAIL}`} className="underline underline-offset-4">
            {EMAIL}
          </a>
          <br />
          Website: {WEBSITE}
        </p>

        <h2>2. What data we collect</h2>

        <h3>2.1. Mobile app (Dealoot)</h3>
        <p>
          Dealoot is designed to work without creating an account. The App does
          not ask you to provide your name, e-mail address, or any other
          personal profile information.
        </p>
        <p>The App processes:</p>
        <p>
          <strong>Local app data (on your device only)</strong>
        </p>
        <ul>
          <li>
            Your wishlist and price alerts (game IDs, titles, target prices).
          </li>
          <li>
            UI preferences and filters (e.g. selected platform / discovery
            filters).
          </li>
        </ul>
        <p>
          These data are stored locally on your device using secure storage.
          They are not sent to my own server.
        </p>
        <p>
          <strong>Technical data from third-party APIs</strong>
        </p>
        <p>
          When you browse deals, the App fetches public information from
          external services:
        </p>
        <ul>
          <li>game titles, images, descriptions, review scores,</li>
          <li>store prices and discounts,</li>
          <li>free game giveaways.</li>
        </ul>
        <p>
          These requests are sent directly from your device to the third-party
          APIs listed in section 4.
        </p>
        <p>
          <strong>Crash and error data (Sentry)</strong>
        </p>
        <p>
          To improve stability, the App uses Sentry crash reporting. When a
          crash or serious error occurs, Sentry may receive:
        </p>
        <ul>
          <li>
            anonymized device information (device model, OS version, locale, app
            version),
          </li>
          <li>
            technical details about the error (stack trace, affected screen),
          </li>
          <li>timestamps.</li>
        </ul>
        <p>
          This information is used solely to diagnose and fix bugs. It is not
          used for advertising or profiling.
        </p>
        <p>The App does not:</p>
        <ul>
          <li>collect your name, e-mail, phone number or address,</li>
          <li>track your precise GPS location,</li>
          <li>
            read your contacts, photos, or other personal content on your
            device.
          </li>
        </ul>
        <p>
          Any purchase or billing data handled by the App Store / Google Play is
          managed by Apple or Google according to their own privacy policies.
          Dealoot does not receive your full payment details.
        </p>

        <h3>2.2. Website</h3>
        <p>When you visit the Dealoot page on the Site:</p>
        <ul>
          <li>
            Your browser automatically sends standard server log information,
            such as IP address, browser type, referrer URL and timestamp. This
            is used for basic security and diagnostics.
          </li>
          <li>
            The Site may use essential cookies or similar technologies required
            to deliver the page correctly.
          </li>
        </ul>
        <p>
          At this time, the Site does not use third-party advertising cookies or
          behavior-based analytics. If this changes in the future, this policy
          will be updated.
        </p>

        <h2>3. How we use your data</h2>
        <p>We use the data described above to:</p>
        <ul>
          <li>show you current game prices, discounts and free giveaways,</li>
          <li>maintain your local wishlist and price alerts on your device,</li>
          <li>detect and fix crashes and performance issues,</li>
          <li>protect the App and Site from abuse and technical attacks.</li>
        </ul>
        <p>We do not sell or rent your personal data to third parties.</p>

        <h2>4. Third-party services</h2>
        <p>Dealoot relies on the following external services to function:</p>
        <ul>
          <li>
            CheapShark – provides PC game deals and store prices.{" "}
            <a
              href="https://www.cheapshark.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.cheapshark.com/
            </a>
          </li>
          <li>
            IsThereAnyDeal (ITAD) – provides price history and market lowest
            prices.{" "}
            <a
              href="https://isthereanydeal.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://isthereanydeal.com/
            </a>
          </li>
          <li>
            GamerPower – provides free game giveaway data.{" "}
            <a
              href="https://www.gamerpower.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.gamerpower.com/
            </a>
          </li>
          <li>
            Steam / Steam Store – provides game descriptions, screenshots and
            review statistics.{" "}
            <a
              href="https://store.steampowered.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://store.steampowered.com/
            </a>
          </li>
          <li>
            Sentry – provides crash and error reporting.{" "}
            <a
              href="https://sentry.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://sentry.io/
            </a>
          </li>
        </ul>
        <p>
          Each of these services processes data under its own privacy policy.
          When your device communicates directly with them, those providers may
          receive your IP address and standard technical information necessary
          to serve the requests.
        </p>
        <p>
          Dealoot is not affiliated with Valve, Steam, CheapShark,
          IsThereAnyDeal, GamerPower, or any game publisher.
        </p>

        <h2>5. Legal basis (for users in the EU/EEA)</h2>
        <p>Where the GDPR applies, we rely on the following legal bases:</p>
        <ul>
          <li>
            <strong>Performance of a contract</strong> – to provide you with the
            App&apos;s core functionality (showing deals, managing alerts).
          </li>
          <li>
            <strong>Legitimate interest</strong> – to improve stability and
            security (crash reporting, basic server logs).
          </li>
        </ul>
        <p>
          You have the right to object to processing based on legitimate
          interests (see section 7).
        </p>

        <h2>6. Data retention</h2>
        <ul>
          <li>
            <strong>Local app data (wishlist, alerts, filters)</strong> – kept
            only on your device, until you clear app data or uninstall the App.
          </li>
          <li>
            <strong>Crash reports (Sentry)</strong> – retained for as long as
            reasonably necessary to diagnose and fix issues, then automatically
            deleted according to Sentry&apos;s retention settings.
          </li>
          <li>
            <strong>Server logs (website)</strong> – stored for a limited period
            for security and diagnostics, then deleted or anonymized.
          </li>
        </ul>

        <h2>7. Your rights</h2>
        <p>Depending on your jurisdiction, you may have the right to:</p>
        <ul>
          <li>access the personal data we process about you,</li>
          <li>request correction of inaccurate data,</li>
          <li>request deletion of data where applicable,</li>
          <li>object to or restrict certain types of processing.</li>
        </ul>
        <p>
          Because Dealoot does not maintain user accounts and stores almost all
          data locally on your device, the most effective way to erase your data
          is to:
        </p>
        <ul>
          <li>remove items from your wishlist/alerts in the App, and/or</li>
          <li>uninstall the App from your device.</li>
        </ul>
        <p>
          If you have questions about your data or want to exercise any rights,
          you can contact me at{" "}
          <a href={`mailto:${EMAIL}`} className="underline underline-offset-4">
            {EMAIL}
          </a>
          .
        </p>

        <h2>8. Children&apos;s privacy</h2>
        <p>
          Dealoot is intended for users aged 16+ (or the applicable age of
          digital consent in your country). The App does not knowingly collect
          personal data from children. If you believe a child has provided
          personal data via Dealoot, please contact me so I can investigate and
          remove the data where appropriate.
        </p>

        <h2>9. Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The latest
          version will always be available on this page, with the &quot;Last
          updated&quot; date at the top. If changes are significant, we may also
          notify you within the App.
        </p>

        <h2>10. Contact</h2>
        <p>
          If you have any questions about this Privacy Policy or how Dealoot
          handles data, please contact:
        </p>
        <p>
          E-mail:{" "}
          <a href={`mailto:${EMAIL}`} className="underline underline-offset-4">
            {EMAIL}
          </a>
          <br />
          Website: {WEBSITE}
        </p>
      </article>
    </div>
  );
}

