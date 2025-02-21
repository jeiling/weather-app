'use client'
import { useState, useCallback } from 'react';
import { WeatherData } from '../types';

const useWeather = () => {
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<Set<string>>(new Set());
  const [weatherCards, setWeatherCards] = useState<WeatherData[]>([]);

  const handleAddWeatherCard = useCallback(async (city: string) => {
    if (cities.has(city)) {
      alert('City already added');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/weather`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city }),
      });
      if (!response.ok) {
        if (response.status === 404) {
          alert('City not found');
        }
        throw new Error("Failed to fetch weather data");
      }
      const weatherData: WeatherData = await response.json();
      setWeatherCards([weatherData, ...weatherCards]);
      setCities(new Set(cities).add(city));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [cities, weatherCards]);

  const handleDeleteWeatherCard = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/weather?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error("Failed to delete weather card");
      }
      setWeatherCards(weatherCards.filter(card => card.id !== id));
      setCities(new Set(weatherCards.filter(card => card.id !== id).map(card => card.city)));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [weatherCards]);

  return {
    loading,
    weatherCards,
    handleAddWeatherCard,
    handleDeleteWeatherCard,
    setWeatherCards
  };
};

export default useWeather;