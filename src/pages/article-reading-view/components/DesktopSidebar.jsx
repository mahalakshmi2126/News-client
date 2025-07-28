import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DesktopSidebar = ({ article, relatedArticles, trendingTopics }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const generateTableOfContents = (content) => {
    return [
      { id: 'introduction', title: 'Introduction', level: 1 },
      { id: 'main-points', title: 'Key Points', level: 1 },
      { id: 'analysis', title: 'Analysis', level: 2 },
      { id: 'implications', title: 'Implications', level: 2 },
      { id: 'conclusion', title: 'Conclusion', level: 1 },
    ];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getExcerpt = (content) => {
    if (!content) return 'No description available';
    const text = content.replace(/<[^>]+>/g, '');
    return text.length > 100 ? text.slice(0, 100) + '...' : text;
  };

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    if (!content) return 1;
    const text = content.replace(/<[^>]+>/g, '');
    const words = text.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  const tableOfContents = generateTableOfContents(article.content);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + 1 >= relatedArticles.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? relatedArticles.length - 1 : prev - 1
    );
  };

  return (
    <aside className="hidden xl:block fixed right-8 top-24 w-80 h-[calc(100vh-6rem)] overflow-y-auto">
      <div className="space-y-6">
        {/* Table of Contents */}
        {/* <div className="bg-background border border-border rounded-lg p-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="List" size={20} className="mr-2" />
            Table of Contents
          </h3>
          <nav className="space-y-2">
            {tableOfContents.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left text-sm hover:text-accent transition-colors duration-150 ${
                  item.level === 1 ? 'font-medium text-text-primary' : 'text-text-secondary ml-4'
                }`}
              >
                {item.title}
              </button>
            ))}
          </nav>
        </div> */}

        {/* Related Stories */}
        <div className="bg-background border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-semibold text-text-primary flex items-center">
              <Icon name="FileText" size={20} className="mr-2" />
              Related Stories
            </h3>
            {relatedArticles.length > 1 && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  onClick={prevSlide}
                  className="p-2 hover:bg-surface"
                  aria-label="Previous article"
                >
                  <Icon name="ChevronLeft" size={20} />
                </Button>
                <Button
                  variant="ghost"
                  onClick={nextSlide}
                  className="p-2 hover:bg-surface"
                  aria-label="Next article"
                >
                  <Icon name="ChevronRight" size={20} />
                </Button>
              </div>
            )}
          </div>
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {relatedArticles.map((relatedArticle) => (
                <div key={relatedArticle.id} className="w-full flex-shrink-0">
                  <Link
                    to={`/article-reading-view?id=${relatedArticle.id}`}
                    className="block bg-background border border-border rounded-lg overflow-hidden hover:shadow-card transition-all duration-150 hover:scale-[1.02]"
                  >


                    {/* <div className="aspect-video overflow-hidden">
                      <Image
                        src={relatedArticle.featuredImage}
                        alt={relatedArticle.title}
                        className="w-full h-full object-cover"
                      />
                    </div> */}


 

                    <div className="aspect-video overflow-hidden">
                      {
                      typeof relatedArticle.featuredImage === 'string' 
                      && /\.(mp4|webm|ogg)$/i.test(relatedArticle.featuredImage)
                        ? (
                          <video
                            controls
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          >
                            <source src={relatedArticle.featuredImage} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <Image
                            src={relatedArticle.featuredImage}
                            alt={relatedArticle.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                    </div>


                    <div className="p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                          {relatedArticle.category}
                        </span>
                        <span className="text-xs text-text-secondary">
                          {formatDate(relatedArticle.publishedAt)}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-text-primary mb-2 line-clamp-2 leading-tight">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-xs text-text-secondary mb-3 line-clamp-2">
                        {getExcerpt(relatedArticle.content)}
                      </p>
                      <div className="flex items-center justify-between text-xs text-text-secondary">

                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>{calculateReadingTime(relatedArticle.content)} min</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {/* <Link
            to="/news-categories-search"
            className="block text-center text-sm text-accent hover:text-accent/80 font-medium mt-4 pt-4 border-t border-border transition-colors duration-150"
          >
            View More Related Articles
          </Link> */}
        </div>

        {/* Trending Topics */}
        {/* <div className="bg-background border border-border rounded-lg p-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="TrendingUp" size={20} className="mr-2" />
            Trending Topics
          </h3>
          <div className="space-y-3">
            {trendingTopics.map((topic, index) => (
              <Link
                key={topic.id}
                to={`/news-categories-search?topic=${encodeURIComponent(topic.name)}`}
                className="flex items-center space-x-3 hover:bg-surface rounded-lg p-2 transition-colors duration-150"
              >
                <div className="w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-text-primary truncate">
                    {topic.name}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {topic.articleCount} articles
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-xs text-success">
                  <Icon name="TrendingUp" size={12} />
                  <span>+{topic.growthPercentage}%</span>
                </div>
              </Link>
            ))}
          </div>
        </div> */}

        {/* Article Stats */}
        {/* <div className="bg-background border border-border rounded-lg p-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 flex items-center">
            <Icon name="BarChart3" size={20} className="mr-2" />
            Article Stats
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Eye" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">Views</span>
              </div>
              <span className="text-sm font-medium text-text-primary">
                {article.views?.toLocaleString() || '1,234'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="MessageCircle" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">Comments</span>
              </div>
              <span className="text-sm font-medium text-text-primary">
                {article.commentCount || 45}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Share2" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">Shares</span>
              </div>
              <span className="text-sm font-medium text-text-primary">
                {article.shareCount || 89}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Bookmark" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">Bookmarks</span>
              </div>
              <span className="text-sm font-medium text-text-primary">
                {article.bookmarkCount || 156}
              </span>
            </div>
          </div>
        </div> */}

        {/* Newsletter Signup */}
        {/* <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-lg p-4">
          <div className="text-center">
            <Icon name="Mail" size={24} className="mx-auto text-accent mb-2" />
            <h3 className="text-sm font-semibold text-text-primary mb-2">
              Stay Updated
            </h3>
            <p className="text-xs text-text-secondary mb-3">
              Get the latest news delivered to your inbox
            </p>
            <Link
              to="/user-profile-settings"
              className="inline-flex items-center justify-center w-full px-3 py-2 bg-accent text-accent-foreground text-xs font-medium rounded-md hover:bg-accent/90 transition-colors duration-150"
            >
              Subscribe to Newsletter
            </Link>
          </div>
        </div> */}
      </div>
    </aside>
  );
};

export default DesktopSidebar;