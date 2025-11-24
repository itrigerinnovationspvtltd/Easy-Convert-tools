import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFilePdf, FaFileWord, FaFileImage, FaYoutube, FaFacebook, FaTiktok, FaInstagram, FaMicrophoneAlt, FaHeadphones, FaGraduationCap, FaTextHeight, FaChartLine, FaFileAudio } from "react-icons/fa";
import { MdCompress, MdMergeType, MdOutlineSplitscreen, MdAudiotrack } from "react-icons/md";
import { AiFillSound } from "react-icons/ai";
import { BiWater } from "react-icons/bi";
import { PiImagesSquareDuotone } from "react-icons/pi";
import { HiSpeakerWave } from "react-icons/hi2";

const converters = [
 
  
 { title: "PDF Compressor", desc: "Easily Compress PDF files.", icon: <MdCompress className="text-blue-500" />, link: "/pdfCompressor" },
  { title: "Word to PDF", desc: "Convert Word files to professional, shareable PDFs.", icon: <FaFileWord className="text-blue-600" />, link: "/wordToPdf" },
  { title: "PDF to Word", desc: "Convert PDF files to Editable Documents.", icon: <FaFilePdf className="text-red-500" />, link: "/pdfToWord" },
  { title: "Merge Pdf", desc: "Combine multiple PDF files into one seamless document.", icon: <MdMergeType className="text-green-500" />, link: "/pdfMerge" },
  { title: "Split Pdf", desc: "Split PDF file into multiple document.", icon: <MdOutlineSplitscreen className="text-orange-500" />, link: "/pdfSplit" },
  { title: "Pdf Watermark Adder", desc: "Easily add custom text or image watermarks to your PDF files.", icon: <BiWater className="text-blue-400" />, link: "/pdfWatermarkAdder" },
  { title: "Image Compressor", desc: "Reduce image size without losing quality.", icon: <MdCompress className="text-purple-500" />, link: "/imageCompressor" },
  { title: "JPEG to PNG", desc: "Convert JPEG to PNG", icon: <FaFileImage className="text-yellow-500" />, link: "/jpegToPng" },
  { title: "PNG to JPG", desc: "Convert PNG to JPG", icon: <FaFileImage className="text-pink-500" />, link: "/png-jpg-converter" },
  { title: "Image Resizer", desc: "Resize image size without losing quality.", icon: <PiImagesSquareDuotone className="text-indigo-500" />, link: "/imageResizer" },
  { title: "Image Background Blur", desc: "Instantly blur the background of your images to highlight the main subject", icon: <PiImagesSquareDuotone className="text-blue-600" />, link: "/backgroundBlur" },
  { title: "PNG transparent background remover", desc: "Quickly remove or make the background of your PNG images", icon: <PiImagesSquareDuotone className="text-emerald-500" />, link: "/pngTransparentBackground" },
  { title: "YouTube to MP3", desc: "Extract high-quality MP3 audio from YouTube videos.", icon: <FaYoutube className="text-red-600" />, link: "/YoutubeToMp3" },
  { title: "YouTube to MP4", desc: "Convert YouTube Videos to MP4 in just one click.", icon: <FaYoutube className="text-red-500" />, link: "//YouTubeToMP4" },
  { title: "YouTube playlist downloader", desc: "Download your favorite playlist in one click.", icon: <FaYoutube className="text-red-600" />, link: "/youtubePlaylist" },
  { title: "Facebook Video downloader", desc: "Download your Facebook Video in one click.", icon: <FaFacebook className="text-blue-600" />, link: "/fbVideoDown" },
  { title: "TikTok downloader", desc: "Download your TikTok Reel in one click.", icon: <FaTiktok className="text-black" />, link: "/tiktokDown" },
  { title: "Instagram reel downloader", desc: "Download your Instagram reel in one click.", icon: <FaInstagram className="text-pink-600" />, link: "/instaReelDown" },
  { title: "Audio Trimmer", desc: "Quickly trim audio", icon: <MdAudiotrack className="text-teal-500" />, link: "/audioTrimmer" },
  { title: "Audio Joiner", desc: "Quickly Join audio", icon: <AiFillSound className="text-orange-600" />, link: "/audioJoiner" },
  { title: "Audio Normalizer", desc: "Quickly Normalize audio", icon: <HiSpeakerWave className="text-blue-500" />, link: "/audioNormalizer" },
  { title: "Text to Speech", desc: "Quickly convert text into speech", icon: <FaMicrophoneAlt className="text-green-600" />, link: "/textToSpeech" },
  { title: "Podcast ID3 Tag Editor", desc: "Start editing your podcast ID3 Tags", icon: <FaHeadphones className="text-violet-500" />, link: "/podcastID3TagEditor" },
  { title: "Audio Format Converter", desc: "Convert your audio format instantly", icon: <FaFileAudio className="text-amber-500" />, link: "/audioFormatConverter" },
  { title: "Grammar & Spell Checker", desc: "Check your grammar and spelling", icon: <FaGraduationCap className="text-blue-600" />, link: "/grammerAndSpellCheck" },
  { title: "Word & Character Counter", desc: "Count words and characters easily", icon: <FaTextHeight className="text-gray-700" />, link: "/wordAndCharacter" },
  { title: "Readability Score Analyzer", desc: "Analyze your Readability score", icon: <FaChartLine className="text-green-600" />, link: "/readabilityScoreAnalyzer" },
  { title: "Plagiarism Checker", desc: "Instantly detect copied text and ensure originality.", icon: <FaGraduationCap className="text-purple-600" />, link: "/plagiarismChecker" },
];

const Home = () => {
  

  return (
    
    <div className="bg-gray-50 min-h-screen overflow-x-hidden pt-20">
      
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white relative">
        <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
> 
        <div className=''>
          <h1 className="text-4xl  md:text-6xl font-extrabold mb-4">
            All-in-One Online Converter
          </h1>
          <p className="text-sm px-2  md:text-lg ">
            Convert PDFs, images, videos, audio, and more — all in one place.<br />
           <p className="font-bold pt-1">Fast, free, and secure.</p> 
          </p>
        </div>
</motion.div>
        {/* Floating shapes for animation */}
        <div className="absolute top-5 left-5 w-10 h-10  sm:top-10 sm:left-10 sm:w-16 sm:h-16 bg-white/30 rounded-full animate-[bounce_3s_ease-in-out_infinite]"></div>
<div className="absolute bottom-5 right-5 w-10 h-10 sm:bottom-10 sm:right-10 sm:w-16 sm:h-16 bg-white/20 rounded-full animate-[bounce_3s_ease-in-out_infinite]"></div>

      </section>

      {/* About Section */}
      {/* <section className="py-12 px-6 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-4">About EasyConvert</h2>
        <p className="text-sm sm:text-base text-gray-600">
          EasyConvert is your go-to hub for fast, secure, and reliable file tools — from PDF and image converters to audio editors and productivity boosters. 
          <span className="text-blue-600 font-medium"> 100% free and privacy-friendly.</span>
        </p>
      </section> */}

      {/* Converters Grid */}
      <section className="py-10 bg-white">
        <div className=" mx-auto px-4 md:px-16">
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-800 text-center mb-10">
            Popular Converters & Tools
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
            {converters.map((tool, index) => (
              <Link
                key={index}
                to={tool.link}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg 
                hover:border-blue-400 hover:bg-blue-50 
                hover:scale-105 cursor-pointer group"
              >
                <div className="text-3xl md:text-6xl mb-3 ">
                  {tool.icon}
                </div>
                <h3 className="text-lg md:text-2xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600">
                  {tool.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-lg">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
