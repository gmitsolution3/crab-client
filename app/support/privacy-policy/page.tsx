import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | GMIT Solution",
  description:
    "Read the Privacy Policy of GMIT Solution. Learn how we collect, use, and protect your personal information.",
  keywords: [
    "privacy policy",
    "gmit solution privacy",
    "ecommerce privacy policy",
    "data protection",
  ],
  alternates: {
    canonical: "https://www.gmitsolution.net/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | GMIT Solution",
    description:
      "Learn how GMIT Solution collects, uses, and protects your personal data.",
    url: "https://www.gmitsolution.net/privacy-policy",
    siteName: "GMIT Solution",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 mt-2">Last updated: January 2026</p>
      </header>

      <section className="space-y-8 text-gray-700 leading-relaxed">
        <p>
          Welcome to <strong>GMIT Solution</strong>. Your privacy is important
          to us. This Privacy Policy explains how we collect, use, and protect
          your personal information when you use our website.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            1. Information We Collect
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Name, email address, phone number</li>
            <li>Billing and shipping address</li>
            <li>Order and payment information</li>
            <li>IP address, browser, and device data</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Process and deliver orders</li>
            <li>Communicate order updates and offers</li>
            <li>Improve our website and services</li>
            <li>Prevent fraud and unauthorized access</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            3. Cookies
          </h2>
          <p>
            We use cookies to enhance your browsing experience, analyze traffic,
            and personalize content. You can disable cookies from your browser
            settings.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            4. Data Sharing
          </h2>
          <p>
            We do not sell your personal information. We may share data with
            trusted third parties such as payment gateways, delivery partners,
            and analytics providers.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            5. Data Security
          </h2>
          <p>
            We use industry-standard security measures to protect your personal
            information. However, no online transmission is 100% secure.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            6. Your Rights
          </h2>
          <p>
            You may request access, correction, or deletion of your personal
            information by contacting us.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            7. Contact Us
          </h2>
          <p>
            📧 Email: <strong>support@gmitsolution.net</strong>
            <br />
            🌐 Website: <strong>https://www.gmitsolution.net</strong>
          </p>
        </div>
      </section>
    </main>
  );
}
