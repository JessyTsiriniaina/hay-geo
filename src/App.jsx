import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import { Country } from './components/Country';
import { ViewCountry } from './components/ViewCountry';

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log(response.data);
        setCountries(response.data);
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

  const handleShow = (name) => {
    setSearch(name)
    console.log(name)
  }

  if(isLoading) {
    return <div>Chargement...</div>
  }

  return (
    <>
      <label>find countries <input type="text" value={search} onChange={handleChange}/></label>
      {
        filteredCountries.length > 10 ? (
          <div>Too many matches, specify another filter</div>
        ) : filteredCountries.length === 1 ? (
          <ViewCountry name={filteredCountries[0].name.common}/>
        ) : (
          filteredCountries.map(country => 
            <Country key={country.name.common} name={country.name.common} handleShow={()=>handleShow(country.name.common)}/>
          )
        )
      }
    </>
  )
}

export default App
