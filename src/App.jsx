

import { useEffect, useState} from 'react';
import './App.css'
import axios from 'axios';
import WeatherCard from './components/WeatherCard';

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()//estado para guardar la información de la API weather
  const [temp, setTemp] = useState()
  const [isLoading,setisLoading] = useState(true) //La pantalla de carga se debe activar donde comienza la petición asíncrona

const success = position  => {
  const obj = {
    lat: position.coords.latitude,
    lon:position.coords.longitude
  }
  setCoords(obj)
}

useEffect (() => {
  navigator.geolocation.getCurrentPosition(success);//aquí empieza la petición, aquí la pantalla de carga se debe activar 
  setisLoading(true)
}, [])

useEffect(() => {
  if(coords) {
    const API_KEY = 'f671dea7b5b90d208737ea3eaac98348'
    const { lat, lon } = coords
    
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}` //Petición para acceder a las coordenadas
    axios.get(url) //las peticiones se manejan con promesas,esta es para acceder a los datos del clima
    .then(response => {
      setWeather(response.data) //response.data es el objeto completo
      console.log(response.data);
      const obj = {
        celsius: (response.data.main.temp - 273.15).toFixed(1), //toFixed(1) es para que se redondee a un decimal
        farenheit: ((response.data.main.temp - 273.15) * 9 / 5 + 32).toFixed(1)
      }
      setTemp(obj)
    })
    .catch(error => console.log(error))//aquí termina la segunda petición, después de terminar la pantalla de carga se debe desactivar
    .finally(() => setisLoading(false))

  }
}, [coords])


  return (
      <div className='app'>
       {
         isLoading
         ?  <h2>Loading...</h2>
         : (
          <WeatherCard weather={weather}
          temp={temp}
          />
         )
       }
       
      </div>
  )
}

export default App
