<template>
  <div
    v-if="weatherStore.recentCities.length > 0"
    class="w-full max-w-lg mx-auto mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl shadow-lg backdrop-blur-sm"
  >
    <div class="flex items-center gap-3 mb-4">
      <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
      <h3 class="text-xl font-semibold text-gray-800 tracking-wide">Son Aramalar</h3>
    </div>
    
    <div class="flex flex-wrap gap-3">
      <button
        v-for="(city, index) in weatherStore.recentCities"
        :key="index"
        class="group relative px-4 py-2.5 bg-white/80 hover:bg-white text-gray-700 hover:text-blue-600 
               border border-gray-200 hover:border-blue-300 rounded-xl font-medium text-sm
               transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-md
               active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        @click="handleCityClick(city)"
      >
        <span class="relative z-10">{{ city }}</span>
        <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl opacity-0 
                    group-hover:opacity-10 transition-opacity duration-300"></div>
      </button>
    </div>
    
    <div class="mt-4 text-xs text-gray-500 text-center">
      Tekrar aramak için şehir adına tıklayın
    </div>
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