import { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import ParticleBackground from '../../components/ParticleBackground/ParticleBackground';
import styles from './Register.module.css';

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const cardRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (apiError) setApiError('');
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim() || form.name.trim().length < 3) errs.name = 'Name must be at least 3 characters';
    if (!form.username.trim() || form.username.trim().length < 4) errs.username = 'Username must be at least 4 characters';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email format';
    if (!form.password || form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    const result = register(form);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1000);
    } else {
      setApiError(result.error);
      setIsLoading(false);
    }
  };

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

  return (
    <div className={styles.registerPage}>
      <ParticleBackground />
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.brandLogo}>
            <span className={styles.brandBracket}>&lt;</span>
            <span>IK</span>
            <span className={styles.brandBracket}>/&gt;</span>
          </div>
          <p className={styles.brandSub}>Create your account</p>
        </div>

        <div className={styles.card} ref={cardRef}>
          <div className={styles.cardGlow}></div>
          <h2 className={styles.cardTitle}>SIGN UP</h2>

          {success && (
            <div className={styles.success}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Account created! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <input
                type="text"
                id="reg-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                placeholder=" "
                disabled={isLoading || success}
              />
              <label htmlFor="reg-name" className={styles.label}>Full Name</label>
              {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
            </div>

            <div className={styles.field}>
              <input
                type="text"
                id="reg-username"
                name="username"
                value={form.username}
                onChange={handleChange}
                className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
                placeholder=" "
                disabled={isLoading || success}
              />
              <label htmlFor="reg-username" className={styles.label}>Username</label>
              {errors.username && <span className={styles.fieldError}>{errors.username}</span>}
            </div>

            <div className={styles.field}>
              <input
                type="email"
                id="reg-email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder=" "
                disabled={isLoading || success}
              />
              <label htmlFor="reg-email" className={styles.label}>Email</label>
              {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
            </div>

            <div className={styles.field}>
              <input
                type="password"
                id="reg-password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                placeholder=" "
                disabled={isLoading || success}
              />
              <label htmlFor="reg-password" className={styles.label}>Password</label>
              {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
            </div>

            <div className={styles.field}>
              <input
                type="password"
                id="reg-confirm"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
                placeholder=" "
                disabled={isLoading || success}
              />
              <label htmlFor="reg-confirm" className={styles.label}>Confirm Password</label>
              {errors.confirmPassword && <span className={styles.fieldError}>{errors.confirmPassword}</span>}
            </div>

            {apiError && <div className={styles.error}>{apiError}</div>}

            <button
              type="submit"
              className={`${styles.registerBtn} ${isLoading ? styles.loading : ''}`}
              disabled={isLoading || success}
            >
              {isLoading ? (
                <div className={styles.spinner}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" strokeDasharray="31.4 31.4" strokeLinecap="round" />
                  </svg>
                </div>
              ) : success ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className={styles.switch}>
            Already have an account? <Link to="/login" className={styles.switchLink}>Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
