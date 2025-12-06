# LifeHub Deployment Guide

## Deploy to Render.com (FREE)

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with your GitHub account
3. Authorize Render to access your repositories

### Step 2: Deploy Backend
1. Click "New +" → "Web Service"
2. Connect your `lifehub-` repository
3. Configure:
   - **Name**: lifehub-backend
   - **Root Directory**: backend
   - **Build Command**: npm install
   - **Start Command**: node server.js
   - **Environment Variables**:
     - `MONGO_URI`: (Get free MongoDB from MongoDB Atlas)
     - `JWT_SECRET`: your-secret-key
     - `PORT`: 5000

### Step 3: Deploy Frontend
1. Click "New +" → "Static Site"
2. Connect your `lifehub-` repository
3. Configure:
   - **Name**: lifehub
   - **Root Directory**: frontend
   - **Build Command**: (leave empty)
   - **Publish Directory**: .

### Step 4: Get MongoDB Atlas (FREE)
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up and create free cluster
3. Get connection string
4. Add to Render backend environment variables

### Step 5: Update Frontend API URL
Update `frontend/js/api.js`:
```javascript
const API_BASE = 'https://lifehub-backend.onrender.com/api';
```

### Your URLs:
- **Frontend**: https://lifehub.onrender.com
- **Backend**: https://lifehub-backend.onrender.com

---

## Alternative: Vercel + Railway

### Vercel (Frontend)
```bash
npm install -g vercel
cd frontend
vercel
```

### Railway (Backend + MongoDB)
1. https://railway.app
2. Deploy from GitHub
3. Automatic MongoDB included

---

## Custom Domain (Optional)
1. Buy domain from Namecheap/GoDaddy (~$10/year)
2. Point to Render/Vercel
3. Get URL like `lifehub.com`

