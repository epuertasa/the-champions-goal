# 🚀 Quick Start Guide

Welcome to **The Champions Goal**! This guide will help you get the project running locally in minutes.

<br>

## 📋 System Requirements

| Requirement | Minimum | Recommended |
|---|---|---|
| **Node.js** | 16.x | 18.x LTS |
| **npm** | 8.x | 9.x+ |
| **RAM** | 2GB | 4GB+ |
| **Storage** | 500MB | 1GB+ |

<br>

## ⚡ 5-Minute Setup

```bash
# 1. Clone the repository
git clone https://github.com/epuertasa/the-champions-goal.git
cd the-champions-goal

# 2. Install dependencies (choose one)
npm install          # npm
yarn install         # yarn
pnpm install        # pnpm
bun install         # bun

# 3. Start development server
npm run dev

# 4. Open in browser
# Visit: http://localhost:5173
```

That's it! The app is now running locally. 🎉

<br>

## 🛠️ Available Commands

```bash
# Development
npm run dev              # Start dev server with hot reload
npm run preview          # Preview production build locally

# Production
npm run build            # Create optimized production build
npm run build:dev        # Build in development mode

# Quality Assurance
npm run lint             # Check code for errors and style issues
npm run lint --fix       # Auto-fix linting issues

# Testing
npm run test             # Run tests once
npm run test:watch       # Run tests in watch mode
```

<br>

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── AmbientBackground.tsx
│   ├── BestGoalsSection.tsx
│   ├── FanZoneSection.tsx
│   ├── HeroBanner.tsx
│   ├── LegendsSection.tsx
│   ├── Navbar.tsx
│   ├── TopScorersSection.tsx
│   ├── VideoIntroSection.tsx
│   ├── WinnersSection.tsx
│   └── WordSearchSection.tsx
├── hooks/               # Custom React hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/                 # Utility functions
│   └── utils.ts
├── pages/               # Page components
│   ├── Index.tsx
│   └── NotFound.tsx
├── test/                # Test files
│   ├── example.test.ts
│   └── setup.ts
├── App.tsx              # Main component
├── App.css              # Global styles
├── main.tsx             # Entry point
├── index.css            # Base styles
└── vite-env.d.ts       # Vite environment types
```

<br>

## 🎨 Tailoring the Project

### Customize Content

Edit components in `src/components/` to add your own content:

```typescript
// Example: src/components/BestGoalsSection.tsx
export default function BestGoalsSection() {
  return (
    <section className="py-20 bg-dark">
      {/* Your content here */}
    </section>
  );
}
```

### Add New Pages

1. Create a new file in `src/pages/`
2. Add the component
3. Import and route it in `src/App.tsx`

### Modify Styling

- Edit `tailwind.config.ts` for theme customization
- Use Tailwind classes in components
- Add custom CSS in component files

<br>

## 🔧 Configuration Files

| File | Purpose |
|---|---|
| `vite.config.ts` | Vite build configuration |
| `tailwind.config.ts` | Tailwind CSS theme customization |
| `tsconfig.json` | TypeScript configuration |
| `components.json` | shadcn/ui configuration |
| `eslint.config.js` | Code style rules |
| `postcss.config.js` | CSS processing |
| `vercel.json` | Vercel deployment config |

<br>

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process using port 5173
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :5173
kill -9 <PID>
```

### Clear Node Modules

```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Issues

```bash
# Clean build
npm run build -- --force
```

<br>

## 📦 Dependencies Overview

| Package | Purpose |
|---|---|
| **react** | UI library |
| **react-dom** | DOM rendering |
| **vite** | Build tool |
| **typescript** | Type safety |
| **tailwindcss** | Utility CSS |
| **shadcn/ui** | Component library |
| **framer-motion** | Animations |
| **@tanstack/react-query** | Data fetching |
| **@hookform/resolvers** | Form validation |
| **sonner** | Toast notifications |
| **date-fns** | Date utilities |
| **embla-carousel** | Carousel component |

<br>

## 🚀 Next Steps

1. **Customize the content** - Edit components to match your vision
2. **Add your information** - Update contact details and social links
3. **Test locally** - Run `npm run dev` and check all sections
4. **Deploy to Vercel** - Follow [DEPLOYMENT.md](DEPLOYMENT.md)

<br>

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [shadcn/ui Components](https://ui.shadcn.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

<br>

## 🆘 Need Help?

- Check [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines
- Review [DEPLOYMENT.md](DEPLOYMENT.md) for deployment instructions
- Open an issue on GitHub
- Email: erpuam25@bemen3.cat

<br>

<div align="center">

**Happy coding! ⚽✨**

</div>
