import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Icon from '../../../components/AppIcon';
import { FiChevronDown, FiSearch } from 'react-icons/fi';

const URL = import.meta.env.VITE_API_BASE_URL;

// Weather emoji mapping
const weatherEmojiMap = {
  rain: '🌧',
  drizzle: '🌧',
  thunderstorm: '⛈',
  thunder: '⛈',
  snow: '❄',
  cloud: '☁',
  partly: '⛅',
  clear: '☀',
  mist: '🌫',
  haze: '🌫',
  fog: '🌫',
  wind: '🌬',
};
const getWeatherEmoji = (desc) => {
  if (!desc) return '';
  const key = Object.keys(weatherEmojiMap).find((k) =>
    desc.toLowerCase().includes(k)
  );
  return key ? weatherEmojiMap[key] : '';
};

// Styles for glowing emoji
const glowingEmojiStyle = {
  color: '#00ADEF',
  textShadow: `
    0 0 5px #00ADEF,
    0 0 10px #00ADEF,
    0 0 20px #00ADEF,
    0 0 40px #00ADEF
  `,
  display: 'inline-block',
};

// Animated background mapping
const getWeatherAnimatedBg = (condition) => {
  if (!condition) return '/assets/weather/animated/default.gif';
  const lower = condition.toLowerCase();

  if (lower.includes('clear')) return '/assets/weather/animated/clear-sky.gif';
  if (lower.includes('cloud') || lower.includes('overcast'))
    return '/assets/weather/animated/cloudy.gif';
  if (lower.includes('rain') || lower.includes('drizzle'))
    return '/assets/weather/animated/rain.gif';
  if (lower.includes('thunder') || lower.includes('storm'))
    return '/assets/weather/animated/thunderstorm.gif';
  if (lower.includes('snow')) return '/assets/weather/animated/snow.gif';
  if (lower.includes('mist') || lower.includes('haze') || lower.includes('fog'))
    return '/assets/weather/animated/fog.gif';

  return '/assets/weather/animated/default.gif';
};

// Background overlay color
const getWeatherOverlayColor = (condition) => {
  const lower = condition?.toLowerCase() || '';
  if (lower.includes('clear')) return 'rgba(255, 223, 0, 0.3)';
  if (lower.includes('cloud') || lower.includes('overcast'))
    return 'rgba(180, 180, 180, 0.3)';
  if (lower.includes('rain') || lower.includes('drizzle'))
    return 'rgba(0, 102, 204, 0.3)';
  if (lower.includes('thunder') || lower.includes('storm'))
    return 'rgba(102, 51, 153, 0.3)';
  if (lower.includes('snow')) return 'rgba(255, 255, 255, 0.4)';
  if (lower.includes('mist') || lower.includes('haze') || lower.includes('fog'))
    return 'rgba(169, 169, 169, 0.3)';

  return 'rgba(0, 0, 0, 0.2)';
};

// Special rainy days message
const getRainyDaysMessage = (forecast) => {
  let count = 0;
  for (let i = 0; i < forecast.length; i++) {
    if (forecast[i].description.toLowerCase().includes('rain')) {
      count++;
    } else break;
  }
  return count >= 2
    ? `Expect ${count} rainy days ahead starting Today.`
    : null;
};

const TrendingSidebar = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState('');
  const [editingLocation, setEditingLocation] = useState(false);
  const [bgImage, setBgImage] = useState(getWeatherAnimatedBg('default'));
  const [overlayColor, setOverlayColor] = useState(getWeatherOverlayColor('default'));

  const [market, setMarket] = useState(null);
  const [marketLoading, setMarketLoading] = useState(true);
  const [marketError, setMarketError] = useState(null);

  const token = localStorage.getItem('token');

  // Fetch weather by location string or lat,lng
  const fetchWeather = async (loc) => {
    if (!loc.trim()) return;
    setWeatherLoading(true);
    setWeatherError('');
    try {
      const res = await axios.get(
        `${URL}/external-apis/weather?location=${encodeURIComponent(loc)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setWeatherData(res.data);
      setLocation(res.data.location);

      const condition = res.data.currentWeather.description;
      setBgImage(getWeatherAnimatedBg(condition));
      setOverlayColor(getWeatherOverlayColor(condition));

      setEditingLocation(false);
    } catch (err) {
      setWeatherError(err.response?.data?.error || 'Failed to fetch weather');
    } finally {
      setWeatherLoading(false);
    }
  };

  // Fetch stock market data
  const fetchMarketData = async () => {
    try {
      setMarketLoading(true);
      const marketRes = await axios
        .get(`${URL}/external-apis/market`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .catch(() => ({
          data: {
            market: [
              { symbol: 'N/A', name: 'Sample Stock', price: 100, changePct: 0.5 },
            ],
          },
        }));
      setMarket(marketRes.data.market || []);
    } catch (err) {
      console.error('Error fetching market data:', err);
      setMarketError('Failed to load market data');
    } finally {
      setMarketLoading(false);
    }
  };

  // On mount: Try geolocation first, otherwise wait for user input
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          await fetchWeather(`${latitude},${longitude}`);
        },
        () => {
          console.warn('User denied location access. Please search manually.');
        }
      );
    }
    fetchMarketData();
  }, []);

  return (
    <aside className="w-full max-w-xs min-w-[16rem] text-white p-4 rounded-xl shadow-sm h-full overflow-y-auto relative">
      {/* Weather Section */}
      <div
        className="bg-black/40 backdrop-blur-sm rounded-xl p-4 mb-6 relative"
        style={{
          backgroundImage: `linear-gradient(${overlayColor}, ${overlayColor}), url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Location Search / Display */}
        <div className="flex items-center justify-between mb-2">
          {editingLocation ? (
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Enter location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 px-2 py-1 text-black rounded-l-md outline-none text-sm"
              />
              <button
                onClick={() => fetchWeather(location)}
                className="bg-yellow-400 text-black px-3 rounded-r-md flex items-center justify-center hover:bg-yellow-300"
              >
                <FiSearch />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditingLocation(true)}
              className="flex items-center gap-1 text-sm font-medium text-white"
            >
              {weatherData ? weatherData.location : 'Set Location'}
              <FiChevronDown className="text-xs" />
            </button>
          )}
        </div>

        {/* Loading / Error */}
        {weatherError && <p className="text-red-300 mb-3 text-xs">{weatherError}</p>}
        {weatherLoading && (
          <div className="text-center mb-3">
            <div className="animate-spin h-6 w-6 border-4 border-white border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-1 text-xs">Loading weather...</p>
          </div>
        )}

        {/* Weather Info */}
        {weatherData && !weatherLoading && (
          <>
            {/* Current Weather */}
            <div className="flex items-center gap-4 mt-2">
              <span style={{ ...glowingEmojiStyle, fontSize: 72 }}>
                {getWeatherEmoji(weatherData.currentWeather.description)}
              </span>
              <div>
                <h2 className="text-4xl font-semibold">
                  {weatherData.currentWeather.temperature.toFixed(0)}°C
                </h2>
                <p className="text-xs capitalize">
                  {weatherData.currentWeather.description}{' '}
                  <span style={{ ...glowingEmojiStyle, fontSize: 18 }}>
                    {getWeatherEmoji(weatherData.currentWeather.description)}
                  </span>
                </p>
              </div>
            </div>

            {/* Rainy Days Message */}
            {getRainyDaysMessage(weatherData.forecast) && (
              <div className="bg-blue-600 backdrop-blur-sm text-[11px] rounded-md p-2 mb-3 flex items-center gap-1 border border-white/20 mt-4">
                <span style={{ ...glowingEmojiStyle, fontSize: 16 }}>🌧</span>
                <span>{getRainyDaysMessage(weatherData.forecast)}</span>
              </div>
            )}

            {/* Forecast */}
            <div className="grid grid-cols-5 gap-2 mt-3">
              {weatherData.forecast.slice(0, 5).map((day) => (
                <div
                  key={day.date}
                  className="bg-blue-400 rounded-lg p-2 text-center border border-white/10"
                >
                  <p className="text-xs font-medium">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  <span style={{ ...glowingEmojiStyle, fontSize: 22 }}>
                    {getWeatherEmoji(day.description)}
                  </span>
                  <p className="text-xs mt-1">
                    {day.temp_max.toFixed(0)}° / {day.temp_min.toFixed(0)}°
                  </p>
                </div>
              ))}
            </div>

            {/* Hourly Forecast */}
            {weatherData.hourlyForecast && (
              <>
                <p className="text-xs mt-4 mb-2 font-semibold">Next Hours</p>
                <div className="grid grid-cols-5 gap-2">
                  {weatherData.hourlyForecast.slice(0, 10).map((hour, idx) => (
                    <div
                      key={idx}
                      className="bg-white/15 rounded-md p-2 text-center border border-white/10"
                    >
                      <p className="text-[10px] font-semibold">
                        {new Date(hour.time).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          hour12: true,
                        })}
                      </p>
                      <span style={{ ...glowingEmojiStyle, fontSize: 32 }}>
                        {getWeatherEmoji(hour.description)}
                      </span>
                      <p className="mt-1 text-[10px] font-bold">{hour.temp.toFixed(0)}°</p>
                    </div>
                  ))}
                </div>
              </>
            )}
            <div className="text-center mb-3 mt-3 text-xl">
              <button
                className="mt-1 text-[14px] underline text-white/90 hover:text-white"
                onClick={() =>
                  window.open(
                    `https://www.msn.com/en-in/weather/forecast/in-${location.toLowerCase()}`,
                    '_blank'
                  )
                }
              >
                See full forecast →
              </button>
            </div>
          </>
        )}
      </div>

      {/* Market Section */}
      <div className="bg-[#575656] rounded-xl p-4 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold">Market</h3>
          <Icon name="MoreVertical" size={14} className="text-white/70" />
        </div>

        {marketError && <p className="text-red-400 mb-2 text-xs">{marketError}</p>}
        {marketLoading ? (
          <div className="text-center text-sm text-white">Loading market data...</div>
        ) : (
          <div className="space-y-3">
            {market.slice(0, 6).map((item) => {
              const isPositive = Number(item.changePct) >= 0;
              return (
                <div
                  key={item.symbol}
                  className="flex justify-between items-center p-3 bg-[#353434] rounded-lg"
                >
                  <div>
                    <h4 className="text-sm font-semibold">{item.name}</h4>
                    <p className="text-xs text-gray-400">{item.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-semibold ${
                        isPositive ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {Number(item.changePct).toFixed(2)}%
                    </p>
                    <p className="text-xs text-gray-400">₹{Number(item.price).toFixed(2)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <button
          className="w-full mt-4 text-sm text-white hover:underline text-center"
          onClick={() => window.open('https://finance.yahoo.com/', '_blank')}
        >
          See watchlist suggestions
        </button>
      </div>
    </aside>
  );
};

export default TrendingSidebar;
