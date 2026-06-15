# 🚀 DEV.FOLIO — Personal Portfolio

A fully customizable, production-ready personal portfolio website with a futuristic developer aesthetic, anime avatar system, and interactive terminal.

## 🔥 Features

- **🎨 Dark Cyberpunk Theme** — Deep navy/black with neon cyan, purple, and green accents
- **💬 Typing Animation** — Rotating role titles using `react-type-animation`
- **🧠 Anime Avatar System** — Switch between Gojo, Lelouch, Naruto, Levi, Light Yagami
- **💻 Interactive Terminal** — Full CLI with 12+ commands, tab-completion, command history
- **🌊 Matrix Rain Background** — Canvas-based animated background
- **✨ Scroll Animations** — Powered by Framer Motion
- **📱 Fully Responsive** — Works on mobile, tablet, and desktop
- **⚡ Loading Screen** — Animated boot sequence on startup
- **📂 All Sections** — About, Skills, Experience, Projects, Certifications, Education, Hobbies, Contact

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI Framework |
| Vite | Build Tool |
| Tailwind CSS v3 | Styling |
| Framer Motion | Animations |
| Canvas API | Matrix Rain |
| react-type-animation | Typing Effect |
| react-icons | Icon System |

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

App opens at **http://localhost:3000** (or 3001 if 3000 is busy).

## ⚙️ Customization

**All customization is done in a single file:**

```
src/config/portfolioData.js
```

Edit this file to update:
- Personal info (name, bio, location, email)
- Roles (for typing animation)
- Avatar selections and defaults
- Skills with proficiency levels
- Experience timeline
- Projects grid
- Certifications
- Education history
- Hobbies

### Resume Setup
Place your resume PDF at `public/resume.pdf` — it will be downloadable via the button AND terminal `resume` command.

## 💻 Terminal Commands

Open the terminal with the floating button or navbar button. Available commands:

| Command | Description |
|---|---|
| `help` | List all commands |
| `about` | Show personal info |
| `skills` | Show tech skills with visual bars |
| `projects` | List featured projects |
| `experience` | Show work history |
| `certifications` | Show certifications |
| `hobbies` | Show hobbies |
| `contact` | Show contact info |
| `education` | Show education |
| `resume` | Download resume PDF |
| `whoami` | Quick identity |
| `ls` | List sections |
| `clear` | Clear terminal |
| `exit` | Close terminal |

**Keyboard shortcuts:**
- `Tab` → Auto-complete commands
- `↑/↓` → Navigate command history
- `Ctrl+L` → Clear screen

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg
│   └── resume.pdf         ← Add your resume here
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       ← Navigation
│   │   ├── Footer.jsx       ← Footer
│   │   ├── MatrixRain.jsx   ← Canvas background
│   │   └── Terminal.jsx     ← Interactive terminal
│   ├── sections/
│   │   ├── Hero.jsx         ← Hero + Avatar system
│   │   ├── About.jsx        ← About Me
│   │   ├── Skills.jsx       ← Tech skills
│   │   ├── Experience.jsx   ← Work history
│   │   ├── Projects.jsx     ← Project cards
│   │   ├── Certifications.jsx
│   │   ├── Education.jsx
│   │   ├── Hobbies.jsx
│   │   └── Contact.jsx      ← Contact form
│   ├── config/
│   │   └── portfolioData.js ← 🔑 ALL YOUR DATA HERE
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css            ← Global styles
├── tailwind.config.js
├── vite.config.js
└── index.html
```

## 🎨 Customizing Colors

Edit `tailwind.config.js` → `theme.extend.colors.cyber` to change the accent colors:

```js
cyber: {
  blue: '#00d4ff',   // Primary accent
  purple: '#8b5cf6', // Secondary accent
  green: '#00ff88',  // Success / terminal
  pink: '#ff006e',   // Projects accent
  yellow: '#ffd60a', // Warning
}
```

## 📧 Contact Form Setup (EmailJS)

To make the form actually send emails:

1. Create a free account at [emailjs.com](https://emailjs.com)
2. Get your Service ID, Template ID, and Public Key
3. Install: `npm install @emailjs/browser`
4. In `src/sections/Contact.jsx`, replace the `handleSubmit` function with:

```js
import emailjs from '@emailjs/browser';

const handleSubmit = async (e) => {
  e.preventDefault();
  setSending(true);
  await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', formData, 'PUBLIC_KEY');
  setSending(false);
  setSubmitted(true);
};
```

## 📦 Deployment

```bash
# Build
npm run build

# Deploy to Vercel (recommended)
npx vercel dist

# Or deploy to Netlify
npx netlify deploy --dir=dist --prod
```

---

Built with ❤️ — Blend of developer terminal, anime personality, and premium personal brand.
