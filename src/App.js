import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Nav from './components/Nav';
import Home from './components/Home';
import About from './components/About';
import PrivacyPolicy from './components/legal/PrivacyPolicy';
import TermsOfService from './components/legal/TermsOfService';
import CookieConsent from './components/CookieConsent';
//  Audio Music Tools
import SpeechToText from './components/audio-music-tools/SpeechToText';
import TextToSpeech from './components/audio-music-tools/TextToSpeech';
// Image Tools
import BackgroundBlur from './components/image-tools/BackgroundBlur';
import ImageCompressor from './components/image-tools/ImageCompressor';
import ImageResizer from './components/image-tools/ImageResizer';
import ImageToWebP from './components/image-tools/ImageToWebP';
import JpegToPng from './components/image-tools/JpegToPng';
import MemeGenerator from './components/image-tools/MemeGenerator';
import PngToJpg from './components/image-tools/PngToJpg';
import PngTransparentBackgroundRemover from './components/image-tools/PngTransparentBackgroundRemover';
// PDF Document Tools
import PdfCompressor from './components/pdf-document-tools/PdfCompressor';
import PdfMerge from './components/pdf-document-tools/PdfMerge';
import PdfSplit from './components/pdf-document-tools/PdfSplit';
import PdfTOWord from './components/pdf-document-tools/PdfTOWord';
import PdfWatermarkAdder from './components/pdf-document-tools/PdfWatermarkAdder';
import DigitalSignature from './components/pdf-document-tools/DigitalSignature';
import WordTOPdf from './components/pdf-document-tools/WordTOPdf';
//Footer
import Footer  from './components/Footer';
//Design color and branding
import ColorContrastChecker from './components/deisgn-color-branding/ColorContrastChecker';
import FaviconGenerator from './components/deisgn-color-branding/FaviconGenerator';
import GradientCssGenerator from './components/deisgn-color-branding/GradientCssGenerator';
//Misc-Fun-Niche
import BarcodeGenerator from './components/misc-fun-niche/BarcodeGenerator';
import CountdownTimer from './components/misc-fun-niche/CountdownTimer';
import DailyQuoteWidget from './components/misc-fun-niche/DailyQuoteWidget';
import EmojiCounter from './components/misc-fun-niche/EmojiCounter';
import FakeNameGenerator from './components/misc-fun-niche/FakeNameGenerator';
import RandomPwdGenerator from './components/misc-fun-niche/RandomPwdGenerator';
import UsernameGenerator from './components/misc-fun-niche/UsernameGenerator';
import WeatherWidget from './components/misc-fun-niche/WeatherWidget';
//Finance conversion calculator
import AgeCalculator from './components/finance-conversion-calculators/AgeCalculator';
import BmiCalculator from './components/finance-conversion-calculators/BmiCalculator';
import CurrencyConverter from './components/finance-conversion-calculators/CurrencyConverter';
import LoanCalculator from './components/finance-conversion-calculators/LoanCalculator';
import TipAndSplitBill from './components/finance-conversion-calculators/TipAndSplitBill';
import UnitConverter from './components/finance-conversion-calculators/UnitConverter';
import VatGstCalculator from './components/finance-conversion-calculators/VatGstCalculator';
// Networking online Tools
import InternetSpeedChecker from './components/networking-online-tools/InternetSpeedChecker';
// Productivity dev tools
import Base64EncoderAndDecoder from './components/productivity-dev-tools/Base64EncoderAndDecoder';
import JwtDecoder from './components/productivity-dev-tools/JwtDecoder';
import TimestampConverter from './components/productivity-dev-tools/TimestampConverter';
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
import HashGenerator from './components/security-privacy-tools/HashGenerator';
import PwdStrengthChecker from './components/security-privacy-tools/PwdStrengthChecker';
import TextEncryptDecrypt from './components/security-privacy-tools/TextEncryptDecrypt';
import TwoFactorGenerator from './components/security-privacy-tools/TwoFactorGenerator';
// SEO website tools
import BrokenLinkChecker from './components/seo-website-tools/BrokenLinkChecker';
import WebsiteSpeedTest from './components/seo-website-tools/WebsiteSpeedTest';
// Social media profile tools 
import HashtagGenerator from './components/social-media-profile-tools/HashtagGenerator';
// Text writing tools
import CaseConverter from './components/text-writing-tools/CaseConverter';
import { LoremIpsumGenerator } from './components/text-writing-tools/LoremIpsumGenerator';
import TextDiffChecker from './components/text-writing-tools/TextDiffChecker';
import MarkdownToHtmlConverter from './components/text-writing-tools/MarkdownToHtmlConverter';
import ReadabilityScoreAnalyzer from './components/text-writing-tools/ReadabilityScoreAnalyzer';
import WordCharacterCounter from './components/text-writing-tools/WordCharacterCounter';
import NotFound from './components/NotFound';
import Trusted from './components/Trusted';
import WorkYourWay from './components/WorkYourWay';


function App() {
  return (
    <>
      <div className="App">
        {/* Navbar always visible */}
        <Nav />

        {/* Define routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          {/* Audio Music Tools */}
          <Route path="/speechToText" element={<SpeechToText />} />
          <Route path="/textToSpeech" element={<TextToSpeech />} />
          {/* Image Tools */}
          <Route path="/backgroundBlur" element={<BackgroundBlur />} />
          <Route path="/imageToPdf" element={<Navigate to="/" replace />} />
          <Route path="/imageCompressor" element={<ImageCompressor />} />
          <Route path="/imageResizer" element={<ImageResizer />} />
          <Route path="/imageToWebp" element={<ImageToWebP />} />
          <Route path="/jpegToPng" element={<JpegToPng />} />
          <Route path="/memeGenerator" element={<MemeGenerator />} />
          <Route path="/png-jpg-converter" element={<PngToJpg />} />
          <Route path="/pngTransparentBackground" element={<PngTransparentBackgroundRemover />} />
          {/* PDF Document tools */}
          <Route path="/pdfCompressor" element={<PdfCompressor />} />
          <Route path="/pdfMerge" element={<PdfMerge />} />
          <Route path="/pdfSplit" element={<PdfSplit />} />
          <Route path="/pdfToWord" element={<PdfTOWord />} />
          <Route path="/pdfWatermarkAdder" element={<PdfWatermarkAdder />} />
          <Route path="/digitalSignature" element={<DigitalSignature />} />
          <Route path="/wordTOPdf" element={<WordTOPdf />} />
          {/* Design Color And Branding */}
          <Route path="/colorContrast" element={<ColorContrastChecker />} />
          <Route path="/faviconGenerator" element={<FaviconGenerator />} />
          <Route path="/gradientCssGenerator" element={<GradientCssGenerator />} />
          {/* Misc-Fun-Niche */}
          <Route path="/barcodeGenerator" element={<BarcodeGenerator />} />
          <Route path="/countdownTimer" element={<CountdownTimer />} />
          <Route path="/dailyQuoteWidget" element={<DailyQuoteWidget />} />
          <Route path="/emojiCounter" element={<EmojiCounter />} />
          <Route path="/fakeNameGenerator" element={<FakeNameGenerator />} />
          <Route path="/randomPwdGenerator" element={<RandomPwdGenerator />} />
          <Route path="/usernameGenerator" element={<UsernameGenerator />} />
          <Route path="/weatherWidget" element={<WeatherWidget />} />
          {/* Finance Conversion calculator */}
          <Route path="/ageCalculator" element={<AgeCalculator />} />
          <Route path="/bmiCalculator" element={<BmiCalculator />} />
          <Route path="/currencyConverter" element={<CurrencyConverter />} />
          <Route path="/loanCalculator" element={<LoanCalculator />} />
          <Route path="/tipAndSplitBill" element={<TipAndSplitBill />} />
          <Route path="/unitConverter" element={<UnitConverter />} />
          <Route path="/vatGstCalculator" element={<VatGstCalculator />} />
          {/* Networking online Tools */}
          <Route path="/internetSpeedChecker" element={<InternetSpeedChecker />} />
          {/* Productivity dev tools */}
          <Route path="/base64EncoderDecoder" element={<Base64EncoderAndDecoder />} />
          <Route path="/jwtDecoder" element={<JwtDecoder />} />
          <Route path="/timestampConverter" element={<TimestampConverter />} />
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
          <Route path="/hashGenerator" element={<HashGenerator />} />
          <Route path="/pwdStrengthChecker" element={<PwdStrengthChecker />} />
          <Route path="/textEncryptDecrypt" element={<TextEncryptDecrypt />} />
          <Route path="/twoFactorGenerator" element={<TwoFactorGenerator />} />
          {/* SEO website tools */}
          <Route path="/brokenLinkChecker" element={<BrokenLinkChecker />} />
          <Route path="/websiteSpeedTest" element={<WebsiteSpeedTest />} />
          {/* Social media profile tools */}
          <Route path="/hashtagGenerator" element={<HashtagGenerator />} />
          {/* Text writing tools */}
          <Route path="/caseConverter" element={<CaseConverter />} />
          <Route path="/loremIpsumGenerator" element={<LoremIpsumGenerator />} />
          <Route path="/textDiffChecker" element={<TextDiffChecker />} />
          <Route path="/markdownToHtml" element={<MarkdownToHtmlConverter />} />
          <Route path="/readabilityScoreAnalyzer" element={<ReadabilityScoreAnalyzer />} />
          <Route path="/wordCharacterCounter" element={<WordCharacterCounter />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WorkYourWay/>
        <Trusted/>
        <Footer />
        <CookieConsent />
      </div>
    </>
  );
}

export default App;
