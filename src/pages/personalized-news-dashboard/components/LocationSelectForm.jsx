// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Button from '../../../components/ui/Button';

// const LocationSelectForm = ({ onDone }) => {
//   const [districts, setDistricts] = useState([]);
//   const [selectedState, setSelectedState] = useState('Tamil Nadu');
//   const [selectedDistrict, setSelectedDistrict] = useState('');
//   const [selectedTaluk, setSelectedTaluk] = useState('');
//   const [talukList, setTalukList] = useState([]);

//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/api/location/districts')
//       .then((res) => {
//         console.log('📦 District Response:', res.data);
//         setDistricts(res.data.districts);
//       })
//       .catch((err) => console.error('Failed to fetch districts', err));
//   }, []);

//   useEffect(() => {
//     const districtObj = districts.find((d) => d.name === selectedDistrict);
//     if (districtObj) {
//       setTalukList(districtObj.taluks || []);
//     } else {
//       setTalukList([]);
//     }
//   }, [selectedDistrict, districts]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!selectedDistrict) {
//       alert('Please select a district');
//       return;
//     }

//     // Save location for weather (taluk or district)
// const location = {
//   state: selectedState,
//   district: selectedDistrict,
//   taluk: selectedTaluk || '',
// };
// localStorage.setItem('selectedLocation', JSON.stringify(location));


//     // Dispatch locationChange event for weather only
//     document.dispatchEvent(
//       new CustomEvent('locationChange', {
//         detail: {
//           location: location,
//         },
//       })
//     );

//     onDone();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4">
//         <h2 className="text-lg font-semibold">Select Your Location</h2>

//         <div>
//           <label className="block mb-1 font-medium">State</label>
//           <select
//             value={selectedState}
//             onChange={(e) => setSelectedState(e.target.value)}
//             className="w-full border rounded px-3 py-2"
//             disabled
//           >
//             <option value="Tamil Nadu">Tamil Nadu</option>
//           </select>
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">District</label>
//           <select
//             value={selectedDistrict}
//             onChange={(e) => setSelectedDistrict(e.target.value)}
//             className="w-full border rounded px-3 py-2"
//             required
//           >
//             <option value="">Select District</option>
//             {districts.map((dist) => (
//               <option key={dist._id} value={dist.name}>
//                 {dist.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {talukList.length > 0 && (
//           <div>
//             <label className="block mb-1 font-medium">Taluk (optional)</label>
//             <select
//               value={selectedTaluk}
//               onChange={(e) => setSelectedTaluk(e.target.value)}
//               className="w-full border rounded px-3 py-2"
//             >
//               <option value="">None</option>
//               {talukList.map((t, idx) => (
//                 <option key={idx} value={t}>
//                   {t}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         <Button type="submit" className="w-full">
//           Save & Continue
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default LocationSelectForm;