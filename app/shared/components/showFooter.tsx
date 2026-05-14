import Link from "next/link";
import Image from "next/image";

import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { ComLogo } from "./ComLogo";

import { getBrandInfo } from "@/lib/social";

import SocialIcons from "./SocialIcons";

interface FooterLink {
  label: string;
  url: string;
}

/**
 * Static arrays outside component
 */

const quickLinks: FooterLink[] = [
  { label: "Home", url: "/" },
  { label: "Shop", url: "/shop" },
  { label: "Products", url: "/products" },
  { label: "Deals", url: "/deals" },
  { label: "Blog", url: "/blog" },
];

const aboutLinks: FooterLink[] = [
  {
    label: "About Us",
    url: "/support/about-us",
  },
  {
    label: "Contact",
    url: "/support/contact",
  },
  {
    label: "Careers",
    url: "/support/careers",
  },
  {
    label: "Terms and Conditions",
    url: "/support/terms-and-conditions",
  },
  {
    label: "Refund Policy",
    url: "/support/refund-policy",
  },
];

const supportLinks: FooterLink[] = [
  {
    label: "Help Center",
    url: "/support/help-center",
  },
  {
    label: "FAQs",
    url: "/support/faq",
  },
  {
    label: "Shipping Info",
    url: "/support/shipping-info",
  },
  {
    label: "Return & Exchange Policy",
    url: "/support/return-and-exchange",
  },
  {
    label: "Privacy Policy",
    url: "/support/privacy-policy",
  },
];

const ShowFooter = async () => {
  const currentYear =
    new Date().getFullYear();

  /**
   * Fetch brand info
   */
  const brandInfoRaw =
    await getBrandInfo();

  const brandInfo = {
    name:
      brandInfoRaw?.data?.name ||
      "GMIT",

    phone:
      brandInfoRaw?.data?.phone ||
      "+88001234567",

    socials:
      brandInfoRaw?.data?.socials ||
      [],

    email:
      brandInfoRaw?.data?.email ||
      "info@gmail.com",

    address:
      brandInfoRaw?.data?.address ||
      "Dhaka, Bangladesh",
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-slate-800 to-gray-900 text-gray-100">
      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* COMPANY */}
          <div>
            <div className="mb-4">
              <ComLogo />
            </div>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
              Your trusted online
              destination for quality
              products and exceptional
              service.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="text-primary shrink-0 mt-0.5 w-5 h-5" />

                <p className="text-gray-300 text-sm">
                  {brandInfo.address}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="text-primary shrink-0 mt-0.5 w-5 h-5" />

                <p className="text-gray-300 text-sm">
                  {brandInfo.phone}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="text-primary shrink-0 mt-0.5 w-5 h-5" />

                <p className="text-gray-300 text-sm break-all">
                  {brandInfo.email}
                </p>
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <FooterColumn
            title="Quick Links"
            links={quickLinks}
          />

          {/* ABOUT */}
          <FooterColumn
            title="About"
            links={aboutLinks}
          />

          {/* SUPPORT */}
          <FooterColumn
            title="Support"
            links={supportLinks}
          />
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-700" />

      {/* BOTTOM */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* SOCIALS */}
          <div className="flex items-center gap-4">
            <p className="text-gray-300 text-sm md:text-base">
              Follow us:
            </p>

            <SocialIcons
              socials={brandInfo.socials}
            />
          </div>

          {/* PAYMENT */}
          <Image
            src="https://i.postimg.cc/8ctcRTKS/SSLCommerz-Pay-With-logo-All-Size-01-2048x330-removebg-preview.png"
            alt="SSLCommerz"
            width={300}
            height={50}
            loading="lazy"
            className="w-auto h-auto max-w-[220px]"
          />

          {/* COPYRIGHT */}
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              © {currentYear}{" "}
              {brandInfo.name}. All
              rights reserved.
            </p>

            <p className="text-gray-500 text-xs mt-1">
              Designed &
              Developed with{" "}
              <a
                href="https://www.gmitsolution.net"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                GM IT Solution
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

/**
 * Footer column reusable component
 */

const FooterColumn = ({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) => {
  return (
    <div>
      <h4 className="text-lg md:text-xl font-bold text-white mb-6 pb-2 border-b-2 border-primary">
        {title}
      </h4>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.url}
              className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm md:text-base"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowFooter;