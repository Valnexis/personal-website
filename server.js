const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api/', apiLimiter);

// Initialize SQLite database
// Using in-memory database for demo purposes. Data is reset on server restart.
// For production, use a persistent database file: new sqlite3.Database('database.db')
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Database connected');
    initializeDatabase();
  }
});

// Create and populate database
function initializeDatabase() {
  db.run(`
    CREATE TABLE profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      bio TEXT NOT NULL,
      image TEXT NOT NULL,
      skills TEXT NOT NULL,
      location TEXT NOT NULL,
      email TEXT NOT NULL,
      github TEXT,
      linkedin TEXT,
      portfolio TEXT
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err);
      return;
    }

    // Insert sample profiles
    const profiles = [
      {
        name: 'Alex Rivera',
        title: 'Full Stack Developer',
        bio: 'Passionate developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud architecture.',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        skills: 'JavaScript, React, Node.js, AWS, Docker, MongoDB',
        location: 'San Francisco, CA',
        email: 'alex.rivera@example.com',
        github: 'https://github.com/alexrivera',
        linkedin: 'https://linkedin.com/in/alexrivera',
        portfolio: 'https://alexrivera.dev'
      },
      {
        name: 'Sarah Chen',
        title: 'UX/UI Designer',
        bio: 'Creative designer focused on user-centered design and creating delightful digital experiences. 7 years of experience in product design.',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        skills: 'Figma, Sketch, Adobe XD, User Research, Prototyping, Design Systems',
        location: 'New York, NY',
        email: 'sarah.chen@example.com',
        github: 'https://github.com/sarachen',
        linkedin: 'https://linkedin.com/in/sarachen',
        portfolio: 'https://sarachen.design'
      },
      {
        name: 'Marcus Johnson',
        title: 'DevOps Engineer',
        bio: 'Infrastructure specialist with expertise in automation, CI/CD pipelines, and cloud infrastructure. Committed to improving development workflows.',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
        skills: 'Kubernetes, Terraform, Jenkins, AWS, Python, Bash',
        location: 'Austin, TX',
        email: 'marcus.johnson@example.com',
        github: 'https://github.com/marcusj',
        linkedin: 'https://linkedin.com/in/marcusjohnson',
        portfolio: 'https://marcusj.io'
      }
    ];

    const stmt = db.prepare(`
      INSERT INTO profiles (name, title, bio, image, skills, location, email, github, linkedin, portfolio)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    profiles.forEach(profile => {
      stmt.run(
        profile.name,
        profile.title,
        profile.bio,
        profile.image,
        profile.skills,
        profile.location,
        profile.email,
        profile.github,
        profile.linkedin,
        profile.portfolio
      );
    });

    stmt.finalize();
    console.log('Database initialized with sample profiles');
  });
}

// API Routes
app.get('/api/profiles', (req, res) => {
  db.all('SELECT * FROM profiles', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/profiles/:id', (req, res) => {
  const { id } = req.params;
  
  // Validate ID parameter
  if (!id || isNaN(id) || parseInt(id) < 1) {
    res.status(400).json({ error: 'Invalid profile ID' });
    return;
  }
  
  db.get('SELECT * FROM profiles WHERE id = ?', [parseInt(id)], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }
    res.json(row);
  });
});

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});
