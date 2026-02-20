import React from "react";
import { Link } from "react-router-dom";
import { FaFilePdf, FaShieldAlt, FaBolt, FaUserCheck, FaLock, FaHeart } from "react-icons/fa";
import { MdFormatColorText, MdImage, MdAudiotrack } from "react-icons/md";
import { HiArrowRight } from "react-icons/hi2";

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 gradient-mesh">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="py-12 sm:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            About EasyConvert
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-4">
            EasyConvert is a free online toolkit for everyday tasks: PDF editing, image conversion,
            text tools, and more. No signup, no subscriptions. Just pick a tool and get things done.
          </p>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            <span className="text-brand-600 font-semibold">100% free and privacy-friendly.</span>{" "}
            Your files stay on your device. We don’t store them.
          </p>
        </section>

        {/* What we offer */}
        <section className="py-12 border-t border-gray-200/80">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">What we offer</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex gap-3 p-4 rounded-xl bg-white/60 border border-gray-100">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <FaFilePdf className="text-red-600 text-lg" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">PDF & documents</h3>
                <p className="text-sm text-gray-600">
                  Compress, merge, split, watermark PDFs. Convert Word to PDF and PDF to Word.
                </p>
              </div>
            </div>
            <div className="flex gap-3 p-4 rounded-xl bg-white/60 border border-gray-100">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <MdImage className="text-emerald-600 text-lg" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Images</h3>
                <p className="text-sm text-gray-600">
                  Resize, compress, convert formats (WebP, PNG, JPG). Remove backgrounds, add blur.
                </p>
              </div>
            </div>
            <div className="flex gap-3 p-4 rounded-xl bg-white/60 border border-gray-100">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                <MdFormatColorText className="text-indigo-600 text-lg" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Text & dev tools</h3>
                <p className="text-sm text-gray-600">
                  Word counter, JSON formatter, Base64, Markdown to HTML, regex tester, and more.
                </p>
              </div>
            </div>
            <div className="flex gap-3 p-4 rounded-xl bg-white/60 border border-gray-100">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <MdAudiotrack className="text-amber-600 text-lg" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Audio</h3>
                <p className="text-sm text-gray-600">
                  Text to speech and speech to text. Quick and browser-based.
                </p>
              </div>
            </div>
            <div className="flex gap-3 p-4 rounded-xl bg-white/60 border border-gray-100 sm:col-span-2">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center">
                <FaBolt className="text-sky-600 text-lg" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Utilities & more</h3>
                <p className="text-sm text-gray-600">
                  Calculators (BMI, loan, VAT), QR codes, passwords, color picker, currency converter,
                  timezone converter, weather, and dozens of other handy tools.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why choose us */}
        <section className="py-12 border-t border-gray-200/80">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Why choose EasyConvert</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex gap-3 p-4 rounded-xl bg-white/60 border border-gray-100">
              <FaLock className="text-brand-500 text-xl flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Privacy first</h3>
                <p className="text-sm text-gray-600">
                  Files are processed on the fly. We don’t store or share your documents or images.
                </p>
              </div>
            </div>
            <div className="flex gap-3 p-4 rounded-xl bg-white/60 border border-gray-100">
              <FaUserCheck className="text-brand-500 text-xl flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">No signup required</h3>
                <p className="text-sm text-gray-600">
                  Use any tool without creating an account. No emails, no passwords.
                </p>
              </div>
            </div>
            <div className="flex gap-3 p-4 rounded-xl bg-white/60 border border-gray-100">
              <FaShieldAlt className="text-brand-500 text-xl flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Free to use</h3>
                <p className="text-sm text-gray-600">
                  All tools are free. No hidden fees, no premium tiers, no trial limits.
                </p>
              </div>
            </div>
            <div className="flex gap-3 p-4 rounded-xl bg-white/60 border border-gray-100">
              <FaBolt className="text-brand-500 text-xl flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Fast and simple</h3>
                <p className="text-sm text-gray-600">
                  Clean interface, quick processing. Get results in seconds, not minutes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who uses it */}
        <section className="py-12 border-t border-gray-200/80">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Who uses EasyConvert</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Students, freelancers, small businesses, and anyone who needs to compress a PDF, convert
            an image, or run a quick utility. If you’ve ever needed to shrink a file for email, turn
            a doc into a PDF, or generate a QR code. This is for you.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We built EasyConvert because we were tired of signing up for services or hunting for
            trustworthy tools. One place, no hassle.
          </p>
        </section>

        {/* CTA */}
        <section className="py-12 border-t border-gray-200/80 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-brand-50 text-brand-700 text-sm font-medium mb-6">
            <FaHeart className="text-brand-500" />
            Made to be useful, not flashy
          </div>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Ready to try it? Browse our tools or search for what you need.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl btn-gradient shadow-btn-gradient"
          >
            Explore all tools
            <HiArrowRight className="text-lg" />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default About;
