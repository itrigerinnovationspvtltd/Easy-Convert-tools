import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/Easy-convert-logo.svg";

const Nav = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    {
      name: "PDF & Document",
      submenu: [
        { title: "PDF Compressor", link: "/pdfCompressor" },
        { title: "PDF to Word", link: "/pdfToWord" },
        { title: "Word to PDF", link: "/wordTOPdf" },
        { title: "Merge PDF", link: "/pdfMerge" },
        { title: "PDF Split", link: "/pdfSplit" },
        { title: "PDF Watermark", link: "/pdfWatermarkAdder" },
        { title: "Digital Signature", link: "/digitalSignature" },
      ],
    },
    {
      name: "Image Tools",
      submenu: [
        { title: "Image Compressor", link: "/imageCompressor" },
        { title: "JPEG to PNG", link: "/jpegToPng" },
        { title: "PNG to JPG", link: "/png-jpg-converter" },
        { title: "Background Remover", link: "/pngTransparentBackground" },
        { title: "Background Blur", link: "/backgroundBlur" },
        { title: "Image Resizer", link: "/imageResizer" },
      ],
    },
    {
      name: "Audio",
      submenu: [
        { title: "Text to Speech", link: "/textToSpeech" },
        { title: "Speech to Text", link: "/speechToText" },
      ],
    },
    {
      name: "More Tools",
      submenu: [
        { title: "Word Counter", link: "/wordCharacterCounter" },
        { title: "Color Picker", link: "/colorPicker" },
        { title: "JSON Formatter", link: "/jsonFormatter" },
        { title: "Password Generator", link: "/randomPwdGenerator" },
        { title: "Case Converter", link: "/caseConverter" },
        { title: "Text Diff", link: "/textDiffChecker" },
        { title: "JWT Decoder", link: "/jwtDecoder" },
        { title: "Timestamp Converter", link: "/timestampConverter" },
      ],
    },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-[72px] items-center justify-between">
          <Link to="/" className="flex items-center shrink-0">
            <img src={logo} alt="Easy Convert" className="h-10 sm:h-12 w-auto" />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setOpenMenu(index)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    openMenu === index
                      ? "text-brand-600 bg-brand-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </button>
                <AnimatePresence>
                  {openMenu === index && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className={`absolute ${index >= menuItems.length - 2 ? "right-0" : "left-0"} top-full pt-2 z-50`}
                    >
                      <div className="w-64 bg-white rounded-2xl shadow-card-hover border border-gray-100 overflow-hidden">
                        <div className="p-2">
                          {item.submenu.map((sub) => (
                            <Link
                              key={sub.link}
                              to={sub.link}
                              className="block px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:text-brand-600 hover:bg-brand-50/80 transition-colors"
                            >
                              {sub.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/about"
              className="hidden sm:block text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              About
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-xl text-gray-600 hover:bg-gray-100"
              aria-label="Menu"
            >
              {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
              {menuItems.map((item) => (
                <div key={item.name} className="py-2">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
                    {item.name}
                  </p>
                  <div className="space-y-0.5">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.link}
                        to={sub.link}
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2.5 rounded-xl text-gray-700 hover:bg-gray-50"
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link
                to="/about"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-gray-700 hover:bg-gray-50 font-medium"
              >
                About
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
