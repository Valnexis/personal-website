# Testing Guide

This document provides instructions for testing the admin panel and verifying all features work correctly.

## Prerequisites

Before testing, ensure you have:
- MongoDB installed and running (local or MongoDB Atlas)
- Node.js v18+ installed
- All dependencies installed (`npm install`)
- Environment variables configured (`.env.local`)

## Setup for Testing

### 1. Start MongoDB

**Local MongoDB:**
```bash
mongod
```

**MongoDB Atlas:**
Update your `.env.local` with your Atlas connection string.

### 2. Create Environment Configuration

Create `.env.local` file:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
MONGODB_URI=mongodb://localhost:27017/personal-website
JWT_SECRET=your-super-secure-secret-key-here
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Seed the Database

Run the seed script to create sample data:
```bash
node scripts/seed-database.js
```

This will create:
- 1 admin user (admin@example.com / password123)
- 4 regular users with sample portfolios
- Various skills and profile data

### 4. Start the Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000`

## Test Cases

### 1. Public Homepage Testing

**URL:** `http://localhost:3000`

**Expected Behavior:**
- ✅ Page loads without errors
- ✅ Shows "Portfolio Gallery" in the header
- ✅ Displays "Admin Login" button in the header
- ✅ Shows all active user portfolios (should be 3 users)
- ✅ Each portfolio card shows:
  - Profile image (if available)
  - User name
  - Bio
  - Skills (as chips)
- ✅ Inactive users are not displayed
- ✅ Responsive design works on mobile and desktop

**Manual Test:**
1. Open `http://localhost:3000`
2. Verify portfolio cards are displayed
3. Check that John Doe, Jane Smith, and Mike Johnson are visible
4. Verify Sarah Williams is NOT visible (inactive status)
5. Resize browser to test responsiveness

### 2. Login Page Testing

**URL:** `http://localhost:3000/login`

**Test Case 2.1: Successful Admin Login**
- Email: `admin@example.com`
- Password: `password123`

**Expected Behavior:**
- ✅ Form accepts email and password
- ✅ Shows "Logging in..." button state during submission
- ✅ Redirects to `/admin` on success
- ✅ Stores JWT token in localStorage
- ✅ No error messages displayed

**Test Case 2.2: Successful User Login**
- Email: `john@example.com`
- Password: `password123`

**Expected Behavior:**
- ✅ Login succeeds
- ✅ Redirects to homepage `/`
- ✅ Stores JWT token in localStorage

**Test Case 2.3: Invalid Credentials**
- Email: `admin@example.com`
- Password: `wrongpassword`

**Expected Behavior:**
- ✅ Shows error message "Invalid credentials"
- ✅ Does not redirect
- ✅ Form remains accessible

**Test Case 2.4: Empty Fields**
- Leave email or password empty

**Expected Behavior:**
- ✅ HTML5 validation prevents submission
- ✅ Shows "required" field indicators

### 3. Admin Dashboard Testing

**URL:** `http://localhost:3000/admin`

**Prerequisites:** Must be logged in as admin

**Test Case 3.1: Access Control**

*When not logged in:*
- ✅ Redirects to `/login`

*When logged in as regular user:*
- ✅ Redirects to homepage

*When logged in as admin:*
- ✅ Shows admin dashboard

**Test Case 3.2: User List Display**

**Expected Behavior:**
- ✅ Shows all users in a table
- ✅ Table columns: Name, Email, Role, Profile Status, Actions
- ✅ Role chips are color-coded (blue for admin, default for user)
- ✅ Profile status chips are color-coded (green for active, gray for inactive)
- ✅ Edit and Delete buttons are visible for each user
- ✅ Shows "Add User" button at the top
- ✅ Shows "Logout" button in the header

**Manual Test:**
1. Login as admin
2. Verify all 5 users are displayed (1 admin + 4 users)
3. Check that roles are displayed correctly
4. Check that profile statuses are displayed correctly

### 4. Add User Testing

**Test Case 4.1: Add Valid User**

**Steps:**
1. Click "Add User" button
2. Fill in the form:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
   - Role: `user`
   - Profile Status: `active`
   - Bio: `This is a test user`
   - Skills: `JavaScript, React, Testing`
   - Profile Image URL: (optional)
3. Click "Create"

**Expected Behavior:**
- ✅ Dialog closes
- ✅ New user appears in the table
- ✅ Success (no error message)
- ✅ Skills are saved correctly
- ✅ Table refreshes automatically

**Test Case 4.2: Add User with Duplicate Email**

**Steps:**
1. Click "Add User"
2. Use an existing email (e.g., `john@example.com`)
3. Fill other required fields
4. Click "Create"

**Expected Behavior:**
- ✅ Shows error message
- ✅ User is not created
- ✅ Dialog remains open

**Test Case 4.3: Add User with Missing Required Fields**

**Steps:**
1. Click "Add User"
2. Leave name, email, or password empty
3. Try to submit

**Expected Behavior:**
- ✅ HTML5 validation prevents submission
- ✅ Required field indicators shown

### 5. Edit User Testing

**Test Case 5.1: Edit User Information**

**Steps:**
1. Click edit icon for a user
2. Change the name to `Updated Name`
3. Change bio to `Updated bio`
4. Add new skills: `TypeScript, Node.js`
5. Click "Update"

**Expected Behavior:**
- ✅ Dialog closes
- ✅ Changes are reflected in the table
- ✅ Success (no error message)
- ✅ User record is updated in database

**Test Case 5.2: Change User Role**

**Steps:**
1. Click edit icon for a regular user
2. Change role from `user` to `admin`
3. Click "Update"

**Expected Behavior:**
- ✅ Role is updated
- ✅ User now has admin privileges

**Test Case 5.3: Change Profile Status**

**Steps:**
1. Click edit icon for an active user
2. Change profile status to `inactive`
3. Click "Update"
4. Go to homepage

**Expected Behavior:**
- ✅ Profile status is updated
- ✅ User no longer appears on public portfolio page

**Test Case 5.4: Password Field Not Shown**

**Expected Behavior:**
- ✅ Password field is NOT displayed when editing
- ✅ Passwords cannot be changed through edit dialog (security feature)

### 6. Delete User Testing

**Test Case 6.1: Delete User**

**Steps:**
1. Click delete icon for a user
2. Confirm deletion in the browser alert

**Expected Behavior:**
- ✅ Confirmation dialog appears
- ✅ User is removed from the table
- ✅ User is deleted from database
- ✅ Success (no error message)

**Test Case 6.2: Cancel Deletion**

**Steps:**
1. Click delete icon
2. Click "Cancel" in the confirmation dialog

**Expected Behavior:**
- ✅ User is NOT deleted
- ✅ User remains in the table

### 7. Logout Testing

**Steps:**
1. Click "Logout" button in admin header

**Expected Behavior:**
- ✅ Redirects to `/login`
- ✅ JWT token is removed from localStorage
- ✅ Cannot access `/admin` without logging in again

### 8. API Testing

You can test the API endpoints directly using curl or Postman.

**Test Case 8.1: Login API**

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin",
    "profileStatus": "active"
  }
}
```

**Test Case 8.2: Get All Users (Protected)**

```bash
# First, get the token from login response
TOKEN="your-jwt-token-here"

curl -X GET http://localhost:3000/api/users \
  -H "Authorization: Bearer $TOKEN"
```

**Expected Response:**
```json
{
  "users": [...],
  "count": 5
}
```

**Test Case 8.3: Get Public Portfolios**

```bash
curl -X GET http://localhost:3000/api/portfolios
```

**Expected Response:**
```json
{
  "portfolios": [...],
  "count": 3
}
```

**Test Case 8.4: Unauthorized Access**

```bash
curl -X GET http://localhost:3000/api/users
```

**Expected Response:**
```json
{
  "error": "Unauthorized - No token provided"
}
```
Status code: 401

### 9. Security Testing

**Test Case 9.1: Password Hashing**

**Steps:**
1. Check MongoDB directly
2. Look at the password field of any user

**Expected Behavior:**
- ✅ Password is hashed (bcrypt)
- ✅ Password is not stored in plain text
- ✅ Password starts with `$2a$` or `$2b$`

**Test Case 9.2: JWT Token Validation**

**Steps:**
1. Login and get a token
2. Modify the token slightly
3. Try to access `/api/users` with the modified token

**Expected Behavior:**
- ✅ Returns 401 Unauthorized
- ✅ Invalid token is rejected

**Test Case 9.3: Role-Based Access**

**Steps:**
1. Login as regular user
2. Try to access `/api/users` endpoint

**Expected Behavior:**
- ✅ Returns 403 Forbidden
- ✅ Non-admin users cannot access admin endpoints

**Test Case 9.4: Input Validation**

**Steps:**
1. Try to create a user without email
2. Try to create a user with invalid data

**Expected Behavior:**
- ✅ Validation errors are returned
- ✅ Invalid data is not saved to database

### 10. Browser Compatibility Testing

Test the application in different browsers:

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (if available)
- ✅ Edge (latest)

**Expected Behavior:**
- All features work consistently across browsers
- UI renders correctly
- No console errors

### 11. Responsive Design Testing

Test at different viewport sizes:

**Desktop (1920x1080):**
- ✅ Full layout displayed
- ✅ All elements properly spaced

**Tablet (768x1024):**
- ✅ Layout adjusts appropriately
- ✅ Navigation remains accessible
- ✅ Forms are usable

**Mobile (375x667):**
- ✅ Mobile-friendly layout
- ✅ All features accessible
- ✅ No horizontal scrolling
- ✅ Touch targets are adequate size

## Performance Testing

### Build Size
```bash
npm run build
```

**Expected:**
- ✅ Build completes without errors
- ✅ No excessive bundle sizes
- ✅ Optimized for production

### Load Time
**Expected:**
- ✅ Homepage loads in < 3 seconds
- ✅ Admin panel loads in < 3 seconds
- ✅ API responses in < 500ms (with local MongoDB)

## Known Limitations

1. **No File Upload:** Profile images must be provided as URLs
2. **No Email Verification:** Users are created without email verification
3. **No Password Reset:** Password reset functionality not implemented
4. **No Pagination:** All users are loaded at once (not suitable for large datasets)
5. **No Search/Filter:** No search functionality in the user table
6. **Local MongoDB Required:** Application requires MongoDB to be running

## Troubleshooting

### Issue: MongoDB Connection Error
**Solution:** Ensure MongoDB is running and connection string is correct

### Issue: JWT Token Invalid
**Solution:** Clear localStorage and login again

### Issue: Port 3000 Already in Use
**Solution:** Kill the process using port 3000 or change the port

### Issue: Build Errors
**Solution:** Delete `.next` folder and run `npm run build` again

## Reporting Issues

If you find any bugs or issues during testing:
1. Note the exact steps to reproduce
2. Check browser console for errors
3. Verify environment configuration
4. Create a detailed issue report

## Summary

This testing guide covers all major features and scenarios. Following these test cases ensures the admin panel is working correctly and securely. All tests should pass before deploying to production.
