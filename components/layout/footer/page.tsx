import { getCategory } from "@/actions/fetchapi";
import { getCompanyInfo } from "@/actions/fetchcompanydata";
import { getSocials } from "@/actions/fetchsocial";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Footer() {
  const category = await getCategory();
  const socials = await getSocials();
  const company = await getCompanyInfo();

  return (
    <footer className="bg-gradient-to-tl from-primarymain via-primarymain/90 to-primarymain/80 text-gray-200">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <figure>
                <Image
                  src={company.footerLogoUrl}
                  alt="logo"
                  width={1000}
                  height={1000}
                  className="object-contain h-[5em] w-fit"
                />
              </figure>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              {company.metaDescription}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-zinc-300" />
                <span className="text-sm">
                  {" "}
                  <a href={`mailto:${company.contactEmail}`}>
                    {company.contactEmail}
                  </a>
                </span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-zinc-300" />
                <span className="text-sm">
                  {" "}
                  <a href={`tel:${company.phoneNumber}`}>
                    {company.phoneNumber}
                  </a>
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-3 text-zinc-300" />
                <span className="text-sm">{company.address}</span>
              </div>
            </div>

            {/* Social Media & App Downloads */}
            <div className="mt-12 ">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                {/* Social Media */}
                <div>
                  <div className="flex justify-start space-x-4">
                    {socials.map((item) => (
                      <div key={item.id}>
                        <Link href={item.url} target="_blank">
                          <Image
                            src={item.iconUrl}
                            alt={item.platform}
                            width={30}
                            height={30}
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-3">
              {category.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/search?categoryId=${item.id}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="text-sm hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  href="/shipping-info"
                  className="text-sm hover:text-white transition-colors"
                >
                  Shipping Info
                </Link>
              </li>

              <li>
                <Link
                  href="/faq"
                  className="text-sm hover:text-white transition-colors"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                  className="text-sm hover:text-white transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-sm text-zinc-300 text-center lg:text-left">
              © {new Date().getFullYear()} Himalay Garment. All rights reserved.
            </div>

            {/* Payment Methods */}
            <h2 className="text-sm">
              Designed and Developed by{" "}
              <Link
                href="https://www.nepaltechinnov.com/"
                target="_blank"
                className="text-blue-500"
              >
                NepalTech
              </Link>{" "}
            </h2>
          </div>
        </div>
      </div>
    </footer>
  );
}
