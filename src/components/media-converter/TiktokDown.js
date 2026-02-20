import DownloaderSection from "../DownloaderSection";
import { API_BASE_URL } from "../../config/api";

export default function TiktokDown() {
  return (
    <DownloaderSection
      title="TikTok video downloader"
      description="Convert TikTok video"
      placeholder="Paste TikTok video link"
      buttonText="Download video"
      apiEndpoint={`${API_BASE_URL}/api/youtube/mp3`}
    />
  );
}