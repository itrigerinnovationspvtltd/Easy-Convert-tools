/**
 * Generate a production-level download filename: GUID + date + extension
 * Example: a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d-20250221.pdf
 */
export function getProductionFilename(extension) {
  const guid =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const ext = extension.startsWith(".") ? extension : `.${extension}`;
  return `${guid}-${date}${ext}`;
}
