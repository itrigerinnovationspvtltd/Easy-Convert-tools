import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Zap, Eye, Server } from "lucide-react";

const trustBadges = [
  { icon: ShieldCheck, label: "ISO Certified", desc: "Industry standards" },
  { icon: Lock, label: "SSL Secure", desc: "Encrypted connections" },
  { icon: Zap, label: "Lightning Fast", desc: "Instant conversions" },
  { icon: Eye, label: "Privacy First", desc: "No data stored" },
  { icon: Server, label: "99.9% Uptime", desc: "Always available" },
];

const stats = [
  { value: "500K+", label: "Files converted" },
  { value: "50K+", label: "Happy users" },
  { value: "100+", label: "Free tools" },
];

const TrustedSection = () => {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-purple-900/20" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            Trusted by thousands worldwide
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            EasyConvert is your reliable companion for fast and secure file conversion.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-12 sm:gap-20 mb-16"
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                {value}
              </div>
              <div className="text-sm text-slate-500 mt-1">{label}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {trustBadges.map(({ icon: Icon, label, desc }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="h-full flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/10 text-blue-400 mb-4">
                  <Icon className="w-7 h-7" strokeWidth={2} />
                </div>
                <p className="font-semibold text-white">{label}</p>
                <p className="text-slate-500 text-sm mt-0.5">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedSection;
