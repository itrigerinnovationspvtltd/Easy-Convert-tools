import React from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Switch to document mode",
    desc: "Use EasyConvert Tools to simplify file editing when your work goes beyond images.",
    img: "https://images.unsplash.com/photo-1460454375108-72b91b49941?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687", 
  },
  {
    title: "Scan and edit on the go",
    desc: "Scan documents and access editing tools anytime with the EasyConvert Mobile App.",
    img: "https://images.unsplash.com/photo-1515401558980-f84ec141ebf9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    title: "Scale with EasyConvert API",
    desc: "Automate conversions and integrate powerful file tools into your products or workflow.",
    img: "https://images.unsplash.com/photo-1628277613967-6abca504d0ac?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXBpfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
  },
];

const WorkYourWay = () => {
  return (
    <section className="bg-white py-20 sm:h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-bold text-center text-gray-900 mb-16"
        >
          Work your way
        </motion.h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              {/* Image */}
              <div className="bg-[#f3f8fd] w-full h-56 flex items-center justify-center overflow-hidden">
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-between min-h-[180px]">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
                <div className="flex justify-end mt-4">
                  <ArrowUpRight className="w-5 h-5 text-[#385f82]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkYourWay;