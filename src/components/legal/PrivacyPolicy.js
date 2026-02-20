import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 gradient-mesh">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="prose prose-slate max-w-none">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mb-10">
            Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            EasyConvert (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy globally. 
            This Privacy Policy explains how we collect, use, and safeguard your information when you use our 
            free online tools at easyconverttools.com (the &quot;Service&quot;).
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Most of our tools run entirely in your browser. We do not collect, store, or transmit your 
            file contents, conversion data, or personal inputs. When you use our Service:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>Usage data:</strong> We may collect anonymous analytics (e.g., pages visited, tools used) to improve the Service.</li>
            <li><strong>Technical data:</strong> Browser type, language preference, and general location (country-level) may be used for performance and localization.</li>
            <li><strong>Cookies:</strong> We use essential cookies and, with your consent, optional analytics cookies. You can manage preferences via our cookie banner.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            We use collected information only to operate, improve, and secure the Service. We do not sell, 
            rent, or trade your personal data to third parties.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. International Users (GDPR & CCPA)</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Our Service is available globally. If you are in the European Economic Area (EEA) or California:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li><strong>GDPR (EEA):</strong> You have the right to access, rectify, erase, restrict processing, and data portability. You may withdraw consent for non-essential cookies at any time.</li>
            <li><strong>CCPA (California):</strong> You have the right to know what data we collect, to delete it, and to opt out of sale (we do not sell personal data).</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Data Retention</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            We retain minimal data only as long as necessary for the purposes described. Analytics data 
            is typically anonymized and aggregated. You can request deletion of any personal data by contacting us.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Security</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            We implement industry-standard security measures to protect your information. 
            File conversions and sensitive operations are processed locally in your browser when possible.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. Third-Party Services</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Some tools may use third-party APIs (e.g., currency rates, IP lookup). These services have 
            their own privacy policies. We recommend reviewing them when using such features.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">7. Children&apos;s Privacy</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Our Service is not directed at children under 13 (or 16 in the EEA). We do not knowingly 
            collect personal information from children.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">8. Changes</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            We may update this Privacy Policy from time to time. We will notify you of material changes 
            by posting the updated policy on this page with a new &quot;Last updated&quot; date.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">9. Contact</h2>
          <p className="text-gray-600 leading-relaxed mb-10">
            For privacy-related questions or to exercise your rights, please contact us at{" "}
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

export default PrivacyPolicy;
