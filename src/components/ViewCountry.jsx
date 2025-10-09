import { useEffect, useState } from 'react'
import axios from 'axios';
import Map from './Map';
import { GridLoader } from "react-spinners";


export const ViewCountry = ({country}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [weatherInfo, setWeatherInfo] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if(country) {
        try {
          setIsLoading(true);
          console.log(country);
          const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
          const latitude = country.latlng[0];
          const longitude = country.latlng[1];

          await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lon=${longitude}&lat=${latitude}&appid=${API_KEY}&units=metric`
          )
          .then (response => {
            const weather = {
              temp_min: response.data.main.temp_min,
              temp_max: response.data.main.temp_max,
              temp: response.data.main.temp,
              wind_speed: response.data.wind.speed,
              description: response.data.weather[0].description,
              icon: response.data.weather[0].icon
            }

            setWeatherInfo(weather);
            console.log(response.data);
          })
        } catch (error) {
          console.log(error);
        }
        finally {
          setIsLoading(false);
        }
      }
    }

    fetchWeather();
  }, [country]);

  if(country === null) {
    return (
      <h1>No country selected</h1>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <GridLoader />
      </div> 
    )
  }

  return (
    <>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital[0]}</p>
        <p>Area {country.area}</p>
        <h3>Languages</h3>
        <ul>
            {Object.entries(country.languages).map(([code, language]) => (
                <li key={code}>{language}</li>
            ))}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
        <h3>Weather</h3>
        <p>{weatherInfo.description}</p>
        <img src={`https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`} alt={`${weatherInfo.description} weather icon`} />
        <p><b>Temperature: </b>{weatherInfo.temp} °C, <b>Max: </b>{weatherInfo.temp_max} °C, <b>Min: </b>{weatherInfo.temp_min} °C</p>
        <p><b>Wind: </b>{weatherInfo.wind_speed} m/s</p>
        <Map latitute={country.latlng[0]} longitude={country.latlng[1]}/>
    </>
  )
}
