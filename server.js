const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database
const db = new Database('portfolio.db');

// Create tables and seed data
db.exec(`
  CREATE TABLE IF NOT EXISTS persons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    bio TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    location TEXT,
    github TEXT,
    linkedin TEXT,
    twitter TEXT,
    website TEXT
  );

  CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    person_id INTEGER,
    name TEXT NOT NULL,
    level INTEGER,
    FOREIGN KEY (person_id) REFERENCES persons(id)
  );

  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    person_id INTEGER,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    technologies TEXT,
    url TEXT,
    image_url TEXT,
    FOREIGN KEY (person_id) REFERENCES persons(id)
  );

  CREATE TABLE IF NOT EXISTS experience (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    person_id INTEGER,
    company TEXT NOT NULL,
    position TEXT NOT NULL,
    duration TEXT NOT NULL,
    description TEXT,
    FOREIGN KEY (person_id) REFERENCES persons(id)
  );
`);

// Seed data if database is empty
const personCount = db.prepare('SELECT COUNT(*) as count FROM persons').get();
if (personCount.count === 0) {
  console.log('Seeding database with sample data...');
  
  // Insert persons
  const insertPerson = db.prepare(`
    INSERT INTO persons (name, title, bio, email, phone, location, github, linkedin, twitter, website)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertPerson.run(
    'Alex Morgan',
    'Full Stack Developer',
    'Passionate developer with 8+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud architecture. Love creating beautiful, performant user experiences.',
    'alex.morgan@example.com',
    '+1 (555) 123-4567',
    'San Francisco, CA',
    'github.com/alexmorgan',
    'linkedin.com/in/alexmorgan',
    'twitter.com/alexmorgan',
    'alexmorgan.dev'
  );

  insertPerson.run(
    'Sarah Chen',
    'UX/UI Designer & Frontend Developer',
    'Creative designer and developer focused on crafting intuitive digital experiences. 6 years of experience in design systems, accessibility, and modern web technologies. Believer in user-centered design.',
    'sarah.chen@example.com',
    '+1 (555) 234-5678',
    'New York, NY',
    'github.com/sarahchen',
    'linkedin.com/in/sarahchen',
    'twitter.com/sarahchen',
    'sarahchen.design'
  );

  insertPerson.run(
    'Marcus Rodriguez',
    'DevOps Engineer & Cloud Architect',
    'Infrastructure enthusiast with expertise in Kubernetes, AWS, and CI/CD pipelines. 10+ years building reliable, scalable systems. Passionate about automation and infrastructure as code.',
    'marcus.rodriguez@example.com',
    '+1 (555) 345-6789',
    'Austin, TX',
    'github.com/marcusrodriguez',
    'linkedin.com/in/marcusrodriguez',
    'twitter.com/marcusrodriguez',
    'marcusrodriguez.io'
  );

  // Insert skills
  const insertSkill = db.prepare('INSERT INTO skills (person_id, name, level) VALUES (?, ?, ?)');
  
  // Alex's skills
  insertSkill.run(1, 'JavaScript', 95);
  insertSkill.run(1, 'React', 90);
  insertSkill.run(1, 'Node.js', 88);
  insertSkill.run(1, 'TypeScript', 85);
  insertSkill.run(1, 'PostgreSQL', 80);
  insertSkill.run(1, 'AWS', 75);

  // Sarah's skills
  insertSkill.run(2, 'Figma', 95);
  insertSkill.run(2, 'CSS/Sass', 92);
  insertSkill.run(2, 'JavaScript', 85);
  insertSkill.run(2, 'React', 82);
  insertSkill.run(2, 'UI/UX Design', 95);
  insertSkill.run(2, 'Accessibility', 88);

  // Marcus's skills
  insertSkill.run(3, 'Kubernetes', 92);
  insertSkill.run(3, 'AWS', 90);
  insertSkill.run(3, 'Docker', 95);
  insertSkill.run(3, 'Terraform', 88);
  insertSkill.run(3, 'Python', 85);
  insertSkill.run(3, 'CI/CD', 90);

  // Insert projects
  const insertProject = db.prepare(`
    INSERT INTO projects (person_id, title, description, technologies, url)
    VALUES (?, ?, ?, ?, ?)
  `);

  // Alex's projects
  insertProject.run(1, 'E-commerce Platform', 'Built a full-stack e-commerce platform handling 100k+ daily users with real-time inventory management', 'React, Node.js, PostgreSQL, Redis', 'https://example.com/ecommerce');
  insertProject.run(1, 'Social Analytics Dashboard', 'Created an analytics dashboard with interactive data visualizations and real-time updates', 'React, D3.js, WebSocket, Express', 'https://example.com/analytics');
  insertProject.run(1, 'API Gateway Service', 'Designed and implemented a microservices API gateway with rate limiting and authentication', 'Node.js, Redis, JWT, Docker', 'https://example.com/api-gateway');

  // Sarah's projects
  insertProject.run(2, 'Design System Library', 'Created a comprehensive design system used across 20+ products with 50+ reusable components', 'Figma, React, Storybook, CSS', 'https://example.com/design-system');
  insertProject.run(2, 'Mobile Banking App', 'Designed and prototyped an intuitive mobile banking experience with focus on accessibility', 'Figma, React Native, Accessibility', 'https://example.com/banking-app');
  insertProject.run(2, 'Portfolio Website Builder', 'Built a drag-and-drop portfolio builder for creatives with customizable themes', 'React, CSS Grid, Firebase', 'https://example.com/portfolio-builder');

  // Marcus's projects
  insertProject.run(3, 'Multi-Cloud Infrastructure', 'Architected and deployed infrastructure across AWS, GCP, and Azure using Terraform', 'Terraform, AWS, GCP, Azure', 'https://example.com/multi-cloud');
  insertProject.run(3, 'Kubernetes Platform', 'Built a self-service Kubernetes platform serving 100+ development teams', 'Kubernetes, Helm, ArgoCD, Prometheus', 'https://example.com/k8s-platform');
  insertProject.run(3, 'CI/CD Pipeline System', 'Implemented enterprise-wide CI/CD system reducing deployment time by 80%', 'Jenkins, GitLab CI, Docker, Kubernetes', 'https://example.com/cicd');

  // Insert experience
  const insertExperience = db.prepare(`
    INSERT INTO experience (person_id, company, position, duration, description)
    VALUES (?, ?, ?, ?, ?)
  `);

  // Alex's experience
  insertExperience.run(1, 'TechCorp Inc', 'Senior Full Stack Developer', '2020 - Present', 'Lead developer for flagship product serving 1M+ users');
  insertExperience.run(1, 'StartupXYZ', 'Full Stack Developer', '2017 - 2020', 'Built core features and scaled infrastructure from 0 to 100k users');
  insertExperience.run(1, 'WebAgency', 'Junior Developer', '2015 - 2017', 'Developed custom web solutions for enterprise clients');

  // Sarah's experience
  insertExperience.run(2, 'DesignHub', 'Lead UX/UI Designer', '2021 - Present', 'Leading design team and establishing design systems');
  insertExperience.run(2, 'Creative Studio', 'Senior Designer', '2018 - 2021', 'Designed digital experiences for Fortune 500 clients');
  insertExperience.run(2, 'Digital Agency', 'UI Designer', '2016 - 2018', 'Created user interfaces for web and mobile applications');

  // Marcus's experience
  insertExperience.run(3, 'CloudScale', 'Principal DevOps Engineer', '2019 - Present', 'Leading infrastructure and DevOps practices for enterprise platform');
  insertExperience.run(3, 'DataCorp', 'Senior DevOps Engineer', '2016 - 2019', 'Built and managed cloud infrastructure and CI/CD pipelines');
  insertExperience.run(3, 'SysAdmin Co', 'Systems Engineer', '2013 - 2016', 'Managed on-premise and cloud infrastructure');

  console.log('Database seeded successfully!');
}

// Middleware
app.use(express.json());
app.use(express.static('public'));

// API Routes
app.get('/api/persons', (req, res) => {
  const persons = db.prepare('SELECT id, name, title FROM persons').all();
  res.json(persons);
});

app.get('/api/person/:id', (req, res) => {
  const { id } = req.params;
  
  const person = db.prepare('SELECT * FROM persons WHERE id = ?').get(id);
  if (!person) {
    return res.status(404).json({ error: 'Person not found' });
  }

  const skills = db.prepare('SELECT name, level FROM skills WHERE person_id = ?').all(id);
  const projects = db.prepare('SELECT * FROM projects WHERE person_id = ?').all(id);
  const experience = db.prepare('SELECT * FROM experience WHERE person_id = ?').all(id);

  res.json({
    ...person,
    skills,
    projects,
    experience
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
