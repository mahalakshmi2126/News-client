import React, { useState, useEffect } from 'react';

const ReadingProgressBar = ({ contentRef }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const element = contentRef.current;
      const totalHeight = element.scrollHeight - element.clientHeight;
      const scrolled = window.scrollY;
      
      const progressPercentage = Math.min((scrolled / totalHeight) * 100, 100);
      setProgress(progressPercentage);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [contentRef]);

  return (
    <div className="fixed top-0 left-0 right-0 z-40 h-1 bg-surface">
      <div 
        className="h-full bg-accent transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ReadingProgressBar;
