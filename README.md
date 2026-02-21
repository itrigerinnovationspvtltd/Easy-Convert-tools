# Easy Convert Tools

A production-ready web app providing file converters, image tools, and utility calculators. File conversions run on a Node + Python backend; many tools run entirely client-side.

## Features

### File & Image Tools (Backend)

| Tool | Description |
|------|-------------|
| PDF Compressor | Compress PDF files |
| Word to PDF | Convert DOC/DOCX to PDF |
| PDF to Word | Convert PDF to DOCX |
| PNG to JPG / JPEG to PNG | Image format conversion |
| Image Compressor | Compress images |
| Image Resizer | Resize images by width/height |
| Image to WebP | Convert images to WebP |
| Background Blur | Apply blur to image backgrounds |

### Client-Side Tools (No Backend)

| Category | Tools |
|----------|-------|
| Text | Word & character counter, Base64 encoder/decoder |
| Data | JSON formatter, UUID generator, Hash generator (SHA-256/384/512) |
| Security | Password generator, strength checker, 2FA secret generator |
| Content | Lorem Ipsum generator, Markdown to HTML |
| Utilities | BMI calculator, Age calculator, Unit converter, Color picker |
| Developer | Regex tester, Emoji counter |

---

## Quick Start

### Prerequisites

- Node.js 18+
- Python 3.8+ (for backend file conversions)
- npm or yarn

### 1. Install Dependencies

```bash
# Frontend
npm install

# Backend
cd backend
pip install -r requirements.txt
npm install
cd ..
```

### 2. Run Locally

```bash
# Terminal 1 – Backend (port 5000)
cd backend && npm start

# Terminal 2 – Frontend (port 3000)
npm start
```

Open [http://localhost:3000](http://localhost:3000).

### 3. Production Build

```bash
npm run build
```

Output is in the `build` folder. Serve it with any static host.

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API base URL (frontend) | `http://localhost:5000` |
| `FRONTEND_URL` | Frontend URL (for CORS; backend) | `http://localhost:3000` |

Create `.env` in the project root for local development:

```env
REACT_APP_API_URL=http://localhost:5000
```

Create `.env` in `backend/` if needed:

```env
FRONTEND_URL=http://localhost:3000
```

---

## Deployment

- **Frontend:** Vercel, Netlify, or any static host (set `REACT_APP_API_URL` to your backend URL).
- **Backend:** Render, Railway, or any Node + Python environment. Set `FRONTEND_URL` for CORS.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for a step-by-step Vercel + Render setup.

---

## Project Structure

```
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── App.js
├── backend/
│   ├── index.js      # Express API
│   ├── script.py     # Python conversions (PDF, images, Word)
│   └── requirements.txt
├── package.json
└── README.md
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Production build |
| `cd backend && npm start` | Start backend API |

---

## License

MIT
