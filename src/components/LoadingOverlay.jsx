import { motion } from 'framer-motion';
import './LoadingOverlay.css';

const LoadingOverlay = () => {
  return (
    <motion.div 
      className="loading-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="loading-content">
        {/* Animated Spinner */}
        <div className="spinner-wrapper">
          <motion.div 
            className="spinner-ring"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="spinner-segment"></div>
          </motion.div>
          
          {/* Pulsing Glow */}
          <motion.div 
            className="spinner-glow"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* Loading Text */}
        <motion.div
          className="loading-text"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3>Optimizing Your Resume</h3>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Analyzing job requirements and enhancing your resume...
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingOverlay;
