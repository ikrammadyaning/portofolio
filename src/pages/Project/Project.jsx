import { useState } from 'react';
import projects from '../../data/projects';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import styles from './Project.module.css';

const categories = ['all', 'frontend', 'fullstack', 'design', 'english'];

const Project = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className={`page-transition ${styles.project}`}>
      <div className="container">
        <div className={styles.header}>
          <h1 className="section-title">My Projects</h1>
          <p className="section-subtitle">Some of my recent work</p>
        </div>

        <div className={styles.filters}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.activeFilter : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
