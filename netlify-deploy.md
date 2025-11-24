# Deploy to Netlify

## Quick Deploy Options

### Option 1: Deploy via Netlify Dashboard (Recommended)

1. **Build your project locally:**
   ```bash
   npm run build
   ```

2. **Go to [Netlify](https://app.netlify.com/)**
   - Sign up or log in

3. **Drag and Drop Deployment:**
   - Drag the `dist` folder to the Netlify dashboard
   - Your site will be live instantly!

### Option 2: Deploy via Git (Continuous Deployment)

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Connect to Netlify:**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository

3. **Configure build settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - Netlify will auto-detect these from `netlify.toml`

4. **Deploy!**
   - Click "Deploy site"
   - Netlify will build and deploy automatically

### Option 3: Deploy via Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Initialize and deploy:**
   ```bash
   netlify init
   netlify deploy --prod
   ```

## Configuration

The project includes:
- `netlify.toml` - Netlify configuration file with MIME type headers
- `public/_redirects` - SPA routing support (ensures React Router works)
- `public/_headers` - HTTP headers for correct MIME types (fixes JS module loading)

**Important:** If you see MIME type errors after deployment, the `_headers` file ensures JavaScript modules are served with the correct Content-Type.

## Environment Variables (if needed)

If you need environment variables:
1. Go to Site settings → Environment variables
2. Add your variables
3. They'll be available during build

## Custom Domain

1. Go to Site settings → Domain management
2. Add your custom domain
3. Follow DNS configuration instructions

## Build Settings

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 18 (configured in netlify.toml)

## Notes

- The site will automatically rebuild on every Git push (if using Git deployment)
- Preview deployments are created for pull requests
- The `_redirects` file ensures all routes work with React Router

Enjoy your live birthday website! 🎂🎉

