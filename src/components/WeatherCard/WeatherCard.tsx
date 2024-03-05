import "./WeatherCard.scss";
import { WeatherResponse } from "../../types/WeatherResponse";

type WeatherCardProps = {
  data: WeatherResponse;
};

const WeatherCard = ({ data }: WeatherCardProps) => {
  
  /**
   * Formats the current local time as a user-friendly, readable string.
   *
   * @returns {string} The formatted time string in the format of "HH:MM AM/PM".
   */

  const getFormattedTime = () => {
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-GB", timeOptions).format(new Date());
  };

  /**
   * Formats the local date from the weather data as a user-friendly, readable string.
   *
   * @returns {string} The formatted date string, e.g., "Monday, 1 January 2024".
   */
  const getFormattedDate = () => {
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("en-GB", dateOptions).format(
      new Date(data.location.localtime)
    );
  };

  /**
   * Determines the appropriate greeting based on the hour of the day.
   *
   * @returns {string} A greeting message based on the time of day ("Good Morning!", "Good Afternoon!", or "Good Evening!").
   */
  const getGreeting = () => {
    const hour = new Date(data.location.localtime).getHours();
    if (hour < 12) return "Good Morning!";
    if (hour < 18) return "Good Afternoon!";
    return "Good Evening!";
  };

  return (
    <div className="weathercard">
      <h1 className="weathercard__greeting">{getGreeting()}</h1>
      <h1 className="weathercard__location">
        {data.location.name}, {data.location.country}
      </h1>
      <p className="weathercard__local-time">{getFormattedTime()}</p>
      <p className="weathercard__local-date">{getFormattedDate()}</p>
      <div className="weathercard__conditions">
        <img
          src={`https:${data.current.condition.icon}`}
          alt={data.current.condition.text}
          className="weathercard__icon"
        />
        <p className="weathercard__temp">{data.current.temp_c}°C</p>
        <p className="weathercard__condition">{data.current.condition.text}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
