# 🤝 TypeScript Real-Time Collaborator

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Yjs](https://img.shields.io/badge/Yjs-13.6-FFD700)](https://docs.yjs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern, production-ready real-time collaborative text/code editor built with TypeScript, React, Monaco Editor, and Yjs. Features conflict-free collaborative editing, multi-user cursor tracking, and live presence indicators.

![Real-Time Collaborator Preview](https://via.placeholder.com/1200x600/1e293b/ffffff?text=Real-Time+Collaborative+Editor)

## ✨ Features

- 🚀 **Real-Time Collaboration** - Multiple users can edit the same document simultaneously
- 🔄 **CRDT-Based Conflict Resolution** - Automatic conflict resolution using Yjs CRDT
- 👥 **Multi-User Cursor Tracking** - See where other users are editing with colored cursors
- 💬 **Live Chat** - Built-in chat functionality using Yjs
- 🎨 **Monaco Editor** - Full-featured code editor with syntax highlighting
- 🌙 **Dark/Light Mode** - Theme switching with persistence
- 📱 **Responsive Design** - Works on desktop and mobile devices
- ⚡ **Fast & Performant** - Built with Vite for lightning-fast development
- 🔒 **Type-Safe** - Full TypeScript with strict mode
- ♿ **Accessible** - ARIA labels and keyboard navigation

## 🛠️ Tech Stack

- **Build Tool**: [Vite](https://vitejs.dev/) - Fast bundler and dev server
- **Framework**: [React 19](https://react.dev/) - UI library
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/) - VS Code editor
- **Collaboration**: [Yjs](https://docs.yjs.dev/) - CRDT framework for real-time collaboration
- **WebSocket**: [y-websocket](https://github.com/yjs/y-websocket) - WebSocket provider for Yjs
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) - Lightweight state management
- **Icons**: [Lucide React](https://lucide.dev/) - Icon library

## 📦 Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd Typescript-Real-Time-Collaborator
```

2. **Install dependencies**

```bash
npm install
```

3. **Install server dependencies**

```bash
cd server
npm install
cd ..
```

4. **Set up environment variables** (optional)

Create a `.env` file in the root directory:

```env
VITE_WS_URL=ws://localhost:1234
```

## 🚀 Running the Application

### Development Mode

You can run the frontend and server separately or together:

**Option 1: Run separately (recommended for development)**

Terminal 1 - Start the WebSocket server:
```bash
npm run server
```

Terminal 2 - Start the Vite dev server:
```bash
npm run dev
```

**Option 2: Run together**

```bash
npm run dev:all
```

The application will be available at:
- Frontend: [http://localhost:5173](http://localhost:5173)
- WebSocket Server: [ws://localhost:1234](ws://localhost:1234)

### Production Build

```bash
# Build the frontend
npm run build

# Preview the production build
npm run preview
```

## 🏗️ Project Structure

```
Typescript-Real-Time-Collaborator-1/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── editor/          # Monaco editor wrapper
│   │   └── layout/          # Header, Sidebar
│   ├── hooks/               # Custom React hooks
│   │   ├── use-yjs-doc.ts   # Yjs document hook
│   │   └── use-awareness.ts # Awareness protocol hook
│   ├── lib/                 # Utilities and types
│   │   ├── yjs-setup.ts     # Yjs configuration
│   │   ├── types.ts         # TypeScript types
│   │   └── utils.ts         # Utility functions
│   ├── stores/              # Zustand stores
│   │   └── app-store.ts     # App state management
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── server/                  # WebSocket server
│   ├── index.js             # Server entry point
│   └── package.json         # Server dependencies
├── public/                  # Static assets
└── README.md                # This file
```

## 📝 Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start WebSocket server
- `npm run dev:all` - Run both frontend and server
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## 🚢 Deployment

### Frontend (Vercel/Netlify)

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Vercel or Netlify
3. Set environment variable `VITE_WS_URL` to your WebSocket server URL

### WebSocket Server (Railway/Render)

1. Deploy the `server` folder to Railway or Render
2. Set the `PORT` environment variable (default: 1234)
3. Update `VITE_WS_URL` in your frontend deployment

**Note**: The WebSocket server needs to run separately from the frontend. For production, use a service like Railway, Render, or your own server.

## Support

- Telegram: https://t.me/qahtan_n
- Twitter: https://x.com/qahtann_
