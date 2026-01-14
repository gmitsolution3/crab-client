import { Metadata } from "next";
import { Briefcase, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers | GMIT Solution",
  description:
    "Explore career opportunities at GMIT Solution. Join our team and grow with us.",
  alternates: {
    canonical: "https://www.gmitsolution.net/careers",
  },
  openGraph: {
    title: "Careers | GMIT Solution",
    description:
      "Find open positions, internships, and career opportunities at GMIT Solution.",
    url: "https://www.gmitsolution.net/careers",
    siteName: "GMIT Solution",
    type: "website",
  },
};

const jobOpenings = [
  {
    title: "Frontend Developer",
    location: "Dhaka, Bangladesh",
    type: "Full-Time",
    description:
      "We are looking for a skilled React / Next.js developer to build responsive and scalable e-commerce applications.",
    applyLink:
      "mailto:hr@gmitsolution.net?subject=Application%20Frontend%20Developer",
  },
  {
    title: "Backend Developer",
    location: "Remote",
    type: "Full-Time",
    description:
      "Responsible for building and maintaining APIs, databases, and server-side logic using Node.js / Express / MongoDB.",
    applyLink:
      "mailto:hr@gmitsolution.net?subject=Application%20Backend%20Developer",
  },
  {
    title: "UI/UX Designer",
    location: "Dhaka, Bangladesh",
    type: "Full-Time",
    description:
      "Design clean, intuitive, and user-friendly interfaces for web and mobile applications.",
    applyLink:
      "mailto:hr@gmitsolution.net?subject=Application%20UI%2FUX%20Designer",
  },
];

export default function CareersPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Careers at GMIT Solution
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Join our team and grow with us. Explore our open positions and apply
          today.
        </p>
      </header>

      {/* Job Openings */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {jobOpenings.map((job, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all bg-white"
          >
            <div className="flex items-center gap-2 mb-4 text-blue-600">
              <Briefcase size={24} />
              <h2 className="text-lg font-semibold text-gray-900">
                {job.title}
              </h2>
            </div>
            <p className="text-gray-500 text-sm mb-2">
              {job.location} • {job.type}
            </p>
            <p className="text-gray-700 mb-4">{job.description}</p>
            <a
              href={job.applyLink}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition"
            >
              <Mail size={16} />
              Apply Now
            </a>
          </div>
        ))}
      </section>

      {/* Join Our Team CTA */}
      <section className="rounded-2xl bg-linear-to-br from-blue-600 to-blue-500 p-10 text-white text-center">
        <h2 className="text-2xl font-semibold mb-3">
          Can't find a suitable role?
        </h2>
        <p className="text-blue-100 mb-6">
          Send us your resume and we’ll keep it on file for future
          opportunities.
        </p>
        <a
          href="mailto:hr@gmitsolution.net"
          className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-blue-50 transition"
        >
          <Mail size={18} />
          Submit Resume
        </a>
      </section>
    </main>
  );
}
