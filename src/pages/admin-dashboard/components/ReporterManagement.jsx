// import React, { useState } from 'react';
// import Button from '../../../components/ui/Button';
// import Input from '../../../components/ui/Input';
// import Icon from '../../../components/AppIcon';

// const ReporterManagement = ({ reporters, onDelete }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedReporter, setSelectedReporter] = useState(null);

//   const filteredReporters = reporters?.filter(reporter =>
//     reporter?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     reporter?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     reporter?.location?.toLowerCase().includes(searchTerm.toLowerCase())
//   ) || [];

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-heading font-semibold text-text-primary">
//             Reporter Management
//           </h1>
//           <p className="text-text-secondary">
//             Manage active reporters and their profiles
//           </p>
//         </div>
//         <div className="relative">
//           <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
//           <Input
//             placeholder="Search reporters..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10 w-full sm:w-64"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredReporters.map((reporter) => (
//           <div key={reporter.id} className="bg-white rounded-lg shadow-card p-6">
//             <div className="flex items-center space-x-3 mb-4">
//               <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
//                 <Icon name="User" size={24} color="white" />
//               </div>
//               <div className="flex-1">
//                 <h3 className="text-lg font-medium text-text-primary">
//                   {reporter.name}
//                 </h3>
//                 <p className="text-sm text-text-secondary">
//                   {reporter.email}
//                 </p>
//               </div>
//               <div className="flex space-x-1">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => setSelectedReporter(reporter)}
//                   className="p-2"
//                 >
//                   <Icon name="Eye" size={16} />
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => onDelete(reporter._id)}
//                   className="p-2 text-error hover:bg-error/10"
//                 >
//                   <Icon name="Trash2" size={16} />
//                 </Button>
//               </div>
//             </div>
            
//             <div className="space-y-2">
//               <div className="flex items-center space-x-2 text-sm text-text-secondary">
//                 <Icon name="MapPin" size={14} />
//                 <span>{reporter.location}</span>
//               </div>
//               <div className="flex items-center space-x-2 text-sm text-text-secondary">
//                 <Icon name="FileText" size={14} />
//                 <span>{reporter.articlesCount} articles published</span>
//               </div>
//               <div className="flex items-center space-x-2 text-sm text-text-secondary">
//                 <Icon name="Calendar" size={14} />
//                 <span>Joined {new Date(reporter.joinDate).toLocaleDateString()}</span>
//               </div>
//             </div>
            
//             <div className="mt-4 pt-4 border-t border-border-light">
//               <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//               reporter.status === 'active' ? 'text-success bg-success/10' :
//               reporter.status === 'pending' ? 'text-warning bg-warning/10' :
//               'text-error bg-error/10'
//             }`}>
//   {reporter.status.charAt(0).toUpperCase() + reporter.status.slice(1)}
// </span>

//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Reporter Details Modal */}
//       {selectedReporter && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
//           <div className="bg-white rounded-lg shadow-modal w-full max-w-md">
//             <div className="p-6">
//               <div className="flex justify-between items-start mb-6">
//                 <h2 className="text-xl font-heading font-semibold text-text-primary">
//                   Reporter Details
//                 </h2>
//                 <Button
//                   variant="ghost"
//                   onClick={() => setSelectedReporter(null)}
//                   className="p-1"
//                 >
//                   <Icon name="X" size={20} />
//                 </Button>
//               </div>
              
//               <div className="space-y-4">
//                 <div className="text-center">
//                   <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
//                     <Icon name="User" size={32} color="white" />
//                   </div>
//                   <h3 className="text-lg font-medium text-text-primary">
//                     {selectedReporter.name}
//                   </h3>
//                   <p className="text-text-secondary">
//                     {selectedReporter.email}
//                   </p>
//                 </div>
                
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between py-2 border-b border-border-light">
//                     <span className="text-text-secondary">Location</span>
//                     <span className="text-text-primary">{selectedReporter.location}</span>
//                   </div>
//                   <div className="flex items-center justify-between py-2 border-b border-border-light">
//                     <span className="text-text-secondary">Articles Published</span>
//                     <span className="text-text-primary">{selectedReporter.articlesCount}</span>
//                   </div>
//                   <div className="flex items-center justify-between py-2 border-b border-border-light">
//                     <span className="text-text-secondary">Join Date</span>
//                     <span className="text-text-primary">
//                       {new Date(selectedReporter.joinDate).toLocaleDateString()}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between py-2">
//                     <span className="text-text-secondary">Status</span>
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       selectedReporter.status === 'active' ?'text-success bg-success/10' :'text-error bg-error/10'
//                     }`}>
//                       {selectedReporter.status === 'active' ? 'Active' : 'Inactive'}
//                     </span>
//                   </div>
//                 </div>
                
//                 <Button
//                   variant="outline"
//                   onClick={() => {
//                     onDelete(selectedReporter._id);
//                     setSelectedReporter(null);
//                   }}
//                   className="w-full mt-6 border-error text-error hover:bg-error hover:text-white"
//                 >
//                   <Icon name="Trash2" size={16} className="mr-2" />
//                   Remove Reporter
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReporterManagement;


import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';


const URL = import.meta.env.VITE_API_BASE_URL;
const ReporterManagement = ({ reporters, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReporter, setSelectedReporter] = useState(null);

  // Handle case where reporters is { success: true, reporters: [...] }
  const reporterArray = Array.isArray(reporters) ? reporters : reporters?.reporters || [];

  const filteredReporters = reporterArray.filter(reporter => {
    const locationStr = reporter?.location
      ? `${reporter.location.district || ''}, ${reporter.location.state || ''}`.trim()
      : '';
    return (
      reporter?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reporter?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      locationStr.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }) || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-text-primary">
            Reporter Management
          </h1>
          <p className="text-text-secondary">
            Manage active reporters and their profiles
          </p>
        </div>
        <div className="relative">
          <Icon name="Search" size={15} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          <Input
            placeholder="Search reporters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full sm:w-64"
          />
        </div>
      </div>

      {filteredReporters.length === 0 ? (
        <div className="bg-white rounded-lg shadow-card p-8 text-center">
          <Icon name="UserX" size={48} className="mx-auto text-text-secondary mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">
            No Reporters Found
          </h3>
          <p className="text-text-secondary">
            No reporters match your search or none exist.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReporters.map((reporter) => (
            <div key={reporter._id} className="bg-white rounded-lg shadow-card p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <Icon name="User" size={24} color="white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-text-primary">
                    {reporter.name || 'Unknown'}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {reporter.email || 'N/A'}
                  </p>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedReporter(reporter)}
                    className="p-2"
                  >
                    <Icon name="Eye" size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(reporter._id)}
                    className="p-2 text-error hover:bg-error/10"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="MapPin" size={14} />
                  <span>
                    {reporter.location?.district && reporter.location?.state
                      ? `${reporter.location.district}, ${reporter.location.state}`
                      : 'No location'}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="FileText" size={14} />
                  <span>{reporter.articlesCount || 0} articles published</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="Calendar" size={14} />
                  <span>
                    Joined {reporter.joinDate
                      ? new Date(reporter.joinDate).toLocaleDateString()
                      : 'Unknown'}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border-light">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  reporter.status === 'active' ? 'text-success bg-success/10' : 'text-error bg-error/10'
                }`}>
                  {reporter.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reporter Details Modal */}
      {selectedReporter && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
          <div className="bg-white rounded-lg shadow-modal w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-heading font-semibold text-text-primary">
                  Reporter Details
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedReporter(null)}
                  className="p-1"
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="User" size={32} color="white" />
                  </div>
                  <h3 className="text-lg font-medium text-text-primary">
                    {selectedReporter.name || 'Unknown'}
                  </h3>
                  <p className="text-text-secondary">
                    {selectedReporter.email || 'N/A'}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-border-light">
                    <span className="text-text-secondary">Location</span>
                    <span className="text-text-primary">
                      {selectedReporter.location?.district && selectedReporter.location?.state
                        ? `${selectedReporter.location.district}, ${selectedReporter.location.state}`
                        : 'No location'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border-light">
                    <span className="text-text-secondary">Articles Published</span>
                    <span className="text-text-primary">{selectedReporter.articlesCount || 0}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border-light">
                    <span className="text-text-secondary">Join Date</span>
                    <span className="text-text-primary">
                      {selectedReporter.joinDate
                        ? new Date(selectedReporter.joinDate).toLocaleDateString()
                        : 'Unknown'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-text-secondary">Status</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedReporter.status === 'active' ? 'text-success bg-success/10' : 'text-error bg-error/10'
                    }`}>
                      {selectedReporter.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    onDelete(selectedReporter._id);
                    setSelectedReporter(null);
                  }}
                  className="w-full mt-6 border-error text-error hover:bg-error hover:text-white"
                >
                  <Icon name="Trash2" size={16} className="mr-2" />
                  Remove Reporter
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReporterManagement;
