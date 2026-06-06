import styles from './ProjectCard.module.css';

const ProjectCard = ({ project }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={project.image} alt={project.title} className={styles.image} />
        <div className={styles.overlay}>
          <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.viewBtn}>
            View Live
          </a>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.githubBtn}>
            GitHub
          </a>
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.techStack}>
          {project.technologies.map((tech, index) => (
            <span key={index} className={styles.tech}>{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
