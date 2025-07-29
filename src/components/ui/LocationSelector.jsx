// import React, { useState, useRef, useEffect } from 'react';
// import Icon from '../AppIcon';
// import { toast } from 'react-toastify';

// const LocationSelector = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [dropdownType, setDropdownType] = useState('state'); // 'state', 'district', or 'taluk'
//   const [selectedState, setSelectedState] = useState(localStorage.getItem('selectedState') || '');
//   const [selectedDistrict, setSelectedDistrict] = useState(localStorage.getItem('selectedDistrict') || '');
//   const [selectedTaluk, setSelectedTaluk] = useState(localStorage.getItem('selectedTaluk') || '');
//   const [states, setStates] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [taluks, setTaluks] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const fetchLocations = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await fetch('http://localhost:5000/api/location/districts', {
//           headers: { 'Content-Type': 'application/json' },
//         });
//         if (!response.ok) {
//           throw new Error(`Failed to fetch locations: ${response.status} ${response.statusText}`);
//         }
//         const data = await response.json();
//         if (!data.success || !Array.isArray(data.districts)) {
//           throw new Error('Invalid API response format');
//         }
//         // Extract unique states
//         const uniqueStates = [...new Set(data.districts.map(loc => loc.state))].map(state => ({
//           code: state,
//           name: state,
//           icon: '🌐',
//         }));
//         setStates(uniqueStates);
//         setDistricts(data.districts);
//       } catch (err) {
//         console.error('Error fetching locations:', err.message);
//         setError('Failed to load locations. Please try again.');
//         toast.error('Failed to load locations. Please try again.');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchLocations();
//   }, []);

//   // Update taluks when district changes
//   useEffect(() => {
//     if (selectedDistrict) {
//       const selectedDistrictData = districts.find(d => d._id === selectedDistrict);
//       if (selectedDistrictData && selectedDistrictData.taluks) {
//         setTaluks(selectedDistrictData.taluks.map(taluk => ({
//           code: taluk,
//           name: taluk,
//           icon: '🏞️',
//         })));
//       } else {
//         setTaluks([]);
//       }
//     } else {
//       setTaluks([]);
//     }
//   }, [selectedDistrict, districts]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     const handleEscape = (event) => {
//       if (event.key === 'Escape') {
//         setIsOpen(false);
//       }
//     };

//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//       document.addEventListener('keydown', handleEscape);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//       document.removeEventListener('keydown', handleEscape);
//     };
//   }, [isOpen]);

//   const handleSelect = (type, code) => {
//     if (type === 'state') {
//       setSelectedState(code);
//       setSelectedDistrict('');
//       setSelectedTaluk('');
//       localStorage.setItem('selectedState', code);
//       localStorage.removeItem('selectedDistrict');
//       localStorage.removeItem('selectedTaluk');
//       setDropdownType('district');
//     } else if (type === 'district') {
//       setSelectedDistrict(code);
//       setSelectedTaluk('');
//       localStorage.setItem('selectedDistrict', code);
//       localStorage.removeItem('selectedTaluk');
//       setDropdownType('taluk');
//     } else if (type === 'taluk') {
//       setSelectedTaluk(code);
//       localStorage.setItem('selectedTaluk', code);
//       setIsOpen(false); // Close dropdown after taluk selection
//     }

//     // Dispatch locationChange event
//     document.dispatchEvent(new CustomEvent('locationChange', {
//       detail: {
//         state: type === 'state' ? code : selectedState,
//         district: type === 'district' ? code : selectedDistrict,
//         taluk: type === 'taluk' ? code : selectedTaluk,
//       }
//     }));
//   };

//   const toggleDropdown = (type) => {
//     setDropdownType(type);
//     setIsOpen(true);
//   };

//   // Get display text for text box
//   const getDisplayText = () => {
//     const state = states.find(s => s.code === selectedState)?.name || '';
//     const district = districts.find(d => d._id === selectedDistrict)?.name || '';
//     const taluk = selectedTaluk;
//     const parts = [state, district, taluk].filter(Boolean);
//     return parts.length > 0 ? parts.join(' > ') : 'Select a location';
//   };

//   // Get items for the current dropdown
//   const getDropdownItems = () => {
//     if (dropdownType === 'state') {
//       return states;
//     } else if (dropdownType === 'district') {
//       return districts
//         .filter(d => d.state === selectedState)
//         .map(d => ({ code: d._id, name: d.name, icon: '📍' }));
//     } else if (dropdownType === 'taluk') {
//       return taluks;
//     }
//     return [];
//   };

//   return (
//     <div className="relative" ref={dropdownRef}>
//       {/* Text Box with Clickable Parts */}
//       <div
//         className="flex items-center w-64 px-3 py-2 bg-background border border-border rounded-lg transition-all duration-150 text-sm text-text-secondary"
//         aria-label="Select location"
//         aria-expanded={isOpen}
//         aria-haspopup="listbox"
//       >
//         <span className="flex-1 truncate">
//           {states.find(s => s.code === selectedState)?.name ? (
//             <span
//               className="cursor-pointer hover:text-accent"
//               onClick={() => toggleDropdown('state')}
//             >
//               {states.find(s => s.code === selectedState).name}
//             </span>
//           ) : (
//             <span>Select a location</span>
//           )}
//           {selectedDistrict && (
//             <>
//               <span className="mx-1">></span>
//               <span
//                 className="cursor-pointer hover:text-accent"
//                 onClick={() => toggleDropdown('district')}
//               >
//                 {districts.find(d => d._id === selectedDistrict)?.name}
//               </span>
//             </>
//           )}
//           {selectedTaluk && (
//             <>
//               <span className="mx-1">></span>
//               <span
//                 className="cursor-pointer hover:text-accent"
//                 onClick={() => toggleDropdown('taluk')}
//               >
//                 {selectedTaluk}
//               </span>
//             </>
//           )}
//         </span>
//         <Icon
//           name={isOpen ? 'ChevronUp' : 'ChevronDown'}
//           size={16}
//           className="ml-2 cursor-pointer"
//           onClick={() => toggleDropdown(selectedState ? (selectedDistrict ? 'taluk' : 'district') : 'state')}
//         />
//       </div>

//       {/* Dropdown List */}
//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-modal z-1010 animate-slide-down">
//           <div className="py-2 max-h-80 overflow-y-auto">
//             <div className="px-3 py-2 text-xs font-medium text-text-secondary uppercase tracking-wide border-b border-border-light">
//               Select {dropdownType.charAt(0).toUpperCase() + dropdownType.slice(1)}
//             </div>
//             {isLoading ? (
//               <div className="px-3 py-2 text-sm text-text-secondary">Loading locations...</div>
//             ) : error ? (
//               <div className="px-3 py-2 text-sm text-error">{error}</div>
//             ) : getDropdownItems().length === 0 ? (
//               <div className="px-3 py-2 text-sm text-text-secondary">No {dropdownType}s available</div>
//             ) : (
//               getDropdownItems().map(item => (
//                 <button
//                   key={item.code}
//                   onClick={() => handleSelect(dropdownType, item.code)}
//                   className={`w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-surface transition-colors duration-150 ${
//                     (dropdownType === 'state' && selectedState === item.code) ||
//                     (dropdownType === 'district' && selectedDistrict === item.code) ||
//                     (dropdownType === 'taluk' && selectedTaluk === item.code)
//                       ? 'bg-surface text-accent'
//                       : 'text-text-primary'
//                   }`}
//                 >
//                   <span className="text-lg">{item.icon}</span>
//                   <div className="flex-1 min-w-0">
//                     <div className="text-sm font-medium truncate">{item.name}</div>
//                   </div>
//                   {(dropdownType === 'state' && selectedState === item.code) ||
//                   (dropdownType === 'district' && selectedDistrict === item.code) ||
//                   (dropdownType === 'taluk' && selectedTaluk === item.code) ? (
//                     <Icon name="Check" size={16} className="text-accent" />
//                   ) : null}
//                 </button>
//               ))
//             )}
//           </div>
//           <div className="border-t border-border-light px-3 py-2">
//             <div className="text-xs text-text-secondary">
//               News feed will be shown based on selected location
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LocationSelector;

import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import { toast } from 'react-toastify';
const URL = import.meta.env.VITE_API_BASE_URL;

const LocationSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownType, setDropdownType] = useState('state');
  const [selectedState, setSelectedState] = useState(localStorage.getItem('selectedState') || '');
  const [selectedDistrict, setSelectedDistrict] = useState(localStorage.getItem('selectedDistrict') || '');
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(`${URL}/location/districts`);
        const data = await response.json();
        if (!data.success || !Array.isArray(data.districts)) throw new Error('Invalid location data');

        const uniqueStates = [...new Set(data.districts.map(loc => loc.state))].map(state => ({
          code: state,
          name: state,
          icon: '🌐'
        }));

        setStates(uniqueStates);
        setDistricts(data.districts);
      } catch (err) {
        toast.error('Failed to load locations');
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (type, code) => {
    if (type === 'state') {
      setSelectedState(code);
      setSelectedDistrict('');
      localStorage.setItem('selectedState', code);
      localStorage.removeItem('selectedDistrict');
      setDropdownType('district');
    } else if (type === 'district') {
      const districtObj = districts.find(d => d._id === code);
      if (districtObj) {
        setSelectedDistrict(districtObj.name);
        localStorage.setItem('selectedDistrict', districtObj.name);
        setIsOpen(false);
      }
    }

    // Dispatch locationChange event
    const districtName = type === 'district'
      ? districts.find(d => d._id === code)?.name || ''
      : selectedDistrict;

    document.dispatchEvent(new CustomEvent('locationChange', {
      detail: {
        state: type === 'state' ? code : selectedState,
        district: districtName,
      }
    }));
  };

  const toggleDropdown = (type) => {
    setDropdownType(type);
    setIsOpen(true);
  };

  const getDisplayText = () => {
    const state = states.find(s => s.code === selectedState)?.name || '';
    const districtName = selectedDistrict; // ✅ Already name, no need to find by _id
    const parts = [state, districtName].filter(Boolean);
    return parts.length > 0 ? parts.join(' > ') : 'Select a location';
  };

  const getDropdownItems = () => {
    if (dropdownType === 'state') return states;
    if (dropdownType === 'district') {
      return districts
        .filter(d => d.state === selectedState)
        .map(d => ({ code: d._id, name: d.name, icon: '📍' }));
    }
    return [];
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center w-64 px-3 py-2 bg-background border border-border rounded-lg text-sm text-text-secondary"
        aria-label="Select location"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="flex-1 truncate">
          {states.find(s => s.code === selectedState)?.name ? (
            <span className="cursor-pointer hover:text-accent" onClick={() => toggleDropdown('state')}>
              {states.find(s => s.code === selectedState)?.name}
            </span>
          ) : (
            <span>Select a location</span>
          )}
          {selectedDistrict && (
            <>
              <span className="mx-1">{'=>'}</span>
              <span className="cursor-pointer hover:text-accent" onClick={() => toggleDropdown('district')}>
                {selectedDistrict}
              </span>
            </>
          )}

        </span>
        <Icon
          name={isOpen ? 'ChevronUp' : 'ChevronDown'}
          size={16}
          className="ml-2 cursor-pointer"
          onClick={() => toggleDropdown(selectedState ? 'district' : 'state')}
        />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-background border border-border rounded-lg shadow z-10">
          <div className="py-2 max-h-80 overflow-y-auto">
            <div className="px-3 py-2 text-xs font-medium text-text-secondary uppercase tracking-wide border-b border-border-light">
              Select {dropdownType.charAt(0).toUpperCase() + dropdownType.slice(1)}
            </div>
            {isLoading ? (
              <div className="px-3 py-2 text-sm text-text-secondary">Loading...</div>
            ) : error ? (
              <div className="px-3 py-2 text-sm text-error">{error}</div>
            ) : getDropdownItems().length === 0 ? (
              <div className="px-3 py-2 text-sm text-text-secondary">No {dropdownType}s available</div>
            ) : (
              getDropdownItems().map(item => (
                <button
                  key={item.code}
                  onClick={() => handleSelect(dropdownType, item.code)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-surface transition-all ${(dropdownType === 'state' && selectedState === item.code) ||
                    (dropdownType === 'district' && selectedDistrict === item.name) // ✅ Compare with name
                    ? 'bg-surface text-accent'
                    : 'text-text-primary'
                    }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <div className="flex-1 truncate text-sm font-medium">{item.name}</div>
                  {(dropdownType === 'state' && selectedState === item.code) ||
                    (dropdownType === 'district' && selectedDistrict === item.name) ? ( // ✅ Compare with name
                    <Icon name="Check" size={16} className="text-accent" />
                  ) : null}
                </button>
              ))

            )}
          </div>
          <div className="border-t border-border-light px-3 py-2 text-xs text-text-secondary">
            News will be shown based on selected location
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
