import { useState, useEffect } from 'react'
import axios from "axios"

const Countries = ({ countries }) => {

  if (countries.length < 10 && countries.length !== 1) {
    return countries.map((country) => {
        return (
          <p>{country.name.common}</p>
        )
      }
    )
  } else if (countries.length === 1) {
    const country = countries[0]
    return (
      <div>
        <h2>{country.name.common}</h2>

        <p>capital {country.capital}</p> 
        <p>area {country.area}</p>

        <h3>languages: </h3>

        <ul>
          {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li> 
          ))}
        </ul>

        <img src={country.flags.png} alt="" />
      </div>
    )
  } else if (countries.length !== 0) {
    return <p>Too many matches, specify another filter</p>
  }
  return null

}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')


  useEffect(() => {
    const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
    axios
      .get(baseUrl)
      .then(response => {
        console.log(response)
        setCountries(response.data);
      })
  }, [])


  const countriesToShow = countries.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()) && search !== '')
  console.log(countriesToShow.length)


  const handleSearch = (event) => {
    setSearch(event.target.value)
  }


  return (
    <div>
      find countries <input onChange={handleSearch} /> <br />
      <Countries countries={countriesToShow} search={search} />
    </div>
  )
}

export default App
