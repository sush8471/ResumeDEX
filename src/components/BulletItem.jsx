import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './BulletItem.css';

const BulletItem = ({ optimized, original, index }) => {
  const [copied, setCopied] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const hasOriginal = original && original.trim().length > 0;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(optimized);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.li 
      className="bullet-item-enhanced"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="bullet-main">
        <span className="bullet-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <span className="bullet-text">{optimized}</span>
        <div className="bullet-actions">
          {hasOriginal && (
            <button
              className="bullet-btn compare-btn"
              onClick={() => setShowComparison(!showComparison)}
              aria-label={showComparison ? "Hide comparison" : "Show comparison"}
              title={showComparison ? "Hide original" : "Show original"}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </button>
          )}
          <button
            className={`bullet-btn copy-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
            aria-label="Copy to clipboard"
            title={copied ? "Copied!" : "Copy bullet"}
          >
            {copied ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showComparison && hasOriginal && (
          <motion.div 
            className="bullet-comparison"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="comparison-label">Original:</div>
            <div className="comparison-text">{original}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

export default BulletItem;
