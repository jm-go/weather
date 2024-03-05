import { useEffect, useState } from "react";
import "./main.scss";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import { WeatherResponse } from "./types/WeatherResponse";
import TaskList from "./components/TaskList/TaskList";
import AddTask from "./components/AddTask/AddTask";
import Task from "./types/Task";

const App = () => {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskId, setTaskId] = useState<number>(0);

  /**
   * Adds a new task with the given content to the tasks list.
   *
   * @param {string} taskContent - The content of the new task to be added.
   */
  const handleAddTask = (taskContent: string) => {
    setTasks([...tasks, { id: taskId, content: taskContent }]);
    setTaskId(taskId + 1);
  };

  /**
   * Deletes a task based on its ID.
   *
   * @param {number} taskId - The ID of the task to be deleted.
   */
  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  /**
   * Fetches the weather data for the specified latitude and longitude.
   *
   * @param {number} latitude - The latitude part of the location.
   * @param {number} longitude - The longitude part of the location.
   * @async
   */
  const getWeather = async (latitude: number, longitude: number) => {
    const key = import.meta.env.VITE_API_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${latitude},${longitude}&aqi=no`;

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

  /**
   * Gets the user's current location and fetches the weather data for it.
   */
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

  // Fetch the user's location and weather data on component mount.
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
