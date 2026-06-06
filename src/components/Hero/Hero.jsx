import { Link } from 'react-router-dom';
import TypewriterText from '../TypewriterText/TypewriterText';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>Welcome, I&apos;m</div>
          <h1 className={styles.name}>Ikram Madyaning Qolbu Kamil</h1>
          <div className={styles.typewriter}>
            <span className={styles.typewriterLabel}>I&apos;m a </span>
            <TypewriterText />
          </div>
          <p className={styles.description}>
            [Hello I'm...Ikram Madyaning Qolbu Kamil I'm a student at Ponpes SMA TI HSI-IDN Sukabumi. I want to become a Graphic Designer and Web Developer. I started learning IT because I want to share da'wah and follow the needs of our modern time.]
          </p>
          <div className={styles.actions}>
            <Link to="/project" className={styles.primaryBtn}>
              View Projects
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link to="/contact" className={styles.secondaryBtn}>
              Contact Me
            </Link>
          </div>
        </div>

        <div className={styles.imageWrapper}>
          <div className={styles.imageContainer}>
            <div className={styles.imageGlow}></div>
            <div className={styles.imagePlaceholder}>
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        {/* <span className={styles.scrollText}>Scroll</span> */}
        <div className={styles.scrollLine}></div>
      </div>
    </section>
  );
};

export default Hero;
