import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import { Country } from './components/Country';
import { CountryInfo } from './components/CountryInfo';
import { GridLoader } from "react-spinners";
import { Globe, Search } from 'lucide-react'
import { WeatherForecast } from './components/WeatherForecast';
import WorldMap from './components/WorldMap'

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const localCountries = localStorage.getItem('countries');
      if(localCountries !== null) {
        setCountries(JSON.parse(localCountries));
        setFilteredCountries(JSON.parse(localCountries));
        setIsLoading(false);
      } else {

      
      await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
        setFilteredCountries(response.data)
        localStorage.setItem('countries', JSON.stringify(response.data))
      })
      .then (() => setIsLoading(false))
    }
    }

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter(
        country => country.name.common.toLowerCase().includes(search.toLowerCase()
      ))
    )
    setSelectedCountry(countries[1])

  }, [countries, search]);

  const handleShow = (country) => {
    setSelectedCountry(country);
  } 

  return (
    <>
      <div className='min-h-screen bg-gradient-to-r from-blue-50 via-30% to-emerald-50 to-90%'>
        <header className="border-b border-gray-200 bg-card/50 backdrop-blur-sm sticky top-0 z-1000">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-8 w-8 text-emerald-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                Hay'Geo
              </h1>
            </div>
          </div>
        </header>


        <main className='container mx-auto px-4 py-8'>
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500  via-cyan-500 to-emerald-400 bg-clip-text text-transparent">
              Discover the World
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Explore countries, check weather forecasts, and view locations on interactive maps
            </p>
            <div className="flex justify-center">
              <div className='w-full max-w-2xl'>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    placeholder="Search for a country..."
                    className="flex h-10 w-full rounded-md border border-blue-100 bg-blue-50
                                 px-3 py-2 text-base ring-offset-background 
                                 placeholder:text-gray-400 focus-visible:outline-none
                                 disabled:cursor-not-allowed disabled:opacity-50 
                                 md:text-sm h-14 pl-12 text-lg shadow-lg border-2 
                                 hover:border-teal-200 focus:border-blue-200 transition-colors"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/*Information country */}
          {isLoading && (
            <div className="text-center py-12">
              <GridLoader color='#00BCD4'/>
            </div>
          )}

          {!selectedCountry && !isLoading && (
            <div className="text-center py-16">
              <Globe className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500">
                Search for a country to get started
              </p>
            </div>
          )}

          {selectedCountry && !isLoading && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <CountryInfo country={selectedCountry} />
              
              <div className="grid gap-6 lg:grid-cols-1">
                <WeatherForecast
                  latitude={selectedCountry.latlng[0]}
                  longitude={selectedCountry.latlng[1]}
                />
                <WorldMap
                  latitude={selectedCountry.latlng[0]}
                  longitude={selectedCountry.latlng[1]}
                />
              </div>
            </div>
          )}


        </main>

        <footer className="border-t border-gray-200 mt-16 py-8 bg-emerald-50">
          <div className="container mx-auto px-4 text-center text-sm text-gray-500">
            <p>
              Powered by REST Countries API, OpenWeatherMap & OpenStreetMap
            </p>
          </div>
        </footer>

      </div>
    </>
  )
}

export default App
