import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from './components/Nav';
import Home from './components/Home';
import About from './components/About';
import YoutubeToMP3 from './components/YoutubeToMP3';
import YouTubeToMP4 from './components/YouTubeToMP4';
import YouTubePlaylistDown from './components/YouTubePlaylistDown';
import TiktokDown from './components/TiktokDown';
import InstaReelDown from './components/InstaReelDown';
import FbVideoDown from './components/FbVideoDown';

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
          <Route path="/youtubeTomp3" element={<YoutubeToMP3 />} />
          <Route path="/youtubeTomp4" element={<YouTubeToMP4 />} />
          <Route path="/youtubePlaylist" element={<YouTubePlaylistDown />} />
          <Route path="/tiktokDown" element={<TiktokDown />} />
          <Route path="/instaReelDown" element={<InstaReelDown />} />
          <Route path="/fbVideoDown" element={<FbVideoDown />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
