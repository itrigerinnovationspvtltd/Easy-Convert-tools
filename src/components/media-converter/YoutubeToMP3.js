import DownloaderSection from "../DownloaderSection";

export default function YouTubeToMP3() {
  return (
    <DownloaderSection
      title="YouTube to MP3 Converter"
      description="Convert YouTube videos to MP3 instantly."
      placeholder="Paste YouTube video link"
      buttonText="Download MP3"
      apiEndpoint="http://localhost:5000/api/youtube/mp3"
    />
  );
}
