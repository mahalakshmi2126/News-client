import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Icon from '../../../components/AppIcon';

const TopNewsFeed = ({ refreshTrigger }) => {
  const [topArticles, setTopArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const getImageUrl = (description, channel, article) => {
    if (article?.urlToImage) return article.urlToImage;
    if (article?.['media:content']?.url) return article['media:content'].url;

    if (!description || typeof description !== 'string') {
      return getDefaultImage(channel);
    }

    const imgMatch = description.match(/src=["'](.*?)["']/i);
    return imgMatch ? imgMatch[1] : getDefaultImage(channel);
  };


  const getDefaultImage = (channel) => {
    const channelDefaults = {
      'NDTV': 'https://www.ndtv.com/common/header/images/ndtv_logo_black.gif',
      'The Hindu': 'https://www.thehindu.com/theme/images/th-online/OG-sections.png',
      'India Today': 'https://akm-img-a-in.tosshub.com/indiatoday/images/mediamanager/itlogo.png',
      'Times of India': 'https://timesofindia.indiatimes.com/photo/507610.cms',
      'BBC News': 'https://news.bbcimg.co.uk/nol/shared/img/bbc_news_120x60.gif',
      'Google News India (EN)': 'https://lh3.googleusercontent.com/-DR60l-K8vnyi99NZovm9HlXyZwQ85GMDxiwJWzoasZYCUrPuUM_P_4Rb7ei03j-0nRs0c4F=w256',
      'Google News Tamil': 'https://lh3.googleusercontent.com/-DR60l-K8vnyi99NZovm9HlXyZwQ85GMDxiwJWzoasZYCUrPuUM_P_4Rb7ei03j-0nRs0c4F=w256',
      'Business Standard': 'https://images.news18.com/static_news18/pix/ibnhome/news18/news18-logo-xmln.png',
      'Moneycontrol': 'https://img-d02.moneycontrol.co.in/images/top2010/moneycontrol_logo.jpg',
      'News18 India': 'https://images.news18.com/static_news18/pix/ibnhome/news18/news18-logo-xmln.png',
      // 'default': 'https://images.news18.com/static_news18/pix/ibnhome/news18/news18-logo-xmln.png',
    };
    return channelDefaults[channel] || channelDefaults['default'];
  };

  const isVideoMedia = () => false;

  const getThumbnailUrl = (description, channel, article) =>
    getImageUrl(description, channel, article);


  const calculateReadingTime = (content) => {
    if (!content) return 3;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / 200) || 3;
  };

  useEffect(() => {
    const loadTopArticles = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
        const response = await axios.get('http://localhost:5000/api/external-apis/top-news', config);

        if (!response.data?.success || !Array.isArray(response.data.data)) {
          throw new Error('Invalid API response: expected success and data array');
        }


        const articles = response.data.data.flatMap((channel) =>
          channel.articles.map((article) => ({
            id: article.link,
            headline: article.title || 'No Title',
            summary: article.description || 'No Content',
            // imageUrl: getThumbnailUrl(article.description, channel.channel, article.image) ,
            imageUrl: getThumbnailUrl(article.description, channel.channel, article.image),
            originalMedia: null,
            category: channel.channel || 'general',
            language: 'en',
            views: 0,
            comments: 0,
            shares: 0,
            readingTime: calculateReadingTime(article.description),
            isBookmarked: false,
            sourceUrl: article.link || '#',
            image:article.image
          }))
        )

        console.log("articles",articles);
        

        setTopArticles(articles);
      } catch (error) {
        console.error('Error fetching top news:', error.response?.status, error.response?.data || error.message);
        toast.error(error?.response?.data?.message || 'Failed to load top news articles.');
        setTopArticles([]);
      } finally {
        setLoading(false);
      }
    };

    loadTopArticles();
  }, [refreshTrigger]);

  const LoadingSkeleton = () => (
    <div className="bg-background border border-border rounded-lg overflow-hidden animate-pulse w-full h-48">
      <div className="w-full h-32 bg-surface"></div>
      <div className="p-2 space-y-2">
        <div className="w-3/4 h-4 bg-surface rounded"></div>
        <div className="w-1/2 h-3 bg-surface rounded"></div>
      </div>
    </div>
  );

  const handleCardClick = (sourceUrl) => {
    if (sourceUrl && sourceUrl !== '#') {
      window.open(sourceUrl, '_blank');
    } else {
      toast.info('No external link available for this article.');
    }
  };

  return (
    <div className="max-w-full sm:max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
      <h2 className="text-xl sm:text-2xl font-heading font-semibold text-text-primary mb-4 sm:mb-6">
        Top News
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {loading ? (
          [...Array(6)].map((_, index) => <LoadingSkeleton key={`skeleton-${index}`} />)
        ) : topArticles.length > 0 ? (
          topArticles.map((article) => (
            <div
              key={article.id}
              className="bg-background border border-border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer w-full h-48"
              onClick={() => handleCardClick(article.sourceUrl)}
            >
              <div className="relative w-full h-28 overflow-hidden">
                <img
                  src={article.image}
                  alt={(e) => { e.target.src = getDefaultImage(article); }}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                
              </div>
              <div className="p-2">
                <h3 className="text-sm sm:text-base font-semibold text-text-primary line-clamp-2">
                  {article.headline}
                </h3>
                <p className="text-xs text-text-secondary line-clamp-1 mt-1">
                  {/* {article.summary} */}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <Icon name="FileText" size={36} className="text-text-secondary mx-auto mb-3" />
            <h3 className="text-base font-medium text-text-primary mb-1">
              No top news articles found
            </h3>
            <p className="text-xs text-text-secondary">
              Check back later for top news updates
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNewsFeed;