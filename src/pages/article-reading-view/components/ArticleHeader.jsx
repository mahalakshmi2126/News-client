import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';



const ArticleHeader = ({ 
  isCollapsed, 
  onToggleCollapse, 
  isBookmarked, 
  onToggleBookmark,
  onShare,
  currentLanguage,
  availableLanguages,
  onLanguageChange,
  article 
}) => {
  const navigate = useNavigate();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleLanguageSelect = (language) => {
    onLanguageChange(language);
    setShowLanguageDropdown(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border transition-all duration-300 ${
      isCollapsed ? '-translate-y-full' : 'translate-y-0'
    }`}>
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="p-2 hover:bg-surface"
              aria-label="Go back"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            
            <Button
              variant="ghost"
              onClick={onToggleCollapse}
              className="p-2 hover:bg-surface lg:hidden"
              aria-label="Toggle header"
            >
              <Icon name={isCollapsed ? "ChevronDown" : "ChevronUp"} size={20} />
            </Button>
          </div>

          {/* Center Section - Article Title (Desktop) */}
          <div className="hidden md:block flex-1 mx-6">
            <h1 className="text-sm font-medium text-text-primary truncate">
              {article?.title}
            </h1>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Language Switcher */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="p-2 hover:bg-surface"
                aria-label="Change language"
              >
                <Icon name="Languages" size={20} />
              </Button>
              
              {showLanguageDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-border rounded-lg shadow-modal z-10">
                  <div className="py-2">
                    {availableLanguages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageSelect(language)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-surface transition-colors duration-150 ${
                          currentLanguage.code === language.code ? 'bg-surface text-accent' : 'text-text-primary'
                        }`}
                      >
                        <span className="text-base">{language.flag}</span>
                        <span className="text-sm">{language.name}</span>
                        {currentLanguage.code === language.code && (
                          <Icon name="Check" size={16} className="ml-auto text-accent" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bookmark Button */}
            <Button
              variant="ghost"
              onClick={onToggleBookmark}
              className={`p-2 hover:bg-surface ${isBookmarked ? 'text-accent' : 'text-text-secondary'}`}
              aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            >
              <Icon name={isBookmarked ? "Bookmark" : "BookmarkPlus"} size={20} />
            </Button>

            {/* Share Button */}
            <Button
              variant="ghost"
              onClick={onShare}
              className="p-2 hover:bg-surface"
              aria-label="Share article"
            >
              <Icon name="Share2" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ArticleHeader;
