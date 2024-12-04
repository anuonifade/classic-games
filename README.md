# Classic Games Website

A modern web application for playing classic games, built with Next.js, shadcn UI, Tailwind CSS, Clerk for authentication, and Convex as the backend.

## Features

- Search functionality for finding games
- Alphabetical navigation of games
- Individual game pages
- User authentication
- Responsive design

## Tech Stack

- Next.js 13
- Tailwind CSS
- shadcn UI
- Clerk (Authentication)
- Convex (Backend)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Create a `.env.local` file with the following:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/pages` - Next.js pages
- `/components` - Reusable React components
- `/lib` - Utility functions and helpers
- `/public` - Static assets
- `/styles` - Global styles

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
