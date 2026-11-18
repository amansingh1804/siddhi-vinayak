# Siddhivinayak Infrastructure

Official corporate website for **Siddhivinayak Infrastructure** — delivering civil, institutional, industrial, and public infrastructure projects across Gujarat.

## 🚀 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Typography**: Playfair Display, DM Sans, Caveat
- **Toolchain**: TypeScript 5.7, pnpm

## 📁 Key Features

- **Hero Section**: 4 real drone and site project videos playing with seamless loops and cinematic transitions.
- **Projects & Interactive Reach Map**: 3D interactive dot matrix map of Gujarat showcasing 20+ active project locations with dynamic hover indicators and tooltips.
- **Executive Leadership**: Interactive modal profiles for Founder & Chairman Vashrambhai Sutariya, CEO Ramesh Gadhiya, and MD Vishal Sutariya.
- **Careers & HR**: 5-step recruitment process, complete role qualifications, job descriptions, and live current openings.
- **Media Films**: Project film gallery with custom playback and poster previews.
- **Fully Responsive**: Optimized for mobile, tablet, and desktop screens.

## 🛠️ Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🌐 Deploy to Vercel

This repository is pre-configured for one-click deployment on [Vercel](https://vercel.com/):

1. Import this repository in your Vercel Dashboard.
2. Framework Preset: **Vite**
3. Build Command: `pnpm build` (or `npm run build`)
4. Output Directory: `dist`
5. Single-Page Application (SPA) routing is handled by the included [`vercel.json`](vercel.json).
