import React from "react";
import { Link } from "react-router-dom";

const converters = [
  {
    title: "PDF to Word",
    desc: "Easily convert PDF files into editable Word documents.",
    icon: "📄",
    link: "/",
  },
  {
    title: "Word to PDF",
    desc: "Convert Word files to professional, shareable PDFs.",
    icon: "📝",
    link: "/",
  },
  {
    title: "Image to JPG",
    desc: "Change your image format quickly to JPG or PNG.",
    icon: "🖼️",
    link: "/",
  },
  {
    title: "YouTube to MP3",
    desc: "Extract high-quality MP3 audio from YouTube videos.",
    icon: "🎧",
    link: "/youtubeTomp3",
  },
  {
    title: "YouTube to MP4",
    desc: "Convert YouTube Videos to MP4 in just one click.",
    icon: "🎬",
    link: "/",
  },
  {
    title: "Image Compressor",
    desc: "Reduce image size without losing quality.",
    icon: "📸",
    link: "/",
  },
  {
    title: "Merge PDF",
    desc: "Combine multiple PDF files into one seamless document.",
    icon: "📚",
    link: "/",
  },
  {
    title: "Text Encrypt/Decrypt",
    desc: "Quickly switch between uppercase, lowercase, and title case.",
    icon: "🔤",
    link: "/",
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

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm border-t ">
        © 2025 EasyConvert — All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
