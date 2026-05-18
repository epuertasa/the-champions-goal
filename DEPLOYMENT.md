# 🚀 Deployment Guide

This guide will help you deploy **The Champions Goal** to Vercel and make it live on the internet.

<br>

## 📋 Prerequisites

- GitHub account with your repository pushed
- Vercel account (create free at [vercel.com](https://vercel.com))
- Node.js installed locally (for testing before deployment)

<br>

## 🌐 Step-by-Step Deployment

### 1️⃣ Push Your Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: The Champions Goal blog"

# Add remote repository
git remote add origin https://github.com/YOUR-USERNAME/the-champions-goal.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 2️⃣ Deploy via Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com) and sign in/sign up**

2. **Click "Add New..." → "Project"**

3. **Import your GitHub repository**
   - Click "Import Git Repository"
   - Paste your repository URL: `https://github.com/YOUR-USERNAME/the-champions-goal`
   - Click "Continue"

4. **Configure Project Settings**
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `dist` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)

5. **Environment Variables (if needed)**
   - Add any environment variables needed
   - Leave empty if not required

6. **Click "Deploy"**

Your deployment will start automatically. Wait for the build to complete (usually 2-3 minutes).

<br>

### 3️⃣ Deploy via Vercel CLI (Alternative)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to your Vercel account
vercel login

# Deploy from your project directory
vercel

# For production deployment
vercel --prod
```

<br>

## ✅ Post-Deployment Checklist

- [ ] Access your site via the Vercel URL provided
- [ ] Test all pages and sections load correctly
- [ ] Check responsive design on mobile devices
- [ ] Verify animations and interactions work smoothly
- [ ] Test navigation and links
- [ ] Check performance metrics in Vercel dashboard

<br>

## 🔧 Environment Variables

If your project needs environment variables:

1. Go to **Project Settings** → **Environment Variables**
2. Add your variables (e.g., API keys, URLs)
3. Set them for Development, Preview, and Production environments as needed
4. Redeploy after adding variables

<br>

## 📊 Custom Domain Setup

### Connect a Custom Domain

1. Go to **Project Settings** → **Domains**
2. Click "Add" and enter your domain
3. Follow Vercel's instructions to update DNS records
4. Wait for DNS propagation (up to 24 hours)

### Popular Domain Registrars
- GoDaddy
- Namecheap
- Google Domains
- Cloudflare

<br>

## 🔐 Security & Performance

### Optimization Tips

1. **Enable automatic HTTPS** (enabled by default)
2. **Set up edge middleware** if needed for redirects/auth
3. **Configure caching headers** for static assets
4. **Monitor performance** via Vercel Analytics

### Security Headers

Vercel automatically adds security headers. You can customize them in `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

<br>

## 📈 Monitoring & Analytics

### Vercel Dashboard Features

- **Deployments:** Track all your deployments and rollbacks
- **Performance:** View Core Web Vitals and performance metrics
- **Analytics:** Monitor user traffic and engagement
- **Logs:** Debug errors and issues in real-time

### Enable Web Analytics

1. Go to **Settings** → **Analytics**
2. Enable "Vercel Analytics"
3. Access analytics from project dashboard

<br>

## 🐛 Troubleshooting

### Common Issues

**Build Fails**
```bash
# Clear Vercel cache and rebuild
vercel --prod --force
```

**Environment Variables Not Working**
- Verify variable names match your code
- Ensure variables are added to all environments
- Redeploy after changes

**Slow Performance**
- Check for unused dependencies
- Optimize images and assets
- Enable caching headers

**Page Not Found (404)**
- Verify routing configuration
- Check `vercel.json` for redirect rules
- Ensure all pages are exported properly

<br>

## 🔄 Continuous Deployment

Vercel automatically deploys when you:
- Push to your main branch (Production)
- Create a Pull Request (Preview deployment)
- Push to other branches (Preview deployment)

### Disable Auto-Deployment

If needed, disable in **Project Settings** → **Git** → **Deployments**

<br>

## 📱 Preview Deployments

Every commit to non-main branches creates a preview URL:
- Preview URL: `https://the-champions-goal-git-branch-name.vercel.app`
- Perfect for testing before merging to main
- Share preview URL with team members

<br>

## 🚢 Rollback

If something goes wrong:

1. Go to **Deployments** tab
2. Click the three dots on the previous successful deployment
3. Select "Promote to Production"

<br>

## 💡 Pro Tips

1. **Use branch deployments** for testing new features
2. **Enable notifications** for deployment status
3. **Set up analytics** to track user engagement
4. **Use environment variables** for API keys and secrets
5. **Monitor build times** and optimize if needed

<br>

## 🆘 Need Help?

- **Vercel Documentation:** https://vercel.com/docs
- **GitHub Issues:** Create an issue in the repository
- **Email:** erpuam25@bemen3.cat

<br>

<div align="center">

**Your Champions Goal blog is now live! 🎉⚽**

**Share it with the world! 🌍**

</div>
