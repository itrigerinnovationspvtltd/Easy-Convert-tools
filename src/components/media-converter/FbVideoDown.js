import DownloaderSection from "../DownloaderSection";

export default function FbVideoDown() {
  return (
    <DownloaderSection
      title="Facebook video downloader"
      description="Download Facebook video"
      placeholder="Paste Facebook Video link"
      buttonText="Download video"
      apiEndpoint="http://localhost:5000/api/youtube/mp3"
    />
  );
}