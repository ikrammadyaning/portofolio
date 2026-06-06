import education from '../../data/education';
import experiences from '../../data/sertificates';
import skills from '../../data/skills';
import SkillCard from '../../components/SkillCard/SkillCard';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={`page-transition ${styles.about}`}>
      <div className="container">
        <div className={styles.header}>
          <h1 className="section-title">About Me</h1>
          <p className="section-subtitle">Get to know more about me</p>
        </div>

        <div className={styles.profile}>
          <div className={styles.profileImage}>
            <div className={styles.imagePlaceholder}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>
          <div className={styles.profileContent}>
            <h2 className={styles.profileName}>Ikram Madyaning Qolbu Kamil</h2>
            <p className={styles.profileDesc}>
              Hello I'm...Ikram Madyaning Qolbu Kamil I'm a student at Ponpes SMA TI HSI-IDN Sukabumi. I want to become a Graphic Designer and Web Developer. I started learning IT because I want to share da'wah and follow the needs of our modern time.
            </p>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
            Education
          </h2>
          <div className={styles.timeline}>
            {education.map((edu) => (
              <div key={edu.id} className={styles.timelineItem}>
                <div className={styles.timelineDot}></div>/
                <div className={styles.timelineContent}>
                  <span className={styles.year}>{edu.year}</span>
                  <h3 className={styles.itemTitle}>{edu.school}</h3>
                  <p className={styles.itemDegree}>{edu.degree}</p>
                  <p className={styles.itemDesc}>{edu.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            Sertificates
          </h2>
          <div className={styles.timeline}>
            {experiences.map((exp) => (
              <div key={exp.id} className={styles.timelineItem}>
                <div className={styles.timelineDot}></div>
                <div className={styles.timelineContent}>
                  <span className={styles.year}>{exp.year}</span>
                  <h3 className={styles.itemTitle}>{exp.role}</h3>
                  <p className={styles.itemDegree}>{exp.company}</p>
                  <p className={styles.itemDesc}>{exp.description}</p>
                  <p className={styles.itemLink}>
                    <a href={exp.link} target="_blank" rel="noopener noreferrer">
                      View Certificate
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            Skills
          </h2>
          <div className={styles.skillsGrid}>
            {skills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
