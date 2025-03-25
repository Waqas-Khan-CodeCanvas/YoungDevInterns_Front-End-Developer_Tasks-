import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/movie/:id",
      name: "movie-details",
      component: () => import("../views/MovieDetailsView.vue"),
    },
    {
      path: "/search",
      name: "search",
      component: () => import("../views/SearchView.vue"),
    },
    {
      path: "/favorites",
      name: "favorites",
      component: () => import("../views/FavoritesView.vue"),
    },
  ],
});

export default router;
