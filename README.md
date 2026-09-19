# Mufeeda Pc — Portfolio

Premium interactive portfolio for Mufeeda Pc, a React.js Developer and Frontend Engineer.

## Stack

React, Vite, Tailwind CSS, Framer Motion, Three.js, React Three Fiber, Drei, Lucide React.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Contact form

Submissions are emailed to `pcmufeeda@gmail.com`. Each message includes the visitor’s name, email, subject, and message. You can reply directly because the visitor email is set as Reply-To.

1. Create a free key at [web3forms.com](https://web3forms.com) using `pcmufeeda@gmail.com`.
2. Copy `.env.example` to `.env.local`.
3. Paste the key into `VITE_WEB3FORMS_ACCESS_KEY`.
4. Restart `npm run dev` or rebuild.

Until the key is set, the form opens your email app with the same fields pre-filled.

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run preview` — preview the production build
