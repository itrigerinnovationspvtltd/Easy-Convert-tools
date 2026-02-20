import React, { useState, useMemo, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFilePdf, FaFileWord, FaFileImage, FaMicrophoneAlt, FaTextHeight, FaChartLine, FaLock, FaCalculator, FaPalette, FaQrcode, FaDollarSign, FaGlobe, FaLink, FaSearch, FaUsers, FaBarcode, FaClock, FaServer, FaCog } from "react-icons/fa";
import { MdCompress, MdMergeType, MdOutlineSplitscreen, MdCode, MdFormatColorText } from "react-icons/md";
import { HiKey, HiHashtag } from "react-icons/hi2";
import { BiWater } from "react-icons/bi";
import { PiImagesSquareDuotone } from "react-icons/pi";
import { HiArrowRight } from "react-icons/hi2";

const converters = [
  { title: "PDF Compressor", desc: "Easily compress PDF files.", icon: <MdCompress className="text-blue-500" />, link: "/pdfCompressor" },
  { title: "Merge PDF", desc: "Combine PDFs into one.", icon: <MdMergeType className="text-green-500" />, link: "/pdfMerge" },
  { title: "Split PDF", desc: "Split PDF into multiple files.", icon: <MdOutlineSplitscreen className="text-orange-500" />, link: "/pdfSplit" },
  { title: "Image to WebP", desc: "Convert to WebP format.", icon: <PiImagesSquareDuotone className="text-orange-500" />, link: "/imageToWebp" },
  { title: "Word to PDF", desc: "Convert Word to shareable PDFs.", icon: <FaFileWord className="text-blue-600" />, link: "/wordTOPdf" },
  { title: "PDF to Word", desc: "Convert PDFs to editable docs.", icon: <FaFilePdf className="text-red-500" />, link: "/pdfToWord" },
  { title: "PDF Watermark", desc: "Add watermarks to PDFs.", icon: <BiWater className="text-blue-400" />, link: "/pdfWatermarkAdder" },
  { title: "Digital Signature", desc: "Create & download signatures.", icon: <FaFilePdf className="text-indigo-600" />, link: "/digitalSignature" },
  { title: "Image Compressor", desc: "Reduce image size.", icon: <MdCompress className="text-purple-500" />, link: "/imageCompressor" },
  { title: "JPEG to PNG", desc: "Convert JPEG to PNG.", icon: <FaFileImage className="text-yellow-500" />, link: "/jpegToPng" },
  { title: "PNG to JPG", desc: "Convert PNG to JPG.", icon: <FaFileImage className="text-pink-500" />, link: "/png-jpg-converter" },
  { title: "Image Resizer", desc: "Resize images precisely.", icon: <PiImagesSquareDuotone className="text-indigo-500" />, link: "/imageResizer" },
  { title: "Background Blur", desc: "Blur image backgrounds.", icon: <PiImagesSquareDuotone className="text-blue-600" />, link: "/backgroundBlur" },
  { title: "Background Remover", desc: "Remove image backgrounds.", icon: <PiImagesSquareDuotone className="text-emerald-500" />, link: "/pngTransparentBackground" },
  { title: "Meme Generator", desc: "Create memes with text.", icon: <PiImagesSquareDuotone className="text-fuchsia-500" />, link: "/memeGenerator" },
  { title: "Text to Speech", desc: "Convert text to speech.", icon: <FaMicrophoneAlt className="text-green-600" />, link: "/textToSpeech" },
  { title: "Speech to Text", desc: "Transcribe speech to text.", icon: <FaMicrophoneAlt className="text-indigo-600" />, link: "/speechToText" },
];

const clientSideTools = [
  { title: "Word Counter", desc: "Count words & characters.", icon: <FaTextHeight className="text-blue-600" />, link: "/wordCharacterCounter" },
  { title: "Base64 Encode/Decode", desc: "Encode or decode Base64.", icon: <MdCode className="text-indigo-500" />, link: "/base64EncoderDecoder" },
  { title: "JSON Formatter", desc: "Format or minify JSON.", icon: <MdCode className="text-amber-600" />, link: "/jsonFormatter" },
  { title: "Color Picker", desc: "Pick colors, get hex/RGB.", icon: <FaPalette className="text-pink-500" />, link: "/colorPicker" },
  { title: "QR Code Generator", desc: "Create QR codes.", icon: <FaQrcode className="text-gray-700" />, link: "/qrGenerator" },
  { title: "Password Generator", desc: "Create strong passwords.", icon: <FaLock className="text-green-600" />, link: "/randomPwdGenerator" },
  { title: "Hash Generator", desc: "SHA-256, SHA-384, SHA-512.", icon: <HiHashtag className="text-purple-600" />, link: "/hashGenerator" },
  { title: "Currency Converter", desc: "Convert with live rates.", icon: <FaDollarSign className="text-emerald-600" />, link: "/currencyConverter" },
  { title: "UUID Generator", desc: "Generate unique IDs.", icon: <HiKey className="text-teal-500" />, link: "/uuidGenerator" },
  { title: "Regex Tester", desc: "Test regular expressions.", icon: <MdCode className="text-cyan-600" />, link: "/regexTester" },
  { title: "Lorem Ipsum", desc: "Generate placeholder text.", icon: <MdFormatColorText className="text-gray-600" />, link: "/loremIpsumGenerator" },
  { title: "Markdown to HTML", desc: "Convert Markdown.", icon: <MdFormatColorText className="text-pink-500" />, link: "/markdownToHtml" },
  { title: "BMI Calculator", desc: "Calculate BMI.", icon: <FaCalculator className="text-emerald-600" />, link: "/bmiCalculator" },
  { title: "Age Calculator", desc: "Calculate age.", icon: <FaCalculator className="text-blue-500" />, link: "/ageCalculator" },
  { title: "Unit Converter", desc: "Length, weight, temp.", icon: <FaCalculator className="text-orange-500" />, link: "/unitConverter" },
  { title: "Readability Score", desc: "Analyze text readability.", icon: <FaTextHeight className="text-green-600" />, link: "/readabilityScoreAnalyzer" },
];

const moreTools = [
  { title: "Color Contrast Checker", desc: "Check WCAG contrast ratios.", icon: <FaPalette className="text-blue-600" />, link: "/colorContrast" },
  { title: "Favicon Generator", desc: "Create favicons for your site.", icon: <FaLink className="text-amber-600" />, link: "/faviconGenerator" },
  { title: "Gradient CSS Generator", desc: "Create CSS gradients.", icon: <FaPalette className="text-pink-500" />, link: "/gradientCssGenerator" },
  { title: "Loan Calculator", desc: "Calculate loan payments.", icon: <FaDollarSign className="text-green-600" />, link: "/loanCalculator" },
  { title: "Tip & Split Bill", desc: "Split bills and add tips.", icon: <FaCalculator className="text-teal-600" />, link: "/tipAndSplitBill" },
  { title: "VAT/GST Calculator", desc: "Add or extract VAT.", icon: <FaCalculator className="text-purple-600" />, link: "/vatGstCalculator" },
  { title: "Internet Speed Test", desc: "Test your connection.", icon: <FaServer className="text-cyan-600" />, link: "/internetSpeedChecker" },
  { title: "Broken Link Checker", desc: "Find broken links on your site.", icon: <FaLink className="text-red-500" />, link: "/brokenLinkChecker" },
  { title: "Website Speed Test", desc: "Test website performance.", icon: <FaSearch className="text-blue-500" />, link: "/websiteSpeedTest" },
  { title: "Hashtag Generator", desc: "Generate hashtags for social.", icon: <HiHashtag className="text-pink-600" />, link: "/hashtagGenerator" },
  { title: "Barcode Generator", desc: "Create barcodes.", icon: <FaBarcode className="text-slate-700" />, link: "/barcodeGenerator" },
  { title: "Countdown Timer", desc: "Count down to any date.", icon: <FaClock className="text-orange-600" />, link: "/countdownTimer" },
  { title: "Username Generator", desc: "Generate unique usernames.", icon: <FaUsers className="text-violet-600" />, link: "/usernameGenerator" },
  { title: "Fake Name Generator", desc: "Generate random fake names.", icon: <FaUsers className="text-teal-600" />, link: "/fakeNameGenerator" },
  { title: "Cron Expression Generator", desc: "Build cron expressions.", icon: <FaCog className="text-slate-600" />, link: "/cronExpressionGenerator" },
  { title: "CSS/JS Minifier", desc: "Minify CSS and JavaScript.", icon: <MdCode className="text-amber-700" />, link: "/cssjsMinifier" },
  { title: "Timezone Converter", desc: "Convert between timezones.", icon: <FaGlobe className="text-blue-600" />, link: "/timezoneConverter" },
  { title: "URL Shortener", desc: "Shorten long URLs.", icon: <FaLink className="text-green-600" />, link: "/urlShortener" },
  { title: "XML/HTML Beautifier", desc: "Format XML and HTML.", icon: <MdCode className="text-orange-600" />, link: "/xmlAndHtmlBeautifier" },
  { title: "Password Strength Checker", desc: "Check password strength.", icon: <FaLock className="text-blue-600" />, link: "/pwdStrengthChecker" },
  { title: "2FA Secret Generator", desc: "Generate 2FA secrets.", icon: <HiKey className="text-violet-600" />, link: "/twoFactorGenerator" },
  { title: "Emoji Counter", desc: "Count emojis in text.", icon: <FaChartLine className="text-yellow-500" />, link: "/emojiCounter" },
  { title: "Weather Widget", desc: "Check weather by city.", icon: <FaGlobe className="text-sky-500" />, link: "/weatherWidget" },
];

const ToolCard = ({ tool, variant = "blue" }) => {
  const variants = {
    blue: "hover:border-blue-200 hover:bg-blue-50/50 group-hover:text-blue-600",
    purple: "hover:border-purple-200 hover:bg-purple-50/50 group-hover:text-purple-600",
    green: "hover:border-emerald-200 hover:bg-emerald-50/50 group-hover:text-emerald-600",
  };
  return (
    <Link
      to={tool.link}
      className={`group flex flex-col h-full min-h-[200px] rounded-2xl p-5 sm:p-6 bg-white border border-gray-100 shadow-soft
        hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 ${variants[variant]}`}
    >
      <div className="text-2xl sm:text-3xl mb-3 text-gray-400 group-hover:scale-110 transition-transform duration-300 shrink-0">
        {tool.icon}
      </div>
      <h3 className="font-semibold text-gray-900 mb-1.5 transition-colors line-clamp-1">
        {tool.title}
      </h3>
      <p className="text-sm text-gray-500 leading-snug line-clamp-2 flex-1 min-h-[2.5rem]">
        {tool.desc}
      </p>
      <HiArrowRight className="w-4 h-4 mt-3 text-gray-300 group-hover:text-current group-hover:translate-x-1 transition-all shrink-0" />
    </Link>
  );
};

const ALL_TOOLS = [...converters, ...clientSideTools, ...moreTools];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const filteredTools = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return ALL_TOOLS.slice(0, 8);
    const words = q.split(/\s+/);
    return ALL_TOOLS.filter((tool) => {
      const text = `${tool.title} ${tool.desc}`.toLowerCase();
      return words.every((w) => text.includes(w));
    }).slice(0, 10);
  }, [searchQuery]);

  const selectTool = (tool) => {
    setSearchQuery("");
    setIsOpen(false);
    setHighlightIndex(-1);
    navigate(tool.link);
  };

  const handleKeyDown = (e) => {
    if (!isOpen && e.key !== "Escape") setIsOpen(true);
    if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightIndex(-1);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => (i < filteredTools.length - 1 ? i + 1 : 0));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) => (i > 0 ? i - 1 : filteredTools.length - 1));
      return;
    }
    if (e.key === "Enter" && highlightIndex >= 0 && filteredTools[highlightIndex]) {
      e.preventDefault();
      selectTool(filteredTools[highlightIndex]);
      return;
    }
    if (e.key === "Enter" && filteredTools.length === 1) {
      e.preventDefault();
      selectTool(filteredTools[0]);
    }
  };

  useEffect(() => {
    setHighlightIndex(0);
  }, [searchQuery]);

  useEffect(() => {
    listRef.current?.children[highlightIndex]?.scrollIntoView?.({ block: "nearest" });
  }, [highlightIndex]);

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden pt-16 gradient-mesh">
      {/* Hero - no overflow-hidden to allow dropdown to show */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              All-in-One Converter
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8">
              Convert PDFs, images, and audio. Fast, free, and secure.
            </p>
            <div ref={containerRef} className="relative">
              <div className="flex items-center gap-3 bg-white rounded-2xl shadow-xl px-4 py-3.5 sm:px-5 sm:py-4 text-left min-h-[52px]">
                <FaSearch className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                <input
                  ref={inputRef}
                  type="search"
                  autoComplete="off"
                  placeholder="Search tools... (e.g. PDF, image, password)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsOpen(true)}
                  onBlur={(e) => {
                    if (!containerRef.current?.contains(e.relatedTarget)) {
                      setTimeout(() => setIsOpen(false), 150);
                    }
                  }}
                  onKeyDown={handleKeyDown}
                  aria-label="Search tools"
                  role="combobox"
                  aria-expanded={isOpen}
                  aria-controls="tool-search-results"
                  aria-activedescendant={highlightIndex >= 0 && filteredTools[highlightIndex] ? `tool-${highlightIndex}` : undefined}
                  className="flex-1 min-w-0 bg-transparent text-gray-900 placeholder-gray-400 text-base sm:text-lg focus:outline-none py-1 leading-normal"
                />
                <kbd className="hidden sm:inline-flex items-center justify-center px-2 py-1 text-xs font-medium text-gray-400 bg-gray-100 rounded leading-none min-h-[24px]">
                  Ctrl+K
                </kbd>
              </div>
              {isOpen && (
                <div
                  id="tool-search-results"
                  ref={listRef}
                  role="listbox"
                  className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-y-auto max-h-[320px] z-[100]"
                >
                  {filteredTools.length === 0 ? (
                    <div className="px-5 py-8 text-gray-500 text-center">
                      No tools found. Try different keywords.
                    </div>
                  ) : (
                    filteredTools.map((tool, i) => (
                      <button
                        key={tool.link}
                        id={`tool-${i}`}
                        role="option"
                        aria-selected={i === highlightIndex}
                        type="button"
                        onMouseDown={(e) => { e.preventDefault(); selectTool(tool); }}
                        onMouseEnter={() => setHighlightIndex(i)}
                        className={`w-full flex items-center gap-4 px-5 py-3.5 text-left transition-colors ${
                          i === highlightIndex ? "bg-brand-50" : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="text-xl text-gray-400 shrink-0">{tool.icon}</div>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-gray-900 truncate">{tool.title}</div>
                          <div className="text-sm text-gray-500 truncate">{tool.desc}</div>
                        </div>
                        <HiArrowRight className="w-4 h-4 text-gray-300 shrink-0" />
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
            <p className="text-white/70 text-sm mt-4">
              {ALL_TOOLS.length}+ free tools • PDF, image, audio, calculators & more
            </p>
          </motion.div>
        </div>
      </section>

      {/* Converters */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Popular Converters & Tools
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              File conversion made simple. PDF, image, media, and more.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 items-stretch">
            {converters.map((tool, i) => (
              <motion.div
                key={tool.link}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
                className="min-h-[200px]"
              >
                <ToolCard tool={tool} variant="blue" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client-Side Tools */}
      <section className="py-16 sm:py-24 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Client-Side Tools
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Runs in your browser. No uploads. Your data stays private.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
            {clientSideTools.map((tool, i) => (
              <motion.div
                key={tool.link}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="min-h-[200px]"
              >
                <ToolCard tool={tool} variant="purple" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* More Tools */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              More Free Tools
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Calculators, design tools, and utilities.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 items-stretch">
            {moreTools.map((tool, i) => (
              <motion.div
                key={tool.link}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="min-h-[200px]"
              >
                <ToolCard tool={tool} variant="green" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
