// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Icon from '../../../components/AppIcon';
// import ReactAnimatedWeather from 'react-animated-weather';
// const URL = import.meta.env.VITE_API_BASE_URL;

// const TrendingSidebar = ({ selectedLocation = 'Vellore', onToggle, onLocationChange }) => {
//   const [weather, setWeather] = useState(null);
//   const [market, setMarket] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [location, setLocation] = useState(selectedLocation);
//   const token = localStorage.getItem('token');

//   const getWeatherIcon = (condition) => {
//     switch (condition?.toLowerCase()) {
//       case 'clear': return 'CLEAR_DAY';
//       case 'clouds': return 'CLOUDY';
//       case 'rain': return 'RAIN';
//       case 'thunderstorm': return 'RAIN';
//       case 'snow': return 'SNOW';
//       case 'mist':
//       case 'haze':
//       case 'fog': return 'FOG';
//       default: return 'PARTLY_CLOUDY_DAY';
//     }
//   };

//   const getWeatherAnimatedBg = (condition) => {
//     switch (condition?.toLowerCase()) {
//       case 'clear':
//         return '/assets/weather/animated/clear-sky.gif';
//       case 'clouds':
//         return '/assets/weather/animated/cloudy.gif';
//       case 'rain':
//         return '/assets/weather/animated/rain.gif';
//       case 'thunderstorm':
//         return '/assets/weather/animated/thunderstorm.gif';
//       case 'snow':
//         return '/assets/weather/animated/snow.gif';
//       case 'mist':
//       case 'haze':
//       case 'fog':
//         return '/assets/weather/animated/fog.gif';
//       default:
//         return '/assets/weather/animated/default.gif';
//     }
//   };


//   const fetchData = async (city) => {
//     try {
//       setLoading(true);
//       const [weatherRes, marketRes] = await Promise.all([
//         axios.get(`${URL}/external-apis/weather`, {
//           params: { city },
//           headers: { Authorization: `Bearer ${token}` },
//         }).catch(() => ({
//           data: {
//             main: { temp: 25 },
//             weather: [{ main: 'Clear', description: 'clear sky' }],
//           },
//         })),
//         axios.get(`${URL}/external-apis/market`, {
//           headers: { Authorization: `Bearer ${token}` },
//         }).catch(() => ({
//           data: {
//             market: [{ symbol: 'N/A', name: 'Sample Stock', price: 100, changePct: 0.5 }],
//           },
//         })),
//       ]);
//       setWeather(weatherRes.data);
//       setMarket(marketRes.data.market || []);
//       setLocation(city);
//       setLoading(false);
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setError('Failed to load sidebar data');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         const { latitude, longitude } = position.coords;
//         try {
//           const locationRes = await axios.get(`${URL}/external-apis/location`, {
//             params: { lat: latitude, lon: longitude },
//             headers: { Authorization: `Bearer ${token}` },
//           });

//           const city =
//             locationRes.data?.address?.city ||
//             locationRes.data?.address?.town ||
//             locationRes.data?.address?.village ||
//             'Vellore';
//           fetchData(city);
//         } catch {
//           fetchData('Vellore');
//         }
//       }, () => fetchData('Vellore'));
//     } else {
//       fetchData('Vellore');
//     }
//   }, []);

//   const handleRefresh = () => fetchData(location);
//   const weatherCondition = weather?.weather?.[0]?.main || 'clear';
//   const weatherBackground = getWeatherAnimatedBg(weatherCondition);

//   if (loading) return <div className="p-4 text-white">Loading...</div>;
//   if (error) return <div className="p-4 text-red-500">{error}</div>;

//   return (
//     <aside className="w-full max-w-xs min-w-[16rem] bg-black/20 text-white p-4 space-y-4 rounded-xl shadow-sm h-full overflow-y-auto">



//       <div
//         className="rounded-2xl overflow-hidden shadow-xl relative h-52 sm:h-56 w-full text-white"
//         style={{
//           backgroundImage: `url(${weatherBackground})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />
//         <div className="relative z-10 flex flex-col justify-between h-full p-4">
//           <div className="flex items-center justify-between">
//             <h2 className="text-lg font-semibold flex items-center gap-1">
//               {location}
//               <button onClick={handleRefresh} title="Refresh">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-4 w-4 ml-1"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582M20 20v-5h-.581M4.934 19.066A9 9 0 105.318 5.318" />
//                 </svg>
//               </button>
//             </h2>
//             <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{weatherCondition}</span>
//           </div>
//           <div className="flex items-center gap-3">
//             <ReactAnimatedWeather
//               icon={getWeatherIcon(weatherCondition)}
//               color="white"
//               size={48}
//               animate={true}
//             />
//             <div className="text-4xl font-bold">
//               {weather?.main?.temp?.toFixed(0)}°C
//             </div>
//           </div>
//           <p className="text-sm capitalize opacity-90">{weather?.weather?.[0]?.description || 'Weather details'}</p>
//           <div className="text-xs flex items-center gap-2 mt-1">
//             <span>📍</span>
//             <span>Expect {weatherCondition.toLowerCase()} later today</span>
//           </div>
//           <button
//             className="mt-1 text-[11px] underline text-white/90 hover:text-white"
//             onClick={() => window.open(`https://www.msn.com/en-in/weather/forecast/in-${location.toLowerCase()}`, '_blank')}
//           >
//             See full forecast →
//           </button>

//         </div>
//       </div>

//       <div className="bg-[#575656] rounded-xl p-4 shadow-md">
//         <div className="flex items-center justify-between mb-3">
//           <h3 className="text-base font-semibold">Market</h3>
//           <Icon name="MoreVertical" size={14} className="text-white/70" />
//         </div>
//         <div className="space-y-3">
//           {market?.slice(0, 6).map((item) => {
//             const isPositive = Number(item.changePct) >= 0;
//             return (
//               <div
//                 key={item.symbol}
//                 className="flex justify-between items-center p-3 bg-[#353434] rounded-lg"
//               >
//                 <div>
//                   <h4 className="text-sm font-semibold">{item.name}</h4>
//                   <p className="text-xs text-gray-400">{item.symbol}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className={`text-sm font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
//                     {Number(item.changePct).toFixed(2)}%
//                   </p>
//                   <p className="text-xs text-gray-400">₹{Number(item.price).toFixed(2)}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//         <button
//           className="w-full mt-4 text-sm text-white hover:underline text-center"
//           onClick={() => window.open('https://finance.yahoo.com/', '_blank')}
//         >
//           See watchlist suggestions
//         </button>
//       </div>
//     </aside>
//   );
// };

// export default TrendingSidebar;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Icon from '../../../components/AppIcon';
import ReactAnimatedWeather from 'react-animated-weather';

const URL = import.meta.env.VITE_API_BASE_URL;

const TrendingSidebar = ({ selectedLocation = 'Vellore', onToggle, onLocationChange }) => {
  const [weather, setWeather] = useState(null);
  const [market, setMarket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(selectedLocation);
  const token = localStorage.getItem('token');

  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'clear': return 'CLEAR_DAY';
      case 'clouds': return 'CLOUDY';
      case 'rain':
      case 'thunderstorm': return 'RAIN';
      case 'snow': return 'SNOW';
      case 'mist':
      case 'haze':
      case 'fog': return 'FOG';
      default: return 'PARTLY_CLOUDY_DAY';
    }
  };

  const getWeatherAnimatedBg = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'clear': return '/assets/weather/animated/clear-sky.gif';
      case 'clouds': return '/assets/weather/animated/cloudy.gif';
      case 'rain': return '/assets/weather/animated/rain.gif';
      case 'thunderstorm': return '/assets/weather/animated/thunderstorm.gif';
      case 'snow': return '/assets/weather/animated/snow.gif';
      case 'mist':
      case 'haze':
      case 'fog': return '/assets/weather/animated/fog.gif';
      default: return '/assets/weather/animated/default.gif';
    }
  };

  const fetchData = async (city) => {
    try {
      setLoading(true);

      const [weatherRes, marketRes] = await Promise.all([
        axios.get(`${URL}/weather/city`, {
          params: { city },
          headers: { Authorization: `Bearer ${token}` },
        }).catch(() => ({
          data: {
            temp: 25,
            weather: [{ main: 'Clear', description: 'clear sky' }],
          },
        })),
        axios.get(`${URL}/external-apis/market`, {
          headers: { Authorization: `Bearer ${token}` },
        }).catch(() => ({
          data: {
            market: [{ symbol: 'N/A', name: 'Sample Stock', price: 100, changePct: 0.5 }],
          },
        })),
      ]);

      setWeather(weatherRes.data);
      setMarket(marketRes.data.market || []);
      setLocation(city);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load sidebar data');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const locationRes = await axios.get(`${URL}/weather/coordinates`, {
            params: { lat: latitude, lon: longitude },
            headers: { Authorization: `Bearer ${token}` },
          });

          const city =
            locationRes.data?.location?.city ||
            locationRes.data?.location?.town ||
            locationRes.data?.location?.village ||
            'Vellore';

          fetchData(city);
        } catch (err) {
          console.error('Location fetch failed:', err);
          fetchData('Vellore');
        }
      }, () => fetchData('Vellore'));
    } else {
      fetchData('Vellore');
    }
  }, []);

  const handleRefresh = () => fetchData(location);
  const weatherCondition = weather?.condition || 'Clear';
  const weatherBackground = getWeatherAnimatedBg(weatherCondition);

  if (loading) return <div className="p-4 text-white">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <aside className="w-full max-w-xs min-w-[16rem] bg-black/20 text-white p-4 space-y-4 rounded-xl shadow-sm h-full overflow-y-auto">
      <div
        className="rounded-2xl overflow-hidden shadow-xl relative h-52 sm:h-56 w-full text-white"
        style={{
          backgroundImage: `url(${weatherBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />
        <div className="relative z-10 flex flex-col justify-between h-full p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-1">
              {location}
              <button onClick={handleRefresh} title="Refresh">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582M20 20v-5h-.581M4.934 19.066A9 9 0 105.318 5.318" />
                </svg>
              </button>
            </h2>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{weatherCondition}</span>
          </div>
          <div className="flex items-center gap-3">
            <ReactAnimatedWeather
              icon={getWeatherIcon(weatherCondition)}
              color="white"
              size={48}
              animate={true}
            />
            <div className="text-4xl font-bold">
              {weather?.temp?.toFixed(0)}°C
            </div>
          </div>
          <p className="text-sm capitalize opacity-90">{weather?.description || 'Weather details'}</p>
          <div className="text-xs flex items-center gap-2 mt-1">
            <span>📍</span>
            <span>Expect {weatherCondition.toLowerCase()} later today</span>
          </div>
          <button
            className="mt-1 text-[11px] underline text-white/90 hover:text-white"
            onClick={() => window.open(`https://www.msn.com/en-in/weather/forecast/in-${location.toLowerCase()}`, '_blank')}
          >
            See full forecast →
          </button>
        </div>
      </div>

      <div className="bg-[#575656] rounded-xl p-4 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold">Market</h3>
          <Icon name="MoreVertical" size={14} className="text-white/70" />
        </div>
        <div className="space-y-3">
          {market?.slice(0, 6).map((item) => {
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
                  <p className={`text-sm font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {Number(item.changePct).toFixed(2)}%
                  </p>
                  <p className="text-xs text-gray-400">₹{Number(item.price).toFixed(2)}</p>
                </div>
              </div>
            );
          })}
        </div>
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


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Icon from '../../../components/AppIcon';
// import ReactAnimatedWeather from 'react-animated-weather';

// const URL = import.meta.env.VITE_API_BASE_URL;

// const TrendingSidebar = ({ selectedLocation = 'Vellore' }) => {
//   const [weather, setWeather] = useState(null);
//   const [market, setMarket] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [location, setLocation] = useState(selectedLocation);

//   const token = localStorage.getItem('token');

//   const getWeatherIcon = (condition) => {
//     switch (condition?.toLowerCase()) {
//       case 'clear': return 'CLEAR_DAY';
//       case 'clouds': return 'CLOUDY';
//       case 'rain':
//       case 'thunderstorm': return 'RAIN';
//       case 'snow': return 'SNOW';
//       case 'mist':
//       case 'haze':
//       case 'fog': return 'FOG';
//       default: return 'PARTLY_CLOUDY_DAY';
//     }
//   };

//   const getWeatherAnimatedBg = (condition) => {
//     switch (condition?.toLowerCase()) {
//       case 'clear': return '/assets/weather/animated/clear-sky.gif';
//       case 'clouds': return '/assets/weather/animated/cloudy.gif';
//       case 'rain': return '/assets/weather/animated/rain.gif';
//       case 'thunderstorm': return '/assets/weather/animated/thunderstorm.gif';
//       case 'snow': return '/assets/weather/animated/snow.gif';
//       case 'mist':
//       case 'haze':
//       case 'fog': return '/assets/weather/animated/fog.gif';
//       default: return '/assets/weather/animated/default.gif';
//     }
//   };

//   const fetchWeatherByCity = async (city) => {
//     try {
//       const res = await axios.get(`${URL}/external-apis/weather`, {
//         params: { city },
//       });
//       setWeather(res.data);
//       setLocation(res.data.city);
//     } catch {
//       setError('Failed to fetch weather');
//     }
//   };

//   const fetchWeatherByLocation = async (lat, lon) => {
//     try {
//       const locRes = await axios.get(`${URL}/external-apis/location`, {
//         params: { lat, lon },
//       });

//       const address = locRes.data.location.address || {};
//       const city = address.city || address.town || address.village || 'Vellore';

//       await fetchWeatherByCity(city);
//     } catch {
//       await fetchWeatherByCity('Vellore');
//     }
//   };

//   const fetchMarket = async () => {
//     try {
//       const res = await axios.get(`${URL}/external-apis/market`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMarket(res.data.market || []);
//     } catch {
//       setMarket([
//         { symbol: 'N/A', name: 'Sample Stock', price: 100, changePct: 0.5 }
//       ]);
//     }
//   };

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           async (position) => {
//             const { latitude, longitude } = position.coords;
//             await fetchWeatherByLocation(latitude, longitude);
//           },
//           async () => await fetchWeatherByCity('Vellore')
//         );
//       } else {
//         await fetchWeatherByCity('Vellore');
//       }
//       await fetchMarket();
//       setLoading(false);
//     } catch (err) {
//       setError('Something went wrong');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleRefresh = () => fetchData();

//   const weatherCondition = weather?.condition || 'Clear';
//   const weatherBackground = getWeatherAnimatedBg(weatherCondition);

//   if (loading) return <div className="p-4 text-white">Loading...</div>;
//   if (error) return <div className="p-4 text-red-500">{error}</div>;

//   return (
//     <aside className="w-full max-w-xs min-w-[16rem] bg-black/20 text-white p-4 space-y-4 rounded-xl shadow-sm h-full overflow-y-auto">

//       {/* WEATHER CARD */}
//       <div
//         className="rounded-2xl overflow-hidden shadow-xl relative h-52 sm:h-56 w-full text-white"
//         style={{
//           backgroundImage: `url(${weatherBackground})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-0" />
//         <div className="relative z-10 flex flex-col justify-between h-full p-4">
//           <div className="flex items-center justify-between">
//             <h2 className="text-lg font-semibold flex items-center gap-1">
//               {location}
//               <button onClick={handleRefresh} title="Refresh">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582M20 20v-5h-.581M4.934 19.066A9 9 0 105.318 5.318" />
//                 </svg>
//               </button>
//             </h2>
//             <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
//               {weatherCondition}
//             </span>
//           </div>
//           <div className="flex items-center gap-3">
//             <ReactAnimatedWeather
//               icon={getWeatherIcon(weatherCondition)}
//               color="white"
//               size={48}
//               animate={true}
//             />
//             <div className="text-4xl font-bold">
//               {weather?.temp?.toFixed(0)}°C
//             </div>
//           </div>
//           <p className="text-sm capitalize opacity-90">{weather?.description}</p>
//           <div className="text-xs flex items-center gap-2 mt-1">
//             <span>📍</span>
//             <span>Expect {weatherCondition.toLowerCase()} later today</span>
//           </div>
//           <button
//             className="mt-1 text-[11px] underline text-white/90 hover:text-white"
//             onClick={() => window.open(`https://www.msn.com/en-in/weather/forecast/in-${location.toLowerCase()}`, '_blank')}
//           >
//             See full forecast →
//           </button>
//         </div>
//       </div>

//       {/* MARKET CARD */}
//       <div className="bg-[#575656] rounded-xl p-4 shadow-md">
//         <div className="flex items-center justify-between mb-3">
//           <h3 className="text-base font-semibold">Market</h3>
//           <Icon name="MoreVertical" size={14} className="text-white/70" />
//         </div>
//         <div className="space-y-3">
//           {market?.slice(0, 6).map((item) => {
//             const isPositive = Number(item.changePct) >= 0;
//             return (
//               <div
//                 key={item.symbol}
//                 className="flex justify-between items-center p-3 bg-[#353434] rounded-lg"
//               >
//                 <div>
//                   <h4 className="text-sm font-semibold">{item.name}</h4>
//                   <p className="text-xs text-gray-400">{item.symbol}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className={`text-sm font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
//                     {Number(item.changePct).toFixed(2)}%
//                   </p>
//                   <p className="text-xs text-gray-400">₹{Number(item.price).toFixed(2)}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//         <button
//           className="w-full mt-4 text-sm text-white hover:underline text-center"
//           onClick={() => window.open('https://finance.yahoo.com/', '_blank')}
//         >
//           See watchlist suggestions
//         </button>
//       </div>
//     </aside>
//   );
// };

// export default TrendingSidebar;