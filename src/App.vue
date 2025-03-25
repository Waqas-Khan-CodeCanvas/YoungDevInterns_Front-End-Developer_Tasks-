<template>
  <div class="min-h-screen" style="background-color: white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center space-x-8 py-4">
        <h1 class="text-2xl font-bold">Movie Explorer</h1>
        <nav>
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="px-4 py-2 text-base"
            :class="{
              'border-b-2 border-black font-medium': $route.path === item.href,
              'text-gray-600': $route.path !== item.href,
            }"
          >
            {{ item.name }}
          </router-link>
        </nav>
      </div>
    </div>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer
      class="mt-auto"
      style="background-color: white; border-top: 1px solid #e5e7eb"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p class="text-center text-sm" style="color: #6b7280">
          © {{ new Date().getFullYear() }} Movie Explorer. Made with ❤️
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
const navigation = [
  { name: "Home", href: "/" },
  { name: "Search", href: "/search" },
  { name: "Favorites", href: "/favorites" },
];
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
