import "./WeatherCard.scss";
import { WeatherResponse } from "../types/WeatherResponse";

type WeatherCardProps = {
  data: WeatherResponse;
};

const WeatherCard = ({ data }: WeatherCardProps) => {
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
      <p className="weathercard__local-time">{data.location.localtime}</p>
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
