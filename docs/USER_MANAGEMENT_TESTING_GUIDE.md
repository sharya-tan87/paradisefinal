# User Management Testing Guide

**Date:** 2025-12-20
**Issue:** Admin dashboard shows "Invalid token" and "No users found"
**Status:** ✅ RESOLVED - User needs to login first

---

## 🔍 Issue Diagnosis Summary

### What We Found

1. **✅ Backend API: FULLY FUNCTIONAL**
   - All 5 test users exist in database
   - Authentication endpoints working perfectly
   - Admin endpoints tested and verified
   - Database connection stable

2. **✅ Database: POPULATED**
   - 5 users exist: admin, manager, dentist, staff, patient
   - All users active and ready for login
   - Password hashes stored correctly (bcrypt 10 rounds)

3. **❌ Frontend: "Invalid token" Error**
   - **ROOT CAUSE:** User is NOT logged in
   - No authentication token in localStorage
   - Direct navigation to `/dashboard/admin` bypasses login
   - ProtectedRoute requires valid JWT token

### phpMyAdmin Showing 0 Rows - NOT A BUG!

**This is a known MySQL privilege context issue** (documented in `docs/PHPMYADMIN_FIX.md`):

- phpMyAdmin connects as `root@localhost` (Unix socket)
- Users table created via `antimize@127.0.0.1` (TCP connection)
- MySQL treats these as different privilege contexts
- **Solution:** Login to phpMyAdmin as `antimize` user to see the data

---

## ✅ Complete Testing Instructions

### Prerequisites

**Servers Running:**
- ✅ Backend API: `http://localhost:3001` (check with browser, should show "Welcome to Paradise Dental API")
- ✅ Frontend: `http://localhost:5173` (Vite dev server)
- ✅ Database: MariaDB on port 3306

**Test Credentials:**
- Username: `admin`
- Password: `antimize`
- Role: admin

---

## 📋 Step-by-Step Testing Procedure

### Step 1: Clear Browser State (IMPORTANT!)

**This ensures you're starting fresh:**

1. Open Developer Tools (F12 or Cmd+Option+I)
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Find **Local Storage** → `http://localhost:5173`
4. Click **Clear All** or delete the `user` key
5. Close and reopen the browser tab

### Step 2: Navigate to Login Page

1. Open browser: **http://localhost:5173/login**
2. You should see the Paradise Dental login form
3. Form should have username and password fields

### Step 3: Login as Admin

1. Enter credentials:
   - **Username:** `admin`
   - **Password:** `antimize`

2. Click **Login** button

3. **Expected Result:**
   - Success message or redirect to dashboard
   - Token saved in localStorage
   - User object stored in browser

4. **Verify Login Success:**
   - Open Developer Tools → Application → Local Storage
   - Check for `user` key
   - Should contain: `{ accessToken: "...", refreshToken: "...", user: {...} }`

### Step 4: Navigate to User Management

**Option A: Via Navigation Menu**
1. Look for "Admin Tools" or "User Management" in the navigation
2. Should only be visible for admin role
3. Click the menu item

**Option B: Direct URL**
1. Navigate to: **http://localhost:5173/dashboard/admin**
2. Page should load without "Invalid token" error

### Step 5: Verify User List Displays

**Expected Results:**

1. **Page Header:**
   - Title: "User Management"
   - Subtitle: "Create and manage user accounts"
   - "Add User" button (teal/green color) in top right

2. **Search & Filters:**
   - Search input: "Search by username or email..."
   - Role dropdown: "All Roles" selected by default
   - Filter button

3. **User Table (Desktop) or Cards (Mobile):**

   Should display **5 users**:

   | Username | Email | Role | Status | Actions |
   |----------|-------|------|--------|---------|
   | patient | patient@paradisedental.com | patient | Active | Edit, Reset, Deactivate |
   | staff | staff@paradisedental.com | staff | Active | Edit, Reset, Deactivate |
   | manager | manager@paradisedental.com | manager | Active | Edit, Reset, Deactivate |
   | admin | admin@paradisedental.com | admin | Active | Edit, Reset, Deactivate |
   | dentist | dentist@paradisedental.com | dentist | Active | Edit, Reset, Deactivate |

4. **NO error messages:**
   - ❌ "Invalid token" should NOT appear
   - ❌ "No users found" should NOT appear
   - ✅ User list should be fully populated

### Step 6: Test Search & Filter (Optional)

**Test Search:**
1. Type "admin" in search box
2. Click "Filter" button
3. Should show only admin user

**Test Role Filter:**
1. Select "Dentist" from dropdown
2. Click "Filter" button
3. Should show only dentist user

**Reset Filters:**
1. Clear search box
2. Select "All Roles"
3. Click "Filter"
4. Should show all 5 users again

### Step 7: Test Create User (Optional)

1. Click **"Add User"** button (top right)
2. Modal should open: "Create New User"
3. Fill in form:
   - Username: `testuser`
   - Email: `test@paradisedental.com`
   - Password: `TestPass123`
   - Role: `Staff`
   - First Name: `Test`
   - Last Name: `User`

4. Click **"Create User"** button
5. **Expected Result:**
   - Success message appears
   - User list refreshes
   - New user appears in the table (6 users total)

### Step 8: Test Edit User (Optional)

1. Find any user in the list
2. Click **Edit icon** (pencil/edit button)
3. Modal opens with user data pre-filled
4. Change email or role
5. Click **"Save"** or **"Update User"**
6. **Expected Result:**
   - Success message
   - User list refreshes
   - Changes reflected in table

### Step 9: Test Reset Password (Optional)

1. Click **Key icon** (reset password) for any user
2. Confirmation modal appears
3. Click **"Reset Password"**
4. **Expected Result:**
   - Success message
   - Temporary password displayed (copy icon available)
   - Password shown only once (security feature)

### Step 10: Test Deactivate/Activate (Optional)

1. Click **Deactivate icon** (red X) for any user
2. Confirmation modal: "Are you sure?"
3. Click **"Deactivate"**
4. **Expected Result:**
   - Success message
   - User status changes to "Inactive" (red badge)
   - Deactivate button changes to Activate button (green)

5. Click **Activate button** to reactivate
6. User status returns to "Active"

---

## 🐛 Troubleshooting

### Still Seeing "Invalid token"?

**Possible Causes & Solutions:**

1. **Not Logged In**
   - ✅ Solution: Go to `/login` and login first
   - Verify token exists in localStorage

2. **Token Expired (15-minute timeout)**
   - ✅ Solution: Login again to get fresh token
   - Tokens expire for security

3. **Cached Old Token**
   - ✅ Solution: Clear localStorage (see Step 1)
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

4. **Wrong Backend URL**
   - ✅ Check `frontend/.env` has: `VITE_API_BASE_URL=http://localhost:3001/api`
   - Restart frontend dev server after .env changes

### Still Seeing "No users found"?

1. **Check backend is running:**
   ```bash
   curl http://localhost:3001/api/test
   ```
   Should return: `{"message":"API connection successful"}`

2. **Verify users exist in database:**
   ```bash
   cd backend
   node scripts/test-admin-api.js
   ```
   Should show 5 users

3. **Check browser console (F12 → Console):**
   - Look for API errors
   - Check network requests (Network tab)
   - Look for 401 Unauthorized errors

### phpMyAdmin Shows 0 Rows?

**This is NORMAL!** Follow instructions in `docs/PHPMYADMIN_FIX.md`:

1. Logout from phpMyAdmin
2. Login with these credentials:
   - Username: `antimize`
   - Password: `@Nt!mize09122025`
   - Server: `127.0.0.1`
3. Navigate to `paradisedental` database
4. All 9 tables will now be visible!

---

## ✅ Success Criteria Checklist

After following this guide, you should be able to confirm:

- [ ] Login page accessible at `/login`
- [ ] Can login with admin/antimize credentials
- [ ] Token saved in localStorage after login
- [ ] Admin dashboard accessible at `/dashboard/admin`
- [ ] NO "Invalid token" error message
- [ ] User Management page displays "User Management" header
- [ ] User list shows **5 users** (admin, manager, dentist, staff, patient)
- [ ] All users show "Active" status (green badge)
- [ ] "Add User" button visible in top right
- [ ] Search and filter controls present
- [ ] Action buttons visible (Edit, Reset Password, Deactivate)
- [ ] Can click "Add User" and modal opens
- [ ] Browser console shows NO errors

---

## 📊 Backend Verification Commands

Run these from `/backend` directory to verify system state:

### Check Users in Database
```bash
node scripts/verify-login.js
```
**Expected Output:**
```
✅ Database connected
User found: { username: 'admin', role: 'admin', ... }
Password verification:
  Test password: antimize
  Hash valid: ✅ YES
```

### Test Complete Admin API Flow
```bash
node scripts/test-admin-api.js
```
**Expected Output:**
```
=== Testing Admin API Flow ===
1. Logging in as admin...
✅ Login successful!

2. Fetching users with admin token...
✅ Users fetched successfully!
   Status: 200
   Users count: 5
```

### Test Frontend Authentication Flow
```bash
node scripts/test-frontend-flow.js
```
**Shows correct authentication sequence**

---

## 🔧 System Status Verification

| Component | Check Command | Expected Result |
|-----------|---------------|-----------------|
| **Backend** | `curl http://localhost:3001/api/test` | `{"message":"API connection successful"}` |
| **Frontend** | Visit `http://localhost:5173` | Paradise Dental homepage loads |
| **Database** | `node scripts/verify-login.js` | Admin user found, password valid |
| **Login API** | `node scripts/test-admin-api.js` | Login successful, 5 users returned |
| **Auth Flow** | `node scripts/test-frontend-flow.js` | Complete flow succeeds |

---

## 📝 Important Notes

1. **Tokens Expire:** Access tokens last 15 minutes. After expiry, you must login again.

2. **localStorage Required:** The app stores authentication tokens in browser localStorage. Don't clear browser data while testing.

3. **CORS:** Backend configured to accept requests from `http://localhost:5173` only.

4. **phpMyAdmin Caveat:** Use `antimize` credentials to view tables (see PHPMYADMIN_FIX.md).

5. **Test Users:** All 5 test users have password `password123` EXCEPT admin has `antimize`.

6. **Database Privileges:** Tables created via TCP connection (127.0.0.1) with antimize user.

---

## 🎯 Summary

**The Issue:**
Frontend showed "Invalid token" because user attempted to access `/dashboard/admin` without logging in first.

**The Solution:**
1. Navigate to `/login`
2. Login with admin/antimize
3. Then access `/dashboard/admin`

**System Status:**
- ✅ Backend API: Fully functional
- ✅ Database: 5 users exist and ready
- ✅ Authentication: Working correctly
- ✅ Admin endpoints: Tested and verified

**Ready for Use:** Yes, follow the testing procedure above.

---

**Document Created:** 2025-12-20
**Last Updated:** 2025-12-20
**Tested By:** James (Developer Agent)
**Status:** ✅ All Systems Operational
