<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">My Favorites</h1>

    <div v-if="favorites.length === 0" class="text-center py-12">
      <svg
        class="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No favorites yet</h3>
      <p class="mt-1 text-sm text-gray-500">
        Start adding movies to your favorites!
      </p>
      <div class="mt-6">
        <router-link to="/" class="btn btn-primary">
          Browse Movies
        </router-link>
      </div>
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div v-for="movie in favorites" :key="movie.id" class="card group">
        <router-link :to="{ name: 'movie-details', params: { id: movie.id } }">
          <div class="relative aspect-[2/3] overflow-hidden">
            <img
              :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
              :alt="movie.title"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-lg truncate">{{ movie.title }}</h3>
            <p class="text-sm text-gray-600">
              {{ formatDate(movie.release_date) }}
            </p>
            <div class="flex items-center mt-2">
              <span class="text-yellow-500">★</span>
              <span class="ml-1 text-sm">{{
                movie.vote_average.toFixed(1)
              }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useMovieStore } from "../stores/movie";
import { storeToRefs } from "pinia";

const store = useMovieStore();
const { favorites } = storeToRefs(store);

onMounted(() => {
  store.loadFavorites();
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>
