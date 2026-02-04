import { motion } from 'framer-motion';
import './ProgressBar.css';

const ProgressBar = ({ score, size = 'default' }) => {
  // Determine color based on score
  const getColor = (score) => {
    if (score >= 75) return '#10b981'; // emerald
    if (score >= 50) return '#f59e0b'; // yellow/warning
    return '#ef4444'; // red/error
  };

  const color = getColor(score);
  
  // Size configurations
  const sizes = {
    default: { svg: 140, radius: 54, stroke: 12, fontSize: '2.5rem' },
    large: { svg: 180, radius: 70, stroke: 14, fontSize: '3rem' }
  };
  
  const config = sizes[size] || sizes.default;
  const circumference = 2 * Math.PI * config.radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={`progress-bar-container ${size}`}>
      <svg width={config.svg} height={config.svg} className="progress-svg">
        {/* Background circle */}
        <circle
          cx={config.svg / 2}
          cy={config.svg / 2}
          r={config.radius}
          fill="none"
          stroke="rgba(148, 163, 184, 0.15)"
          strokeWidth={config.stroke}
        />
        
        {/* Animated progress circle */}
        <motion.circle
          cx={config.svg / 2}
          cy={config.svg / 2}
          r={config.radius}
          fill="none"
          stroke={color}
          strokeWidth={config.stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
            delay: 0.3
          }}
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%'
          }}
        />
      </svg>
      
      {/* Score text */}
      <motion.div 
        className="progress-text"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <span className="score-number" style={{ fontSize: config.fontSize }}>{score}</span>
        <span className="score-fraction">/100</span>
        <div className="score-label">ATS SCORE</div>
      </motion.div>
    </div>
  );
};

export default ProgressBar;
