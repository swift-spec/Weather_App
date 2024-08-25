import React, { useState } from 'react'
import './Weather.css'

const api = {
    key : "c2283b4aba99ffdcc34b0f98d9da3304" ,
    base : "https://api.openweathermap.org/data/2.5/"
}

const Weather = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});  //as the data is big we store it as object

    const search = evt => {
        if(evt.key === "Enter"){
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(result =>{
                setWeather(result);
                setQuery(''); //so that if we write something in search and press enter then search would become empty
                
            })
        }
    }

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May",
                      "June", "July", "August", "September", "October",
                      "November", "December"];
        let days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
        
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }
  return (
    <div className={(typeof weather.main != "undefined")?((weather.main.temp > 16)?'app warm' : 'app'):'app'}>
        <main>
            <div className='search-box'>
                <input type="text" 
                className='search-bar'
                placeholder='Search...'
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyPress = {search}
                />
            </div>
            {(typeof weather.main != "undefined")?(
                <div>
                <div className='location-box'>
                    <div className="location">
                        {weather.name},{weather.sys.country}
                    </div>
                    <div className="date">
                        {dateBuilder(new Date
                        ())}
                    </div>
                    </div>
                    <div className="weather-box">
                        <div className="temp">
                            {Math.round(weather.main.temp)}°C
                        </div>
                        <div className="weather">
                            {weather.weather[0].main}
                        </div>
                    </div>
            </div>
            ) : (' ')}
            
        </main>
    </div>
  )
}

export default Weather