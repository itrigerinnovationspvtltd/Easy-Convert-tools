import DownloaderSection from "../DownloaderSection";

export default function InstaReelDown() {
  return (
    <DownloaderSection
      title="Instagram Reel downloader"
      description="Download TikTok video"
      placeholder="Paste Insta reel link"
      buttonText="Download reel"
      apiEndpoint="http://localhost:5000/api/youtube/mp3"
    />
  );
}