import { useState, useEffect } from 'react'
import axios from "axios"

const CountryDetail = (props) => {

  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const wUrl = `http://api.openweathermap.org/data/2.5/weather?q=${props.country.capital}&appid=a436c4bd3875f6db49f62736b9d47013`
    axios
      .get(wUrl)
      .then(response => {
        console.log(response)
        setWeather(response.data);
      })
  }, [props.country.capital])

  return (
    <div>
      <h2>{props.country.name.common}</h2>

      <p>capital {props.country.capital}</p>
      <p>area {props.country.area}</p>

      <h3>languages: </h3>

      <ul>
        {Object.values(props.country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img src={props.country.flags.png} alt="" />
      <h2>Weather in {props.country.capital}</h2>
      {weather ? (
        <div>
          <p>temperature {weather.main.temp} Celcius</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      ) : (
        <p>Weather data not available</p>
      )}

    </div>
  )
}

const Countries = ({ countries, showCountry }) => {
  if (countries.length == 1) {
    return <CountryDetail country={countries[0]} />
  } else if (countries.length < 10 && countries.length !== 1) {
    return countries.map((country) => {
      return (
        <div>
          <p>{country.name.common}</p>
          <button onClick={() => showCountry(country)}>show</button>
        </div>

      )
    }
    )
  } else if (countries.length !== 0) {
    return <p>Too many matches, specify another filter</p>
  }
  return null

}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)


  useEffect(() => {
    const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
    axios
      .get(baseUrl)
      .then(response => {
        setCountries(response.data);
      })
  }, [])


  const countriesToShow = countries.filter(c => c.name.common.toLowerCase().includes(search.toLowerCase()) && search !== '')
  console.log(countriesToShow.length)


  const handleSearch = (event) => {
    setSearch(event.target.value)
    setSelectedCountry(null)
  }

  const showCountry = (country) => {
    setSelectedCountry(country)
  }



  return (
    <div>
      find countries <input onChange={handleSearch} /> <br />
      {
        selectedCountry ? (
          <CountryDetail country={selectedCountry} />
        ) :
          (
            <Countries countries={countriesToShow} showCountry={showCountry} />
          )
      }

    </div>
  )
}

export default App
