# 4. Authentication Architecture (JWT Only)

## 4.1 Auth Flow

1.  **Login:**
      * Client sends `POST /auth/login` with `{ username, password }`.
      * Backend verifies hash (bcrypt).
      * Backend issues `accessToken` (15m expiry) and `refreshToken` (7d expiry).
      * Tokens returned in JSON body (or HTTPOnly cookies if preferred).
2.  **Protected Requests:**
      * Client sends `Authorization: Bearer <accessToken>`.
      * Middleware verifies signature.
3.  **Refresh:**
      * Client sends `POST /auth/refresh` with `refreshToken`.
      * Backend verifies and issues new pair.

## 4.2 Auth Controller Structure

```javascript
// backend/src/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  
  // 1. Find User
  const user = await User.findOne({ where: { username } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  // 2. Check Password
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  // 3. Generate Tokens

