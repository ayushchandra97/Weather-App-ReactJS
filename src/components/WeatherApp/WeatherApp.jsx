import search_icon from "/assets/search-interface-symbol.png"
import sun_icon from "/assets/sun.png"
import cloudy_sun_icon from "/assets/cloudy_sun.png"
import cloudy_icon from "/assets/cloudy.png"
import rain_sun_icon from "/assets/rain_sun.png"
import rain_storm_icon from "/assets/storm.png"
import snowy_icon from "/assets/snowy.png"
import wind_icon from "/assets/windy.png"
import humidity_icon from "/assets/humidity.png"
import mist_icon from "/assets/foog.png"
import { useState, useCallback } from "react"
import SearchBar from "./SearchBar"
import WeatherInfoContainer from "./WeatherInfoContainer"
import { useErrorBoundary } from "react-error-boundary"

export default function WeatherApp() {

    const { showBoundary } = useErrorBoundary()

    const openweather_api_key = import.meta.env.VITE_OPENWEATHER_API_KEY
    const geonames_user_id = import.meta.env.VITE_GEONAMES_USER_ID
    const [input, setInput] = useState("")
    const [results, setResults] = useState([])
    const [icon, setIcon] = useState(sun_icon)

    async function fetchData(value) {
        const city_url = `https://secure.geonames.org/searchJSON?name_startsWith=${value}&maxRows=10&username=${geonames_user_id}`

        try {
            const response = await fetch(city_url)
            console.log(response.status)
            if (!response.ok) {
                const error = new Error(`Error ${response.status} : ${response.statusText}`)
                error.status = response.status
                error.statusText = response.statusText
                throw error
            }
            const city_data = await response.json()
            const city_data_arr = city_data.geonames
            setResults(city_data_arr)
        } catch (error) {
            showBoundary(error)
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
            if (!response.ok) {
                const error = new Error(`Error ${response.status} : ${response.statusText}`)
                error.status = response.status
                error.statusText = response.statusText
                throw error
            }
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

        } catch (error) {
            showBoundary(error)
            return
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input])


    return (
        <>
            <section id="main-section">
                <SearchBar searchIcon={search_icon} input={input} setInput={setInput} weather={weather} fetchData={fetchData} results={results} />
                <WeatherInfoContainer icon={icon} windIcon={wind_icon} humidityIcon={humidity_icon} />
            </section>
        </>
    )
}
