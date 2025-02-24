"use client";
import React from "react";
import WeatherForm from "./components/WeatherForm";
import WeatherCard from "./components/WeatherCard";
import useWeather from "./hooks/useWeather";
import { DndProvider } from "react-dnd";
import {  MultiBackend } from "react-dnd-multi-backend";
import { HTML5toTouch } from 'rdndmb-html5-to-touch' 

const WeatherPage = () => {
  const {
    loading,
    weatherCards,
    handleAddWeatherCard,
    handleDeleteWeatherCard,
    setWeatherCards,
  } = useWeather();

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const draggedCard = weatherCards[dragIndex];
    const updatedCards = [...weatherCards];
    updatedCards.splice(dragIndex, 1);
    updatedCards.splice(hoverIndex, 0, draggedCard);
    setWeatherCards(updatedCards);
  };

  return (
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-4 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
            Weather App
          </h1>
          <WeatherForm
            onAddWeatherCard={handleAddWeatherCard}
            loading={loading}
          />
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {weatherCards.map((weatherData, index) => (
              <WeatherCard
                key={weatherData.id}
                index={index}
                data={weatherData}
                onDelete={handleDeleteWeatherCard}
                moveCard={moveCard}
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default WeatherPage;
