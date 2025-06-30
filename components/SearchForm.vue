<template>
  <div
    class="w-full max-w-md mx-auto mt-10 p-4 border rounded-lg shadow bg-white"
  >
    <form @submit.prevent="handleSearch" class="flex gap-2">
      <input
        v-model="city"
        type="text"
        placeholder="Şehir adı girin..."
        class="flex-1 border p-2 rounded focus:outline-none"
        :disabled="weatherStore.isLoading"
      />
      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        :disabled="weatherStore.isLoading || city.trim() === ''"
      >
        Ara
      </button>
    </form>

    <div v-if="weatherStore.isLoading" class="text-blue-600 mt-2 animate-pulse">
      Yükleniyor...
    </div>

    <div v-if="weatherStore.error" class="text-red-600 mt-2">
      {{ weatherStore.error }}
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
</script>
