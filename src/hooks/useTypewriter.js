import { useState, useEffect, useRef, useCallback } from 'react';

const useTypewriter = (strings, typingSpeed = 80, deletingSpeed = 50, pauseTime = 1000) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  const tick = useCallback(() => {
    const fullText = strings[currentIndex];

    if (!isDeleting) {
      if (displayText.length < fullText.length) {
        setDisplayText(fullText.slice(0, displayText.length + 1));
      } else {
        timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseTime);
        return;
      }
    } else {
      if (displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1));
      } else {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % strings.length);
      }
    }
  }, [displayText, currentIndex, isDeleting, strings, pauseTime]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    timeoutRef.current = setTimeout(tick, speed);
    return () => clearTimeout(timeoutRef.current);
  }, [tick, isDeleting, deletingSpeed, typingSpeed]);

  return displayText;
};

export default useTypewriter;
