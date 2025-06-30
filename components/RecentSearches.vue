<template>
    <div
      v-if="weatherStore.recentCities.length > 0"
      class="w-full max-w-md mx-auto mt-6 p-4 border rounded-lg shadow bg-white"
    >
      <h3 class="text-lg font-bold mb-2">Son Aramalar</h3>
      <ul class="flex flex-wrap gap-2">
        <li
          v-for="(city, index) in weatherStore.recentCities"
          :key="index"
        >
          <button
            class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded transition"
            @click="handleCityClick(city)"
          >
            {{ city }}
          </button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useWeatherStore } from '@/stores/weatherStore';
  import { useWeather } from '@/composables/useWeather';
  
  const weatherStore = useWeatherStore();
  const { fetchWeather } = useWeather();
  
  const handleCityClick = async (city: string) => {
    await fetchWeather(city);
  };
  </script>