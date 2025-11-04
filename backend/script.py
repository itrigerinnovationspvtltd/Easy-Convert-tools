import sys
import os
from PIL import Image

# Get uploaded file path from Node
input_path = sys.argv[1]
output_dir = os.path.join(os.path.dirname(__file__), "output")
os.makedirs(output_dir, exist_ok=True)

base_name, ext = os.path.splitext(os.path.basename(input_path))
ext = ext.lower()

try:
    img = Image.open(input_path)

    # 🧠 Logic: if JPG → convert to PNG | else → convert to JPG
    if ext in [".jpg", ".jpeg"]:
        output_format = "PNG"
        output_path = os.path.join(output_dir, f"{base_name}_converted.png")
        img.save(output_path, output_format)
    else:
        output_format = "JPEG"
        img = img.convert("RGB")  # ensure no alpha for JPG
        output_path = os.path.join(output_dir, f"{base_name}_converted.jpg")
        img.save(output_path, output_format, quality=95)

    # ✅ Print only the path (Node will use this to download)
    print(output_path)

except Exception as e:
    print("Python Error:", e)

sys.stdout.flush()
