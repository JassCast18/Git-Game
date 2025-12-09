# Git Game Dashboard

A Git API Dashboard that lets you track your stats and explore characters based on your level. Challenge other characters and see how you rank. Have fun and level up!

## Features

- 📊 **Dashboard Overview**: Track your level, XP, achievements, and challenges won
- 📈 **Stats**: View detailed Git activity statistics and recent activity
- 🎮 **Characters**: Explore and challenge other characters (coming soon)
- 🏆 **Leaderboard**: See how you rank against other players (coming soon)

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **CSS** - Custom styling with modern design

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Development

The app will be available at `http://localhost:5173/` when running the dev server.

## Project Structure

```
src/
├── components/       # Reusable components (Header, Sidebar)
├── layouts/         # Layout components (DashboardLayout)
├── pages/           # Page components (Dashboard, Stats, Characters, Leaderboard)
├── assets/          # Static assets
├── App.jsx          # Main app component with routing
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## Contributing

This is a learning project for exploring React, Vite, and dashboard design patterns.

## License

MIT
