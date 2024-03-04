import { useEffect, useState } from "react";
import "./main.scss";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import { WeatherResponse } from "./types/WeatherResponse";
import TaskList from "./components/TaskList/TaskList";
import AddTask from "./components/AddTask/AddTask";

type Task = {
  id: number;
  content: string;
};

const App = () => {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskId, setTaskId] = useState<number>(0);

  const handleAddTask = (taskContent: string) => {
    setTasks([...tasks, { id: taskId, content: taskContent }]);
    setTaskId(taskId + 1);
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

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
        <>
          <div className="app-container__weather">
            <WeatherCard data={weather} />
          </div>
          <div className="app-container__tasks">
            <AddTask onAdd={handleAddTask} />
            <TaskList tasks={tasks} onDelete={handleDeleteTask} />
          </div>
        </>
      ) : (
        <p className="app-container__loading">Loading weather data...</p>
      )}
    </div>
  );
};

export default App;
