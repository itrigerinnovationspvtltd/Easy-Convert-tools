import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTiktok } from "react-icons/fa";
import { SiYoutube } from "react-icons/si";
import { HiArrowRight } from "react-icons/hi2";
import logo from "../assets/Easy-convert-logo.svg";

const Footer = () => {
  const socialLinks = [
    { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
    { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
    { icon: SiYoutube, href: "https://youtube.com", label: "YouTube" },
    { icon: FaTiktok, href: "https://tiktok.com", label: "TikTok" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* CTA band */}
      <div className="border-b border-slate-800 bg-gradient-to-r from-slate-800/80 to-slate-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-semibold text-xl">Your all-in-one file conversion hub</h3>
              <p className="text-slate-400 text-sm mt-1">Free, fast, secure. Convert PDFs, images, audio & more.</p>
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 btn-gradient shrink-0 px-8 py-3 rounded-xl"
            >
              Explore Tools
              <HiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 lg:gap-14">
          <div className="col-span-2">
            <Link to="/" className="inline-block mb-5">
              <img src={logo} alt="Easy Convert" className="h-10 w-auto brightness-0 invert opacity-95" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs mb-6">
              EasyConvert makes file conversion simple. PDF, image, and audio tools built for speed and privacy.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", to: "/" },
                { label: "PDF Tools", to: "/pdfCompressor" },
                { label: "Image Tools", to: "/imageCompressor" },
                { label: "Audio Tools", to: "/textToSpeech" },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><Link to="/convert" className="text-sm text-slate-400 hover:text-white transition-colors">Convert</Link></li>
              <li><Link to="/about" className="text-sm text-slate-400 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/about" className="text-sm text-slate-400 hover:text-white transition-colors">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm text-slate-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/about" className="text-sm text-slate-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-slate-400 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
              <p className="text-slate-500 text-sm">
                © {new Date().getFullYear()} EasyConvert. All rights reserved.
              </p>
              <span className="hidden sm:inline text-slate-600">|</span>
              <p className="text-slate-500 text-sm">
                Powered by{" "}
                <a
                  href="https://itrigerinnovations.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors font-medium"
                >
                  Itriger Innovations Pvt Ltd
                </a>
              </p>
            </div>
            <div className="flex items-center gap-6 text-xs text-slate-500">
              <span>100% Free</span>
              <span>•</span>
              <span>No Registration</span>
              <span>•</span>
              <span>Secure & Private</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
