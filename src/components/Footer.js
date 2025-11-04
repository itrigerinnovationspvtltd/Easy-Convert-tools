import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1c1c1c] text-gray-300 pt-12 pb-6 px-6 md:px-36">
      <div className=" mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 border-b border-gray-700 pb-10">
        
        {/* Product */}
        <div>
          <h3 className="text-white font-semibold md:text-2xl mb-4">PRODUCT</h3>
          <ul className="space-y-2 text-sm md:text-lg">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/" className="hover:text-white">Features</a></li>
            <li><a href="/" className="hover:text-white">Pricing</a></li>
            <li><a href="/" className="hover:text-white">Tools</a></li>
            <li><a href="/" className="hover:text-white">FAQ</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-semibold md:text-2xl mb-4">RESOURCES</h3>
          <ul className="space-y-2 text-sm md:text-lg">
            <li><a href="/" className="hover:text-white">EasyConvert Desktop</a></li>
            <li><a href="/" className="hover:text-white">EasyConvert Mobile</a></li>
            <li><a href="/" className="hover:text-white">EasySign</a></li>
            <li><a href="/" className="hover:text-white">EasyAPI</a></li>
            <li><a href="/" className="hover:text-white">EasyIMG</a></li>
          </ul>
        </div>

        {/* Solutions */}
        <div>
          <h3 className="text-white font-semibold md:text-2xl mb-4">SOLUTIONS</h3>
          <ul className="space-y-2 text-sm md:text-lg">
            <li><a href="/" className="hover:text-white">Business</a></li>
            <li><a href="/" className="hover:text-white">Education</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-white font-semibold md:text-2xl mb-4">LEGAL</h3>
          <ul className="space-y-2 text-sm md:text-lg">
            <li><a href="/" className="hover:text-white">Security</a></li>
            <li><a href="/" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="/" className="hover:text-white">Terms & Conditions</a></li>
            <li><a href="/" className="hover:text-white">Cookies</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold md:text-2xl mb-4">COMPANY</h3>
          <ul className="space-y-2 text-sm md:text-lg">
            <li><a href="/" className="hover:text-white">About Us</a></li>
            <li><a href="/" className="hover:text-white">Contact Us</a></li>
            <li><a href="/" className="hover:text-white">Blog</a></li>
            <li><a href="/" className="hover:text-white">Press</a></li>
          </ul>
          
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-gray-400 gap-4">
        

        {/* Social Icons */}
        <div className="flex items-center gap-4 text-lg md:text-2xl">
          <FaFacebookF className="hover:text-white cursor-pointer" />
          <FaLinkedinIn className="hover:text-white cursor-pointer" />
          <FaInstagram className="hover:text-white cursor-pointer" />
          <FaTiktok className="hover:text-white cursor-pointer" />
        </div>

        {/* CopyRight */}
        <p className="text-center sm:text-right md:text-xl">
          © EasyConvert 2025 • Your File Tools Hub
        </p>
      </div>
    </footer>
  );
};

export default Footer;
