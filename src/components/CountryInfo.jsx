
import {MapPin, Users, Globe, Map} from 'lucide-react'


export const CountryInfo = ({country}) => {

  if(country === null) {
    return (
      <h1>No country selected</h1>
    )
  }

  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-blue-50 text-gray-900
                      shadow-sm overflow-hidden transition-all duration-300 
                      hover:shadow-[0 10px 15px -3px hsl(205 87% 45% / 0.15), 0 4px 6px -2px hsl(205 87% 45% / 0.08)] 
                      shadow-[0 4px 6px -1px hsl(205 87% 45% / 0.1), 0 2px 4px -1px hsl(205 87% 45% / 0.06)]"
      >
        <div className="flex flex-col space-y-1.5 p-6 bg-gradient-to-r from-blue-100 to-emerauld-100 pb-4">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">
              {country.name.common}
            </p>
            <img
              src={country.flags.svg}
              alt={country.flags.alt || `Flag of ${country.name.common}`}
              className="h-16 w-24 object-cover rounded-md shadow-md border-2 border-white dark:border-gray-700"
            />
          </div>
          <p className="text-sm text-slate-500">{country.name.official}</p>
        </div>
        <div className="p-6 pt-0 pt-6">
          
          <div className="grid gap-4 md:grid-cols-2">

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-500">Capital</p>
                <p className="text-lg font-semibold">{country.capital?.[0] || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Map className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-500">Area</p>
                <p className="text-lg font-semibold">
                  {country.area.toLocaleString()} km²
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Globe className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-500">Languages</p>
                <p className="text-lg font-semibold">{Object.values(country.languages || {}).join(", ") || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-500">Population</p>
                <p className="text-lg font-semibold">
                  {country.population.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>





        {/*<h1>{country.name.common}</h1>
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
        <p><b>Wind: </b>{weatherInfo.wind_speed} m/s</p>*/}
    </>
  )
}
