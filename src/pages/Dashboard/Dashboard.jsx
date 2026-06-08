import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className={`page-transition ${styles.dashboard}`}>
      <div className="container">
        <div className={styles.header}>
          <h1 className="section-title">Dashboard</h1>
          <p className="section-subtitle">Welcome back, {currentUser?.name || '[Ikram Madyaning Qolbu Kamil]'}</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3 className={styles.cardNumber}>6</h3>
            <p className={styles.cardLabel}>Total Projects</p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3 className={styles.cardNumber}>12</h3>
            <p className={styles.cardLabel}>Skills</p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </div>
            <h3 className={styles.cardNumber}>github/ikrammadyaning</h3>
            <p className={styles.cardLabel}>GitHub</p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <h3 className={styles.cardNumber}>6</h3>
            <p className={styles.cardLabel}>Sertificate</p>
          </div>
        </div>

        <div className={styles.actions}>
          <Link to="/" className={styles.homeBtn}>Back to Home</Link>
          <button className={styles.logoutBtn} onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
