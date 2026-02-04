# ResumeDEX - AI Resume Optimizer

A modern, responsive web application that optimizes resumes using AI to match job descriptions and improve ATS scores.

![ResumeDEX](https://img.shields.io/badge/React-18.3.1-blue) ![Vite](https://img.shields.io/badge/Vite-5.1.0-646CFF) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0.3-pink)

## Features

✨ **Modern UI/UX**

- Clean, professional SaaS-style interface
- Deep navy & emerald color palette
- Smooth animations with Framer Motion
- Fully responsive design (mobile, tablet, desktop)

📄 **Resume Upload**

- Drag-and-drop PDF upload
- File preview with size display
- PDF validation

📊 **Intelligent Analysis**

- ATS match score with visual progress indicator
- Optimized resume bullets tailored to job description
- Detailed recommendations and analysis

🔧 **Easy Configuration**

- Simple webhook URL setup via environment variables
- Error handling with retry functionality
- Loading states for better UX

## Tech Stack

- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **Framer Motion** - Smooth animations
- **Custom CSS** - Distinctive design system

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm or yarn package manager
- n8n webhook endpoint for AI processing

## Installation

1. **Clone or navigate to the project directory:**

\`\`\`bash
cd ResumeDEX
\`\`\`

2. **Install dependencies:**

\`\`\`bash
npm install
\`\`\`

3. **Configure environment variables:**

Create a \`.env\` file in the root directory:

\`\`\`bash
cp .env.example .env
\`\`\`

Edit the \`.env\` file and add your n8n webhook URL:

\`\`\`env
VITE_WEBHOOK_URL=https://your-n8n-instance.com/webhook/resume-optimizer
\`\`\`

## Development

Start the development server:

\`\`\`bash
npm run dev
\`\`\`

The app will open automatically at \`http://localhost:3000\`

## Build for Production

Create an optimized production build:

\`\`\`bash
npm run build
\`\`\`

Preview the production build:

\`\`\`bash
npm run preview
\`\`\`

## API Integration

### Webhook Configuration

The application sends a POST request to your configured n8n webhook with the following payload:

\`\`\`json
{
"resume": "data:application/pdf;base64,...",
"resumeName": "john_doe_resume.pdf",
"jobDescription": "Job description text...",
"timestamp": "2026-01-20T01:30:00.000Z"
}
\`\`\`

### Expected Response Format

Your n8n webhook should return a JSON response in this format:

\`\`\`json
{
"optimizedBullets": [
"Led cross-functional teams to deliver 3 major projects ahead of schedule",
"Implemented automated testing reducing bug reports by 45%",
"Mentored 5 junior developers improving team productivity"
],
"atsScore": 85,
"explanation": "Your resume demonstrates strong alignment with the job requirements. The optimized bullets highlight quantifiable achievements and use keywords from the job description. Consider adding more specific metrics to further strengthen your application."
}
\`\`\`

**Field Descriptions:**

- \`optimizedBullets\` (array of strings): Enhanced resume bullet points
- \`atsScore\` (number 0-100): ATS compatibility score
- \`explanation\` (string): Analysis and recommendations

## Project Structure

\`\`\`
ResumeDEX/
├── src/
│ ├── components/
│ │ ├── UploadForm.jsx # File upload & job description form
│ │ ├── UploadForm.css
│ │ ├── ResultsDisplay.jsx # Results visualization
│ │ ├── ResultsDisplay.css
│ │ ├── ProgressBar.jsx # Circular ATS score indicator
│ │ ├── ProgressBar.css
│ │ ├── LoadingOverlay.jsx # Loading state component
│ │ ├── LoadingOverlay.css
│ │ ├── ErrorMessage.jsx # Error handling component
│ │ └── ErrorMessage.css
│ ├── utils/
│ │ └── api.js # API integration utilities
│ ├── App.jsx # Main application component
│ ├── main.jsx # React entry point
│ └── index.css # Global styles & design system
├── index.html # HTML template
├── vite.config.js # Vite configuration
├── package.json # Dependencies
├── .env.example # Environment variable template
└── README.md # This file
\`\`\`

## Design System

### Colors

- **Primary**: Deep Navy (#0A1628, #0f1f3a, #1a2f4d)
- **Accent**: Emerald (#10b981, #34d399)
- **Text**: Slate shades for hierarchy

### Typography

- **Headings**: Outfit (Google Fonts)
- **Body**: DM Sans (Google Fonts)

### Key Design Principles

- Layered backgrounds with subtle gradients
- Purposeful animations that enhance UX
- High contrast for accessibility (WCAG AA)
- Responsive breakpoints at 768px

## Customization

### Change Webhook URL

Edit \`.env\` file:
\`\`\`env
VITE_WEBHOOK_URL=your_new_webhook_url
\`\`\`

### Modify Colors

Edit CSS variables in \`src/index.css\`:
\`\`\`css
:root {
--color-emerald-500: #10b981;
--color-navy-950: #0A1628;
/_ ... other colors _/
}
\`\`\`

### Adjust Animations

Modify Framer Motion variants in component files or disable via:
\`\`\`css
/_ In index.css - respects user preferences _/
@media (prefers-reduced-motion: reduce) {
/_ Animations are automatically reduced _/
}
\`\`\`

## Troubleshooting

### Webhook URL Not Configured

**Error:** "Webhook URL not configured..."

**Solution:** Create a \`.env\` file with \`VITE_WEBHOOK_URL\` set to your n8n webhook endpoint.

### PDF Upload Not Working

**Issue:** Only PDF files are accepted.

**Solution:** Ensure your file has a \`.pdf\` extension and is a valid PDF document.

### CORS Errors

**Issue:** Browser blocking requests to webhook.

**Solution:** Configure CORS headers on your n8n webhook to allow requests from your frontend domain.

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

---

Built with ❤️ for professionals seeking their next opportunity
