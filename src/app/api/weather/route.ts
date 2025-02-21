import { NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json({ error: 'City is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await response.json();

    if (response.ok) {
      const weatherData = {
        id: data.id,
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      };
      return NextResponse.json(weatherData, { status: 200 });
    } else {
      return NextResponse.json({ error: data.message }, { status: response.status });
    }
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { city } = await request.json();

  if (!city) {
    return NextResponse.json({ error: 'City is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await response.json();

    if (response.ok) {
      const weatherData = {
        id: data.id,
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      };
      return NextResponse.json(weatherData, { status: 201 });
    } else {
      return NextResponse.json({ error: data.message }, { status: response.status });
    }
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  return NextResponse.json({ message: 'Weather card deleted' }, { status: 200 });
}