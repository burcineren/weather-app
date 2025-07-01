<template>
    <div class="w-full max-w-lg mx-auto mt-12 p-8 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-3xl shadow-xl backdrop-blur-sm">
      <!-- Header -->
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Hava Durumu</h2>
        <p class="text-gray-600 text-sm">Şehrinizin hava durumunu öğrenin</p>
      </div>
  
      <!-- Search Form -->
      <form @submit.prevent="handleSearch" class="relative">
        <div class="relative flex items-center">
          <!-- Search Icon -->
          <div class="absolute left-4 text-gray-400 pointer-events-none">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
  
          <!-- Input Field -->
          <input
            v-model="city"
            type="text"
            placeholder="Şehir adı girin..."
            class="w-full pl-12 pr-24 py-4 text-gray-700 bg-white border-2 border-gray-200 rounded-2xl 
                   focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 
                   transition-all duration-300 placeholder-gray-400 text-lg font-medium
                   disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
            :disabled="weatherStore.isLoading"
          />
  
          <!-- Search Button -->
          <button
            type="submit"
            class="absolute right-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 
                   hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl
                   transition-all duration-300 transform hover:scale-105 active:scale-95
                   disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed
                   disabled:transform-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
                   shadow-lg hover:shadow-xl"
            :disabled="weatherStore.isLoading || city.trim() === ''"
          >
            <span v-if="!weatherStore.isLoading">Ara</span>
            <div v-else class="flex items-center gap-2">
              <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Aranıyor...</span>
            </div>
          </button>
        </div>
      </form>
  
      <!-- Status Messages -->
      <div class="mt-6 min-h-[24px]">
        <!-- Loading State -->
        <div v-if="weatherStore.isLoading" class="flex items-center justify-center gap-3 text-blue-600">
          <div class="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span class="font-medium">Hava durumu bilgileri alınıyor...</span>
        </div>
  
        <!-- Error State -->
        <div v-else-if="weatherStore.error" class="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div class="w-6 h-6 text-red-500 flex-shrink-0">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p class="text-red-800 font-medium">Hata Oluştu</p>
            <p class="text-red-600 text-sm">{{ weatherStore.error }}</p>
          </div>
        </div>
  
  
      </div>
  
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { useWeather } from "@/composables/useWeather";
  import { useWeatherStore } from "@/stores/weatherStore";
  
  const city = ref("");
  const { fetchWeather } = useWeather();
  const weatherStore = useWeatherStore();
  
  const handleSearch = async () => {
    if (!city.value.trim()) return;
    await fetchWeather(city.value.trim());
    city.value = "";
  };
  
  const handleQuickSearch = async (cityName: string) => {
    if (weatherStore.isLoading) return;
    city.value = cityName;
    await fetchWeather(cityName);
    city.value = "";
  };
  </script>