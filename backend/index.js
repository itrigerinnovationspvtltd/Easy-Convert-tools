import express from "express";
import multer from "multer";
import cors from "cors";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: path.join(__dirname, "uploads/") });

app.get("/", (req, res) => {
  res.send("✅ Backend server is running!");
});

app.post("/process-image", upload.single("file"), (req, res) => {
  const filePath = req.file?.path;
  if (!filePath) return res.status(400).json({ error: "No file uploaded" });

  console.log("📸 Received file:", filePath);

  const python = spawn("python", [
    path.join(__dirname, "script.py"),
    filePath,
  ]);

  let output = "";
  python.stdout.on("data", (data) => {
    output += data.toString().trim();
  });

  python.stderr.on("data", (data) => {
    console.error("🐍 Python error:", data.toString());
  });

  python.on("close", (code) => {
    console.log(`🐍 Python exited with code ${code}`);
    console.log("Python output:", output);

    // ✅ Use the actual file path printed by Python
    const outputFile = output;

    if (fs.existsSync(outputFile)) {
      console.log("✅ Sending converted file:", outputFile);
      res.download(outputFile);
    } else {
      res.status(500).json({ error: "Output file not found", output });
    }
  });
});


app.listen(5000, () => console.log("✅ Backend running on port 5000"));
