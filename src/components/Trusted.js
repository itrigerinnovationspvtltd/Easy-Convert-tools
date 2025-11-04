import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, FileText } from "lucide-react";

const TrustedSection = () => {
  return (
    <section className="bg-[#1c1c1c] text-white py-16 text-center overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold mb-4"
        >
          Trusted by Thousands of Users Worldwide
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-200 text-lg leading-relaxed mb-10"
        >
          EasyConvert Tools is your reliable companion for fast and secure file
          conversion. Designed to simplify your workflow while keeping your data
          private and protected.
        </motion.p>

        {/* Icons / badges */}
        <div className="flex flex-wrap justify-center gap-12 mt-8">
          {[
            { icon: ShieldCheck, label: "ISO Certified" },
            { icon: Lock, label: "SSL Secure" },
            { icon: FileText, label: "Trusted Platform" },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div className="bg-white/10 p-4 rounded-2xl mb-3 shadow-md hover:bg-white/20 transition-all duration-300">
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <p className="text-sm font-medium">{item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustedSection;
