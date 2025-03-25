# Movie Explorer

A modern Single Page Application built with Vue 3 that allows users to explore movies, search for specific titles, and manage their favorite movies.

## Features

- Browse trending movies
- Search for movies
- View detailed movie information
- Add/remove movies from favorites
- Responsive design
- Performance optimized with lazy loading and code splitting

## Tech Stack

- Vue 3 (Composition API)
- Vue Router
- Pinia (State Management)
- TailwindCSS
- Axios
- TMDB API

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TMDB API key

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd movie-explorer
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your TMDB API key:

```
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```

## Project Structure

```
movie-explorer/
├── src/
│   ├── assets/        # Static assets
│   ├── components/    # Reusable components
│   ├── views/         # Page components
│   ├── stores/        # Pinia stores
│   ├── router/        # Vue Router configuration
│   ├── api/          # API related code
│   └── utils/        # Utility functions
├── public/           # Public assets
└── index.html        # Entry HTML file
```

## Performance Optimizations

- Lazy loading of images
- Code splitting with dynamic imports
- Route-based code splitting
- Debounced search input
- Optimized asset loading
- Local storage for favorites

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
