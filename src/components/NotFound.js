import React from "react";
import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi2";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-24 gradient-mesh">
      <div className="text-center max-w-md">
        <div className="text-8xl sm:text-9xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          404
        </div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-4">
          Page not found
        </h2>
        <p className="text-gray-600 mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 btn-gradient mt-8 px-8 py-3 rounded-xl"
        >
          <HiHome className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
