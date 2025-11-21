# Personal Website

A dynamic and customizable personal website with profile image support and beautiful particle effects.

## Features

### 1. Profile Images
- **Upload Profile Pictures**: Click the "Upload Image" button to select and upload your profile picture
- **Image Preview**: Instantly see your uploaded image in the profile section
- **Persistent Storage**: Profile images are saved locally and persist across sessions
- **Size Limit**: Maximum image size of 5MB for optimal performance
- **Hover Effects**: Smooth animations on hover for better user interaction

### 2. Dynamic Styling
- **Custom Particle Background**: Beautiful moving particles in the background that respond to mouse interactions
  - Hover to repulse particles
  - Click to add new particles
  - Fully customizable particle count (20-150 particles)
  - Smooth canvas-based animation
- **Color Customization**: 
  - Primary color (gradient start)
  - Secondary color (gradient end)
  - Text color
- **Typography Options**:
  - Multiple font family choices (Arial, Times New Roman, Courier New, Georgia, Comic Sans)
  - Font size options (Small, Medium, Large, Extra Large)
- **Real-time Preview**: See changes immediately as you adjust settings
- **Save & Reset**: Save your preferences or reset to default settings

### 3. Responsive Design
- Mobile-friendly layout that adapts to all screen sizes
- Optimized for tablets, phones, and desktop displays
- Touch-friendly controls for mobile devices

### 4. Editable Profile
- Click to edit your name, title, and bio directly on the page
- Changes are automatically saved to local storage
- Persistent across browser sessions

## Getting Started

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. No build process or dependencies required!

### Usage

1. **Upload Your Profile Image**:
   - Click the "Upload Image" button
   - Select an image from your device (max 5MB)
   - Your image will be displayed immediately

2. **Customize Your Profile**:
   - Click on "Your Name" to edit your name
   - Click on "Your Title" to edit your title
   - Click on "Your bio" to edit your bio

3. **Adjust Styling Preferences**:
   - Choose your primary and secondary colors using the color pickers
   - Select your preferred font family and size
   - Adjust the particle count with the slider
   - Click "Save Preferences" to persist your changes
   - Click "Reset to Default" to restore default settings

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with CSS variables, flexbox, and grid
- **JavaScript (ES6+)**: Dynamic functionality and local storage
- **Canvas API**: Custom particle animation system for interactive backgrounds

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Local Storage
The website uses browser's localStorage to save:
- Profile image (as base64 encoded string)
- User information (name, title, bio)
- Style preferences (colors, fonts, particle count)

### File Structure
```
personal-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── app.js              # JavaScript functionality
├── default-avatar.svg  # Default profile picture
└── README.md           # Documentation
```

## Features in Detail

### Custom Particle System
The website uses a custom Canvas-based particle system to create an interactive background:
- Particles move continuously across the screen
- Mouse hover repels nearby particles
- Clicking adds new particles
- Particle count can be customized (20-150 particles)
- Responsive to window resizing
- Optimized for performance

### Glassmorphism Design
Modern UI design with:
- Backdrop blur effects
- Semi-transparent containers
- Smooth shadows and borders
- Professional appearance

### Accessibility
- High contrast text for readability
- Clear focus indicators for keyboard navigation
- Semantic HTML structure
- Responsive font sizes

## Customization

### Modifying Default Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --text-color: #ffffff;
    --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    --font-size: 16px;
}
```

### Adding More Font Options
Edit the font family dropdown in `index.html`:
```html
<select id="fontFamily">
    <option value="'Your Font', sans-serif">Your Font Name</option>
</select>
```

### Adjusting Particle Settings
Modify the ParticleSystem initialization in `app.js`:
```javascript
particleSystem = new ParticleSystem('particles-canvas', {
    particleCount: 80,
    particleColor: 'rgba(255, 255, 255, 0.8)',
    lineColor: 'rgba(255, 255, 255, 0.4)'
});
```

## Testing

### Manual Testing Checklist
- ✅ Upload and display profile images
- ✅ Edit profile information (name, title, bio)
- ✅ Change primary and secondary colors
- ✅ Change text color
- ✅ Switch font families
- ✅ Adjust font sizes
- ✅ Modify particle count
- ✅ Save preferences to localStorage
- ✅ Reset preferences to default
- ✅ Responsive design on mobile devices
- ✅ Particle interactions (hover, click)
- ✅ Data persistence across page reloads

### Testing Instructions
1. Open the website in a browser
2. Test image upload with various file types and sizes
3. Edit all profile fields and verify they save
4. Test each customization option
5. Click "Save Preferences" and refresh the page
6. Verify all settings persist
7. Test on different screen sizes
8. Test particle interactions (hover and click)

## Troubleshooting

### Images Not Displaying
- Check that the image file is less than 5MB
- Ensure you're using a supported image format (JPEG, PNG, GIF, WebP)
- Check browser console for errors

### Preferences Not Saving
- Ensure localStorage is enabled in your browser
- Check if you're in private/incognito mode (some browsers restrict localStorage)
- Clear browser cache and try again

### Particles Not Showing
- Check browser console for JavaScript errors
- Ensure Canvas API is supported in your browser
- Try reducing particle count if performance is an issue

## License

This project is open source and available for personal and commercial use.

## Credits

- Design inspiration from modern glassmorphism trends
- Custom particle system implementation using Canvas API

## Future Enhancements

Possible improvements:
- Social media links section
- Multiple profile support
- Export/import settings
- Dark/light mode toggle
- Additional particle animation presets
- Contact form integration
- Portfolio/projects section
- Skill tags and progress bars

## Support

For issues or questions, please open an issue in the repository.

---

**Enjoy your personalized website! 🎨✨**
