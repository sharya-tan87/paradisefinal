# Secure Deployment & Demo Guide

This guide explains how to securely run your tests using GitHub Actions and how to set up a live demo for your customer.

## 1. Automated Testing (GitHub Actions)

We have configured a "Continuous Integration" (CI) workflow in `.github/workflows/ci.yml`.
Every time you push code to GitHub, this workflow will automatically:
1.  Install dependencies for both Frontend and Backend.
2.  Run Lints and Tests (ensuring no syntax errors).
3.  Verify the Frontend builds successfully.

**Why is this secure?**
- It runs in an isolated environment.
- It ensures broken code doesn't get merged if you use Pull Requests.
- You don't need to give anyone access to your local machine.

## 2. Setting up a Customer Demo (Live Deployment)

To let your customer "see" the demo, the application needs to be hosted on the internet.
Since your app uses **Node.js** and **MySQL**, static hosting (like GitHub Pages) is not enough.

We recommend **Render.com** or **Railway.app** as they support full-stack apps securely.

### Recommended: Deploying on Render.com

#### Pre-requisites:
- A GitHub account (you already have this).
- A Render.com account (Free tier available).

#### Step 1: Database (MySQL)
1.  On Render, create a new **PostgreSQL** or **MySQL** (if available on free tier, otherwise Railway is better for MySQL).
    *   *Note: If Render charges for MySQL, use Railway.app or PlanetScale for the database.*
2.  Get the `DATABASE_URL` or credentials (Host, User, Password, DB Name).

#### Step 2: Backend Deployment
1.  Create a "Web Service" on Render.
2.  Connect your GitHub repository `paradiserev6`.
3.  **Root Directory**: `backend`
4.  **Build Command**: `npm install`
5.  **Start Command**: `node server.js`
6.  **Environment Variables (The Secure Part)**:
    - Go to the "Environment" tab.
    - Add your secrets here. **DO NOT commit `.env` files to GitHub.**
    - Keys needed:
        - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
        - `JWT_SECRET`
        - `PORT` (usually Render sets this, but your code might need `8080` or `10000`)

#### Step 3: Frontend Deployment
1.  Create a "Static Site" on Render.
2.  Connect your GitHub repository.
3.  **Root Directory**: `frontend`
4.  **Build Command**: `npm run build`
5.  **Publish Directory**: `dist`
6.  **Environment Variables**:
    - `VITE_API_BASE_URL`: The URL of your deployed Backend (from Step 2).

### Security Best Practices

1.  **Never commit `.env` files**: Add `.env` to your `.gitignore` (already done).
2.  **Use GitHub Secrets**: If you want to run tests that require DB validation in GitHub Actions, go to `Repo Settings > Secrets and variables > Actions` and add your secrets there.
3.  **Least Privilege**: Create a specific database user for your app with only the permissions it needs.

## Quick Demo (Alternative)

If you just want to show it from your machine without deploying:
1.  Run the app locally.
2.  Use a tool like **ngrok**.
    - Backend: `ngrok http 5000` (gives a public URL).
    - Frontend: Start it, and update the API URL to the ngrok backend URL.
    - *Warning: This is less stable and only works while your computer is on.*
