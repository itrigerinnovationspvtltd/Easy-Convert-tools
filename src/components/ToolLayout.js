import React from "react";

/**
 * Consistent layout wrapper for tool pages.
 * Use for production-ready tool UI consistency.
 */
const ToolLayout = ({ title, description, children }) => {
  return (
    <div className="min-h-[420px] flex flex-col items-center pt-24 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6 gradient-mesh">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="text-gray-600 text-sm sm:text-base text-center max-w-xl mb-8">
          {description}
        </p>
      )}
      <div className="w-full max-w-4xl">
        {children}
      </div>
    </div>
  );
};

export default ToolLayout;
