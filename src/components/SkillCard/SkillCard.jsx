import styles from './SkillCard.module.css';

const SkillCard = ({ skill }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.name}>{skill.name}</span>
        <span className={styles.level}>{skill.level}%</span>
      </div>
      <div className={styles.bar}>
        <div
          className={styles.fill}
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SkillCard;
