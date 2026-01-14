import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | GMIT Solution",
  description:
    "Learn about the Refund Policy of GMIT Solution. Understand the eligibility, process, and timeline for receiving refunds.",
  alternates: {
    canonical: "https://www.gmitsolution.net/refund-policy",
  },
  openGraph: {
    title: "Refund Policy | GMIT Solution",
    description:
      "Details about refunds, return eligibility, and timelines at GMIT Solution.",
    url: "https://www.gmitsolution.net/refund-policy",
    siteName: "GMIT Solution",
    type: "website",
  },
};

export default function RefundPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Refund Policy
        </h1>
        <p className="text-sm text-gray-500 mt-2">Last updated: January 2026</p>
      </header>

      {/* Content */}
      <section className="space-y-8 text-gray-700 leading-relaxed">
        <p>
          At <strong>GMIT Solution</strong>, we strive to ensure customer
          satisfaction. This Refund Policy explains the conditions under which
          refunds are granted and the process to follow.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            1. Eligibility for Refunds
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Refunds are available for products returned within the specified
              return period.
            </li>
            <li>
              Products must be unused, in original condition, and with original
              packaging.
            </li>
            <li>Proof of purchase (invoice/order ID) is required.</li>
            <li>Products damaged due to misuse are not eligible.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            2. Refund Process
          </h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Contact our support team with your order details.</li>
            <li>Request will be reviewed and approved if eligible.</li>
            <li>Return the product as instructed by our team.</li>
            <li>Once received and inspected, refund will be processed.</li>
          </ol>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            3. Refund Timeline
          </h2>
          <p>
            Approved refunds will be credited to your original payment method
            within 5–10 business days. Processing times may vary depending on
            your payment provider.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            4. Partial Refunds
          </h2>
          <p>
            Partial refunds may be granted in case of damaged, missing items, or
            incomplete returns.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            5. Shipping Costs
          </h2>
          <p>
            Shipping charges are non-refundable unless the refund is due to our
            error or defective product.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            6. Policy Updates
          </h2>
          <p>
            We may update this Refund Policy at any time. Any changes will be
            posted on this page with the updated date.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            7. Contact Us
          </h2>
          <p>
            For any questions regarding refunds, please contact us:
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
