import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ATSBreakdown.css';

const ATSBreakdown = ({ matchedKeywords, totalKeywords, missingSkills }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Only show if we have data
  const hasData = matchedKeywords !== undefined || (missingSkills && missingSkills.length > 0);
  
  if (!hasData) return null;

  return (
    <div className="ats-breakdown">
      <button 
        className="breakdown-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span className="toggle-text">View Detailed Breakdown</span>
        <motion.svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            className="breakdown-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {(matchedKeywords !== undefined && totalKeywords !== undefined) && (
              <div className="breakdown-item">
                <div className="breakdown-label">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Matched Keywords
                </div>
                <div className="breakdown-value">{matchedKeywords} / {totalKeywords}</div>
              </div>
            )}

            {missingSkills && missingSkills.length > 0 && (
              <div className="breakdown-item">
                <div className="breakdown-label">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  Missing / Weak Skills
                </div>
                <div className="missing-skills-list">
                  {missingSkills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ATSBreakdown;
