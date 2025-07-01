<template>
    <div
      v-if="weatherData"
      class="w-full max-w-lg mx-auto mt-8 p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-white to-blue-50 backdrop-blur-sm text-center space-y-6 border border-blue-100"
    >
      <h2 class="text-4xl font-bold text-gray-800 tracking-wide drop-shadow-sm">{{ weatherData.name }}</h2>
  
      <div class="flex justify-center items-center gap-6 bg-white/60 rounded-2xl p-6 shadow-lg">
        <img
          :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`"
          :alt="weatherData.weather[0].description"
          class="w-24 h-24 drop-shadow-lg filter brightness-110"
        />
        <p class="text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent drop-shadow-sm">
          {{ Math.round(weatherData.main.temp) }}°C
        </p>
      </div>
  
      <div class="grid gap-4 text-lg">
        <div class="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-100">
          <span class="font-semibold text-gray-600 text-sm uppercase tracking-wider">Hissedilen:</span>
          <p class="text-2xl font-bold text-gray-800 mt-1">{{ Math.round(weatherData.main.feels_like) }}°C</p>
        </div>
  
        <div class="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-100">
          <span class="font-semibold text-gray-600 text-sm uppercase tracking-wider">Durum:</span>
          <p class="text-xl font-bold text-gray-800 mt-1 capitalize">{{ weatherData.weather[0].description }}</p>
        </div>
  
        <div class="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-100">
          <span class="font-semibold text-gray-600 text-sm uppercase tracking-wider">Rüzgar:</span>
          <p class="text-2xl font-bold text-gray-800 mt-1">{{ weatherData.wind.speed }} <span class="text-lg font-normal text-gray-600">m/s</span></p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  
  const props = defineProps<{
    weatherData: any; 
  }>();
  </script>