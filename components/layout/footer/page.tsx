import { Icon } from "@iconify/react/dist/iconify.js";
import { Mail, Phone, MapPin, CreditCard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
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
                  src="/logo/himalya.png"
                  alt="logo"
                  width={1000}
                  height={1000}
                  className="object-contain w-40"
                />
              </figure>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Your premier destination for fashion-forward clothing and
              accessories. Quality meets style in every piece we curate.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-zinc-300" />
                <span className="text-sm">1-800-STYLE-HUB</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-zinc-300" />
                <span className="text-sm">hello@stylehub.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-3 text-zinc-300" />
                <span className="text-sm">123 Fashion Ave, NY 10001</span>
              </div>
            </div>

            {/* Social Media & App Downloads */}
            <div className="mt-12 ">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                {/* Social Media */}
                <div>
                  <div className="flex justify-center lg:justify-start space-x-4">
                    <Link href="#">
                      <Icon icon="logos:facebook" width="30" height="30" />{" "}
                    </Link>

                    <Link href="#">
                      <Icon
                        icon="skill-icons:instagram"
                        width="30"
                        height="30"
                      />{" "}
                    </Link>
                    <Link href="#">
                      <Icon icon="logos:whatsapp-icon" width="30" height="30" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm hover:text-white transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm hover:text-white transition-colors"
                >
                  Women
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm hover:text-white transition-colors"
                >
                  Men
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm hover:text-white transition-colors"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-sm hover:text-white transition-colors"
                >
                  Shipping Info
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="text-sm hover:text-white transition-colors"
                >
                  FAQ
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
                  href="#"
                  className="text-sm hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm hover:text-white transition-colors"
                >
                  Careers
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

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-6 text-sm">
              <Link
                href="#"
                className="text-zinc-300 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-zinc-300 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-zinc-300 hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
              <Link
                href="#"
                className="text-zinc-300 hover:text-white transition-colors"
              >
                Accessibility
              </Link>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-300 mr-2">We accept:</span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-5 bg-white rounded flex items-center justify-center">
                  <CreditCard className="w-4 h-3 text-gray-700" />
                </div>
                <div className="w-8 h-5 bg-white rounded flex items-center justify-center">
                  <span className="text-xs text-gray-700 font-bold">V</span>
                </div>
                <div className="w-8 h-5 bg-white rounded flex items-center justify-center">
                  <span className="text-xs text-gray-700 font-bold">M</span>
                </div>
                <div className="w-8 h-5 bg-white rounded flex items-center justify-center">
                  <span className="text-xs text-gray-700 font-bold">P</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
