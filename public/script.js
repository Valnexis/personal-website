// State management
let profiles = [];
let currentProfileId = null;

// API base URL
const API_BASE = window.location.origin;

// Initialize the application
async function init() {
    try {
        await loadProfiles();
        createProfileButtons();
        
        // Load first profile by default
        if (profiles.length > 0) {
            loadProfile(profiles[0].id);
        }
    } catch (error) {
        console.error('Error initializing app:', error);
        showError('Failed to load profiles. Please refresh the page.');
    }
}

// Fetch all profiles from API
async function loadProfiles() {
    try {
        const response = await fetch(`${API_BASE}/api/profiles`);
        if (!response.ok) {
            throw new Error('Failed to fetch profiles');
        }
        profiles = await response.json();
    } catch (error) {
        console.error('Error loading profiles:', error);
        throw error;
    }
}

// Create profile selection buttons
function createProfileButtons() {
    const buttonContainer = document.getElementById('profileButtons');
    buttonContainer.innerHTML = '';

    profiles.forEach(profile => {
        const button = document.createElement('button');
        button.className = 'profile-btn';
        button.textContent = profile.name;
        button.dataset.profileId = profile.id;
        
        button.addEventListener('click', () => {
            loadProfile(profile.id);
        });

        buttonContainer.appendChild(button);
    });
}

// Load and display a specific profile
async function loadProfile(profileId) {
    try {
        // Update active button
        document.querySelectorAll('.profile-btn').forEach(btn => {
            btn.classList.remove('active');
            if (parseInt(btn.dataset.profileId) === profileId) {
                btn.classList.add('active');
            }
        });

        // Add loading state
        const bentoGrid = document.getElementById('bentoGrid');
        bentoGrid.classList.add('loading');

        // Fetch profile data
        const response = await fetch(`${API_BASE}/api/profiles/${profileId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }
        const profile = await response.json();

        // Update UI with profile data
        displayProfile(profile);
        currentProfileId = profileId;

        // Remove loading state
        setTimeout(() => {
            bentoGrid.classList.remove('loading');
        }, 300);

    } catch (error) {
        console.error('Error loading profile:', error);
        showError('Failed to load profile data.');
    }
}

// Display profile data in the UI
function displayProfile(profile) {
    // Profile card
    document.getElementById('profileImage').src = profile.image;
    document.getElementById('profileImage').alt = profile.name;
    document.getElementById('profileName').textContent = profile.name;
    document.getElementById('profileTitle').textContent = profile.title;

    // Bio card
    document.getElementById('profileBio').textContent = profile.bio;

    // Skills card
    const skillsContainer = document.getElementById('profileSkills');
    skillsContainer.innerHTML = '';
    const skills = profile.skills.split(',').map(s => s.trim());
    
    skills.forEach((skill, index) => {
        const skillTag = document.createElement('span');
        skillTag.className = 'skill-tag';
        skillTag.textContent = skill;
        skillTag.style.animationDelay = `${index * 0.05}s`;
        skillsContainer.appendChild(skillTag);
    });

    // Contact card
    document.getElementById('profileLocation').textContent = profile.location;
    document.getElementById('profileEmail').textContent = profile.email;

    // Links card
    const linksContainer = document.getElementById('profileLinks');
    linksContainer.innerHTML = '';

    const links = [
        { label: '🔗 GitHub', url: profile.github, icon: '💻' },
        { label: '🔗 LinkedIn', url: profile.linkedin, icon: '👔' },
        { label: '🔗 Portfolio', url: profile.portfolio, icon: '🌐' }
    ];

    links.forEach(link => {
        if (link.url) {
            const linkElement = document.createElement('a');
            linkElement.className = 'link-item';
            linkElement.href = link.url;
            linkElement.target = '_blank';
            linkElement.rel = 'noopener noreferrer';
            linkElement.innerHTML = `
                <span>${link.icon}</span>
                <span>${link.label.replace('🔗 ', '')}</span>
            `;
            linksContainer.appendChild(linkElement);
        }
    });

    // Add animation to profile image
    const profileImage = document.getElementById('profileImage');
    profileImage.style.animation = 'none';
    setTimeout(() => {
        profileImage.style.animation = '';
    }, 10);
}

// Show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff4444;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 1000;
        animation: fadeInDown 0.3s ease-out;
    `;
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);

    setTimeout(() => {
        errorDiv.style.animation = 'fadeInUp 0.3s ease-out reverse';
        setTimeout(() => errorDiv.remove(), 300);
    }, 3000);
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
