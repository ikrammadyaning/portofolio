import { useEffect, useState } from 'react';
import styles from './LoadingScreen.module.css';

const LoadingScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const duration = 2000;
    const interval = 30;
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const newProgress = Math.min((current / steps) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(onFinish, 500);
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className={`${styles.loading} ${fadeOut ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <span className={styles.logoBracket}>&lt;</span>
          <span className={styles.logoText}>IK</span>
          <span className={styles.logoBracket}>/&gt;</span>
        </div>
        <h2 className={styles.name}>[Ikram Madyaning Qolbu Kamil]</h2>
        <div className={styles.loader}>
          <div className={styles.bar}>
            <div className={styles.fill} style={{ width: `${progress}%` }}></div>
          </div>
          <span className={styles.percentage}>{Math.round(progress)}%</span>
        </div>
      </div>
      <div className={styles.glow}></div>
    </div>
  );
};

export default LoadingScreen;
