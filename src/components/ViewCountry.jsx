import { useEffect, useState } from 'react'
import axios from 'axios';


export const ViewCountry = ({name}) => {
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then(response => {
          setCountry(response.data)
        })
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData();
  }, [])

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
    </div>
  )
}
