import React from 'react';
import { Mail, MapPin, Phone, Linkedin, Facebook, Instagram, Youtube } from 'lucide-react';
import { ComLogo } from './ComLogo';
import { getBrandInfo } from '@/lib/social';

interface SocialLink {
  icon: React.ReactNode;
  url: string;
  label: string;
}

interface FooterLink {
  label: string;
  url: string;
}

const ShowFooter: React.FC =async () => {
  const currentYear: number = new Date().getFullYear();

  const brandInfoRaw = await getBrandInfo();
  
    const brandInfo = {
      logo: brandInfoRaw?.data?.logo ?? "/placeholder.svg",
      name: brandInfoRaw?.data?.name ?? "GMIT",
      phone: brandInfoRaw?.data?.phone ?? "+88001234567",
      socials: brandInfoRaw?.data?.socials ?? [],
    };

  const quickLinks: FooterLink[] = [
    { label: 'Home', url: '#' },
    { label: 'Shop', url: '#' },
    { label: 'Products', url: '#' },
    { label: 'Deals', url: '#' },
    { label: 'Blog', url: '#' },
  ];

  const aboutLinks: FooterLink[] = [
    { label: 'About Us', url: '#' },
    { label: 'Contact', url: '#' },
    { label: 'Careers', url: '#' },
    { label: 'Privacy Policy', url: '#' },
    { label: 'Terms and Conditions', url: '#' },
    { label: 'Return & Exchange Policy', url: '#' },
    { label: 'Refund Policy', url: '#' },
  ];


  const supportLinks: FooterLink[] = [
    { label: 'Help Center', url: '#' },
    { label: 'FAQs', url: '#' },
    { label: 'Shipping Info', url: '#' },
    { label: 'Returns', url: '#' },
    { label: 'Privacy Policy', url: '#' },
  ];

  const socialLinks: SocialLink[] = [
    { icon: <Linkedin size={24} />, url: '#', label: 'LinkedIn' },
    { icon: <Facebook size={24} />, url: '#', label: 'Facebook' },
    { icon: <Instagram size={24} />, url: '#', label: 'Instagram' },
    { icon: <Youtube size={24} />, url: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-linear-to-b from-gray-900 via-slate-800 to-gray-900 text-gray-100">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* 4 Column Layout - Company Info + 3 Menu Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Column 1: Company Description */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <ComLogo/>
            </div>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
              Your trusted online destination for quality products and
              exceptional service. We're committed to delivering excellence in
              every interaction.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-[#0970B4] shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm">Dhaka, Bangladesh</p>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={20} className="text-[#0970B4] shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm">+880 1234 567890</p>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={20} className="text-[#0970B4] shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm break-all">
                  info@brand.com
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="sm:col-span-1">
            <h4 className="text-lg md:text-xl font-bold text-white mb-6 pb-2 border-b-2 border-[#0970B4]">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link: FooterLink, idx: number) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    className="text-gray-300 hover:text-[#0970B4] transition-colors duration-300 text-sm md:text-base"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: About */}
          <div className="sm:col-span-1">
            <h4 className="text-lg md:text-xl font-bold text-white mb-6 pb-2 border-b-2 border-[#0970B4]">
              About
            </h4>
            <ul className="space-y-3">
              {aboutLinks.map((link: FooterLink, idx: number) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    className="text-gray-300 hover:text-[#0970B4] transition-colors duration-300 text-sm md:text-base"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="sm:col-span-1">
            <h4 className="text-lg md:text-xl font-bold text-white mb-6 pb-2 border-b-2 border-[#0970B4]">
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link: FooterLink, idx: number) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    className="text-gray-300 hover:text-[#0970B4] transition-colors duration-300 text-sm md:text-base"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700"></div>

      {/* Bottom Section - Social Links & Copyright */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <p className="text-gray-300 text-sm md:text-base">Follow us:</p>
            <div className="flex gap-4">
              {socialLinks.map((social: SocialLink, idx: number) => (
                <a
                  key={idx}
                  href={social.url}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-linear-to-br from-[#0970B4] to-blue-500 flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition-transform duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div>
              <img
                src="https://i.postimg.cc/8ctcRTKS/SSLCommerz-Pay-With-logo-All-Size-01-2048x330-removebg-preview.png"
                alt="sslComerz"
              />
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              © {currentYear} Your Brand. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Designed & Developed with GM IT Solution
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ShowFooter;