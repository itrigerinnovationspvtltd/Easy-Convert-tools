import React from "react";
import { motion } from "framer-motion";
import { Upload, Shield, Zap } from "lucide-react";

const features = [
  {
    title: "Upload & Convert",
    desc: "Drag, drop, and convert. PDF, images, audio & more. No signup, no hassle.",
    icon: Upload,
    gradient: "from-blue-500 to-cyan-500",
    bg: "bg-gradient-to-br from-blue-50 to-cyan-50",
    border: "border-blue-100",
  },
  {
    title: "Privacy First",
    desc: "Many tools run entirely in your browser. Your files never leave your device.",
    icon: Shield,
    gradient: "from-purple-500 to-pink-500",
    bg: "bg-gradient-to-br from-purple-50 to-pink-50",
    border: "border-purple-100",
  },
  {
    title: "Lightning Fast",
    desc: "One click, instant results. Optimized for speed so you can get back to work.",
    icon: Zap,
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-gradient-to-br from-amber-50 to-orange-50",
    border: "border-amber-100",
  },
];

const WorkYourWay = () => {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Work your way
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Simple tools, powerful results. No accounts, no limits.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className={`h-full rounded-3xl p-8 ${feature.bg} border ${feature.border} shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2`}>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkYourWay;
