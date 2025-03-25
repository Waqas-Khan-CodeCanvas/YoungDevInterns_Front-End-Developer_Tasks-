import { defineStore } from "pinia";
import axios from "axios";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const useMovieStore = defineStore("movie", {
  state: () => ({
    trendingMovies: [],
    movieDetails: null,
    searchResults: [],
    favorites: [],
    loading: false,
    error: null,
  }),

  getters: {
    getMovieById: (state) => (id) => {
      return (
        state.trendingMovies.find((movie) => movie.id === id) ||
        state.movieDetails
      );
    },
  },

  actions: {
    async fetchTrendingMovies() {
      this.loading = true;
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/trending/movie/week`,
          {
            params: {
              api_key: TMDB_API_KEY,
            },
          }
        );
        this.trendingMovies = response.data.results;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchMovieDetails(id) {
      this.loading = true;
      try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
          params: {
            api_key: TMDB_API_KEY,
          },
        });
        this.movieDetails = response.data;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async searchMovies(query) {
      this.loading = true;
      try {
        const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
          params: {
            api_key: TMDB_API_KEY,
            query,
          },
        });
        this.searchResults = response.data.results;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    toggleFavorite(movie) {
      const index = this.favorites.findIndex((fav) => fav.id === movie.id);
      if (index === -1) {
        this.favorites.push(movie);
      } else {
        this.favorites.splice(index, 1);
      }
      // Save to localStorage
      localStorage.setItem("favorites", JSON.stringify(this.favorites));
    },

    loadFavorites() {
      const savedFavorites = localStorage.getItem("favorites");
      if (savedFavorites) {
        this.favorites = JSON.parse(savedFavorites);
      }
    },
  },
});
