# Portfolio Website with Bento Grid Layout

A modern, responsive portfolio website featuring a Bento grid layout with dynamic profile switching. Built with Node.js, Express, and vanilla JavaScript.

## Features

- **Bento Grid Layout**: Modern card-based layout inspired by contemporary design trends
- **Dynamic Profile Switching**: Select between different profiles with smooth transitions
- **SQLite Database**: Three pre-configured person profiles stored in an in-memory database
- **RESTful API**: Express backend serving profile data
- **Responsive Design**: Fully responsive layout that works on all devices
- **Smooth Animations**: Engaging animations and transitions throughout the UI
- **Clean UI**: Beautiful gradient backgrounds and modern styling

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite3 (in-memory)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Custom CSS with flexbox and grid layouts

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd personal-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Project Structure

```
personal-website/
├── public/
│   ├── index.html      # Main HTML file
│   ├── styles.css      # Styling with Bento grid layout
│   └── script.js       # Frontend JavaScript for interactivity
├── server.js           # Express server and API endpoints
├── package.json        # Project dependencies
└── README.md          # Project documentation
```

## API Endpoints

### Get All Profiles
```
GET /api/profiles
```
Returns an array of all profiles.

### Get Profile by ID
```
GET /api/profiles/:id
```
Returns a single profile by ID.

## Features Breakdown

### Backend
- Express.js server running on port 3000
- SQLite in-memory database with 3 sample profiles
- RESTful API endpoints for profile data
- CORS enabled for cross-origin requests

### Frontend
- Bento grid layout with responsive design
- Profile selector buttons with active states
- Dynamic content loading from API
- Smooth animations and transitions
- Gradient backgrounds and modern styling

### Profiles Included
1. **Alex Rivera** - Full Stack Developer
2. **Sarah Chen** - UX/UI Designer
3. **Marcus Johnson** - DevOps Engineer

Each profile includes:
- Name and title
- Profile image (avatar)
- Bio/description
- Skills list
- Contact information (location, email)
- Social links (GitHub, LinkedIn, Portfolio)

## Customization

To add your own profiles, modify the `profiles` array in `server.js`:

```javascript
const profiles = [
  {
    name: 'Your Name',
    title: 'Your Title',
    bio: 'Your bio...',
    image: 'image-url',
    skills: 'Skill1, Skill2, Skill3',
    location: 'Your Location',
    email: 'your.email@example.com',
    github: 'github-url',
    linkedin: 'linkedin-url',
    portfolio: 'portfolio-url'
  }
];
```

## License

MIT
