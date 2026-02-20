# Deployment Guide: Frontend (Vercel) + Backend (Render)

## Overview

- **Frontend:** Deploy to [Vercel](https://vercel.com)
- **Backend:** Deploy to [Render](https://render.com) (requires Node + Python)

---

## Step 1: Push Code to GitHub

```bash
git add .
git commit -m "Deploy: Vercel frontend + Render backend"
git push origin main
```

---

## Step 2: Deploy Backend on Render

1. Go to [render.com](https://render.com) → **New** → **Web Service**
2. Connect your GitHub repo (Easy-Convert-tools-Internel)
3. Configure:
   - **Name:** `easyconvert-backend`
   - **Region:** Choose nearest
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** `Docker` (select Docker since backend needs Node + Python)
   - **Instance Type:** Free

4. **Environment Variables** (add these):
   | Key           | Value                                      |
   |---------------|--------------------------------------------|
   | `FRONTEND_URL` | `https://YOUR_VERCEL_APP.vercel.app`       |
   |               | *(Add after you deploy the frontend)*      |

5. Click **Create Web Service**
6. Copy the backend URL (e.g. `https://easyconvert-backend.onrender.com`)

> **Note:** Free tier on Render spins down after inactivity; first request may take 30–60 seconds.

---

## Step 3: Deploy Frontend on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New** → **Project**
2. Import your GitHub repo
3. Configure:
   - **Framework Preset:** Create React App
   - **Root Directory:** `./` (project root)
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

4. **Environment Variables** (add these):
   | Key                 | Value                                      |
   |---------------------|--------------------------------------------|
   | `REACT_APP_API_URL` | `https://easyconvert-backend.onrender.com` |
   |                     | *(Your Render backend URL from Step 2)*    |

5. Click **Deploy**
6. Copy your Vercel URL (e.g. `https://easy-convert-tools.vercel.app`)

---

## Step 4: Add Frontend URL to Backend CORS

1. In Render Dashboard → your backend service → **Environment**
2. Add or edit:
   - **Key:** `FRONTEND_URL`
   - **Value:** `https://YOUR_VERCEL_APP.vercel.app` (your Vercel URL)
3. Redeploy the backend so CORS uses the new origin

---

## Step 5: Verify

1. Visit your Vercel URL
2. Use a tool that calls the backend (e.g. PDF Compressor, Image Compressor)
3. If you see “Connection failed”, check:
   - `REACT_APP_API_URL` on Vercel
   - `FRONTEND_URL` on Render (must match Vercel URL)
   - Backend logs in Render dashboard

---

## Environment Summary

| Service | Variable          | Example                          |
|---------|-------------------|----------------------------------|
| Render (backend) | `FRONTEND_URL` | `https://easy-convert-tools.vercel.app` |
| Vercel (frontend) | `REACT_APP_API_URL` | `https://easyconvert-backend.onrender.com` |

---

## Local Development

Create `.env` in project root:

```
REACT_APP_API_URL=http://localhost:5000
```

Create `backend/.env` (optional):

```
FRONTEND_URL=http://localhost:3000
```
