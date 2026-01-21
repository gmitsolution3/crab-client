import { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | GMIT Solution",
  description:
    "Get in touch with GMIT Solution. Contact us for support, inquiries, or feedback.",
  alternates: {
    canonical: "https://www.gmitsolution.net/contact",
  },
  openGraph: {
    title: "Contact Us | GMIT Solution",
    description:
      "Reach out to GMIT Solution for customer support, order inquiries, or general feedback.",
    url: "https://www.gmitsolution.net/contact",
    siteName: "GMIT Solution",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <header className="text-center mb-14">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Contact Us
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Have a question or need help? Reach out to our support team.
        </p>
      </header>

      {/* Contact Info */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 text-gray-700">
        <div className="flex flex-col items-center text-center p-6 border rounded-2xl hover:shadow-lg transition">
          <div className="w-12 h-12 mb-3 text-primary">
            <MapPin size={32} />
          </div>
          <h3 className="font-semibold text-lg mb-1">Address</h3>
          <p>123, Main Street, Dhaka, Bangladesh</p>
        </div>

        <div className="flex flex-col items-center text-center p-6 border rounded-2xl hover:shadow-lg transition">
          <div className="w-12 h-12 mb-3 text-primary">
            <Phone size={32} />
          </div>
          <h3 className="font-semibold text-lg mb-1">Phone</h3>
          <p>+880 1234 567 890</p>
        </div>

        <div className="flex flex-col items-center text-center p-6 border rounded-2xl hover:shadow-lg transition">
          <div className="w-12 h-12 mb-3 text-primary">
            <Mail size={32} />
          </div>
          <h3 className="font-semibold text-lg mb-1">Email</h3>
          <p>support@gmitsolution.net</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-3xl mx-auto">
        <form
          action="/api/contact" // backend endpoint, replace with yours
          method="POST"
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 sm:text-sm p-2"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 sm:text-sm p-2"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 sm:text-sm p-2"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 sm:text-sm p-2"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
}
