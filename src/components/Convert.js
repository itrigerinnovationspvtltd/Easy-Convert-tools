import React, { useState } from "react";
import { API_BASE_URL } from "../config/api";

export default function Convert() {
  const [message, setMessange]= useState("");

    const handleClick = async ()=> {
        const res = await fetch(`${API_BASE_URL}/run-python`);
        const data = await res.json();
        setMessange(data.result);
    }


  return (
    <div className="pt-28 pb-16 px-4 text-center min-h-[320px]">
      <h1 className="text-2xl font-bold mb-4">React + Node + Python</h1>
      <button
      onClick={handleClick}
        className="btn-gradient px-4 py-2 rounded-lg shadow-btn-gradient"
      >
        Convert Now
      </button>
      <p className="mt-4">{message}</p>
    </div>
  );
}
