import DownloaderSection from "../DownloaderSection";

export default function YouTubePlaylistDown() {
  return (
    <DownloaderSection
      title="YouTube Playlist Downloader"
      description="Download YouTube playlist videos instantly."
      placeholder="Paste YouTube playlist video link"
      buttonText="Download MP4"
      apiEndpoint="/api/youtube/mp4"
    />
  );
}


