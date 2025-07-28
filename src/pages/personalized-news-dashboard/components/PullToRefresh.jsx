import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const PullToRefresh = ({ onRefresh, children }) => {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const containerRef = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  const PULL_THRESHOLD = 80;
  const MAX_PULL_DISTANCE = 120;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId;

    const handleTouchStart = (e) => {
      if (window.scrollY > 0) return;
      startY.current = e.touches[0].clientY;
      setIsPulling(true);
    };

    const handleTouchMove = (e) => {
      if (!isPulling || window.scrollY > 0) return;
      
      currentY.current = e.touches[0].clientY;
      const distance = Math.max(0, currentY.current - startY.current);
      
      if (distance > 0) {
        e.preventDefault();
        const dampedDistance = Math.min(distance * 0.5, MAX_PULL_DISTANCE);
        setPullDistance(dampedDistance);
      }
    };

    const handleTouchEnd = () => {
      if (!isPulling) return;
      
      setIsPulling(false);
      
      if (pullDistance >= PULL_THRESHOLD && !isRefreshing) {
        setIsRefreshing(true);
        onRefresh?.().finally(() => {
          setIsRefreshing(false);
          setPullDistance(0);
        });
      } else {
        setPullDistance(0);
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 0 && isPulling) {
        setIsPulling(false);
        setPullDistance(0);
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isPulling, pullDistance, isRefreshing, onRefresh]);

  const getRefreshStatus = () => {
    if (isRefreshing) return 'refreshing';
    if (pullDistance >= PULL_THRESHOLD) return 'ready';
    if (pullDistance > 0) return 'pulling';
    return 'idle';
  };

  const getRefreshText = () => {
    const status = getRefreshStatus();
    switch (status) {
      case 'refreshing': return 'Refreshing...';
      case 'ready': return 'Release to refresh';
      case 'pulling': return 'Pull to refresh';
      default: return '';
    }
  };

  const getIconRotation = () => {
    if (isRefreshing) return 'animate-spin';
    if (pullDistance >= PULL_THRESHOLD) return 'rotate-180';
    return 'rotate-0';
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Pull to Refresh Indicator */}
      <div
        className="absolute top-0 left-0 right-0 flex flex-col items-center  transition-all duration-300 ease-out overflow-hidden z-50"
        style={{
          height: `${pullDistance}px`,
          transform: `translateY(-${Math.max(0, PULL_THRESHOLD - pullDistance)}px)`
        }}
      >
        <div className="flex items-center space-x-1 sm:space-x-2 text-text-secondary">
          <Icon
            name={isRefreshing ? "Loader2" : "ArrowDown"}
            size={16}
            className={`sm:w-5 sm:h-5 transition-transform duration-300 ${getIconRotation()}`}
          />
          <span className="text-xs sm:text-sm font-medium">
            {getRefreshText()}
          </span>
        </div>
        {/* Progress Bar */}
        <div className="w-12 sm:w-16 h-0.5 sm:h-1 bg-surface rounded-full mt-1.5 sm:mt-2 overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-100 ease-out"
            style={{
              width: `${Math.min((pullDistance / PULL_THRESHOLD) * 100, 100)}%`
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div
        className="transition-transform duration-300 ease-out w-full"
        style={{
          transform: `translateY(${pullDistance}px)`
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PullToRefresh;


// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import Icon from '../../../components/AppIcon';

// const PullToRefresh = ({ onRefresh, children }) => {
//   const [isPulling, setIsPulling] = useState(false);
//   const [pullDistance, setPullDistance] = useState(0);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const containerRef = useRef(null);
//   const startY = useRef(0);
//   const currentY = useRef(0);

//   const PULL_THRESHOLD = 80;
//   const MAX_PULL_DISTANCE = 120;

//   const getScrollTop = () => (
//     window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
//   );

//   const safeRefresh = useCallback(async () => {
//     if (!onRefresh) return;
//     setIsRefreshing(true);
//     try {
//       await onRefresh();
//     } finally {
//       setIsRefreshing(false);
//       setPullDistance(0);
//     }
//   }, [onRefresh]);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const handleTouchStart = (e) => {
//       if (getScrollTop() > 0) return;
//       startY.current = e.touches[0].clientY;
//       setIsPulling(true);
//     };

//     const handleTouchMove = (e) => {
//       if (!isPulling || getScrollTop() > 0) return;

//       currentY.current = e.touches[0].clientY;
//       const distance = Math.max(0, currentY.current - startY.current);

//       if (distance > 0) {
//         e.preventDefault(); // stop scroll
//         const damped = Math.min(distance * 0.5, MAX_PULL_DISTANCE);
//         setPullDistance(damped);
//       }
//     };

//     const handleTouchEnd = () => {
//       if (!isPulling) return;
//       setIsPulling(false);

//       if (pullDistance >= PULL_THRESHOLD && !isRefreshing) {
//         safeRefresh();
//       } else {
//         setPullDistance(0);
//       }
//     };

//     const handleTouchCancel = () => {
//       setIsPulling(false);
//       setPullDistance(0);
//     };

//     const handleScroll = () => {
//       if (getScrollTop() > 0 && isPulling) {
//         setIsPulling(false);
//         setPullDistance(0);
//       }
//     };

//     container.addEventListener('touchstart', handleTouchStart, { passive: false });
//     container.addEventListener('touchmove', handleTouchMove, { passive: false });
//     container.addEventListener('touchend', handleTouchEnd);
//     container.addEventListener('touchcancel', handleTouchCancel);
//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       container.removeEventListener('touchstart', handleTouchStart);
//       container.removeEventListener('touchmove', handleTouchMove);
//       container.removeEventListener('touchend', handleTouchEnd);
//       container.removeEventListener('touchcancel', handleTouchCancel);
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [isPulling, pullDistance, isRefreshing, safeRefresh]);

//   const getRefreshStatus = () => {
//     if (isRefreshing) return 'refreshing';
//     if (pullDistance >= PULL_THRESHOLD) return 'ready';
//     if (pullDistance > 0) return 'pulling';
//     return 'idle';
//   };

//   const getRefreshText = () => {
//     const status = getRefreshStatus();
//     switch (status) {
//       case 'refreshing': return 'Refreshing...';
//       case 'ready': return 'Release to refresh';
//       case 'pulling': return 'Pull to refresh';
//       default: return '';
//     }
//   };

//   const getIconRotation = () => {
//     if (isRefreshing) return 'animate-spin';
//     if (pullDistance >= PULL_THRESHOLD) return 'rotate-180';
//     return 'rotate-0';
//   };

//   return (
//     <div ref={containerRef} className="relative">
//       {/* Pull to Refresh Indicator */}
//       <div
//         className="absolute top-0 left-0 right-0 flex flex-col items-center justify-center bg-background border-b border-border-light transition-all duration-300 ease-out overflow-hidden z-50"
//         style={{
//           height: `${pullDistance}px`,
//           transform: `translateY(-${Math.max(0, PULL_THRESHOLD - pullDistance)}px)`
//         }}
//       >
//         <div className="flex items-center space-x-2 text-text-secondary">
//           <Icon
//             name={isRefreshing ? "Loader2" : "ArrowDown"}
//             size={20}
//             className={`transition-transform duration-300 ${getIconRotation()}`}
//           />
//           <span className="text-sm font-medium">{getRefreshText()}</span>
//         </div>

//         <div className="w-16 h-1 bg-surface rounded-full mt-2 overflow-hidden">
//           <div
//             className="h-full bg-accent transition-all duration-100 ease-out"
//             style={{
//               width: `${Math.min((pullDistance / PULL_THRESHOLD) * 100, 100)}%`
//             }}
//           />
//         </div>
//       </div>

//       {/* Main Content */}
//       <div
//         className="transition-transform duration-300 ease-out"
//         style={{
//           transform: `translateY(${pullDistance}px)`
//         }}
//       >
//         {children}
//       </div>
//     </div>
//   );
// };

// export default PullToRefresh;