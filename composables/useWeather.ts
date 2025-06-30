import { useWeatherStore } from '@/stores/weatherStore';

export const useWeather = () => {
    const weatherStore = useWeatherStore();
    const config = useRuntimeConfig();

    const fetchWeather = async (city: string) => {
        weatherStore.clearError();
        weatherStore.setLoading(true);

        try {
            const response = await $fetch(`https://api.openweathermap.org/data/2.5/weather`, {
                params: {
                    q: city,
                    appid: config.public.openweatherApiKey,
                    units: 'metric',
                },
            });
            console.log('Runtime config API KEY:', config.public.openweatherApiKey);
            weatherStore.addCityToRecent(city);
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