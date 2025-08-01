// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Icon from '../../../components/AppIcon';
// import Button from '../../../components/ui/Button';

// const TrendingSidebar = ({ isCollapsed, onToggle }) => {
//   const [activeTab, setActiveTab] = useState('trending');

//   const trendingTopics = [
//     { id: 1, hashtag: '#ClimateAction', posts: 12500, trend: 'up' },
//     { id: 2, hashtag: '#TechInnovation', posts: 8900, trend: 'up' },
//     { id: 3, hashtag: '#GlobalEconomy', posts: 7200, trend: 'down' },
//     { id: 4, hashtag: '#HealthTech', posts: 5800, trend: 'up' },
//     { id: 5, hashtag: '#SpaceExploration', posts: 4300, trend: 'stable' }
//   ];

//   const trendingStories = [
//     {
//       id: 1,
//       headline: "Revolutionary AI breakthrough changes medical diagnosis",
//       source: "TechNews",
//       views: 45000,
//       timeAgo: "2h"
//     },
//     {
//       id: 2,
//       headline: "Global renewable energy adoption reaches new milestone",
//       source: "EcoDaily",
//       views: 32000,
//       timeAgo: "4h"
//     },
//     {
//       id: 3,
//       headline: "Major cryptocurrency regulation announced",
//       source: "FinanceToday",
//       views: 28000,
//       timeAgo: "6h"
//     }
//   ];

//   const getTrendIcon = (trend) => {
//     switch (trend) {
//       case 'up': return 'TrendingUp';
//       case 'down': return 'TrendingDown';
//       default: return 'Minus';
//     }
//   };

//   const getTrendColor = (trend) => {
//     switch (trend) {
//       case 'up': return 'text-success';
//       case 'down': return 'text-error';
//       default: return 'text-text-secondary';
//     }
//   };

//   if (isCollapsed) {
//     return (
//       <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-30">
//         <Button
//           variant="primary"
//           onClick={onToggle}
//           className="p-3 rounded-full shadow-modal"
//           aria-label="Show trending sidebar"
//         >
//           <Icon name="TrendingUp" size={20} />
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <aside className="w-80 bg-background border-l border-border h-screen sticky top-16 overflow-y-auto">
//       <div className="p-4">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg font-heading font-semibold text-text-primary">
//             Trending
//           </h2>
//           <Button
//             variant="ghost"
//             onClick={onToggle}
//             className="p-2"
//             aria-label="Hide trending sidebar"
//           >
//             <Icon name="X" size={16} />
//           </Button>
//         </div>

//         {/* Tabs */}
//         <div className="flex space-x-1 mb-4 bg-surface rounded-lg p-1">
//           <button
//             onClick={() => setActiveTab('trending')}
//             className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
//               activeTab === 'trending' ?'bg-background text-accent shadow-sm' :'text-text-secondary hover:text-text-primary'
//             }`}
//           >
//             Topics
//           </button>
//           <button
//             onClick={() => setActiveTab('stories')}
//             className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
//               activeTab === 'stories' ?'bg-background text-accent shadow-sm' :'text-text-secondary hover:text-text-primary'
//             }`}
//           >
//             Stories
//           </button>
//         </div>

//         {/* Trending Topics */}
//         {activeTab === 'trending' && (
//           <div className="space-y-3">
//             {trendingTopics.map((topic, index) => (
//               <Link
//                 key={topic.id}
//                 to={`/news-categories-search?q=${encodeURIComponent(topic.hashtag)}`}
//                 className="block p-3 bg-surface rounded-lg hover:bg-accent/5 transition-colors duration-200 group"
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center space-x-2">
//                       <span className="text-sm font-medium text-text-primary group-hover:text-accent">
//                         {index + 1}
//                       </span>
//                       <span className="text-sm font-semibold text-accent">
//                         {topic.hashtag}
//                       </span>
//                     </div>
//                     <p className="text-xs text-text-secondary mt-1">
//                       {topic.posts.toLocaleString()} posts
//                     </p>
//                   </div>
//                   <Icon
//                     name={getTrendIcon(topic.trend)}
//                     size={16}
//                     className={getTrendColor(topic.trend)}
//                   />
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}

//         {/* Trending Stories */}
//         {activeTab === 'stories' && (
//           <div className="space-y-3">
//             {trendingStories.map((story, index) => (
//               <Link
//                 key={story.id}
//                 to={`/article-reading-view?id=${story.id}`}
//                 className="block p-3 bg-surface rounded-lg hover:bg-accent/5 transition-colors duration-200 group"
//               >
//                 <div className="flex items-start space-x-3">
//                   <span className="text-sm font-medium text-text-secondary mt-1">
//                     {index + 1}
//                   </span>
//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-sm font-medium text-text-primary group-hover:text-accent line-clamp-2 mb-2">
//                       {story.headline}
//                     </h3>
//                     <div className="flex items-center justify-between text-xs text-text-secondary">
//                       <span>{story.source}</span>
//                       <div className="flex items-center space-x-2">
//                         <div className="flex items-center space-x-1">
//                           <Icon name="Eye" size={12} />
//                           <span>{story.views.toLocaleString()}</span>
//                         </div>
//                         <span>{story.timeAgo}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}

//         {/* Refresh Button */}
//         <div className="mt-6 pt-4 border-t border-border-light">
//           <Button
//             variant="outline"
//             className="w-full"
//             onClick={() => window.location.reload()}
//           >
//             <Icon name="RefreshCw" size={16} className="mr-2" />
//             Refresh Trends
//           </Button>
//         </div>
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
      case 'rain': return 'RAIN';
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
      case 'clear':
        return '/assets/weather/animated/clear-sky.gif';
      case 'clouds':
        return '/assets/weather/animated/cloudy.gif';
      case 'rain':
        return '/assets/weather/animated/rain.gif';
      case 'thunderstorm':
        return '/assets/weather/animated/thunderstorm.gif';
      case 'snow':
        return '/assets/weather/animated/snow.gif';
      case 'mist':
      case 'haze':
      case 'fog':
        return '/assets/weather/animated/fog.gif';
      default:
        return '/assets/weather/animated/default.gif';
    }
  };


  const fetchData = async (city) => {
    try {
      setLoading(true);
      const [weatherRes, marketRes] = await Promise.all([
        axios.get(`${URL}/external-apis/weather`, {
          params: { city },
          headers: { Authorization: `Bearer ${token}` },
        }).catch(() => ({
          data: {
            main: { temp: 25 },
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
          const locationRes = await axios.get(`${URL}/external-apis/location`, {
            params: { lat: latitude, lon: longitude },
            headers: { Authorization: `Bearer ${token}` },
          });

          const city =
            locationRes.data?.address?.city ||
            locationRes.data?.address?.town ||
            locationRes.data?.address?.village ||
            'Vellore';
          fetchData(city);
        } catch {
          fetchData('Vellore');
        }
      }, () => fetchData('Vellore'));
    } else {
      fetchData('Vellore');
    }
  }, []);

  const handleRefresh = () => fetchData(location);
  const weatherCondition = weather?.weather?.[0]?.main || 'clear';
  const weatherBackground = getWeatherAnimatedBg(weatherCondition);

  if (loading) return <div className="p-4 text-white">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <aside className="w-full max-w-xs min-w-[16rem] bg-black/20 text-white p-4 space-y-4 rounded-xl shadow-sm h-fit">



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
              {weather?.main?.temp?.toFixed(0)}°C
            </div>
          </div>
          <p className="text-sm capitalize opacity-90">{weather?.weather?.[0]?.description || 'Weather details'}</p>
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