import { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import ParticleBackground from '../../components/ParticleBackground/ParticleBackground';
import styles from './Login.module.css';

const Login = () => {
  const { isLoggedIn, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate('/', { replace: true });
  }, [isLoggedIn, navigate]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const cardRef = useRef(null);

  const professions = [
    'Web Developer',
    'UI Designer',
    'Arabic Learner',
    'Creative Thinker'
  ];
  const [typeText, setTypeText] = useState('');
  const [typeIndex, setTypeIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = professions[typeIndex];
    let timeout;

    if (!isDeleting) {
      if (typeText.length < currentText.length) {
        timeout = setTimeout(() => setTypeText(currentText.slice(0, typeText.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (typeText.length > 0) {
        timeout = setTimeout(() => setTypeText(typeText.slice(0, -1)), 50);
      } else {
        setIsDeleting(false);
        setTypeIndex((prev) => (prev + 1) % professions.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [typeText, typeIndex, isDeleting, professions]);

  // Mouse tracking for 3D tilt
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('All fields are required');
      return;
    }

    setIsLoading(true);

    await new Promise((r) => setTimeout(r, 800));

    const success = login(username, password);
    if (success) {
      setShowSuccess(true);
      setTimeout(() => navigate('/'), 600);
    } else {
      setError('Invalid credentials');
      setIsLoading(false);
    }
  };

  const handleRipple = (e) => {
    const btn = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    ripple.classList.add(styles.ripple);

    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <div className={styles.loginPage}>
      <ParticleBackground />
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.brandLogo}>
            <span className={styles.brandBracket}>&lt;</span>
            <span>IK</span>
            <span className={styles.brandBracket}>/&gt;</span>
          </div>
          <div className={styles.brandTypewriter}>
            <span className={styles.brandTypeText}>{typeText}</span>
            <span className={styles.brandCursor}>|</span>
          </div>
        </div>

        <div className={styles.card} ref={cardRef}>
          <div className={styles.cardGlow}></div>
          <h2 className={styles.cardTitle}>SIGN IN</h2>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.input}
                placeholder=" "
                disabled={isLoading}
              />
              <label htmlFor="username" className={styles.label}>Username</label>
            </div>

            <div className={styles.field}>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder=" "
                disabled={isLoading}
              />
              <label htmlFor="password" className={styles.label}>Password</label>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button
              type="submit"
              className={`${styles.loginBtn} ${isLoading ? styles.loading : ''}`}
              disabled={isLoading}
              onClick={handleRipple}
            >
              {isLoading ? (
                <div className={styles.spinner}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" strokeDasharray="31.4 31.4" strokeLinecap="round" />
                  </svg>
                </div>
              ) : showSuccess ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <div className={styles.switch}>
            Don&apos;t have an account? <Link to="/register" className={styles.switchLink}>Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
