import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | GMIT Solution",
  description:
    "Find answers to frequently asked questions about orders, payments, shipping, returns, and privacy at GMIT Solution.",
  keywords: [
    "faq",
    "frequently asked questions",
    "gmit solution faq",
    "ecommerce faq",
    "online shopping help",
  ],
  alternates: {
    canonical: "https://www.gmitsolution.net/faq",
  },
  openGraph: {
    title: "FAQ | GMIT Solution",
    description:
      "Get answers to common questions about shopping, payments, delivery, and returns at GMIT Solution.",
    url: "https://www.gmitsolution.net/faq",
    siteName: "GMIT Solution",
    type: "website",
  },
};

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Simply browse our products, add your desired items to the cart, and proceed to checkout. Follow the instructions to complete your order.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept secure online payments including credit/debit cards, mobile banking, and other supported payment gateways.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Yes. All payments are processed through trusted third-party payment providers. We do not store your card details.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery time depends on your location. Usually, orders are delivered within 2–5 business days.",
  },
  {
    question: "Can I cancel or modify my order?",
    answer:
      "Orders can be canceled or modified before they are shipped. Please contact our support team as soon as possible.",
  },
  {
    question: "What is your return policy?",
    answer:
      "If you receive a damaged or incorrect product, you may request a return or replacement within the specified return period.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact us via email at support@gmitsolution.net or through our contact page.",
  },
];

export default function FAQPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 mt-2">
          Find answers to the most common questions about our services.
        </p>
      </header>

      <section className="space-y-6">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group rounded-xl border border-gray-200 p-5 open:shadow-md transition-all"
          >
            <summary className="cursor-pointer list-none flex justify-between items-center text-lg font-medium text-gray-900">
              {faq.question}
              <span className="ml-4 text-gray-500 group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <p className="mt-3 text-gray-700 leading-relaxed">{faq.answer}</p>
          </details>
        ))}
      </section>
    </main>
  );
}
