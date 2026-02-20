import DownloaderSection from "../DownloaderSection";
import { API_BASE_URL } from "../../config/api";

export default function YouTubeToMP3() {
  return (
    <DownloaderSection
      title="YouTube to MP3 Converter"
      description="Convert YouTube videos to MP3 instantly."
      placeholder="Paste YouTube video link"
      buttonText="Download MP3"
      apiEndpoint={`${API_BASE_URL}/api/youtube/mp3`}
    />
  );
}
