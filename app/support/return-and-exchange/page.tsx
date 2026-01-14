import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Exchange Policy | GMIT Solution",
  description:
    "Learn about the Return & Exchange Policy of GMIT Solution. Understand eligibility, process, and timelines for returns and exchanges.",
  alternates: {
    canonical: "https://www.gmitsolution.net/return-and-exchange",
  },
  openGraph: {
    title: "Return & Exchange Policy | GMIT Solution",
    description:
      "Details about returns, exchanges, refunds, and eligibility at GMIT Solution.",
    url: "https://www.gmitsolution.net/return-and-exchange",
    siteName: "GMIT Solution",
    type: "website",
  },
};

export default function ReturnAndExchangePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Return & Exchange Policy
        </h1>
        <p className="text-sm text-gray-500 mt-2">Last updated: January 2026</p>
      </header>

      {/* Content */}
      <section className="space-y-8 text-gray-700 leading-relaxed">
        <p>
          At <strong>GMIT Solution</strong>, customer satisfaction is our top
          priority. This Return & Exchange Policy explains the conditions and
          process for returning or exchanging products purchased from our
          website.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            1. Eligibility for Returns
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Product must be unused and in original condition</li>
            <li>Original packaging and tags must be intact</li>
            <li>
              Return request must be made within the specified return period
            </li>
            <li>Proof of purchase (invoice or order ID) is required</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            2. Non-Returnable Items
          </h2>
          <p>
            Certain items are not eligible for return or exchange, including:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Items damaged due to misuse or negligence</li>
            <li>Perishable or hygiene-related products (if applicable)</li>
            <li>Products without original packaging</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            3. Exchange Policy
          </h2>
          <p>
            Exchanges are allowed for defective, damaged, or incorrect products.
            Exchange requests must be submitted within the return period after
            delivery.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            4. Return Process
          </h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Contact our support team with your order details</li>
            <li>Our team will review and approve your request</li>
            <li>Return the product as instructed</li>
            <li>Once received and inspected, we will proceed accordingly</li>
          </ol>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            5. Refunds
          </h2>
          <p>
            Approved refunds will be processed through the original payment
            method within a certain number of business days after inspection.
            Processing time may vary depending on the payment provider.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            6. Shipping Costs
          </h2>
          <p>
            Shipping charges are non-refundable unless the return is due to a
            mistake or defect on our part.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            7. Policy Changes
          </h2>
          <p>
            We reserve the right to update or modify this Return & Exchange
            Policy at any time. Changes will be effective once posted on this
            page.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            8. Contact Us
          </h2>
          <p>
            For any questions regarding returns or exchanges, please contact us:
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
