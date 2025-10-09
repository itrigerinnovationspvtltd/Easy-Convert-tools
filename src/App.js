import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from './components/Nav';
import Home from './components/Home';
import About from './components/About';
//Media Converter and Downloaders
import YoutubeToMP3 from './components/media-converter/YoutubeToMP3';
import YouTubeToMP4 from './components/media-converter/YouTubeToMP4';
import YouTubePlaylistDown from './components/media-converter/YouTubePlaylistDown';
import TiktokDown from './components/media-converter/TiktokDown';
import InstaReelDown from './components/media-converter/InstaReelDown';
import FbVideoDown from './components/media-converter/FbVideoDown';
import InstaStorySaver from './components/media-converter/InstaStorySaver';
import TwitterVideoDown from './components/media-converter/TwitterVideoDown';
import VimeoDown from './components/media-converter/VimeoDown';
import SoundCloudDown from './components/media-converter/SoundCloudDown';
import TwitchClipDown from './components/media-converter/TwitchClipDown';
import ReelToMp4 from './components/media-converter/ReelToMp4';
import Mp4ToMp3Extractor from './components/media-converter/Mp4ToMp3Extractor';
import BatchVideoDown from './components/media-converter/BatchVideoDown';
import Mp4ToGif from './components/media-converter/Mp4ToGif';
import VideoBitrateReducer from './components/media-converter/VideoBitrateReducer';
import VideoToAnimatedGif from './components/media-converter/VideoToAnimatedGif';
import GifToMp4 from './components/media-converter/GifToMp4';
//  Audio Music Tools
import AudioFormatConverter from './components/audio-music-tools/AudioFormatConverter';
import AudioJoiner from './components/audio-music-tools/AudioJoiner';
import AudioTrimmer from './components/audio-music-tools/AudioTrimmer';
import BpmDetector from './components/audio-music-tools/BpmDetector';
import NoiseReduction from './components/audio-music-tools/NoiseReduction';
import PodcastID3TagEditor from './components/audio-music-tools/PodcastID3TagEditor';
import SongKeyDetector from './components/audio-music-tools/SongKeyDetector';
import SpeechToText from './components/audio-music-tools/SpeechToText';
import TextToSpeech from './components/audio-music-tools/TextToSpeech';
// Image Tools
import AiImageUpscaler from './components/image-tools/AiImageUpscaler';
import AvatarGenerator from './components/image-tools/AvatarGenerator';
import BackgroundBlur from './components/image-tools/BackgroundBlur';
import BatchImageRenamer from './components/image-tools/BatchImageRenamer';
import ExifMetadataViewer from './components/image-tools/ExifMetadataViewer';
import ImageColorPaletteExtractor from './components/image-tools/ImageColorPaletteExtractor';
import ImageCompressor from './components/image-tools/ImageCompressor';
import ImageCroppingTools from './components/image-tools/ImageCroppingTools';
import ImageResizer from './components/image-tools/ImageResizer';
import ImageToWebP from './components/image-tools/ImageToWebP';
import JpegToPng from './components/image-tools/JpegToPng';
import MemeGenerator from './components/image-tools/MemeGenerator';
import PngToJpg from './components/image-tools/PngToJpg';
import PngTransparentBackgroundRemover from './components/image-tools/PngTransparentBackgroundRemover';
import ProfilePhotoDown from './components/image-tools/ProfilePhotoDown';
import WatermarkRemover from './components/image-tools/WatermarkRemover';
// PDF Document Tools
import EBookConverter from './components/pdf-document-tools/EBookConverter';
import OcrImageORPdfTOtext from './components/pdf-document-tools/OcrImageORPdfTOtext';
import PdfCompressor from './components/pdf-document-tools/PdfCompressor';
import PdfMerge from './components/pdf-document-tools/PdfMerge';
import PdfRotateAndReorder from './components/pdf-document-tools/PdfRotateAndReorder';
import PdfSplit from './components/pdf-document-tools/PdfSplit';
import PdfTOWord from './components/pdf-document-tools/PdfTOWord';
import PdfUnlock from './components/pdf-document-tools/PdfUnlock';
import PdfWatermarkAdder from './components/pdf-document-tools/PdfWatermarkAdder';
import ScanToPdf from './components/pdf-document-tools/ScanToPdf';
import WordTOPdf from './components/pdf-document-tools/WordTOPdf';
import { Footer } from './components/Footer';



function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar always visible */}
        <Nav />

        {/* Define routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* Media Converter and Downloaders */}
          <Route path="/youtubeTomp3" element={<YoutubeToMP3 />} />
          <Route path="/youtubeTomp4" element={<YouTubeToMP4 />} />
          <Route path="/youtubePlaylist" element={<YouTubePlaylistDown />} />
          <Route path="/tiktokDown" element={<TiktokDown />} />
          <Route path="/instaReelDown" element={<InstaReelDown />} />
          <Route path="/fbVideoDown" element={<FbVideoDown />} />
          <Route path="/instaStorySaver" element={<InstaStorySaver/>} />
          <Route path="/twitterVideoDown" element={<TwitterVideoDown/>} />
          <Route path="/vimeoDown" element={<VimeoDown/>} />
          <Route path="/soundCloudDown" element={<SoundCloudDown/>} />
          <Route path="/twitchClipDown" element={<TwitchClipDown/>} />
          <Route path="/reelToMp4" element={<ReelToMp4/>} />
          <Route path="/mp4ToMp3" element={<Mp4ToMp3Extractor/>} />
          <Route path="/batchVideoDown" element={<BatchVideoDown/>} />
          <Route path="/mp4ToGif" element={<Mp4ToGif/>} />
          <Route path="/gifToMp4" element={<GifToMp4/>} />
          <Route path="/videoBitrateReducer" element={<VideoBitrateReducer />} />
          <Route path="/videoToAnimatedGif" element={<VideoToAnimatedGif />} />
          <Route path="/videoToAnimatedGif" element={<VideoToAnimatedGif />} />
          {/* Audio Music Tools */}
          <Route path="/audioFormatConverter" element={<AudioFormatConverter />} />
          <Route path="/audioJoiner" element={<AudioJoiner />} />
          <Route path="/audioTrimmer" element={<AudioTrimmer />} />
          <Route path="/bpmDetector" element={<BpmDetector />} />
          <Route path="/noiseReduction" element={<NoiseReduction />} />
          <Route path="/podcastID3TagEditor" element={<PodcastID3TagEditor />} />
          <Route path="/songKeyDetector" element={<SongKeyDetector />} />
          <Route path="/speechToTextr" element={<SpeechToText />} />
          <Route path="/textToSpeech" element={<TextToSpeech />} />
          {/* Image Tools */}
          <Route path="/aiImageUpscaler" element={<AiImageUpscaler />} />
          <Route path="/avatarGenerator" element={<AvatarGenerator />} />
          <Route path="/backgroundBlur" element={<BackgroundBlur />} />
          <Route path="/batchImageRenamer" element={<BatchImageRenamer />} />
          <Route path="/exifMetadata" element={<ExifMetadataViewer />} />
          <Route path="/imageColorPalette" element={<ImageColorPaletteExtractor />} />
          <Route path="/imageCompressor" element={<ImageCompressor />} />
          <Route path="/imageCropping" element={<ImageCroppingTools />} />
          <Route path="/imageResizer" element={<ImageResizer />} />
          <Route path="/imageToWebp" element={<ImageToWebP />} />
          <Route path="/jpegToPng" element={<JpegToPng />} />
          <Route path="/memeGenerator" element={<MemeGenerator />} />
          <Route path="/pngToJpg" element={<PngToJpg />} />
          <Route path="/pngTransparentBackground" element={<PngTransparentBackgroundRemover />} />
          <Route path="/profilePhotoDown" element={<ProfilePhotoDown />} />
          <Route path="/watermarkRemover" element={<WatermarkRemover />} />
          {/* PDF Document tools */}
          <Route path="/ebookConverter" element={<EBookConverter />} />
          <Route path="/ocrImageToText" element={<OcrImageORPdfTOtext />} />
          <Route path="/pdfCompressor" element={<PdfCompressor />} />
          <Route path="/pdfMerge" element={<PdfMerge />} />
          <Route path="/pdfRotate" element={<PdfRotateAndReorder />} />
          <Route path="/pdfSplit" element={<PdfSplit />} />
          <Route path="/pdfToWord" element={<PdfTOWord />} />
          <Route path="/pdfUnlock" element={<PdfUnlock />} />
          <Route path="/pdfWatermarkAdder" element={<PdfWatermarkAdder />} />
          <Route path="/scanToPdf" element={<ScanToPdf />} />
          <Route path="/wordTOPdf" element={<WordTOPdf />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
