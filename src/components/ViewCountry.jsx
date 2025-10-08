import { useEffect, useState } from 'react'
import axios from 'axios';
import Map from './Map';


export const ViewCountry = ({name}) => {
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [weatherInfo, setWeatherInfo] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`);
        setCountry(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCountry();
  }, [name]);

  useEffect(() => {
    const fetchWeather = async () => {
      if (country && country.capital && country.capital.length > 0) {
        try {
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
              descrption: response.data.weather[0].description,
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
    };

    fetchWeather();
  }, [country]);

  if(isLoading) {
    return <div>Chargement...</div>
  }

  return (
    <div>
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
    </div>
  )
}
