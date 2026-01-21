import { Metadata } from "next";
import { Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | GMIT Solution",
  description:
    "Learn about GMIT Solution, our mission, vision, values, and the team behind our success.",
  alternates: {
    canonical: "https://www.gmitsolution.net/about-us",
  },
  openGraph: {
    title: "About Us | GMIT Solution",
    description:
      "Discover GMIT Solution, our story, mission, vision, values, and team.",
    url: "https://www.gmitsolution.net/about-us",
    siteName: "GMIT Solution",
    type: "website",
  },
};

export default function AboutUsPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          About Us
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Learn about our mission, vision, and the people behind GMIT Solution.
        </p>
      </header>

      {/* Our Story */}
      <section className="mb-16 space-y-6 text-gray-700 leading-relaxed">
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          <Users size={28} />
          Our Story
        </h2>
        <p>
          GMIT Solution was founded with a vision to provide seamless digital
          solutions for businesses and e-commerce stores. We specialize in
          creating modern, user-friendly websites and platforms that empower
          businesses to grow online.
        </p>
        <p>
          Our journey started with a small team of passionate developers and
          designers, and today we have helped hundreds of businesses succeed
          online.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 border rounded-2xl hover:shadow-lg transition bg-white">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Our Mission
          </h3>
          <p>
            To provide innovative and reliable digital solutions that help our
            clients succeed in the competitive online marketplace.
          </p>
        </div>
        <div className="p-6 border rounded-2xl hover:shadow-lg transition bg-white">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Our Vision
          </h3>
          <p>
            To be a trusted partner for businesses worldwide, delivering
            high-quality digital solutions with integrity and excellence.
          </p>
        </div>
      </section>

      {/* Our Values */}
      <section className="mb-16 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Our Values
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Customer-first approach in everything we do</li>
          <li>Innovation and continuous learning</li>
          <li>Integrity, transparency, and reliability</li>
          <li>Collaboration and teamwork</li>
          <li>Commitment to quality and excellence</li>
        </ul>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Example Team Member */}
          <div className="p-6 border rounded-2xl hover:shadow-lg transition text-center">
            <img
              src="/placeholder.svg"
              alt="Team Member"
              className="mx-auto w-32 h-32 rounded-full object-cover mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-900">
              Sabbir Ahmed
            </h3>
            <p className="text-gray-500 text-sm">Founder & CEO</p>
          </div>
          <div className="p-6 border rounded-2xl hover:shadow-lg transition text-center">
            <img
              src="/placeholder.svg"
              alt="Team Member"
              className="mx-auto w-32 h-32 rounded-full object-cover mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-900">Jane Doe</h3>
            <p className="text-gray-500 text-sm">Lead Developer</p>
          </div>
          <div className="p-6 border rounded-2xl hover:shadow-lg transition text-center">
            <img
              src="/placeholder.svg"
              alt="Team Member"
              className="mx-auto w-32 h-32 rounded-full object-cover mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-900">John Smith</h3>
            <p className="text-gray-500 text-sm">UI/UX Designer</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl bg-linear-to-br from-primary to-blue-500 p-10 text-white text-center">
        <h2 className="text-2xl font-semibold mb-3">Work With Us</h2>
        <p className="text-blue-100 mb-6">
          Interested in joining our team? Check out our Careers page for current
          openings.
        </p>
        <a
          href="/careers"
          className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-medium hover:bg-blue-50 transition"
        >
          Careers
        </a>
      </section>
    </main>
  );
}
