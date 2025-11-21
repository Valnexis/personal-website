// State management
let currentPersonId = null;

// DOM Elements
const personSelectionModal = document.getElementById('personSelectionModal');
const loadingIndicator = document.getElementById('loadingIndicator');
const portfolioContent = document.getElementById('portfolioContent');
const personList = document.getElementById('personList');
const changePersonBtn = document.getElementById('changePersonBtn');

// Initialize the application
async function init() {
    await loadPersonList();
    setupEventListeners();
}

// Load the list of persons
async function loadPersonList() {
    try {
        const response = await fetch('/api/persons');
        const persons = await response.json();
        
        personList.innerHTML = '';
        persons.forEach(person => {
            const personCard = createPersonCard(person);
            personList.appendChild(personCard);
        });
    } catch (error) {
        console.error('Error loading persons:', error);
        personList.innerHTML = '<p style="color: red;">Error loading persons. Please refresh the page.</p>';
    }
}

// Create a person card for selection
function createPersonCard(person) {
    const card = document.createElement('div');
    card.className = 'person-card';
    card.onclick = () => selectPerson(person.id);
    
    const initials = person.name.split(' ').map(n => n[0]).join('');
    
    card.innerHTML = `
        <div class="person-avatar">${initials}</div>
        <div class="person-info">
            <h3>${person.name}</h3>
            <p>${person.title}</p>
        </div>
    `;
    
    return card;
}

// Select a person and load their portfolio
async function selectPerson(personId) {
    currentPersonId = personId;
    
    // Show loading indicator
    personSelectionModal.classList.add('hidden');
    loadingIndicator.classList.remove('hidden');
    
    try {
        const response = await fetch(`/api/person/${personId}`);
        const personData = await response.json();
        
        // Small delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Render the portfolio
        renderPortfolio(personData);
        
        // Hide loading and show portfolio
        loadingIndicator.classList.add('hidden');
        portfolioContent.classList.remove('hidden');
        
        // Scroll to top
        window.scrollTo(0, 0);
    } catch (error) {
        console.error('Error loading person data:', error);
        alert('Error loading portfolio. Please try again.');
        loadingIndicator.classList.add('hidden');
        personSelectionModal.classList.remove('hidden');
    }
}

// Render the complete portfolio
function renderPortfolio(data) {
    // Header information
    document.getElementById('personName').textContent = data.name;
    document.getElementById('personTitle').textContent = data.title;
    document.getElementById('personBio').textContent = data.bio;
    
    // Contact information
    renderContactInfo(data);
    
    // Skills
    renderSkills(data.skills);
    
    // Projects
    renderProjects(data.projects);
    
    // Experience
    renderExperience(data.experience);
    
    // Social links
    renderSocialLinks(data);
}

// Render contact information
function renderContactInfo(data) {
    const contactInfo = document.getElementById('contactInfo');
    contactInfo.innerHTML = '';
    
    const contacts = [
        { label: 'Email', value: data.email, icon: '✉' },
        { label: 'Phone', value: data.phone, icon: '📱' },
        { label: 'Location', value: data.location, icon: '📍' }
    ];
    
    contacts.forEach(contact => {
        if (contact.value) {
            const item = document.createElement('div');
            item.className = 'contact-item';
            item.innerHTML = `
                <div class="contact-icon">${contact.icon}</div>
                <div class="contact-details">
                    <div class="contact-label">${contact.label}</div>
                    <div class="contact-value">${contact.value}</div>
                </div>
            `;
            contactInfo.appendChild(item);
        }
    });
}

// Render skills with animated progress bars
function renderSkills(skills) {
    const skillsList = document.getElementById('skillsList');
    skillsList.innerHTML = '';
    
    skills.forEach((skill, index) => {
        const item = document.createElement('div');
        item.className = 'skill-item';
        item.innerHTML = `
            <div class="skill-header">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-level">${skill.level}%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" data-width="${skill.level}" style="width: 0%"></div>
            </div>
        `;
        skillsList.appendChild(item);
        
        // Animate progress bar after a short delay
        setTimeout(() => {
            const progressBar = item.querySelector('.skill-progress');
            progressBar.style.width = skill.level + '%';
        }, 100 + (index * 50));
    });
}

// Render projects
function renderProjects(projects) {
    const projectsList = document.getElementById('projectsList');
    projectsList.innerHTML = '';
    
    projects.forEach(project => {
        const item = document.createElement('div');
        item.className = 'project-item';
        
        const technologies = project.technologies ? project.technologies.split(',').map(t => t.trim()) : [];
        const techTags = technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
        
        item.innerHTML = `
            <div class="project-title">${project.title}</div>
            <div class="project-description">${project.description}</div>
            ${technologies.length > 0 ? `<div class="project-tech">${techTags}</div>` : ''}
            ${project.url ? `<a href="${project.url}" class="project-link" target="_blank" rel="noopener">View Project →</a>` : ''}
        `;
        projectsList.appendChild(item);
    });
}

// Render work experience
function renderExperience(experiences) {
    const experienceList = document.getElementById('experienceList');
    experienceList.innerHTML = '';
    
    experiences.forEach(exp => {
        const item = document.createElement('div');
        item.className = 'experience-item';
        item.innerHTML = `
            <div class="experience-header">
                <div class="experience-company">${exp.company}</div>
                <div class="experience-position">${exp.position}</div>
                <div class="experience-duration">${exp.duration}</div>
            </div>
            ${exp.description ? `<div class="experience-description">${exp.description}</div>` : ''}
        `;
        experienceList.appendChild(item);
    });
}

// Render social links
function renderSocialLinks(data) {
    const socialLinks = document.getElementById('socialLinks');
    socialLinks.innerHTML = '';
    
    const socials = [
        { label: 'GitHub', value: data.github, icon: 'GH' },
        { label: 'LinkedIn', value: data.linkedin, icon: 'IN' },
        { label: 'Twitter', value: data.twitter, icon: 'TW' },
        { label: 'Website', value: data.website, icon: 'WW' }
    ];
    
    socials.forEach(social => {
        if (social.value) {
            const link = document.createElement('a');
            link.className = 'social-link';
            link.href = social.value.startsWith('http') ? social.value : `https://${social.value}`;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.innerHTML = `
                <div class="social-icon">${social.icon}</div>
                <div class="social-label">${social.label}</div>
            `;
            socialLinks.appendChild(link);
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    changePersonBtn.addEventListener('click', () => {
        portfolioContent.classList.add('hidden');
        personSelectionModal.classList.remove('hidden');
    });
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
