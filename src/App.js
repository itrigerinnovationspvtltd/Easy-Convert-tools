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
import AudioNormalizer from './components/audio-music-tools/AudioNormalizer';
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
//Footer
import Footer  from './components/Footer';
//Design color and branding
import ColorContrastChecker from './components/deisgn-color-branding/ColorContrastChecker';
import FaviconGenerator from './components/deisgn-color-branding/FaviconGenerator';
import FontPairingSuggester from './components/deisgn-color-branding/FontPairingSuggester';
import GradientCssGenerator from './components/deisgn-color-branding/GradientCssGenerator';
import LogoMaker from './components/deisgn-color-branding/LogoMaker';
import MockupGenerator from './components/deisgn-color-branding/MockupGenerator';
//Misc-Fun-Niche
import BarcodeGenerator from './components/misc-fun-niche/BarcodeGenerator';
import CountdownTimer from './components/misc-fun-niche/CountdownTimer';
import DailyQuoteWidget from './components/misc-fun-niche/DailyQuoteWidget';
import EmojiCounter from './components/misc-fun-niche/EmojiCounter';
import FakeNameGenerator from './components/misc-fun-niche/FakeNameGenerator';
import IpCameraSnapFetcher from './components/misc-fun-niche/IpCameraSnapFetcher';
import RandomPwdGenerator from './components/misc-fun-niche/RandomPwdGenerator';
import UsernameGenerator from './components/misc-fun-niche/UsernameGenerator';
import WeatherWidget from './components/misc-fun-niche/WeatherWidget';
//Finance conversion calculator
import AgeCalculator from './components/finance-conversion-calculators/AgeCalculator';
import BmiCalculator from './components/finance-conversion-calculators/BmiCalculator';
import CurrencyConverter from './components/finance-conversion-calculators/CurrencyConverter';
import DateDiffCalculator from './components/finance-conversion-calculators/DateDiffCalculator';
import LoanCalculator from './components/finance-conversion-calculators/LoanCalculator';
import ProfitMarginCalculator from './components/finance-conversion-calculators/ProfitMarginCalculator';
import TipAndSplitBill from './components/finance-conversion-calculators/TipAndSplitBill';
import UnitConverter from './components/finance-conversion-calculators/UnitConverter';
import VatGstCalculator from './components/finance-conversion-calculators/VatGstCalculator';
// Networking online Tools
import InternetSpeedChecker from './components/networking-online-tools/InternetSpeedChecker';
import IpAddressLookup from './components/networking-online-tools/IpAddressLookup';
import PingTracerouteTool from './components/networking-online-tools/PingTracerouteTool';
import PortScanner from './components/networking-online-tools/PortScanner';
import ProxyCheceker from './components/networking-online-tools/ProxyCheceker';
import SubnetCalculator from './components/networking-online-tools/SubnetCalculator';
import WhoisReverseIp from './components/networking-online-tools/WhoisReverseIp';
// Productivity dev tools
import Base64EncoderAndDecoder from './components/productivity-dev-tools/Base64EncoderAndDecoder';
import ColorPicker from './components/productivity-dev-tools/ColorPicker';
import CronExpressionGenerator from './components/productivity-dev-tools/CronExpressionGenerator';
import CssJsMinifier from './components/productivity-dev-tools/CssJsMinifier';
import JsonFormatter from './components/productivity-dev-tools/JsonFormatter';
import QrGenerator from './components/productivity-dev-tools/QrGenerator';
import RegexTester from './components/productivity-dev-tools/RegexTester';
import TimezoneConverter from './components/productivity-dev-tools/TimezoneConverter';
import UrlShortener from './components/productivity-dev-tools/UrlShortener';
import UuidGenerator from './components/productivity-dev-tools/UuidGenerator';
import XmlAndHtmlBeautifier from './components/productivity-dev-tools/XmlAndHtmlBeautifier';
// Security and privacy
import DataLeakChecker from './components/security-privacy-tools/DataLeakChecker';
import HashGenerator from './components/security-privacy-tools/HashGenerator';
import PwdStrengthChecker from './components/security-privacy-tools/PwdStrengthChecker';
import TextEncryptDecrypt from './components/security-privacy-tools/TextEncryptDecrypt';
import TwoFactorGenerator from './components/security-privacy-tools/TwoFactorGenerator';
import VpnProxyExplainer from './components/security-privacy-tools/VpnProxyExplainer';
// SEO website tools
import BacklinkPreview from './components/seo-website-tools/BacklinkPreview';
import BrokenLinkChecker from './components/seo-website-tools/BrokenLinkChecker';
import DnsLookup from './components/seo-website-tools/DnsLookup';
import DomainAgeChecker from './components/seo-website-tools/DomainAgeChecker';
import MetaTagExtractor from './components/seo-website-tools/MetaTagExtractor';
import { ResponsivenessTester } from './components/seo-website-tools/ResponsivenessTester';
import RobotsTextAndSitemapGenerator from './components/seo-website-tools/RobotsTextAndSitemapGenerator';
import SeoSiteAudit from './components/seo-website-tools/SeoSiteAudit';
import SslCertificateChecker from './components/seo-website-tools/SslCertificateChecker';
import WebsiteSpeedTest from './components/seo-website-tools/WebsiteSpeedTest';
import WhoisLookupTool from './components/seo-website-tools/WhoisLookupTool';
// Social media profile tools 
import HashtagGenerator from './components/social-media-profile-tools/HashtagGenerator';
import InstaUsernameAvailabilityChecker from './components/social-media-profile-tools/InstaUsernameAvailabilityChecker';
import LinkedInAnalyzer from './components/social-media-profile-tools/LinkedInAnalyzer';
import SocialMediaPostScheduler from './components/social-media-profile-tools/SocialMediaPostScheduler';
import SocialPostPreviewer from './components/social-media-profile-tools/SocialPostPreviewer';
import TiktokTrendFinder from './components/social-media-profile-tools/TiktokTrendFinder';
import TwitterHandleAvailabilityChecker from './components/social-media-profile-tools/TwitterHandleAvailabilityChecker';
import YoutubeTagAndKeywordExtractor from './components/social-media-profile-tools/YoutubeTagAndKeywordExtractor';
// Text writing tools
import DuplicateContentHighlighter from './components/text-writing-tools/DuplicateContentHighlighter';
import GrammerSpellChecker from './components/text-writing-tools/GrammerSpellChecker';
import { LoremIpsumGenerator } from './components/text-writing-tools/LoremIpsumGenerator';
import MarkdownToHtmlConverter from './components/text-writing-tools/MarkdownToHtmlConverter';
import MetaDescGenerator from './components/text-writing-tools/MetaDescGenerator';
import PlagiarismChecker from './components/text-writing-tools/PlagiarismChecker';
import ReadabilityScoreAnalyzer from './components/text-writing-tools/ReadabilityScoreAnalyzer';
import TextSummarizer from './components/text-writing-tools/TextSummarizer';
import TitleHeadlineGenerator from './components/text-writing-tools/TitleHeadlineGenerator';
import WordCharacterCounter from './components/text-writing-tools/WordCharacterCounter';
import Convert from './components/Convert';
import Trusted from './components/Trusted';
import WorkYourWay from './components/WorkYourWay';


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
          <Route path="/convert" element={<Convert />} />
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
          <Route path="/audioNormalizer" element={<AudioNormalizer />} />
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
          <Route path="/png-jpg-converter" element={<PngToJpg />} />
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
          {/* Design Color And Branding */}
          <Route path="/colorContrast" element={<ColorContrastChecker />} />
          <Route path="/faviconGenerator" element={<FaviconGenerator />} />
          <Route path="/fontPairingSuggester" element={<FontPairingSuggester />} />
          <Route path="/gradientCssGenerator" element={<GradientCssGenerator />} />
          <Route path="/logoMaker" element={<LogoMaker />} />
          <Route path="/mockupGenerator" element={<MockupGenerator />} />
          {/* Misc-Fun-Niche */}
          <Route path="/barcodeGenerator" element={<BarcodeGenerator />} />
          <Route path="/countdownTimer" element={<CountdownTimer />} />
          <Route path="/dailyQuoteWidget" element={<DailyQuoteWidget />} />
          <Route path="/emojiCounter" element={<EmojiCounter />} />
          <Route path="/fakeNameGenerator" element={<FakeNameGenerator />} />
          <Route path="/ipCameraSnapFetcher" element={<IpCameraSnapFetcher />} />
          <Route path="/randomPwdGenerator" element={<RandomPwdGenerator />} />
          <Route path="/usernameGenerator" element={<UsernameGenerator />} />
          <Route path="/weatherWidget" element={<WeatherWidget />} />
          {/* Finance Conversion calculator */}
          <Route path="/ageCalculator" element={<AgeCalculator />} />
          <Route path="/bmiCalculator" element={<BmiCalculator />} />
          <Route path="/currencyConverter" element={<CurrencyConverter />} />
          <Route path="/dateDiffCalculator" element={<DateDiffCalculator />} />
          <Route path="/loanCalculator" element={<LoanCalculator />} />
          <Route path="/profitMarginCalculator" element={<ProfitMarginCalculator />} />
          <Route path="/tipAndSplitBill" element={<TipAndSplitBill />} />
          <Route path="/unitConverter" element={<UnitConverter />} />
          <Route path="/vatGstCalculator" element={<VatGstCalculator />} />
          {/* Networking online Tools */}
          <Route path="/internetSpeedChecker" element={<InternetSpeedChecker />} />
          <Route path="/ipAddressLookup" element={<IpAddressLookup />} />
          <Route path="/pingTracerouteTool" element={<PingTracerouteTool />} />
          <Route path="/portScanner" element={<PortScanner />} />
          <Route path="/proxyChecker" element={<ProxyCheceker />} />
          <Route path="/subnetCalculator" element={<SubnetCalculator />} />
          <Route path="/whoisReverseIp" element={<WhoisReverseIp />} />
          {/* Productivity dev tools */}
          <Route path="/base64EncoderDecoder" element={<Base64EncoderAndDecoder />} />
          <Route path="/colorPicker" element={<ColorPicker />} />
          <Route path="/cronExpressionGenerator" element={<CronExpressionGenerator />} />
          <Route path="/cssjsMinifier" element={<CssJsMinifier />} />
          <Route path="/jsonFormatter" element={<JsonFormatter />} />
          <Route path="/qrGenerator" element={<QrGenerator />} />
          <Route path="/regexTester" element={<RegexTester />} />
          <Route path="/timezoneConverter" element={<TimezoneConverter />} />
          <Route path="/urlShortener" element={<UrlShortener />} />
          <Route path="/uuidGenerator" element={<UuidGenerator />} />
          <Route path="/xmlAndHtmlBeautifier" element={<XmlAndHtmlBeautifier />} />
          {/* Security and privacy */}
          <Route path="/dataLeakChecker" element={<DataLeakChecker />} />
          <Route path="/hashGenerator" element={<HashGenerator />} />
          <Route path="/pwdStrengthChecker" element={<PwdStrengthChecker />} />
          <Route path="/textEncryptDecrypt" element={<TextEncryptDecrypt />} />
          <Route path="/twoFactorGenerator" element={<TwoFactorGenerator />} />
          <Route path="/vpnProxyExplainer" element={<VpnProxyExplainer />} />
          {/* SEO website tools */}
          <Route path="/backlinkPreview" element={<BacklinkPreview />} />
          <Route path="/brokenLinkChecker" element={<BrokenLinkChecker />} />
          <Route path="/dnsLookup" element={<DnsLookup />} />
          <Route path="/domainAgeChecker" element={<DomainAgeChecker />} />
          <Route path="/metTagExtractor" element={<MetaTagExtractor />} />
          <Route path="/responsivenessTester" element={<ResponsivenessTester />} />
          <Route path="/robotsTextAndSitemap" element={<RobotsTextAndSitemapGenerator />} />
          <Route path="/seoSiteAudit" element={<SeoSiteAudit />} />
          <Route path="/sslCertificateChecker" element={<SslCertificateChecker />} />
          <Route path="/websiteSpeedTest" element={<WebsiteSpeedTest />} />
          <Route path="/whoisLookup" element={<WhoisLookupTool />} />
          {/* Social media profile tools */}
          <Route path="/hashtagGenerator" element={<HashtagGenerator />} />
          <Route path="/instUsernameChecker" element={<InstaUsernameAvailabilityChecker />} />
          <Route path="/linkedinAnalyzer" element={<LinkedInAnalyzer />} />
          <Route path="/socialMediaScheduler" element={<SocialMediaPostScheduler />} />
          <Route path="/socialPostPreviewer" element={<SocialPostPreviewer />} />
          <Route path="/tiktokTrendFinder" element={<TiktokTrendFinder />} />
          <Route path="/twitteHandleChecker" element={<TwitterHandleAvailabilityChecker />} />
          <Route path="/youtubeKeywordExtractor" element={<YoutubeTagAndKeywordExtractor />} />
          {/* Text writing tools */}
          <Route path="/duplicateContentHighlighter" element={<DuplicateContentHighlighter />} />
          <Route path="/grammerSpellChecker" element={<GrammerSpellChecker />} />
          <Route path="/loremIpsumGenerator" element={<LoremIpsumGenerator />} />
          <Route path="/markdownToHtml" element={<MarkdownToHtmlConverter />} />
          <Route path="/metaDescGenerator" element={<MetaDescGenerator />} />
          <Route path="/plagiarismChecker" element={<PlagiarismChecker />} />
          <Route path="/readabilityScoreAnalyzer" element={<ReadabilityScoreAnalyzer />} />
          <Route path="/textSummarizer" element={<TextSummarizer />} />
          <Route path="/titleHeadlineGenerator" element={<TitleHeadlineGenerator />} />
          <Route path="/wordCharacterCounter" element={<WordCharacterCounter />} />
        </Routes>
        <WorkYourWay/>
        <Trusted/>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
