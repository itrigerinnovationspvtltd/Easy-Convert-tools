import DownloaderSection from "../DownloaderSection";
import { API_BASE_URL } from "../../config/api";

export default function InstaReelDown() {
  return (
    <DownloaderSection
      title="Instagram Reel downloader"
      description="Download Instagram reel"
      placeholder="Paste Insta reel link"
      buttonText="Download reel"
      apiEndpoint={`${API_BASE_URL}/api/youtube/mp3`}
    />
  );
}