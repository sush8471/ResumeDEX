import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressBar from './ProgressBar';
import BulletSnippet from './BulletSnippet';
import ATSBreakdown from './ATSBreakdown';
import './ResultsDisplay.css';
import './ScoreSection.css';

const ResultsDisplay = ({ results }) => {
  const { 
    optimizedBullets, 
    atsScore, 
    explanation,
    originalBullets = [],
    matchedKeywords,
    totalKeywords,
    missingSkills = []
  } = results;

  const [activeTab, setActiveTab] = useState('adjustments');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getScoreMessage = (score) => {
    if (score >= 80) return "Excellent Match!";
    if (score >= 60) return "Good Match!";
    return "Needs Improvement";
  };

  const getScoreDescription = (score) => {
    if (score >= 80) return "Your resume is highly optimized for the target role. We found a few more tweaks to boost your impact.";
    if (score >= 60) return "Your resume shows good alignment. Consider the suggested improvements to strengthen your application.";
    return "Your resume could benefit from better keyword alignment and impactful phrasing.";
  };

  return (
    <div className="results-page">
      {/* Unified Score Section with Header */}
      <motion.div 
        className="score-section-unified"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Top Bar with Back and Export */}
        <div className="score-top-bar">
          <button className="back-btn-minimal" onClick={() => window.location.reload()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <span className="results-label">Results</span>
          <button className="export-btn-minimal">Export</button>
        </div>

        {/* Main Score Content */}
        <div className="score-main-content">
          {/* Circular Score */}
          <div className="score-circle-wrapper">
            <svg width="240" height="240" viewBox="0 0 240 240" className="score-svg">
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={atsScore >= 75 ? '#10b981' : atsScore >= 50 ? '#f59e0b' : '#ef4444'} />
                  <stop offset="100%" stopColor={atsScore >= 75 ? '#34d399' : atsScore >= 50 ? '#fbbf24' : '#f87171'} />
                </linearGradient>
              </defs>
              
              {/* Background circle */}
              <circle
                cx="120"
                cy="120"
                r="95"
                fill="none"
                stroke="rgba(148, 163, 184, 0.12)"
                strokeWidth="16"
              />
              
              {/* Animated progress circle */}
              <motion.circle
                cx="120"
                cy="120"
                r="95"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 95}
                strokeDashoffset={2 * Math.PI * 95}
                animate={{ 
                  strokeDashoffset: 2 * Math.PI * 95 * (1 - atsScore / 100)
                }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                transform="rotate(-90 120 120)"
              />
            </svg>
            
            {/* Score text overlay - Horizontal Compact */}
            <div className="score-overlay">
              <motion.div
                className="score-overlay-content"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="score-horizontal">
                  <span className="score-number-compact">{atsScore}</span>
                  <span className="score-fraction-compact">/100</span>
                </div>
                <div className="score-label-compact">ATS SCORE</div>
              </motion.div>
            </div>
          </div>

          {/* Score Text */}
          <div className="score-content">
            <h2 className="score-title">{getScoreMessage(atsScore)}</h2>
            <p className="score-desc">{getScoreDescription(atsScore)}</p>
            
            {/* ATS Score Breakdown */}
            <ATSBreakdown 
              matchedKeywords={matchedKeywords}
              totalKeywords={totalKeywords}
              missingSkills={missingSkills}
            />
            
            {/* Trust Disclaimer */}
            <p className="trust-disclaimer">
              ATS scores are estimates based on keyword alignment and do not guarantee hiring outcomes.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="tabs-container">
        <button 
          className={`tab ${activeTab === 'adjustments' ? 'active' : ''}`}
          onClick={() => setActiveTab('adjustments')}
        >
          Adjustments
        </button>
        <button 
          className={`tab ${activeTab === 'insights' ? 'active' : ''}`}
          onClick={() => setActiveTab('insights')}
        >
          AI Insights
        </button>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'adjustments' && (
          <motion.div
            key="adjustments"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="tab-content"
          >
            {/* Experience Section */}
            <div className="section-block">
              <div className="section-header">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
                EXPERIENCE SECTION
              </div>

              {optimizedBullets.length === 0 ? (
                <div className="no-data-message">
                  <p>No optimized bullets available. Check console for details.</p>
                </div>
              ) : (
                optimizedBullets.map((bullet, index) => {
                  const original = originalBullets[index];
                  const hasOriginal = original && original.trim().length > 0;

                  return (
                    <BulletSnippet
                      key={index}
                      text={bullet}
                      showBefore={hasOriginal}
                      beforeText={original}
                      hasImpact={hasOriginal}
                    />
                  );
                })
              )}
            </div>

            {/* Keywords Section if available */}
            {missingSkills.length > 0 && (
              <div className="section-block">
                <div className="section-header">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 20h9"/>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                  SKILLS SECTION
                </div>

                <div className="skill-suggestions">
                  <p className="suggestion-text">Consider adding these skills from the job description:</p>
                  <div className="skill-tags">
                    {missingSkills.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="12" y1="5" x2="12" y2="19"/>
                          <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'insights' && (
          <motion.div
            key="insights"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="tab-content"
          >
            <div className="insights-content">
              <h3 className="insights-title">AI Analysis</h3>
              <p className="insights-text">{explanation}</p>

              {(matchedKeywords !== undefined && totalKeywords !== undefined) && (
                <div className="keyword-stats">
                  <div className="stat-item">
                    <div className="stat-label">Matched Keywords</div>
                    <div className="stat-value">{matchedKeywords} / {totalKeywords}</div>
                  </div>
                  <div className="stat-progress">
                    <div 
                      className="stat-progress-fill" 
                      style={{ width: `${(matchedKeywords / totalKeywords) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResultsDisplay;
