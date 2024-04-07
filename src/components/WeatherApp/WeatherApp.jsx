import search_icon from "/src/assets/search-interface-symbol.png"
import sun_icon from "/src/assets/sun.png"
import cloudy_sun_icon from "/src/assets/cloudy_sun.png"
import cloudy_icon from "/src/assets/cloudy.png"
import rain_sun_icon from "/src/assets/rain_sun.png"
import rain_storm_icon from "/src/assets/storm.png"
import snowy_icon from "/src/assets/snowy.png"
import wind_icon from "/src/assets/windy.png"
import humidity_icon from "/src/assets/humidity.png"
import mist_icon from "/src/assets/foog.png"
import { useState, useCallback } from "react"
import SearchBar from "./SearchBar"
import WeatherInfoContainer from "./WeatherInfoContainer"

export default function WeatherApp() {
    const openweather_api_key = import.meta.env.VITE_OPENWEATHER_API_KEY
    const geodb_api_key = import.meta.env.VITE_GEODB_API_KEY
    const [input, setInput] = useState("")
    const [results, setResults] = useState([])
    const [icon, setIcon] = useState(sun_icon)

    async function fetchData(value) {
        const city_url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=1000000&namePrefix=${value}`
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': geodb_api_key,
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
        }

        try {
            const response = await fetch(city_url, options)
            const city_data = await response.json()
            // console.log(city_data)
            const city_data_arr = Object.entries(city_data)
            // console.log(city_data_arr[0][1])
            setResults(city_data_arr[0][1])
            console.log(results)
        } catch (err) {
            console.error(err)
            return
        }
    }


    const weather = useCallback(async () => {
         let city_name = input
         let url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=Metric&appid=${openweather_api_key}`
         if (city_name == "") {
             return
         }
         try {
             let response = await fetch(url)
             let data = await response.json()
             console.log(data)
             let humidity = document.getElementsByClassName("humidity-percent")[0]
             let temperature = document.getElementById("temp")
             let wind_speed = document.getElementsByClassName("wind-speed")[0]
             let location = document.getElementById("city")
 
             humidity.textContent = data.main.humidity + "%"
             wind_speed.textContent = data.wind.speed + "km/h"
             temperature.textContent = Math.round(data.main.temp) + "°C"
             location.textContent = input
 
             if (data.weather[0].icon == "01d" || data.weather[0].icon == "01n") {
                 setIcon(sun_icon)
             }
             if (data.weather[0].icon == "02d" || data.weather[0].icon == "02n") {
                 setIcon(cloudy_sun_icon)
             }
             if (data.weather[0].icon == "03d" || data.weather[0].icon == "03n" || data.weather[0].icon == "04d" || data.weather[0].icon == "04n") {
                 setIcon(cloudy_icon)
             }
             if (data.weather[0].icon == "13d") {
                 setIcon(snowy_icon)
             }
             if (data.weather[0].id == 500 || data.weather[0].id == 501 || data.weather[0].icon == "09d") {
                 setIcon(rain_sun_icon)
             }
             if (data.weather[0].id == 502 || data.weather[0].id == 503 || data.weather[0].id == 504) {
                 setIcon(rain_storm_icon)
             }
             if (data.weather[0].icon == "11d") {
                 setIcon(rain_storm_icon)
             }
             if (data.weather[0].icon == "50d" || data.weather[0].icon == "50n") {
                 setIcon(mist_icon)
             }
 
         } catch (err) {
             console.log(err)
             return
         }
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [input])
       

    return (
        <>
            <section id="main-section">
                <SearchBar searchIcon = {search_icon} input = {input} setInput = {setInput}  weather = {weather} fetchData = {fetchData} results = {results}/>
                <WeatherInfoContainer icon = {icon} windIcon = {wind_icon} humidityIcon = {humidity_icon}/>
            </section>
        </>
    )
}
