import React from 'react'
import DownloaderSection from "../DownloaderSection";

export default function YouTubeToMP4() {
  return (
    <DownloaderSection
      title="YouTube to MP4 Converter"
      description="Convert YouTube videos to MP4 instantly."
      placeholder="Paste YouTube video link"
      buttonText="Download MP4"
      apiEndpoint="/api/youtube/mp4"
    />
  );
}


