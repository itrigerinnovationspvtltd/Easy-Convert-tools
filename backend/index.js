import express from "express";
import multer from "multer";
import cors from "cors";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PYTHON = process.platform === "win32" ? "python" : "python3";

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
if (process.env.FRONTEND_URL) allowedOrigins.push(process.env.FRONTEND_URL);
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

const uploadDir = path.join(__dirname, "uploads");
fs.mkdirSync(uploadDir, { recursive: true });
const upload = multer({ dest: uploadDir });

app.get("/", (req, res) => {
  res.send("✅ Backend server is running!");
});

app.post("/process-file", upload.single("file"), (req, res) => {
  const filePath = req.file?.path;
  const conversionType = req.body.conversionType;
  const watermarkText = req.body.watermarkText || "";

  if (!filePath || !conversionType) return res.status(400).json({ error: "Missing file or conversion type" });

  const args = [path.join(__dirname, "script.py"), filePath, conversionType];
  if (conversionType === "pdf-watermark" && watermarkText) args.push(watermarkText);
  const python = spawn(PYTHON, args);

  let pythonOutput = "";
  python.stdout.on("data", (data) => (pythonOutput += data.toString()));
  python.stderr.on("data", (data) => console.error("🐍 Python error:", data.toString()));

  python.on("close", (code) => {
    const outputPath = pythonOutput.trim();

    if (outputPath.startsWith("ERROR:")) {
      return res.status(500).json({ result: outputPath });
    }

    if (fs.existsSync(outputPath)) {
      res.download(outputPath, path.basename(outputPath));
    } else {
      res.status(500).json({ result: "Conversion failed: output file not found" });
    }
  });
});

app.post("/process-merge", upload.array("files", 20), (req, res) => {
  const files = req.files;
  if (!files || files.length < 2) return res.status(400).json({ error: "Need at least 2 PDF files to merge" });
  const paths = files.map((f) => f.path);
  const python = spawn(PYTHON, [path.join(__dirname, "script.py"), "merge", ...paths]);
  let pythonOutput = "";
  python.stdout.on("data", (data) => (pythonOutput += data.toString()));
  python.stderr.on("data", (data) => console.error("🐍 Python error:", data.toString()));
  python.on("close", () => {
    const outputPath = pythonOutput.trim();
    if (outputPath.startsWith("ERROR:")) return res.status(500).json({ result: outputPath });
    if (fs.existsSync(outputPath)) {
      res.download(outputPath, "merged.pdf");
    } else {
      res.status(500).json({ result: "Merge failed" });
    }
  });
});

app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
