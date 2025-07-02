export type WeatherData = {
    name: string;
    main: { temp: number; feels_like: number };
    weather: { icon: string; description: string }[];
    wind: { speed: number };
} | null;