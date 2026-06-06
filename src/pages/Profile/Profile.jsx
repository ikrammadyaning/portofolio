import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from './Profile.module.css';

const Profile = () => {
  const { currentUser, updateProfile } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: currentUser?.name || '',
    username: currentUser?.username || '',
    email: currentUser?.email || ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  if (!currentUser) return null;

  const joinDate = currentUser.joinDate
    ? new Date(currentUser.joinDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'N/A';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (success) setSuccess('');
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim() || form.name.trim().length < 3) errs.name = 'Name must be at least 3 characters';
    if (!form.username.trim() || form.username.trim().length < 4) errs.username = 'Username must be at least 4 characters';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email format';
    return errs;
  };

  const handleSave = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const result = updateProfile(form);
    if (result.success) {
      setSuccess('Profile updated successfully!');
      setEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setErrors({ username: result.error });
    }
  };

  const handleCancel = () => {
    setForm({ name: currentUser.name, username: currentUser.username, email: currentUser.email });
    setErrors({});
    setEditing(false);
  };

  return (
    <div className={`page-transition ${styles.profile}`}>
      <div className="container">
        <div className={styles.header}>
          <h1 className="section-title">My Profile</h1>
          <p className="section-subtitle">Manage your account information</p>
        </div>

        <div className={styles.card}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              <span>{currentUser.name.charAt(0).toUpperCase()}</span>
            </div>
            <h2 className={styles.name}>{currentUser.name}</h2>
            <span className={styles.badge}>@{currentUser.username}</span>
          </div>

          <div className={styles.details}>
            {success && (
              <div className={styles.success}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                {success}
              </div>
            )}

            <div className={styles.field}>
              <span className={styles.fieldLabel}>Full Name</span>
              {editing ? (
                <div>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                  />
                  {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
                </div>
              ) : (
                <span className={styles.fieldValue}>{currentUser.name}</span>
              )}
            </div>

            <div className={styles.field}>
              <span className={styles.fieldLabel}>Username</span>
              {editing ? (
                <div>
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
                  />
                  {errors.username && <span className={styles.fieldError}>{errors.username}</span>}
                </div>
              ) : (
                <span className={styles.fieldValue}>@{currentUser.username}</span>
              )}
            </div>

            <div className={styles.field}>
              <span className={styles.fieldLabel}>Email</span>
              {editing ? (
                <div>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  />
                  {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
                </div>
              ) : (
                <span className={styles.fieldValue}>{currentUser.email}</span>
              )}
            </div>

            <div className={styles.field}>
              <span className={styles.fieldLabel}>Member Since</span>
              <span className={styles.fieldValue}>{joinDate}</span>
            </div>

            <div className={styles.field}>
              <span className={styles.fieldLabel}>Total Projects</span>
              <span className={styles.fieldValue}>6</span>
            </div>

            <div className={styles.actions}>
              {editing ? (
                <>
                  <button className={styles.saveBtn} onClick={handleSave}>Save Changes</button>
                  <button className={styles.cancelBtn} onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <button className={styles.editBtn} onClick={() => setEditing(true)}>Edit Profile</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
