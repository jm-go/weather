import { useEffect, useState } from "react";
import "./main.scss";
import WeatherCard from "./components/WeatherCard";
import { WeatherResponse } from "./types/WeatherResponse";

const App = () => {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);

  const getWeather = async (latitude: number, longitude: number) => {
    const key = "61b91645fd214069b01141243240103";
    const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${latitude},${longitude}&aqi=no`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: WeatherResponse = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getWeather(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className="app-container">
      {weather ? (
        <WeatherCard data={weather} />
      ) : (
        <p className= "app-container__loading">Loading weather data...</p>
      )}
    </div>
  );
};

export default App;
