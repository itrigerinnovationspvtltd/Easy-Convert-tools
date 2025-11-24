import DownloaderSection from "../DownloaderSection";

export default function TiktokDown() {
  return (
    <DownloaderSection
      title="TikTok video downloader"
      description="Convert TikTok video"
      placeholder="Paste TikTok video link"
      buttonText="Download video"
      apiEndpoint="http://localhost:5000/api/youtube/mp3"
    />
  );
}