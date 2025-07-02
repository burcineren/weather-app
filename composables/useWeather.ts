import { useWeatherStore } from '@/stores/weatherStore';
import type { WeatherData } from '~/types/weather';

export const useWeather = () => {
    const weatherStore = useWeatherStore();
    const config = useRuntimeConfig();

    const fetchWeather = async (city: string) => {
        weatherStore.clearError();
        weatherStore.setLoading(true);
        const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
        try {
            const response = await $fetch<WeatherData>(
                `${apiUrl}`,
                {
                    params: {
                        q: city,
                        appid: config.public.openweatherApiKey,
                        units: 'metric',
                    },
                }
            )
            console.log('Runtime config API KEY:', config.public.openweatherApiKey);
            weatherStore.addCityToRecent(city);
            weatherStore.setWeatherData(response)
            return response;
        } catch (error: any) {
            console.error('API error:', error);
            weatherStore.setError(
                error?.response?.status === 404
                    ? 'Şehir bulunamadı.'
                    : 'Bir hata oluştu. Lütfen tekrar deneyin.'
            );
            return null;
        } finally {
            weatherStore.setLoading(false);
        }
    };

    return { fetchWeather };
};