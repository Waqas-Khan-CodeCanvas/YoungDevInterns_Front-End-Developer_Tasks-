<template>
  <div>
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"
      ></div>
    </div>

    <div v-else-if="error" class="text-red-500 text-center py-8">
      {{ error }}
    </div>

    <div v-else-if="movieDetails" class="space-y-8">
      <!-- Back button -->
      <router-link
        to="/"
        class="inline-flex items-center text-accent hover:text-blue-700"
      >
        <svg
          class="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Movies
      </router-link>

      <!-- Movie details -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Poster -->
        <div class="md:col-span-1">
          <img
            :src="`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`"
            :alt="movieDetails.title"
            class="w-full rounded-lg shadow-lg"
            loading="lazy"
          />
        </div>

        <!-- Info -->
        <div class="md:col-span-2 space-y-6">
          <h1 class="text-4xl font-bold">{{ movieDetails.title }}</h1>

          <div class="flex items-center space-x-4">
            <span class="text-yellow-500"
              >★ {{ movieDetails.vote_average.toFixed(1) }}</span
            >
            <span class="text-gray-600">{{
              formatDate(movieDetails.release_date)
            }}</span>
            <span class="text-gray-600">{{
              formatRuntime(movieDetails.runtime)
            }}</span>
          </div>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="genre in movieDetails.genres"
              :key="genre.id"
              class="px-3 py-1 bg-gray-100 rounded-full text-sm"
            >
              {{ genre.name }}
            </span>
          </div>

          <div class="space-y-4">
            <h2 class="text-2xl font-semibold">Overview</h2>
            <p class="text-gray-700 leading-relaxed">
              {{ movieDetails.overview }}
            </p>
          </div>

          <div class="flex items-center space-x-4">
            <button
              @click="store.toggleFavorite(movieDetails)"
              class="btn"
              :class="isFavorite ? 'btn-secondary' : 'btn-primary'"
            >
              {{ isFavorite ? "Remove from Favorites" : "Add to Favorites" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useMovieStore } from "../stores/movie";
import { storeToRefs } from "pinia";

const route = useRoute();
const store = useMovieStore();
const { movieDetails, loading, error } = storeToRefs(store);

const isFavorite = computed(() => {
  return store.favorites.some((movie) => movie.id === movieDetails.value?.id);
});

onMounted(() => {
  store.fetchMovieDetails(route.params.id);
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatRuntime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};
</script>
