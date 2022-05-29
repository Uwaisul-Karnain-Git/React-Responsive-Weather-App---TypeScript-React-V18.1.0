import React, { useState, useEffect } from "react";
import "./style.scss";
import City from '../../../data/City';
import sydney from '../../images/sydney.jpeg';
import melbourne from '../../images/melbourne.jpeg';
import brisbane from '../../images/brisbane.jpeg';
import adelaide from '../../images/adelaide.jpeg';
import canberra from '../../images/canberra.jpeg';
import hobart from '../../images/melbourne.jpeg';
import perth from '../../images/perth.jpeg';
import darwin from '../../images/darwin.jpeg';

const WeatherComponent = () => {
    const GET_API_URL = 'http://localhost:3500/cities';
    const [cities, setCities] = useState<any[]>(() => []);
    const [selectedCity, setSelectedCity] = useState<City>();
    const [weatherInfo, setWeatherInfo] = useState<any>(() => null);

    useEffect(() => {
        // Fetch cities from the json-server
        const fetchCities = async () => {
            try {
              const response = await fetch(GET_API_URL);
              if (!response.ok) throw Error('Did not receive city information');
              const listItems = await response.json();

              setCities(listItems);
            } catch (err) {
              console.log(err);
            }
          }
      
        //(async () => await fetchCities())(); // Instantly invoked function expression
        fetchCities();
    }, []);

    useEffect(() => {
        if(selectedCity) {
            //(async () => await fetchCityWiseWeatherInfomation())(); // Instantly invoked function expression
            fetchCityWiseWeatherInfomation();
        }
    }, [selectedCity]);


    const fetchCityWiseWeatherInfomation = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${selectedCity?.latitude}&lon=${selectedCity?.longitude}&appid=599176e4fa1aaeb4dffbc11e12d971b6`);
            if (!response.ok) throw Error('Did not receive weather information');
            const weatherData = await response.json();

            setWeatherInfo(weatherData);
        } catch (err) {
            console.log(err);
        }
    }

    const handleDropdownChange = (e: any) => {
        const city = cities.find(c => e.target.value && c.id === parseInt(e.target.value));
        setSelectedCity(city);
    };

    const getCityImage = (cityName: string) => {
        switch (cityName){
            case "Sydney":
                return sydney;
            case "Melbourne":
                return melbourne;
            case "Brisbane":
                return brisbane;
            case "Adelaide":
                return adelaide;
            case "Canberra":
                return canberra;
            case "Hobart":
                return hobart;
            case "Perth":
                return perth;
            case "Darwin":
                return darwin;
            default:
                return '';
        }
    }

    return (
        <div className="mainContainer">
            <div className="selectContainer">
                <span className="label-bold topLabelPositioning">Select the City:</span>

                <select defaultValue="" onChange={(e) => handleDropdownChange(e)}>
                    <option disabled={true} value="">Select a City</option>
                    {cities.map((city: any) => (
                        <option key={city.id} value={city.id}>{city.name}</option>
                    ))}
                </select>
            </div>

            <div className="wdContainer">
                <div className="cellContainer">
                    {selectedCity && 
                        <>
                            <span className="label-bold cityNameStyle">{selectedCity.name}</span>
                            <img className="imgStyle" src={getCityImage(selectedCity.name)} alt="" />
                        </>
                    }
                </div>
                <div>
                    {weatherInfo && 
                        <div className="cellContainer">
                            <span className="label-bold tempDetailsDiv">Current Temperature</span>
                            {weatherInfo && weatherInfo.main && weatherInfo.main.temp && 
                                <span className={`labelStyle tempDetailsDiv 
                                    ${weatherInfo.main.temp > 283.15 ? "redFont" : "greenFont"}`}>{ weatherInfo.main.temp }K</span>
                            }
                        </div>
                    }
                </div>
                <div>
                    {weatherInfo && 
                        <div className="cellContainer">
                            <span className="label-bold tempDetailsDiv">Weather Conditions</span>
                            <span className="labelStyle tempDetailsDiv">{weatherInfo && weatherInfo.weather 
                                && Array.isArray(weatherInfo.weather) && weatherInfo.weather.length > 0 
                                ? (weatherInfo.weather[0].main + ' - ' + weatherInfo.weather[0].description) : ''}</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default WeatherComponent;
