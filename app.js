// Custom Particle System (Replacement for Particles.js)
class ParticleSystem {
    constructor(canvasId, config) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.config = config;
        this.mouse = { x: null, y: null, radius: 150 };
        
        this.init();
        this.setupEventListeners();
        this.animate();
    }
    
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        for (let i = 0; i < this.config.particleCount; i++) {
            this.particles.push(this.createParticle());
        }
    }
    
    createParticle(x, y) {
        return {
            x: x || Math.random() * this.canvas.width,
            y: y || Math.random() * this.canvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 3 - 1.5,
            speedY: Math.random() * 3 - 1.5,
            color: this.config.particleColor
        };
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
        
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
        
        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
        
        this.canvas.addEventListener('click', (e) => {
            this.particles.push(this.createParticle(e.x, e.y));
            if (this.particles.length > this.config.particleCount + 20) {
                this.particles.shift();
            }
        });
    }
    
    updateParticle(particle) {
        // Move particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off walls
        if (particle.x > this.canvas.width || particle.x < 0) {
            particle.speedX *= -1;
        }
        if (particle.y > this.canvas.height || particle.y < 0) {
            particle.speedY *= -1;
        }
        
        // Mouse repulsion
        if (this.mouse.x !== null && this.mouse.y !== null) {
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.mouse.radius) {
                const angle = Math.atan2(dy, dx);
                const force = (this.mouse.radius - distance) / this.mouse.radius;
                particle.x -= Math.cos(angle) * force * 5;
                particle.y -= Math.sin(angle) * force * 5;
            }
        }
    }
    
    drawParticle(particle) {
        this.ctx.fillStyle = particle.color;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    this.ctx.strokeStyle = this.config.lineColor;
                    this.ctx.globalAlpha = 1 - distance / 150;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
        this.ctx.globalAlpha = 1;
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.updateParticle(particle);
            this.drawParticle(particle);
        });
        
        this.connectParticles();
        
        requestAnimationFrame(() => this.animate());
    }
    
    updateConfig(config) {
        this.config = config;
        
        // Adjust particle count
        while (this.particles.length < config.particleCount) {
            this.particles.push(this.createParticle());
        }
        while (this.particles.length > config.particleCount) {
            this.particles.pop();
        }
        
        // Update particle colors
        this.particles.forEach(particle => {
            particle.color = config.particleColor;
        });
    }
}

// Initialize particle system
let particleSystem = null;

// Configuration constants
const MAX_IMAGE_SIZE_MB = 5;

// User preferences object
let userPreferences = {
    primaryColor: '#667eea',
    secondaryColor: '#764ba2',
    textColor: '#ffffff',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: '16px',
    particleCount: 80,
    profileImage: null,
    userName: 'Your Name',
    userTitle: 'Your Title',
    userBio: 'Your bio goes here. Click to edit.'
};

// Load saved preferences from localStorage
function loadPreferences() {
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
        userPreferences = JSON.parse(saved);
        applyPreferences();
    }
}

// Apply preferences to the page
function applyPreferences() {
    // Apply CSS variables
    document.documentElement.style.setProperty('--primary-color', userPreferences.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', userPreferences.secondaryColor);
    document.documentElement.style.setProperty('--text-color', userPreferences.textColor);
    document.documentElement.style.setProperty('--font-family', userPreferences.fontFamily);
    document.documentElement.style.setProperty('--font-size', userPreferences.fontSize);
    
    // Update form inputs
    document.getElementById('primaryColor').value = userPreferences.primaryColor;
    document.getElementById('secondaryColor').value = userPreferences.secondaryColor;
    document.getElementById('textColor').value = userPreferences.textColor;
    document.getElementById('fontFamily').value = userPreferences.fontFamily;
    document.getElementById('fontSize').value = userPreferences.fontSize;
    document.getElementById('particleCount').value = userPreferences.particleCount;
    document.getElementById('particleCountValue').textContent = userPreferences.particleCount;
    
    // Apply profile data
    if (userPreferences.profileImage) {
        document.getElementById('profileImage').src = userPreferences.profileImage;
    }
    document.getElementById('userName').textContent = userPreferences.userName;
    document.getElementById('userTitle').textContent = userPreferences.userTitle;
    document.getElementById('userBio').textContent = userPreferences.userBio;
    
    // Update particles
    updateParticles();
}

// Save preferences to localStorage
function savePreferences() {
    // Get current values
    userPreferences.primaryColor = document.getElementById('primaryColor').value;
    userPreferences.secondaryColor = document.getElementById('secondaryColor').value;
    userPreferences.textColor = document.getElementById('textColor').value;
    userPreferences.fontFamily = document.getElementById('fontFamily').value;
    userPreferences.fontSize = document.getElementById('fontSize').value;
    userPreferences.particleCount = parseInt(document.getElementById('particleCount').value);
    
    // Get profile data
    userPreferences.userName = document.getElementById('userName').textContent;
    userPreferences.userTitle = document.getElementById('userTitle').textContent;
    userPreferences.userBio = document.getElementById('userBio').textContent;
    
    // Save to localStorage
    localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
    
    // Apply preferences
    applyPreferences();
    
    // Show success message
    showNotification('Preferences saved successfully!');
}

// Reset preferences to default
function resetPreferences() {
    if (confirm('Are you sure you want to reset all preferences to default?')) {
        userPreferences = {
            primaryColor: '#667eea',
            secondaryColor: '#764ba2',
            textColor: '#ffffff',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            fontSize: '16px',
            particleCount: 80,
            profileImage: null,
            userName: 'Your Name',
            userTitle: 'Your Title',
            userBio: 'Your bio goes here. Click to edit.'
        };
        
        // Clear localStorage
        localStorage.removeItem('userPreferences');
        
        // Reset profile image
        document.getElementById('profileImage').src = 'default-avatar.svg';
        
        // Apply default preferences
        applyPreferences();
        
        showNotification('Preferences reset to default!');
    }
}

// Update particles configuration
function updateParticles() {
    if (particleSystem) {
        particleSystem.updateConfig({
            particleCount: userPreferences.particleCount,
            particleColor: 'rgba(255, 255, 255, 0.8)',
            lineColor: 'rgba(255, 255, 255, 0.4)'
        });
    }
}

// Handle image upload
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
            showNotification(`Image size must be less than ${MAX_IMAGE_SIZE_MB}MB`, 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = e.target.result;
            document.getElementById('profileImage').src = imageData;
            userPreferences.profileImage = imageData;
            localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
            showNotification('Profile image updated!');
        };
        reader.readAsDataURL(file);
    }
}

// Show notification message
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? 'rgba(220, 38, 38, 0.9)' : 'rgba(34, 197, 94, 0.9)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particle system
    particleSystem = new ParticleSystem('particles-canvas', {
        particleCount: 80,
        particleColor: 'rgba(255, 255, 255, 0.8)',
        lineColor: 'rgba(255, 255, 255, 0.4)'
    });
    
    // Load saved preferences on page load
    loadPreferences();
    
    // Image upload
    document.getElementById('imageUpload').addEventListener('change', handleImageUpload);
    
    // Save preferences button
    document.getElementById('savePreferences').addEventListener('click', savePreferences);
    
    // Reset preferences button
    document.getElementById('resetPreferences').addEventListener('click', resetPreferences);
    
    // Particle count slider
    document.getElementById('particleCount').addEventListener('input', function(e) {
        document.getElementById('particleCountValue').textContent = e.target.value;
    });
    
    // Real-time color preview
    document.getElementById('primaryColor').addEventListener('input', function(e) {
        document.documentElement.style.setProperty('--primary-color', e.target.value);
    });
    
    document.getElementById('secondaryColor').addEventListener('input', function(e) {
        document.documentElement.style.setProperty('--secondary-color', e.target.value);
    });
    
    document.getElementById('textColor').addEventListener('input', function(e) {
        document.documentElement.style.setProperty('--text-color', e.target.value);
    });
    
    // Real-time font family preview
    document.getElementById('fontFamily').addEventListener('change', function(e) {
        document.documentElement.style.setProperty('--font-family', e.target.value);
    });
    
    // Real-time font size preview
    document.getElementById('fontSize').addEventListener('change', function(e) {
        document.documentElement.style.setProperty('--font-size', e.target.value);
    });
    
    // Save profile info on blur
    document.getElementById('userName').addEventListener('blur', function() {
        userPreferences.userName = this.textContent;
        localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
    });
    
    document.getElementById('userTitle').addEventListener('blur', function() {
        userPreferences.userTitle = this.textContent;
        localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
    });
    
    document.getElementById('userBio').addEventListener('blur', function() {
        userPreferences.userBio = this.textContent;
        localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
    });
});

// Handle browser back/forward navigation
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        loadPreferences();
    }
});
