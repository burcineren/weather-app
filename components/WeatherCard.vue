<template>
    <div
      v-if="weatherData"
      class="w-full max-w-md mx-auto mt-6 p-6 rounded-2xl shadow-xl bg-white/90 backdrop-blur text-center space-y-4"
    >
      <h2 class="text-3xl font-extrabold text-gray-800">{{ weatherData.name }}</h2>
  
      <div class="flex justify-center items-center gap-4">
        <img
          :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`"
          :alt="weatherData.weather[0].description"
          class="w-20 h-20"
        />
        <p class="text-5xl font-bold text-blue-600">{{ Math.round(weatherData.main.temp) }}°C</p>
      </div>
  
      <div class="grid gap-2 text-lg text-gray-700">
        <p>
          <span class="font-semibold">Hissedilen:</span> {{ Math.round(weatherData.main.feels_like) }}°C
        </p>
  
        <p class="capitalize">
          <span class="font-semibold">Durum:</span> {{ weatherData.weather[0].description }}
        </p>
  
        <p>
          <span class="font-semibold">Rüzgar:</span> {{ weatherData.wind.speed }} m/s
        </p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  
  const props = defineProps<{
    weatherData: any; // API'den gelen veri
  }>();
  </script>