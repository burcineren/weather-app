<template>
    <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-8">
      <h1 class="text-3xl font-bold mb-6">Nuxt Weather App 🌦️</h1>
  
      <SearchForm />
  
      <RecentSearches />
  
      <WeatherCard v-if="weatherData" :weatherData="weatherData" />
    </div>
  </template>
  
  <script setup lang="ts">
  import SearchForm from '@/components/SearchForm.vue';
  import WeatherCard from '@/components/WeatherCard.vue';
  import RecentSearches from '@/components/RecentSearches.vue';
  
  import { ref, watch } from 'vue';
  import { useWeatherStore } from '@/stores/weatherStore';
  
  const weatherStore = useWeatherStore();
  const weatherData = ref<any>(null);
  
  // recentCities veya yeni arama sonrası store güncellenirse, en son şehri getir
  watch(
    () => weatherStore.recentCities[0],
    async (newCity) => {
      if (newCity) {
        try {
          const res = await $fetch(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
              q: newCity,
              appid: useRuntimeConfig().public.openweatherApiKey,
              units: 'metric',
            },
          });
          weatherData.value = res;
        } catch (e) {
          weatherData.value = null;
        }
      }
    },
    { immediate: false }
  );
  </script>