// eslint-disable-next-line react/prop-types
export default function WeatherInfoContainer({icon, windIcon, humidityIcon}) {
  return (
    <>
      <div id="main-container">
                    <div id="weather-img-container">
                        <img src={icon} alt="weather icon" />
                    </div>
                    <div id="temp">__</div>
                </div>
                <div id="city">N/A</div>
                <div id="add-info-container">
                    <div className="add-info-wrapper humid">
                        <div className="add-info-label">Humidity</div>
                        <div className="main-add-info">
                            <div className="add-info-img-container">
                                <img width="70px" height="70px" src={humidityIcon} alt="humidity icon" />
                            </div>
                            <div className="humidity-percent add-info">__</div>
                        </div>
                    </div>
                    <div className="add-info-wrapper">
                        <div className="add-info-label">Wind Speed</div>
                        <div className="main-add-info">
                            <div className="add-info-img-container wind-img">
                                <img width="70px" height="70px" src={windIcon} alt="wind icon" />
                            </div>
                            <div className="wind-speed add-info">__</div>
                        </div>
                    </div>
                </div>
    </>
  )
}
