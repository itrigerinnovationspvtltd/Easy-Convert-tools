import sys
import os
import zipfile
from PIL import Image, ImageFilter
from docx import Document
from fpdf import FPDF
from pdf2docx import Converter

try:
    from pypdf import PdfReader, PdfWriter
except ImportError:
    PdfReader = PdfWriter = None

output_dir = os.path.join(os.path.dirname(__file__), "output")
os.makedirs(output_dir, exist_ok=True)

# For images-to-pdf: argv[1]=images-to-pdf, argv[2:]=image paths
if len(sys.argv) >= 3 and sys.argv[1] == "images-to-pdf":
    tmp_to_remove = []
    try:
        from reportlab.lib.pagesizes import letter
        from reportlab.pdfgen import canvas
        raw_paths = [os.path.abspath(p) for p in sys.argv[2:] if os.path.exists(p)]
        if not raw_paths:
            print("ERROR:No valid image files")
            sys.exit(1)
        out_path = os.path.join(output_dir, "images-to-pdf.pdf")
        page_w, page_h = letter
        margin = 40
        c = canvas.Canvas(out_path, pagesize=letter)
        for i, img_path in enumerate(raw_paths):
            img = Image.open(img_path)
            iw, ih = img.size
            if img.mode in ("RGBA", "P"):
                tmp = os.path.join(output_dir, f"_tmp_img_{i}.jpg")
                img.convert("RGB").save(tmp, "JPEG", quality=95)
                img.close()
                img_path = tmp
                tmp_to_remove.append(tmp)
            avail_w, avail_h = page_w - 2 * margin, page_h - 2 * margin
            scale = min(avail_w / iw, avail_h / ih, 1.0)
            draw_w, draw_h = iw * scale, ih * scale
            x = margin + (avail_w - draw_w) / 2
            y = page_h - margin - draw_h
            c.drawImage(img_path, x, y, width=draw_w, height=draw_h)
            c.showPage()
        c.save()
        for t in tmp_to_remove:
            try:
                os.remove(t)
            except Exception:
                pass
        print(out_path)
    except Exception as e:
        for t in tmp_to_remove:
            try:
                os.remove(t)
            except Exception:
                pass
        print(f"ERROR:{e}")
    sys.exit(0)

# For merge: argv[1]=merge, argv[2:]=file paths
if len(sys.argv) >= 3 and sys.argv[1] == "merge":
    try:
        paths = sys.argv[2:]
        merger = PdfWriter()
        for p in paths:
            if os.path.exists(p):
                merger.append(p)
        out_path = os.path.join(output_dir, "merged.pdf")
        merger.write(out_path)
        merger.close()
        print(out_path)
    except Exception as e:
        print(f"ERROR:{e}")
    sys.exit(0)

input_path = sys.argv[1]
conversion_type = sys.argv[2]
watermark_text = sys.argv[3] if len(sys.argv) > 3 else ""

base_name = os.path.splitext(os.path.basename(input_path))[0]

try:
    if conversion_type == "image-to-png":
        output_path = os.path.join(output_dir, f"{base_name}_converted.png")
        img = Image.open(input_path)
        img.save(output_path, "PNG")

    elif conversion_type == "image-to-jpg":
        output_path = os.path.join(output_dir, f"{base_name}_converted.jpg")
        img = Image.open(input_path).convert("RGB")
        img.save(output_path, "JPEG")

    elif conversion_type == "pdf-to-word":
        output_path = os.path.join(output_dir, f"{base_name}_converted.docx")
        cv = Converter(input_path)
        cv.convert(output_path, start=0, end=None)
        cv.close()
        if not os.path.exists(output_path):
            raise Exception("PDF → Word conversion failed")

    elif conversion_type == "word-to-pdf":
        output_path = os.path.join(output_dir, f"{base_name}_converted.pdf")
        doc = Document(input_path)
        pdf = FPDF()
        pdf.set_auto_page_break(auto=True, margin=15)
        pdf.add_page()
        pdf.set_font("Arial", size=12)
        for para in doc.paragraphs:
            pdf.multi_cell(0, 10, para.text)
        pdf.output(output_path)
        if not os.path.exists(output_path):
            raise Exception("Word → PDF conversion failed")

    elif conversion_type == "image-compress":
        output_path = os.path.join(output_dir, f"{base_name}_compressed.jpg")
        img = Image.open(input_path)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        img.save(output_path, "JPEG", quality=85, optimize=True)

    elif conversion_type.startswith("image-resize"):
        parts = conversion_type.split("|")
        w = int(parts[1]) if len(parts) > 1 else 800
        h = int(parts[2]) if len(parts) > 2 else 600
        output_path = os.path.join(output_dir, f"{base_name}_resized.jpg")
        img = Image.open(input_path)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        img.thumbnail((w, h), Image.Resampling.LANCZOS)
        img.save(output_path, "JPEG", quality=90)

    elif conversion_type == "image-blur":
        radius = 10
        if "|" in conversion_type:
            try:
                radius = int(conversion_type.split("|")[1])
            except (IndexError, ValueError):
                pass
        output_path = os.path.join(output_dir, f"{base_name}_blurred.jpg")
        img = Image.open(input_path)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        img = img.filter(ImageFilter.GaussianBlur(radius=min(radius, 25)))
        img.save(output_path, "JPEG", quality=90)

    elif conversion_type == "image-to-webp":
        output_path = os.path.join(output_dir, f"{base_name}_converted.webp")
        img = Image.open(input_path)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGBA")
        else:
            img = img.convert("RGB")
        img.save(output_path, "WEBP", quality=85)

    elif conversion_type == "pdf-compress":
        if PdfReader is None or PdfWriter is None:
            raise Exception("pypdf not installed. Run: pip install pypdf")
        output_path = os.path.join(output_dir, f"{base_name}_compressed.pdf")
        reader = PdfReader(input_path)
        writer = PdfWriter()
        writer.append(reader)
        if reader.metadata:
            writer.add_metadata(reader.metadata)
        with open(output_path, "wb") as f:
            writer.write(f)
        if not os.path.exists(output_path):
            raise Exception("PDF compression failed")

    elif conversion_type == "pdf-split":
        if PdfReader is None or PdfWriter is None:
            raise Exception("pypdf not installed. Run: pip install pypdf")
        reader = PdfReader(input_path)
        zip_path = os.path.join(output_dir, f"{base_name}_split.zip")
        with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
            for i, page in enumerate(reader.pages):
                writer = PdfWriter()
                writer.add_page(page)
                part_path = os.path.join(output_dir, f"{base_name}_page_{i + 1}.pdf")
                with open(part_path, "wb") as f:
                    writer.write(f)
                zf.write(part_path, os.path.basename(part_path))
                os.remove(part_path)
        output_path = zip_path

    elif conversion_type == "pdf-watermark":
        if PdfReader is None or PdfWriter is None:
            raise Exception("pypdf not installed. Run: pip install pypdf")
        try:
            from reportlab.pdfgen import canvas
            from reportlab.lib.pagesizes import letter
            from io import BytesIO
            text = (watermark_text or "CONFIDENTIAL").strip()
            buf = BytesIO()
            c = canvas.Canvas(buf, pagesize=letter)
            c.setFont("Helvetica", 40)
            c.setFillColorRGB(0.7, 0.7, 0.7, 0.5)
            c.saveState()
            c.translate(300, 400)
            c.rotate(45)
            c.drawString(0, 0, text)
            c.restoreState()
            c.save()
            buf.seek(0)
            watermark_pdf = PdfReader(buf)
            reader = PdfReader(input_path)
            writer = PdfWriter()
            for page in reader.pages:
                page.merge_page(watermark_pdf.pages[0])
                writer.add_page(page)
            output_path = os.path.join(output_dir, f"{base_name}_watermarked.pdf")
            with open(output_path, "wb") as f:
                writer.write(f)
        except ImportError:
            raise Exception("reportlab required for PDF watermark. Run: pip install reportlab")

    elif conversion_type == "png-remove-bg":
        # Color-based transparency: make white/light pixels transparent
        img = Image.open(input_path).convert("RGBA")
        data = img.getdata()
        threshold = 245
        new_data = []
        for item in data:
            r, g, b, a = item
            if r > threshold and g > threshold and b > threshold:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
        img.putdata(new_data)
        output_path = os.path.join(output_dir, f"{base_name}_nobg.png")
        img.save(output_path, "PNG")

    else:
        raise ValueError(f"Unknown conversion type: {conversion_type}")

    print(output_path)

except Exception as e:
    print(f"ERROR: {e}")

sys.stdout.flush()
