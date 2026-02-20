import DownloaderSection from "../DownloaderSection";
import { API_BASE_URL } from "../../config/api";

export default function FbVideoDown() {
  return (
    <DownloaderSection
      title="Facebook video downloader"
      description="Download Facebook video"
      placeholder="Paste Facebook Video link"
      buttonText="Download video"
      apiEndpoint={`${API_BASE_URL}/api/youtube/mp3`}
    />
  );
}