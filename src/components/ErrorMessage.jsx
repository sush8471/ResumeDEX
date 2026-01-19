import { motion } from 'framer-motion';
import './ErrorMessage.css';

const ErrorMessage = ({ error, onRetry }) => {
  return (
    <motion.div 
      className="error-message"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="error-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      
      <h3>Oops! Something went wrong</h3>
      <p className="error-text">{error}</p>
      
      {onRetry && (
        <button className="btn-primary" onClick={onRetry}>
          Try Again
        </button>
      )}
    </motion.div>
  );
};

export default ErrorMessage;
