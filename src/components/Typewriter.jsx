import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Typewriter = ({ 
  texts = [], 
  speed = 100, 
  deleteSpeed = 50, 
  delay = 1500,
  loop = true,
  className = ''
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textArrayIndex, setTextArrayIndex] = useState(0);

  const currentText = texts[textArrayIndex] || '';

  useEffect(() => {
    if (!currentText) return;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentIndex < currentText.length) {
          setDisplayText(prev => prev + currentText[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        } else if (loop) {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), delay);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(prev => prev.slice(0, -1));
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setCurrentIndex(0);
          setTextArrayIndex(prev => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, currentText, loop, speed, deleteSpeed, delay, displayText, texts, textArrayIndex]);

  return (
    <span className={className}>
      {displayText}
      <motion.span 
        className="typewriter-cursor"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      >
        |
      </motion.span>
    </span>
  );
};

export default Typewriter;
