/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react"

export default function SearchBar({searchIcon, input, setInput, weather, fetchData, results}) {

    
    const [shouldFetchWeather, setShouldFetchWeather] = useState(false)

    function handleChange(value) {
        setInput(value)
        fetchData(value)
    }

    useEffect(() => {
        if (shouldFetchWeather) {
            weather()
            setShouldFetchWeather(false)
        }

    }, [input, shouldFetchWeather, weather])


    function onSearch(searchTerm) {
        setInput(searchTerm)
        setShouldFetchWeather(true)
    }

    const searchInputRef = useRef(null)
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchInputRef.current &&
                !searchInputRef.current.contains(event.target) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                dropdownRef.current.style.display = 'none'
            }
        };

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    const handleInputClick = () => {
        dropdownRef.current.style.display = 'block'
    };


    return (
        <>
            <div id="input-container">
                <div className="input-inner">
                    <input ref={searchInputRef} id="search-input" type="search" name="search" value={input} placeholder='Type the city name here!' onClick={handleInputClick} onChange={(e) => handleChange(e.target.value)} />
                    <button onClick={() => { weather() }}><img src={searchIcon} alt="search icon" /></button>
                </div>
                <div ref={dropdownRef} id="dropdown">
                    {results.filter((result) => {
                        const searchTerm = input.toLowerCase()
                        const city_name = result.name.toLowerCase()
                        return input && city_name.includes(searchTerm) && searchTerm !== city_name
                    }).map((result, id) => (
                        <div onClick={() => onSearch(result.name)} className="dropdown-list" key={id}>{result.name}, {result.adminName1}, {result.countryName}</div>
                    )
                    )}
                </div>
            </div>
        </>
    )
}
