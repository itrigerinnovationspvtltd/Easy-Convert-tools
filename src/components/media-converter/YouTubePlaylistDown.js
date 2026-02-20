import DownloaderSection from "../DownloaderSection";
import { API_BASE_URL } from "../../config/api";

export default function YouTubePlaylistDown() {
  return (
    <DownloaderSection
      title="YouTube Playlist Downloader"
      description="Download YouTube playlist videos instantly."
      placeholder="Paste YouTube playlist video link"
      buttonText="Download MP4"
      apiEndpoint={`${API_BASE_URL}/api/youtube/mp4`}
    />
  );
}


