# Backend: Node.js + Python (for PDF/image conversions)
FROM node:20-bookworm

# Install Python and pip for conversion script
RUN apt-get update && apt-get install -y python3 python3-pip && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Node deps
COPY package*.json ./
RUN npm install --omit=dev

# Python deps
COPY requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000
CMD ["node", "index.js"]
