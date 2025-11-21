# Personal Website with Admin Panel

A modern personal website built with Next.js and TypeScript, featuring a professional admin panel for managing user profiles and portfolios.

## Features

### Public Website
- **Portfolio Gallery**: Display active user portfolios with their profiles, skills, and work
- **Responsive Design**: Mobile-friendly interface using Material-UI components
- **Modern UI**: Clean and professional design

### Admin Panel
- **User Management**: Complete CRUD operations for user profiles
- **Authentication**: Secure JWT-based authentication with role-based access control
- **Profile Management**: 
  - Add new users with profiles
  - Edit existing user information
  - Delete users
  - Manage user roles (Admin/User)
  - Control profile status (Active/Inactive)
- **Portfolio Management**: Update user bio, skills, and portfolio items
- **Professional UI**: Material-UI based admin interface

## Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **UI Framework**: Material-UI (MUI) v7
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcrypt for password hashing
- **Styling**: TailwindCSS + Material-UI

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local instance or MongoDB Atlas account)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd personal-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.example .env.local
   ```
   
   Update the following variables in `.env.local`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/personal-website
   JWT_SECRET=your-super-secure-secret-key-here
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

   **Important Security Notes**:
   - Change the `JWT_SECRET` to a strong, random string in production
   - Never commit the `.env.local` file to version control
   - Use environment-specific configuration for different deployments

4. **Start MongoDB**
   
   If using local MongoDB:
   ```bash
   mongod
   ```
   
   Or use MongoDB Atlas for cloud hosting.

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## Initial Admin Setup

To create the first admin user, you can use one of the following methods:

### Method 1: Using the Registration API

Make a POST request to create the first admin user:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "securepassword123",
    "role": "admin"
  }'
```

### Method 2: Using MongoDB directly

Connect to your MongoDB instance and insert an admin user:

```javascript
// After hashing password with bcrypt
db.users.insertOne({
  name: "Admin User",
  email: "admin@example.com",
  password: "$2a$10$...", // Use bcrypt to hash your password
  role: "admin",
  profileStatus: "active",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

### Method 3: Create a setup script

Run this Node.js script to create an admin (create as `scripts/create-admin.js`):

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  await mongoose.connect('mongodb://localhost:27017/personal-website');
  
  const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    profileStatus: String,
  }, { timestamps: true });
  
  const User = mongoose.models.User || mongoose.model('User', UserSchema);
  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin123', salt);
  
  await User.create({
    name: 'Admin',
    email: 'admin@example.com',
    password: hashedPassword,
    role: 'admin',
    profileStatus: 'active'
  });
  
  console.log('Admin user created!');
  process.exit(0);
}

createAdmin();
```

Run with: `node scripts/create-admin.js`

## Using the Application

### Accessing the Admin Panel

1. Navigate to `http://localhost:3000/login`
2. Enter your admin credentials
3. You'll be redirected to the admin dashboard at `http://localhost:3000/admin`

### Admin Panel Features

**User Management Table:**
- View all users with their name, email, role, and profile status
- Search and filter users
- Edit user profiles by clicking the edit icon
- Delete users by clicking the delete icon

**Add New User:**
- Click the "Add User" button
- Fill in the user details:
  - Name (required)
  - Email (required)
  - Password (required for new users)
  - Role (Admin or User)
  - Profile Status (Active or Inactive)
  - Bio
  - Skills (comma-separated)
  - Profile Image URL

**Edit User:**
- Click the edit icon next to any user
- Update user information
- Note: Password cannot be updated through this interface for security reasons

**Delete User:**
- Click the delete icon
- Confirm the deletion

### Public Portfolio View

Navigate to `http://localhost:3000` to view the public portfolio gallery showing all active user profiles.

## Security Features

### Implemented Security Measures

1. **Password Security**
   - Passwords are hashed using bcrypt with salt
   - Passwords are never stored in plain text
   - Password fields are excluded from API responses

2. **Authentication**
   - JWT-based authentication
   - Tokens expire after 7 days
   - Authorization headers required for protected routes

3. **Role-Based Access Control**
   - Admin-only routes protected by middleware
   - Non-admin users cannot access admin panel
   - Proper HTTP status codes (401 Unauthorized, 403 Forbidden)

4. **API Security**
   - Input validation on all endpoints
   - Error messages don't leak sensitive information
   - MongoDB injection protection through Mongoose

5. **HTTPS Recommendation**
   - Always use HTTPS in production
   - Configure SSL/TLS certificates
   - Set secure cookie flags

### Production Security Checklist

Before deploying to production:

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Use HTTPS/SSL certificates
- [ ] Set up proper CORS policies
- [ ] Enable rate limiting on API routes
- [ ] Use environment-specific configurations
- [ ] Set up MongoDB authentication
- [ ] Enable MongoDB encryption at rest
- [ ] Implement CSRF tokens for form submissions
- [ ] Add request logging and monitoring
- [ ] Set up proper error handling without information leakage
- [ ] Use secure session management
- [ ] Implement account lockout after failed login attempts
- [ ] Add two-factor authentication (2FA) for admin accounts

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Users (Admin only - requires Bearer token)
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `GET /api/users/[id]` - Get specific user
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user

### Portfolios (Public)
- `GET /api/portfolios` - Get all active portfolios

## Project Structure

```
personal-website/
├── app/
│   ├── admin/              # Admin panel pages
│   ├── api/                # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── users/         # User management endpoints
│   │   └── portfolios/    # Portfolio endpoints
│   ├── login/             # Login page
│   ├── layout.tsx         # Root layout with MUI theme
│   ├── page.tsx           # Home page (portfolio gallery)
│   └── theme.ts           # MUI theme configuration
├── components/            # Reusable React components
├── lib/
│   ├── api.ts            # API client functions
│   ├── auth.ts           # JWT utilities
│   └── mongodb.ts        # Database connection
├── middleware/
│   └── auth.ts           # Authentication middleware
├── models/
│   └── User.ts           # User model schema
├── types/
│   ├── mongoose.d.ts     # Mongoose type definitions
│   └── user.ts           # User type definitions
└── public/               # Static assets
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality

The project uses:
- TypeScript for type safety
- ESLint for code linting
- Next.js best practices

## Troubleshooting

### MongoDB Connection Issues

If you encounter MongoDB connection errors:
1. Ensure MongoDB is running: `mongod`
2. Check the connection string in `.env.local`
3. Verify network access if using MongoDB Atlas

### Authentication Issues

If login fails:
1. Verify the user exists in the database
2. Check JWT_SECRET is set correctly
3. Clear browser localStorage and try again

### Build Errors

If you encounter build errors:
1. Delete `.next` folder and `node_modules`
2. Run `npm install` again
3. Run `npm run build`

## Contributing

Contributions are welcome! Please follow these guidelines:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Create an issue in the GitHub repository
- Check existing documentation
- Review the troubleshooting section

## Future Enhancements

Potential features for future versions:
- File upload for profile images
- Two-factor authentication
- User activity logs
- Advanced search and filtering
- Email notifications
- Portfolio project management with image galleries
- Social media integration
- Analytics dashboard
- API rate limiting
- Audit logging for admin actions

