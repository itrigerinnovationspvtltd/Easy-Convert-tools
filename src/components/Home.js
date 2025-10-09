import React from "react";
import { Link } from "react-router-dom";

const converters = [
  {
    title: "PDF Compressor",
    desc: "Easily Compress PDF files.",
    icon: "📄",
    link: "/pdfCompressor",
  },
  {
    title: "Word to PDF",
    desc: "Convert Word files to professional, shareable PDFs.",
    icon: "📝",
    link: "/wordToPdf",
  },
  {
    title: "PDF to Word",
    desc: "Convert PDF files to Editable Documents.",
    icon: "📄",
    link: "/pdfToWord",
  },
  {
    title: "Merge Pdf",
    desc: "Combine multiple PDF files into one seamless document.",
    icon: "📚",
    link: "/pdfMerge",
  },
  {
    title: "Image Compressor",
    desc: "Reduce image size without losing quality.",
    icon: "📸",
    link: "/imageCompressor",
  },
  {
    title: "JPEG to PNG",
    desc: "Convert JPEG to PNG",
    icon: "🖼️",
    link: "/jpegToPng",
  },
  {
    title: "YouTube to MP3",
    desc: "Extract high-quality MP3 audio from YouTube videos.",
    icon: "🎧",
    link: "/youtubeToMp3",
  },
  {
    title: "YouTube to MP4",
    desc: "Convert YouTube Videos to MP4 in just one click.",
    icon: "🎬",
    link: "/YoutubeToMp4",
  },
  
  
  {
    title: "Image Resizer",
    desc: "Resize Your Image in fast and secure way",
    icon: "📸",
    link: "/imageResizer",
  },
  {
    title: "Audio Trimmer",
    desc: "Quickly Trimm Audio",
    icon: "🔉",
    link: "/audioTrimmer",
  },
  {
    title: "Text to Speech",
    desc: "Quickly convert the text into speech",
    icon: "🔠",
    link: "/textToSpeech",
  },
  {
    title: "Audio Format Converter",
    desc: "Quickly convert the format of your Audio file",
    icon: "🎧",
    link: "/audioFormatConverter",
  },
  {
    title: "Grammer and Spell Checker",
    desc: "Check your Grammer and spellings",
    icon: "🎓📝",
    link: "/grammerAndSpellCheck",
  },
  {
    title: "Word and Character Counter",
    desc: "If you want to count words and characters then go and count easily",
    icon: "🆎",
    link: "/wordAndCharacter",
  },
];

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      

      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-blue-200 to-red-200 text-white">
        <div className="px-4">
         
          <h1 className="text-5xl font-bold mb-4">
            All-in-One Online Converter
          </h1>
          <p className="text-lg ">
            Convert PDFs, images, videos, audio, and more — all in one place.
            Fast, free, and secure.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          About EasyConvert
        </h2>
        <p className="text-gray-600 leading-relaxed">
          EasyConvert is your go-to tool hub for file conversions, utilities,
          and productivity boosters. Whether you need to convert PDFs, resize
          images, extract media, or generate SEO tools — we’ve got you covered.
          100% free and privacy-friendly.
        </p>
      </section>

      {/* Converters Grid */}
      <section className="py-10 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
            Popular Converters & Tools
          </h2>

          <div className="grid gap-8 grid-cols-4">
            {converters.map((tool, index) => (
              <Link
                key={index}
                to={tool.link}
                className="bg-gray-100 hover:bg-blue-50 border border-gray-200 rounded-2xl shadow-sm p-6 transition-transform transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-3">{tool.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {tool.title}
                </h3>
                <p className="text-gray-600 text-sm">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
