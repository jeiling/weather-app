"use client";
import React from "react";
import { WeatherData } from "../types";
import { useDrag, useDrop } from "react-dnd";
import Image from "next/image";

interface WeatherCardProps {
  data: WeatherData;
  onDelete: (id: number) => void;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

const getBackgroundColor = (description: string) => {
  switch (description.toLowerCase()) {
    case "clear sky":
      return "bg-blue-200";
    case "few clouds":
      return "bg-gray-200";
    case "scattered clouds":
      return "bg-gray-400";
    case "broken clouds":
      return "bg-gray-600";
    case "shower rain":
      return "bg-blue-400";
    case "rain":
      return "bg-blue-600";
    case "thunderstorm":
      return "bg-yellow-600";
    case "snow":
      return "bg-white";
    case "mist":
      return "bg-gray-100";
    default:
      return "bg-gray-300";
  }
};

const WeatherCard: React.FC<WeatherCardProps> = ({
  data,
  onDelete,
  index,
  moveCard,
}) => {
  const backgroundColor = getBackgroundColor(data.description);

  const ref = React.useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: "card",
    hover(item: { index: number }) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`p-4 rounded-lg shadow-md text-center ${backgroundColor} ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <h3 className="text-xl font-bold mb-2">{data.city}</h3>
      <p className="text-lg">{data.temperature}°C</p>
      <Image
        src={`http://openweathermap.org/img/w/${data.icon}.png`}
        alt={data.description}
        width={60}
        height={60}
        className="mx-auto"
      />
      <p className="text-gray-900">{data.description}</p>
      <button
        onClick={() => onDelete(data.id)}
        className="mt-4 p-2 bg-red-500 text-white rounded"
      >
        Delete
      </button>
    </div>
  );
};

export default WeatherCard;
