<template>
  <div class="text-gray-900 dark:text-gray-100">
    <h1 class="text-3xl font-bold mb-8">Search Movies</h1>

    <!-- Search input -->
    <div class="mb-8 max-w-2xl mx-auto">
      <div class="relative">
        <input
          v-model="searchQuery"
          @input="debouncedSearch"
          type="text"
          placeholder="Search for movies..."
          class="w-full px-4 py-3 text-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent dark:focus:ring-accent-light focus:border-transparent shadow-sm transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          @keyup.enter="handleSearch"
        />
        <div class="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            class="w-6 h-6 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-accent dark:border-accent-light"
      ></div>
    </div>

    <!-- Error state -->
    <div
      v-else-if="error"
      class="text-red-500 dark:text-red-400 text-center py-8"
    >
      {{ error }}
    </div>

    <!-- Results -->
    <div
      v-else-if="searchResults.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="movie in searchResults"
        :key="movie.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700/20 overflow-hidden group"
      >
        <router-link :to="{ name: 'movie-details', params: { id: movie.id } }">
          <div class="relative aspect-[2/3] overflow-hidden">
            <img
              v-if="movie.poster_path"
              :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
              :alt="movie.title"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div
              v-else
              class="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
            >
              <span class="text-gray-400 dark:text-gray-500">No Image</span>
            </div>
          </div>
          <div class="p-4">
            <h3
              class="font-semibold text-lg truncate text-gray-900 dark:text-gray-100"
            >
              {{ movie.title }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ formatDate(movie.release_date) }}
            </p>
            <div class="flex items-center mt-2">
              <span class="text-yellow-500">★</span>
              <span class="ml-1 text-sm text-gray-700 dark:text-gray-300">{{
                movie.vote_average?.toFixed(1) || "N/A"
              }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <!-- No results -->
    <div
      v-else-if="searchQuery"
      class="text-center py-8 text-gray-500 dark:text-gray-400"
    >
      No movies found for "{{ searchQuery }}"
    </div>

    <!-- Initial state -->
    <div v-else class="text-center py-8 text-gray-500 dark:text-gray-400">
      Start typing to search for movies
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useMovieStore } from "../stores/movie";
import { storeToRefs } from "pinia";
import { useDebounceFn } from "@vueuse/core";

const store = useMovieStore();
const { searchResults, loading, error } = storeToRefs(store);
const searchQuery = ref("");

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    store.searchMovies(searchQuery.value);
  } else {
    store.searchResults = [];
  }
};

const debouncedSearch = useDebounceFn(handleSearch, 300);

const formatDate = (dateString) => {
  if (!dateString) return "Release date unknown";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>
