# Personal Portfolio Website

A beautiful, fully functional portfolio website with a bento grid layout. The website connects to a local SQLite database and displays portfolio information for 3 different people.

## Features

- 🎨 Modern bento grid layout inspired by joshuabrigati.com
- 💾 SQLite database integration
- 🎯 Dynamic content loading
- 👥 Multiple person profiles (3 people)
- 📱 Fully responsive design
- ✨ Smooth animations and transitions
- 🎭 Person selection interface

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

Start the server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## How It Works

1. When you visit the website, you'll first see a person selection modal
2. Choose one of the 3 available portfolios
3. The portfolio dynamically loads with:
   - About section with bio
   - Contact information
   - Skills with animated progress bars
   - Featured projects
   - Work experience timeline
   - Social media links
4. You can switch between different person profiles using the "Change Person" button

## Technology Stack

- **Backend**: Node.js with Express
- **Database**: SQLite with better-sqlite3
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Design**: Bento Grid Layout, Modern CSS animations

## Database Schema

The application uses 4 main tables:
- `persons` - Personal information
- `skills` - Skills and proficiency levels
- `projects` - Featured projects and work
- `experience` - Work history

## Customization

The database is automatically seeded with 3 sample profiles:
1. Alex Morgan - Full Stack Developer
2. Sarah Chen - UX/UI Designer & Frontend Developer
3. Marcus Rodriguez - DevOps Engineer & Cloud Architect

You can modify the seed data in `server.js` to customize the profiles.
