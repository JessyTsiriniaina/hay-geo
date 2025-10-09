import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import { Country } from './components/Country';
import { ViewCountry } from './components/ViewCountry';
import { GridLoader } from "react-spinners";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log(response.data);
        setCountries(response.data);
        setFilteredCountries(response.data)
      })
      .then (() => setIsLoading(false))
    }

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter(
        country => country.name.common.toLowerCase().includes(search.toLowerCase()
      ))
    )

  }, [countries, search]);

  const handleChange = (event) => {
    setSearch(event.target.value);
  }

  const handleShow = (country) => {
    setSelectedCountry(country);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <GridLoader />
      </div> 
    )
  } 

  return (
    <>
      <div className='flex w-screen h-screen max-w-screen max-h-screen'> 
        <div className='w-1/3 max-h-full'>
          <label for='search' className='text-gray-700 tx-lg block'>Find countries</label>
          <input 
            id='search'
            name="search" 
            type="text" 
            value={search} 
            onChange={handleChange}
            className='border-1 rounded-md border-gray-400 px-[4px] py-[4px]'
          />
          <div className='overflow-y-scroll max-h-2/3'>
            {
              filteredCountries.map(country => 
                <Country key={country.name.common} name={country.name.common} handleShow={()=>handleShow(country)}/>
              )
            }

          </div>
        </div>

        <div className='overflow-y-scroll w-2/3 max-h-full'>
          <ViewCountry country={selectedCountry}/>
        </div>
      </div>
    </>
  )
}

export default App
