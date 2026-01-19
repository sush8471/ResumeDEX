import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressBar from './ProgressBar';
import './ResultsDisplay.css';

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
      {/* Header with Back */}
      <div className="results-header-bar">
        <button className="back-btn" onClick={() => window.location.reload()}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h2 className="results-title">Results</h2>
        <button className="export-btn">Export</button>
      </div>

      {/* ATS Score Section */}
      <motion.div 
        className="score-section"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <ProgressBar score={atsScore} size="large" />
        <h2 className="score-message">{getScoreMessage(atsScore)}</h2>
        <p className="score-description">{getScoreDescription(atsScore)}</p>
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
                    <div key={index} className="adjustment-card">
                      {hasOriginal && (
                        <div className="impact-badge">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                          </svg>
                          IMPACT BOOST
                        </div>
                      )}

                      {hasOriginal && (
                        <div className="before-text">
                          <span className="label">BEFORE</span>
                          <p className="strikethrough">{original}</p>
                        </div>
                      )}

                      <div className="optimized-text">
                        {hasOriginal && <span className="label">OPTIMIZED</span>}
                        <p>{bullet}</p>
                      </div>

                      <button 
                        className={`copy-btn ${copiedIndex === index ? 'copied' : ''}`}
                        onClick={() => handleCopy(bullet, index)}
                      >
                        {copiedIndex === index ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                        )}
                      </button>
                    </div>
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

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="btn-secondary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Save PDF
        </button>
        <button className="btn-primary-blue">
          Apply Changes
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
