import React from "react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 gradient-mesh">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="prose prose-slate max-w-none">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500 mb-10">
            Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            Welcome to EasyConvert. By accessing or using our Service (easyconverttools.com and related tools), 
            you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree, please do not use the Service.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Use of Service</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            EasyConvert provides free online conversion and utility tools. You may use the Service:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>For personal or commercial purposes, in compliance with applicable laws.</li>
            <li>Without creating an account (where registration is not required).</li>
            <li>Subject to reasonable usage limits to ensure fair access for all users.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Prohibited Uses</h2>
          <p className="text-gray-600 leading-relaxed mb-4">You must not:</p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Use the Service for illegal purposes or to infringe others&apos; intellectual property or rights.</li>
            <li>Attempt to reverse-engineer, disrupt, or overload our systems.</li>
            <li>Use automated scripts to abuse or scrape the Service without permission.</li>
            <li>Upload content that is harmful, offensive, or violates applicable laws.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Intellectual Property</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            The Service, including its design, code, and content (except user-provided inputs), is owned 
            by EasyConvert or its licensors. You may not copy, modify, or distribute our materials without 
            written permission.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Disclaimer of Warranties</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, 
            EXPRESS OR IMPLIED. We do not guarantee accuracy, completeness, or uninterrupted availability. 
            Use of conversion and calculation tools is at your own risk.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Limitation of Liability</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, EASYCONVERT SHALL NOT BE LIABLE FOR ANY INDIRECT, 
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR LOSS OF DATA OR PROFITS, 
            ARISING FROM YOUR USE OF THE SERVICE. Some jurisdictions do not allow certain limitations; 
            in such cases, our liability is limited to the extent permitted by law.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. Indemnification</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            You agree to indemnify and hold harmless EasyConvert and its affiliates from any claims, 
            damages, or expenses arising from your use of the Service or violation of these Terms.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">7. Governing Law</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            These Terms are governed by the laws applicable in the jurisdiction of our principal place 
            of business. Disputes shall be resolved in the courts of that jurisdiction, unless otherwise 
            required by mandatory consumer protection laws in your country.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">8. Changes</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            We may update these Terms from time to time. Continued use of the Service after changes 
            constitutes acceptance. We will post the updated Terms with a new &quot;Last updated&quot; date.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">9. Contact</h2>
          <p className="text-gray-600 leading-relaxed mb-10">
            For questions about these Terms, please contact us at{" "}
            <a href="https://itrigerinnovations.com/" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-700 font-medium">Itriger Innovations Pvt Ltd</a>.
          </p>
        </article>

        <Link
          to="/"
          className="inline-flex items-center text-brand-600 hover:text-brand-700 font-medium"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default TermsOfService;
