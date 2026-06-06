import styles from './TypewriterText.module.css';
import useTypewriter from '../../hooks/useTypewriter';

const professions = [
  'Web Developer',
  'Front-End Developer',
  'English Student',
  'Vibecoder',
  'Software Engineering Student',
  'Tech Enthusiast'
];

const TypewriterText = () => {
  const text = useTypewriter(professions, 80, 50, 2000);

  return (
    <span className={styles.typewriter}>
      <span className={styles.text}>{text}</span>
      <span className={styles.cursor}>|</span>
    </span>
  );
};

export default TypewriterText;
