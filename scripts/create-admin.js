const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => {
    rl.question(query, resolve);
  });
}

async function createAdmin() {
  try {
    console.log('\n=== Admin User Creation Script ===\n');

    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/personal-website';
    console.log(`Connecting to MongoDB: ${mongoUri}`);
    
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB successfully!\n');

    const UserSchema = new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      role: String,
      profileStatus: String,
    }, { timestamps: true });

    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    // Get user input
    const name = await question('Enter admin name: ');
    const email = await question('Enter admin email: ');
    const password = await question('Enter admin password: ');

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('\n❌ Error: User with this email already exists!');
      process.exit(1);
    }

    // Hash password
    console.log('\nHashing password...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin user
    console.log('Creating admin user...');
    await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
      profileStatus: 'active'
    });

    console.log('\n✅ Admin user created successfully!');
    console.log(`\nYou can now login at http://localhost:3000/login with:`);
    console.log(`Email: ${email}`);
    console.log(`Password: [the password you entered]`);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    rl.close();
    await mongoose.connection.close();
    process.exit(0);
  }
}

createAdmin();
