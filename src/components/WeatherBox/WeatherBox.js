import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const WeatherBox = props => {
  const [weather, setWeather] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback((city) => {
    setPending(true);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d1b5b4c49657a50b4b7e62e77e9d0e5a&units=metric`)
      .then(res => {
        if (res.status === 200) {
          return res.json()

            .then(data => {
              const weatherData = {
                city: data.name,
                temp: data.main.temp,
                icon: data.weather[0].icon,
                description: data.weather[0].main,
              };
              setWeather(weatherData);
              setPending(false);
              setError(false);
            });
          } else {
            setError(true);
            alert('ERROR!');
          }
        }, []);
      });
    return (
      <section>
        <PickCity action={handleCityChange} />
        {weather && !pending && <WeatherSummary weather={weather} />}
        {pending && !error && <Loader />}
      </section>
    )
  };

  export default WeatherBox;