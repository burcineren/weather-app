<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-8"
  >
    <h1 class="text-3xl font-bold mb-6">Nuxt Weather App 🌦️</h1>
    <SearchForm />
    <RecentSearches />
    <WeatherCard
      v-if="weatherStore.weatherData"
      :weatherData="weatherStore.weatherData"
    />
  </div>
</template>

<script setup lang="ts">
import SearchForm from "@/components/SearchForm.vue";
import WeatherCard from "@/components/WeatherCard.vue";
import RecentSearches from "@/components/RecentSearches.vue";
import { useWeatherStore } from "@/stores/weatherStore";

const weatherStore = useWeatherStore();
</script>
