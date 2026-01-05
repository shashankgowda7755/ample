# PureShores - Beach Cleanup Certificate Generator

This is a lightweight, single-file certificate generator tailored for the "PureShores" Beach Cleanup Initiative.

## 🚀 Quick Start
Simply open `index.html` in any web browser (Chrome, Safari, Edge, etc.) to use the app. No server or installation required.

## ✨ Features
- **Frictionless Flow**: No login, no database required.
- **Privacy First**: All photo processing happens in the browser (client-side).
- **Ocean Theme**: Beautiful 3D interactive background.
- **Instant Preview**: Real-time drafting of the certificate.
- **Native Sharing**: Uses Web Share API on mobile devices.

## 📦 Deployment
Since this is a client-side app (SPA), you can deploy it instantly:

### Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` inside this folder.
3. Follow the prompts.

## 🛠️ Customization
To change the event details, edit the `src/components/Poster.tsx` file directly:
- **Title**: Change "CERTIFICATE OF APPRECIATION".
- **Colors**: Edit `tailwind.config.js` for theme colors.

