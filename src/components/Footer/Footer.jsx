import { Link } from 'react-router-dom';
import social from '../../data/social';
import styles from './Footer.module.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <h3 className={styles.logo}>
              <span className={styles.logoBracket}>&lt;</span>
              IK
              <span className={styles.logoBracket}>/&gt;</span>
            </h3>
            <p className={styles.desc}>
              Hello I'm Ikram Madyaning Qolbu Kamil. I'm a student at Ponpes SMA TI HSI-IDN Sukabumi.
            </p>
          </div>

          <div className={styles.links}>
            <h4 className={styles.heading}>Quick Links</h4>
            <Link to="/" className={styles.link}>Home</Link>
            <Link to="/about" className={styles.link}>About</Link>
            <Link to="/project" className={styles.link}>Projects</Link>
            <Link to="/contact" className={styles.link}>Contact</Link>
          </div>

          <div className={styles.social}>
            <h4 className={styles.heading}>Social</h4>
            {social.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {year} Ikram Madyaning Qolbu Kamil. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
