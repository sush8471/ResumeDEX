import { useState } from 'react';
import { motion } from 'framer-motion';
import Typewriter from './Typewriter';
import './UploadForm.css';

const UploadForm = ({ onSubmit, isLoading }) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!resumeFile) {
      alert('Please upload a resume PDF');
      return;
    }
    
    if (!jobDescription.trim()) {
      alert('Please enter a job description');
      return;
    }
    
    onSubmit(resumeFile, jobDescription);
  };

  const removeFile = () => {
    setResumeFile(null);
  };

  return (
    <div className="upload-page">
      {/* Hero Section */}
      <motion.div 
        className="hero-section"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="hero-title">
          <Typewriter 
            texts={[
              "Land Your Dream Job",
              "Get More Interviews",
              "Beat the ATS",
              "Stand Out from Competition"
            ]}
            speed={80}
            deleteSpeed={40}
            delay={2000}
            loop={true}
          />
          <br />with AI.
        </h1>
        <p className="hero-subtitle">
          Optimize your resume for ATS systems in seconds.<br />
          10x your interview chances.
        </p>
      </motion.div>

      {/* Upload Form */}
      <motion.form 
        className="upload-form-card"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Step 1: Upload Resume */}
        <div className="form-step">
          <div className="step-header">
            <span className="step-number">1.</span>
            <span className="step-title">UPLOAD RESUME</span>
            <span className="file-type-badge">PDF Only</span>
          </div>
          
          <div 
            className={`upload-area ${dragActive ? 'drag-active' : ''} ${resumeFile ? 'has-file' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {!resumeFile ? (
              <>
                <svg className="upload-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
                  <polyline points="9 15 12 12 15 15" />
                  <line x1="12" y1="12" x2="12" y2="21" />
                </svg>
                <p className="upload-instruction">
                  <span className="upload-link">Click to upload</span> or drag and drop
                </p>
                <p className="upload-hint">Max file size 10MB</p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="file-input"
                />
              </>
            ) : (
              <div className="file-selected">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
                <div className="file-details">
                  <p className="file-name">{resumeFile.name}</p>
                  <p className="file-size">{(resumeFile.size / 1024).toFixed(2)} KB</p>
                </div>
                <button 
                  type="button" 
                  className="remove-file"
                  onClick={removeFile}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Step 2: Job Description */}
        <div className="form-step">
          <div className="step-header">
            <span className="step-number">2.</span>
            <span className="step-title">JOB DESCRIPTION</span>
          </div>
          
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here (e.g., responsibilities, requirements)..."
            className="job-description-input"
            rows="6"
            required
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="optimize-btn"
          disabled={isLoading || !resumeFile || !jobDescription.trim()}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          {isLoading ? 'Optimizing...' : 'Optimize Resume'}
        </button>
      </motion.form>

      {/* Trust Section */}
      <motion.div 
        className="trust-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p className="trust-label">TRUSTED BY PROFESSIONALS AT</p>
        <div className="company-logos">
          <span className="company-name">Google</span>
          <span className="company-name">Microsoft</span>
          <span className="company-name">Amazon</span>
          <span className="company-name">Meta</span>
        </div>
        
        <div className="social-proof">
          <div className="user-avatars">
            <div className="avatar">👤</div>
            <div className="avatar">👤</div>
            <div className="avatar">👤</div>
          </div>
          <p className="users-count">
            Join <strong>5,000+</strong> hired users
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default UploadForm;
