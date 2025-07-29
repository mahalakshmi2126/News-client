import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const URL = import.meta.env.VITE_API_BASE_URL;

const RelatedArticlesCarousel = ({ articles, currentArticleId, category, tags }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  };

  const isVideoMedia = (mediaUrl) => {
    if (!mediaUrl || typeof mediaUrl !== 'string') return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    return videoExtensions.some((ext) => mediaUrl.toLowerCase().endsWith(ext));
  };

  // Function to generate Cloudinary thumbnail URL for videos
  const getThumbnailUrl = (mediaUrl) => {
    if (!mediaUrl || typeof mediaUrl !== 'string') return 'https://placehold.co/800x600?text=No+Image';
    if (isVideoMedia(mediaUrl)) {
      return mediaUrl.replace('/upload/', '/upload/so_0/').replace(/\.\w+$/, '.jpg');
    }
    return mediaUrl;
  };

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      try {
        const response = await axios.get(`${URL}/news/public`);
        console.log('Related articles API response:', response.data);

        // Fetch reporter details for articles where reporter is just an ID
        const fetchedArticles = await Promise.all(
          response.data
            .filter((article) => {
              if (article._id === currentArticleId) return false;
              const hasMatchingCategory = article.category === category;
              const hasMatchingTag = article.tags?.some((tag) => tags?.includes(tag));
              return hasMatchingCategory || hasMatchingTag;
            })
            .map(async (article) => {
              let reporterName = article.reporter?.name || 'Unknown Author';

              // If reporter is an ID, fetch the reporter details
              if (typeof article.reporter === 'string') {
                try {
                  const reporterResponse = await axios.get(
                    `${URL}/reporters/${article.reporter}`
                  );
                  reporterName = reporterResponse.data.name || 'Unknown Author';
                } catch (error) {
                  console.error(`Failed to fetch reporter for ID ${article.reporter}:`, error);
                }
              }

              return {
                id: article._id,
                title: article.title || 'No Title',
                content: article.content || '',
                category: article.category || 'general',
                featuredImage: getThumbnailUrl(article.media?.[0]) || 'https://placehold.co/800x600?text=No+Image',
                author: {
                  name: reporterName,
                  avatar: 'https://via.placeholder.com/32x32',
                },
                publishedAt: article.createdAt || new Date().toISOString(),
              };
            })
        );

        setRelatedArticles(fetchedArticles.slice(0, 6));
      } catch (error) {
        console.error('Fetch related articles error:', error.response?.status, error.response?.data);
        toast.error('Failed to load related articles.');
        setRelatedArticles(articles);
      }
    };

    fetchRelatedArticles();
  }, [currentArticleId, category, tags, articles]);

  const filteredArticles = relatedArticles.filter((article) => article.id !== currentArticleId);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + 1 >= filteredArticles.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? filteredArticles.length - 1 : prev - 1
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    if (!content) return 1;
    const text = content.replace(/<[^>]+>/g, '');
    const words = text.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  if (filteredArticles.length === 0) {
    return null;
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-heading font-bold text-text-primary">Related Articles</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            onClick={prevSlide}
            className="p-2 hover:bg-surface"
            aria-label="Previous articles"
          >
            <Icon name="ChevronLeft" size={20} />
          </Button>
          <Button
            variant="ghost"
            onClick={nextSlide}
            className="p-2 hover:bg-surface"
            aria-label="Next articles"
          >
            <Icon name="ChevronRight" size={20} />
          </Button>
        </div>
      </div>

      {/* Desktop Carousel */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-3 gap-6">
          {filteredArticles.slice(currentIndex, currentIndex + 3).map((article) => (
            <RelatedArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>

      {/* Tablet Carousel */}
      <div className="hidden md:block lg:hidden">
        <div className="grid grid-cols-2 gap-4">
          {filteredArticles.slice(currentIndex, currentIndex + 2).map((article) => (
            <RelatedArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>

      {/* Mobile Carousel */}
      <div className="block md:hidden">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {filteredArticles.map((article) => (
              <div key={article.id} className="w-full flex-shrink-0 px-2">
                <RelatedArticleCard article={article} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center space-x-2 mt-6">
        {filteredArticles.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-150 ${index === currentIndex ? 'bg-accent' : 'bg-surface'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* View All Link */}
      {/* <div className="text-center mt-6">
        <Link
          to="/news-categories-search"
          className="inline-flex items-center space-x-2 text-accent hover:text-accent/80 font-medium transition-colors duration-150"
        >
          <span>View All Articles</span>
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div> */}
    </section>
  );
};

const RelatedArticleCard = ({ article }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    if (!content) return 1;
    const text = content.replace(/<[^>]+>/g, '');
    const words = text.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  const getExcerpt = (content) => {
    if (!content) return 'No description available';
    const text = content.replace(/<[^>]+>/g, '');
    return text.length > 100 ? text.slice(0, 100) + '...' : text;
  };

  return (
    <Link
      to={`/article-reading-view?id=${article.id}`}
      className="block bg-background border border-border rounded-lg overflow-hidden hover:shadow-card transition-all duration-150 hover:scale-[1.02]"
    >
      <div className="aspect-video overflow-hidden">
        <Image
          src={article.featuredImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
            {article.category}
          </span>
          <span className="text-xs text-text-secondary">
            {formatDate(article.publishedAt)}
          </span>
        </div>
        <h3 className="text-sm font-semibold text-text-primary mb-2 line-clamp-2 leading-tight">
          {article.title}
        </h3>
        <p className="text-xs text-text-secondary mb-3 line-clamp-2">
          {getExcerpt(article.content)}
        </p>
        <div className="flex items-center justify-between text-xs text-text-secondary">
        </div>
        {/* <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>{calculateReadingTime(article.content)} min</span>
          </div> */}
      </div>
    </Link>
  );
};

export default RelatedArticlesCarousel;
