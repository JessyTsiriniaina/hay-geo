import { useEffect, useState } from 'react'
import axios from 'axios';
import { GridLoader } from "react-spinners";
import { CloudDrizzle, CloudLightning, CloudSun, Snowflake, Sun } from 'lucide-react';

export const WeatherForecast = ({longitude, latitude}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [weatherInfo, setWeatherInfo] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
        
        await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lon=${longitude}&lat=${latitude}&appid=${API_KEY}&units=metric`
        )
          .then(response => {
            const dailyForecasts = response.data.list.filter(day => day.dt_txt.includes("12:00:00"));

            const weather = dailyForecasts.map((day) => ({
              date: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
              temp: Math.round(day.main.temp),
              description: day.weather[0].main,
              icon: day.weather[0].id,
            }))

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

    fetchWeather();
  }, [latitude, longitude]);

  const getWeatherIcon = (code) => {
    if (code/100 === 2) return <CloudLightning className="h-8 w-8 text-sky-300" />;
    if (code/100 === 3) return <CloudDrizzle className="h-8 w-8 text-gray-400" />;
    if (code/100 === 5) return <CloudRain className="h-8 w-8 text-blue-500" />;
    if (code/100 === 6) return <Snowflake className="h-8 w-8 text-blue-300" />;
    if (code/100 === 8 && code % 100 == 0) return <Sun className="h-8 w-8 text-yellow-500" />;
    return <CloudSun className="h-8 w-8 text-gray-600" />;
  };




  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <GridLoader color='#8db2caff'/>
      </div>
    )
  }


  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-blue-50 text-gray-900
                        shadow-sm overflow-hidden transition-all duration-300 
                        hover:shadow-[0 10px 15px -3px hsl(205 87% 45% / 0.15), 0 4px 6px -2px hsl(205 87% 45% / 0.08)] 
                        shadow-[0 4px 6px -1px hsl(205 87% 45% / 0.1), 0 2px 4px -1px hsl(205 87% 45% / 0.06)]"
      >
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold">
              5 days Weather forecast
            </p>
          </div>
        </div>
        <div className="p-6 pt-0 pt-6">

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {weatherInfo.map((day, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-sky-100 to-indigo-100 hover:from-sky-200 hover:to-indigo-200 transition-all duration-300"
              >
                <p className="text-sm font-medium text-slate-500 mb-2">
                  {day.date}
                </p>
                <div className="my-2">{getWeatherIcon(parseInt(day.icon))}</div>
                <p className="text-2xl font-bold">{day.temp}°C</p>
                <p className="text-xs text-slate-500 mt-1 text-center">
                  {day.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}
