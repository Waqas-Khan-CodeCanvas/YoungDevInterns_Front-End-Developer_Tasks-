<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Trending Movies</h1>

    <div v-if="loading" class="flex justify-center items-center h-64">
      <div
        class="animate-spin rounded-full h-12 w-12 border-4"
        style="border-color: black transparent transparent transparent"
      ></div>
    </div>

    <div v-else-if="error" class="text-center py-8" style="color: #ef4444">
      {{ error }}
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div v-for="movie in trendingMovies" :key="movie.id" class="group">
        <router-link :to="{ name: 'movie-details', params: { id: movie.id } }">
          <div class="relative aspect-[2/3] overflow-hidden rounded-lg">
            <img
              v-if="movie.poster_path"
              :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
              :alt="movie.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg"
            >
              <span class="text-gray-400">No Image</span>
            </div>
            <!-- Gradient Overlay -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <!-- Movie Info Overlay -->
            <div
              class="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            >
              <h3 class="font-semibold text-lg mb-2">{{ movie.title }}</h3>
              <div class="flex items-center justify-between text-sm">
                <span>{{ formatDate(movie.release_date) }}</span>
                <div class="flex items-center">
                  <span class="text-yellow-400 mr-1">★</span>
                  <span>{{ movie.vote_average?.toFixed(1) || "N/A" }}</span>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useMovieStore } from "../stores/movie";

const store = useMovieStore();
const { trendingMovies, loading, error } = storeToRefs(store);

onMounted(() => {
  store.fetchTrendingMovies();
});

const formatDate = (dateString) => {
  if (!dateString) return "Release date unknown";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>
