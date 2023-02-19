import React, { useEffect, useState } from "react";
import axios from "axios";
import "./main.css";

const Main = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(e.target[0].value);
  };
  const [weather, setWeather] = useState();
  const [city, setCity] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const options = {
        method: "GET",
        url: "https://yahoo-weather5.p.rapidapi.com/weather",
        params: { location: city, format: "json", u: "c", lang: "fr" },
        headers: {
          "X-RapidAPI-Key":
            "c546f91d11mshd3f1b10ecf6c669p1f8033jsn972387c868ca",
          "X-RapidAPI-Host": "yahoo-weather5.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);
      setWeather(response.data);
      console.log(response.data);
    };
    fetchWeather();
  }, [city]);
  return (
    <main>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Entrez une ville"
          className="enter-city"
        />
        <input type="submit" className="submit" />
      </form>
      <div className="display">
        {weather && (
          <h2 className="city">
            {weather.location.city}, {weather.location.country}
          </h2>
        )}
        <div className="infos">
          {weather && (
            <p className="temperature">
              {weather.current_observation.condition.temperature} C°
            </p>
          )}
          {weather && (
            <p className="sunrise">
              🌕 {weather.current_observation.astronomy.sunrise}
            </p>
          )}
          {weather && (
            <p className="sunset">
              🌙 {weather.current_observation.astronomy.sunset}
            </p>
          )}
          {weather && (
            <p className="humidity">
              💧 {weather.current_observation.atmosphere.humidity} %
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Main;
