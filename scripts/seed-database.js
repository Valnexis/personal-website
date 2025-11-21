const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/personal-website';
    console.log('Connecting to MongoDB:', mongoUri);
    
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB successfully!\n');

    const UserSchema = new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      role: String,
      profileImage: String,
      bio: String,
      skills: [String],
      portfolioItems: [{
        title: String,
        description: String,
        imageUrl: String,
        projectUrl: String,
      }],
      profileStatus: String,
    }, { timestamps: true });

    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Hash password for all users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      profileStatus: 'active',
      bio: 'System Administrator',
    });
    console.log('✅ Created admin user');

    // Create sample users with portfolios
    const sampleUsers = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword,
        role: 'user',
        profileStatus: 'active',
        bio: 'Full-stack developer passionate about creating amazing web applications.',
        skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'TypeScript'],
        profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        portfolioItems: [
          {
            title: 'E-commerce Platform',
            description: 'Built a scalable e-commerce platform using React and Node.js',
            projectUrl: 'https://example.com/project1',
          },
        ],
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: hashedPassword,
        role: 'user',
        profileStatus: 'active',
        bio: 'UI/UX Designer with a passion for creating beautiful and intuitive interfaces.',
        skills: ['Figma', 'Adobe XD', 'CSS', 'HTML', 'React'],
        profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        portfolioItems: [
          {
            title: 'Mobile App Design',
            description: 'Designed a mobile app for a fintech startup',
          },
        ],
      },
      {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        password: hashedPassword,
        role: 'user',
        profileStatus: 'active',
        bio: 'Backend engineer specializing in scalable systems and cloud architecture.',
        skills: ['Python', 'Django', 'AWS', 'Docker', 'PostgreSQL'],
        profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        portfolioItems: [
          {
            title: 'Cloud Migration',
            description: 'Led cloud migration for enterprise application',
          },
        ],
      },
      {
        name: 'Sarah Williams',
        email: 'sarah@example.com',
        password: hashedPassword,
        role: 'user',
        profileStatus: 'inactive',
        bio: 'Data scientist with expertise in machine learning and analytics.',
        skills: ['Python', 'TensorFlow', 'Pandas', 'SQL'],
      },
    ];

    for (const userData of sampleUsers) {
      await User.create(userData);
      console.log(`✅ Created user: ${userData.name}`);
    }

    console.log('\n✅ Database seeded successfully!');
    console.log('\nYou can now login with:');
    console.log('Admin: admin@example.com / password123');
    console.log('User: john@example.com / password123');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seedDatabase();
