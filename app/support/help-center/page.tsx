import { Metadata } from "next";
import {
  ShoppingBag,
  CreditCard,
  Truck,
  RotateCcw,
  HelpCircle,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Help Center | GMIT Solution",
  description:
    "Visit the GMIT Solution Help Center to get support on orders, payments, shipping, returns, and more.",
  alternates: {
    canonical: "https://www.gmitsolution.net/help-center",
  },
  openGraph: {
    title: "Help Center | GMIT Solution",
    description:
      "Get help with orders, payments, delivery, returns, and customer support at GMIT Solution.",
    url: "https://www.gmitsolution.net/help-center",
    siteName: "GMIT Solution",
    type: "website",
  },
};

const helpTopics = [
  {
    title: "Orders",
    description: "Placing orders, order status, cancellations",
    icon: <ShoppingBag size={28} />,
    link: "/faq",
  },
  {
    title: "Payments",
    description: "Payment methods, refunds, payment security",
    icon: <CreditCard size={28} />,
    link: "/faq",
  },
  {
    title: "Shipping & Delivery",
    description: "Delivery time, tracking, shipping charges",
    icon: <Truck size={28} />,
    link: "/faq",
  },
  {
    title: "Returns & Refunds",
    description: "Return policy, refund process",
    icon: <RotateCcw size={28} />,
    link: "/faq",
  },
  {
    title: "Account & Support",
    description: "Account issues, technical support",
    icon: <HelpCircle size={28} />,
    link: "/contact",
  },
];

export default function HelpCenterPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <header className="text-center mb-14">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Help Center
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Need help? Find answers to common questions or contact our support
          team. We’re here to help you.
        </p>
      </header>

      {/* Help Topics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {helpTopics.map((topic, idx) => (
          <a
            key={idx}
            href={topic.link}
            className="rounded-2xl border border-gray-200 p-6
            hover:shadow-lg hover:-translate-y-1
            transition-all duration-300 bg-white"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              {topic.icon}
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              {topic.title}
            </h2>
            <p className="text-gray-600 mt-2 text-sm">{topic.description}</p>
          </a>
        ))}
      </section>

      {/* Contact Support */}
      <section className="rounded-2xl bg-linear-to-br from-blue-600 to-blue-500 p-8 text-white text-center">
        <h2 className="text-2xl font-semibold mb-3">Still need help?</h2>
        <p className="text-blue-100 mb-6">
          Our support team is always ready to assist you.
        </p>

        <a
          href="/contact"
          className="inline-flex items-center gap-2 bg-white text-blue-600
          px-6 py-3 rounded-full font-medium
          hover:bg-blue-50 transition"
        >
          <Mail size={18} />
          Contact Support
        </a>
      </section>
    </main>
  );
}
