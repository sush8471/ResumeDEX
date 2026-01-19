# Quick Start Guide

## Prerequisites Check

Before starting, ensure you have:

- [ ] Node.js installed (v16 or higher)
- [ ] npm package manager
- [ ] n8n webhook endpoint ready

## Installation Steps

### 1. Install Node.js (if not already installed)

**Download from:** https://nodejs.org/

**Verify installation:**

```bash
node --version
npm --version
```

### 2. Install Project Dependencies

Open PowerShell in the project directory and run:

```bash
cd c:\Users\Lenovo\Documents\Projects\ResumeDEX
npm install
```

This will install:

- React 18.3.1
- Vite 5.1.0
- Framer Motion 11.0.3
- All development dependencies

### 3. Configure Webhook URL

Create a `.env` file by copying the example:

```bash
cp .env.example .env
```

Open `.env` and replace with your actual webhook:

```env
VITE_WEBHOOK_URL=https://your-actual-n8n-instance.com/webhook/resume-optimizer
```

### 4. Start Development Server

```bash
npm run dev
```

The app will automatically open at: **http://localhost:3000**

---

## n8n Webhook Setup

Your n8n workflow should:

1. **Accept POST request** with this payload:

```json
{
  "resume": "data:application/pdf;base64,...",
  "resumeName": "filename.pdf",
  "jobDescription": "Job description text...",
  "timestamp": "2026-01-20T01:30:00.000Z"
}
```

2. **Return JSON response** in this format:

```json
{
  "optimizedBullets": ["Bullet point 1", "Bullet point 2", "Bullet point 3"],
  "atsScore": 85,
  "explanation": "Detailed analysis and recommendations..."
}
```

---

## Testing the Application

### 1. Upload a Resume

- Drag and drop a PDF file, or click to browse
- Only `.pdf` files are accepted

### 2. Enter Job Description

- Paste the full job description in the textarea
- Both fields are required

### 3. Submit

- Click "Optimize Resume" button
- Watch for loading animation
- View results in three sections

### 4. Error Testing

- Try without uploading a file
- Try without job description
- Test with invalid webhook URL

---

## Building for Production

Create optimized production build:

```bash
npm run build
```

Output will be in the `dist/` folder.

Preview production build locally:

```bash
npm run preview
```

---

## Deployment Options

### Option 1: Vercel (Recommended)

```bash
npm install -g vercel
vercel --prod
```

### Option 2: Netlify

1. Run `npm run build`
2. Drag `dist/` folder to https://app.netlify.com/drop

### Option 3: GitHub Pages

1. Push code to GitHub
2. Configure GitHub Actions workflow for deployment
3. Set up Pages in repository settings

---

## Troubleshooting

**Issue:** `npm: command not found`  
**Solution:** Install Node.js from https://nodejs.org/

**Issue:** Webpack URL not configured error  
**Solution:** Create `.env` file with `VITE_WEBHOOK_URL`

**Issue:** CORS errors in browser console  
**Solution:** Configure CORS headers on your n8n webhook

**Issue:** PDF upload not working  
**Solution:** Ensure file is valid PDF with `.pdf` extension

---

## Next Steps

1. ✅ Install Node.js if needed
2. ✅ Run `npm install`
3. ✅ Create `.env` with your webhook URL
4. ✅ Run `npm run dev` to test locally
5. ✅ Deploy to production when ready

**Need help?** Check the [README.md](file:///c:/Users/Lenovo/Documents/Projects/ResumeDEX/README.md) for detailed documentation.
