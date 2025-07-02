import { defineStore } from 'pinia'
import type { WeatherData } from '~/types/weather';

export const useWeatherStore = defineStore('weather', {
    state: () => ({
        recentCities: process.client
            ? JSON.parse(localStorage.getItem('recentCities') || '[]') as string[]
            : [],
        weatherData: null as WeatherData,
        isLoading: false,
        error: '',
    }),

    actions: {
        setWeatherData(data: WeatherData) {
            this.weatherData = data;
        },

        addCityToRecent(city: string) {
            const existingIndex = this.recentCities.findIndex(
                (c) => c.toLowerCase() === city.toLowerCase()
            );
            if (existingIndex !== -1) {
                this.recentCities.splice(existingIndex, 1);
            }
            this.recentCities.unshift(city);
            if (this.recentCities.length > 5) {
                this.recentCities.pop();
            }

            if (process.client) {
                localStorage.setItem('recentCities', JSON.stringify(this.recentCities));
            }
        },

        setLoading(status: boolean) {
            this.isLoading = status;
        },

        setError(message: string) {
            this.error = message;
        },

        clearError() {
            this.error = '';
        },

        clearRecentCities() {
            this.recentCities = [];
            if (process.client) {
                localStorage.removeItem('recentCities');
            }
        },
    },
});