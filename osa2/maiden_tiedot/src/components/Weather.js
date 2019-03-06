import React, { useState, useEffect } from 'react'
import axios from 'axios'
import key from '../key'

const Weather = ({ city }) => {
  const [weather, setWeather] = useState({})

  const getWeather = async () => {
    const response = await axios.get(`http://api.apixu.com/v1/current.json?key=${key}&q=${city}`)
    const { temp_c, wind_kph, wind_dir } = response.data.current
    const weatherObject = {
      temp_c,
      wind_kph,
      wind_dir
    }
    setWeather(weatherObject)
  }

  useEffect(() => {
    getWeather()
  }, [])

  return (
    <div>
      <h2>Weather in {city}</h2>
      <p><b>temperature: </b>{weather.temp_c} Celsius</p>
      <p><b>wind: </b>{weather.wind_kph} kph direction {weather.wind_dir}</p>
    </div>
  )
}

export default Weather