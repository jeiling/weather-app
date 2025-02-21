"use client";
import React, { useState } from "react";

interface WeatherFormProps {
  onAddWeatherCard: (city: string) => void;
  loading: boolean;
}

const WeatherForm: React.FC<WeatherFormProps> = ({
  onAddWeatherCard,
  loading,
}) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddWeatherCard(city);
    setCity("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center space-x-4 justify-center"
    >
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="p-2 border text-black border-gray-300 rounded w-full"
      />
      <button
        disabled={loading}
        type="submit"
        className={`p-2 bg-blue-500 text-white rounded ${
          loading ? "opacity-50" : ""
        }`}
      >
        Add
      </button>
    </form>
  );
};

export default WeatherForm;
