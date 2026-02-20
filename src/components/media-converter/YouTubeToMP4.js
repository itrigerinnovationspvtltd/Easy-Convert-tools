import React from 'react'
import DownloaderSection from "../DownloaderSection";
import { API_BASE_URL } from "../../config/api";

export default function YouTubeToMP4() {
  return (
    <DownloaderSection
      title="YouTube to MP4 Converter"
      description="Convert YouTube videos to MP4 instantly."
      placeholder="Paste YouTube video link"
      buttonText="Download MP4"
      apiEndpoint={`${API_BASE_URL}/api/youtube/mp4`}
    />
  );
}


