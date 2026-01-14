import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | GMIT Solution",
  description:
    "Read the Terms and Conditions of GMIT Solution. Understand the rules, policies, and conditions for using our website and services.",
  alternates: {
    canonical: "https://www.gmitsolution.net/terms-and-conditions",
  },
  openGraph: {
    title: "Terms and Conditions | GMIT Solution",
    description:
      "Terms and Conditions governing the use of GMIT Solution website and services.",
    url: "https://www.gmitsolution.net/terms-and-conditions",
    siteName: "GMIT Solution",
    type: "website",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Terms and Conditions
        </h1>
        <p className="text-sm text-gray-500 mt-2">Last updated: January 2026</p>
      </header>

      {/* Content */}
      <section className="space-y-8 text-gray-700 leading-relaxed">
        <p>
          Welcome to <strong>GMIT Solution</strong>. By accessing or using our
          website, you agree to comply with and be bound by the following Terms
          and Conditions. Please read them carefully.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            1. Use of Website
          </h2>
          <p>
            You agree to use this website only for lawful purposes and in a way
            that does not infringe the rights of others or restrict their use of
            the website.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            2. Account Responsibility
          </h2>
          <p>
            If you create an account on our website, you are responsible for
            maintaining the confidentiality of your account information and for
            all activities that occur under your account.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            3. Products & Pricing
          </h2>
          <p>
            We strive to ensure that product descriptions and prices are
            accurate. However, we reserve the right to correct errors, change
            prices, or update product information at any time without prior
            notice.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            4. Orders & Payments
          </h2>
          <p>
            All orders are subject to acceptance and availability. Payments must
            be made through approved payment methods. We reserve the right to
            refuse or cancel any order.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            5. Shipping & Delivery
          </h2>
          <p>
            Delivery times are estimates and may vary depending on location and
            external factors. We are not responsible for delays beyond our
            control.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            6. Returns & Refunds
          </h2>
          <p>
            Returns and refunds are subject to our Return Policy. Products must
            meet the required conditions to be eligible for a return or refund.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            7. Intellectual Property
          </h2>
          <p>
            All content on this website, including text, graphics, logos, and
            images, is the property of GMIT Solution and is protected by
            applicable intellectual property laws.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            8. Limitation of Liability
          </h2>
          <p>
            GMIT Solution shall not be liable for any indirect, incidental, or
            consequential damages arising from the use of our website or
            services.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            9. Changes to Terms
          </h2>
          <p>
            We reserve the right to update or modify these Terms and Conditions
            at any time. Changes will be effective once posted on this page.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            10. Contact Us
          </h2>
          <p>
            If you have any questions about these Terms and Conditions, please
            contact us:
            <br />
            📧 Email: <strong>support@gmitsolution.net</strong>
            <br />
            🌐 Website: <strong>https://www.gmitsolution.net</strong>
          </p>
        </div>
      </section>
    </main>
  );
}
