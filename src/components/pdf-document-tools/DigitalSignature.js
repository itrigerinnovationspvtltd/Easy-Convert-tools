import React, { useState, useRef, useEffect } from "react";
import { FaPenFancy, FaFont, FaTrashAlt, FaDownload } from "react-icons/fa";

const SIGNATURE_FONTS = [
  { name: "Dancing Script", value: "'Dancing Script', cursive" },
  { name: "Great Vibes", value: "'Great Vibes', cursive" },
  { name: "Pacifico", value: "'Pacifico', cursive" },
  { name: "Allura", value: "'Allura', cursive" },
  { name: "Parisienne", value: "'Parisienne', cursive" },
  { name: "Scriptina", value: "'Dancing Script', cursive" },
  { name: "Serif", value: "Georgia, serif" },
  { name: "Sans", value: "Arial, sans-serif" },
];

const COLORS = [
  { label: "Black", value: "#000000" },
  { label: "Dark blue", value: "#1e3a8a" },
  { label: "Blue", value: "#2563eb" },
  { label: "Dark gray", value: "#374151" },
];

const DigitalSignature = () => {
  const [mode, setMode] = useState("draw"); // draw | type
  const [typedText, setTypedText] = useState("");
  const [font, setFont] = useState(SIGNATURE_FONTS[0].value);
  const [color, setColor] = useState("#000000");
  const [thickness, setThickness] = useState(2);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const typePreviewRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 150;

  useEffect(() => {
    if (typeof document !== "undefined") {
      const link = document.createElement("link");
      link.href = "https://fonts.googleapis.com/css2?family=Allura&family=Dancing+Script:wght@400;700&family=Great+Vibes&family=Pacifico&family=Parisienne&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
  }, []);

  const getCtx = () => canvasRef.current?.getContext("2d");

  const clearCanvas = () => {
    const ctx = getCtx();
    if (!ctx) return;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  };

  useEffect(() => {
    if (mode === "draw" && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      }
    }
  }, [mode]);

  const getPos = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDraw = (e) => {
    e.preventDefault();
    if (mode !== "draw") return;
    setIsDrawing(true);
    const { x, y } = getPos(e);
    const ctx = getCtx();
    if (!ctx) return;
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing || mode !== "draw") return;
    const { x, y } = getPos(e);
    const ctx = getCtx();
    if (!ctx) return;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = (e) => {
    e.preventDefault();
    setIsDrawing(false);
  };

  const hasSignature = () => {
    if (mode === "draw") {
      const ctx = getCtx();
      if (!ctx || !canvasRef.current) return false;
      const imageData = ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      const d = imageData.data;
      for (let i = 0; i < d.length; i += 4) {
        const [r, g, b, a] = [d[i], d[i + 1], d[i + 2], d[i + 3]];
        if (a > 0 && (r < 255 || g < 255 || b < 255)) return true;
      }
      return false;
    }
    return typedText.trim().length > 0;
  };

  const dataURLtoBlob = (dataURL) => {
    const parts = dataURL.split(",");
    const mime = parts[0].match(/:(.*?);/)?.[1] || "image/png";
    const bstr = atob(parts[1] || "");
    const u8arr = new Uint8Array(bstr.length);
    for (let i = 0; i < bstr.length; i++) u8arr[i] = bstr.charCodeAt(i);
    return new Blob([u8arr], { type: mime });
  };

  const getSignatureDataUrl = () => {
    if (mode === "type") {
      const canvas = document.createElement("canvas");
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = color;
      ctx.font = `48px ${font}`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillText(typedText.trim(), CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
      return canvas.toDataURL("image/png");
    }
    return canvasRef.current?.toDataURL("image/png") || "";
  };

  const download = () => {
    if (!hasSignature()) return;
    const dataUrl = getSignatureDataUrl();
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.download = "signature.png";
    link.href = dataUrl;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = async () => {
    if (!hasSignature()) return;
    try {
      const dataUrl = getSignatureDataUrl();
      const blob = dataURLtoBlob(dataUrl);
      if (navigator.clipboard && navigator.clipboard.write) {
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        const fallback = document.createElement("textarea");
        fallback.value = "Signature copied - paste into image editor";
        document.body.appendChild(fallback);
        fallback.select();
        document.execCommand("copy");
        document.body.removeChild(fallback);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      const fallback = document.createElement("textarea");
      fallback.value = "Use Download PNG instead - Clipboard API may be restricted";
      document.body.appendChild(fallback);
      fallback.select();
      try {
        document.execCommand("copy");
      } catch (_) {}
      document.body.removeChild(fallback);
    }
  };

  return (
    <div className="tool-section">
      <h1 className="tool-section-title">Digital Signature</h1>
      <p className="tool-section-desc">
        Create your signature like DocuSign. Draw with your mouse or type your name. Download as PNG for documents.
      </p>

      <div className="w-full max-w-2xl space-y-6">
        {/* Mode toggle */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMode("draw")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
              mode === "draw" ? "btn-gradient text-white" : "btn-secondary"
            }`}
          >
            <FaPenFancy /> Draw
          </button>
          <button
            type="button"
            onClick={() => setMode("type")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
              mode === "type" ? "btn-gradient text-white" : "btn-secondary"
            }`}
          >
            <FaFont /> Type
          </button>
        </div>

        {/* Options */}
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="input-label">Color</label>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  className={`w-9 h-9 rounded-lg border-2 transition-all ${
                    color === c.value ? "border-brand-500 scale-110" : "border-gray-200 hover:border-gray-300"
                  }`}
                  style={{ backgroundColor: c.value }}
                  title={c.label}
                />
              ))}
            </div>
          </div>
          {mode === "draw" && (
            <div>
              <label className="input-label">Pen thickness</label>
              <input
                type="range"
                min="1"
                max="6"
                value={thickness}
                onChange={(e) => setThickness(Number(e.target.value))}
                className="w-24 h-2"
              />
              <span className="ml-2 text-sm text-gray-500">{thickness}px</span>
            </div>
          )}
          {mode === "type" && (
            <div>
              <label className="input-label">Font style</label>
              <select value={font} onChange={(e) => setFont(e.target.value)} className="input-field min-w-[160px]">
                {SIGNATURE_FONTS.map((f) => (
                  <option key={f.value} value={f.value}>{f.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Signature area */}
        <div className="card-tool p-6">
          {mode === "draw" ? (
            <>
              <div className="flex justify-between items-center mb-3">
                <label className="input-label mb-0">Draw your signature</label>
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="btn-secondary py-1.5 px-3 text-sm flex items-center gap-1"
                >
                  <FaTrashAlt /> Clear
                </button>
              </div>
              <div className="border-2 border-dashed border-gray-200 rounded-xl overflow-hidden bg-white">
                <canvas
                  ref={canvasRef}
                  width={CANVAS_WIDTH}
                  height={CANVAS_HEIGHT}
                  onMouseDown={startDraw}
                  onMouseMove={draw}
                  onMouseUp={stopDraw}
                  onMouseLeave={stopDraw}
                  onTouchStart={startDraw}
                  onTouchMove={draw}
                  onTouchEnd={stopDraw}
                  className="w-full max-w-full touch-none cursor-crosshair block"
                  style={{ maxHeight: CANVAS_HEIGHT }}
                />
              </div>
            </>
          ) : (
            <>
              <label className="input-label">Type your name</label>
              <input
                type="text"
                value={typedText}
                onChange={(e) => setTypedText(e.target.value)}
                placeholder="John Smith"
                className="input-field text-2xl"
                style={{ fontFamily: font }}
              />
              <div
                ref={typePreviewRef}
                className="mt-4 p-6 border-2 border-dashed border-gray-200 rounded-xl bg-white min-h-[120px] flex items-center justify-center"
              >
                {typedText ? (
                  <span style={{ fontFamily: font, fontSize: 48, color }}>{typedText}</span>
                ) : (
                  <span className="text-gray-400">Preview</span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={download}
            disabled={!hasSignature()}
            className="btn-gradient px-6 py-2.5 rounded-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaDownload /> Download PNG
          </button>
          <button
            onClick={copyToClipboard}
            disabled={!hasSignature()}
            className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {copied ? "Copied!" : "Copy image"}
          </button>
        </div>

        <p className="text-sm text-gray-500">
          Your signature is created locally. Use the downloaded PNG to add to PDFs, documents, or contracts.
        </p>
      </div>
    </div>
  );
};

export default DigitalSignature;
