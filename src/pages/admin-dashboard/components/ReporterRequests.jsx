// import React from 'react';
// import Button from '../../../components/ui/Button';
// import Icon from '../../../components/AppIcon';

// const ReporterRequests = ({ requests, onAcceptRequest, onRejectRequest }) => {
//   const pendingRequests = requests?.filter(req => req.status === 'pending') || [];

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-heading font-semibold text-text-primary">
//           Reporter Requests
//         </h1>
//         <p className="text-text-secondary">
//           Review and manage new reporter applications
//         </p>
//       </div>

//       <div className="bg-white rounded-lg shadow-card">
//         {pendingRequests.length === 0 ? (
//           <div className="p-8 text-center">
//             <Icon name="UserCheck" size={48} className="mx-auto text-text-secondary mb-4" />
//             <h3 className="text-lg font-medium text-text-primary mb-2">
//               No Pending Requests
//             </h3>
//             <p className="text-text-secondary">
//               All reporter requests have been processed.
//             </p>
//           </div>
//         ) : (
//           <div className="divide-y divide-border-light">
//             {pendingRequests.map((request) => (
//               <div key={request._id} className="p-6">
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                   <div className="flex-1">
//                     <div className="flex items-center space-x-3 mb-2">
//                       <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
//                         <Icon name="User" size={20} color="white" />
//                       </div>
//                       <div>
//                         <h3 className="text-lg font-medium text-text-primary">
//                           {request.reporter?.name || 'Unknown'}
//                         </h3>
//                         <p className="text-text-secondary">
//                           {request.reporter?.email || 'N/A'}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="ml-13 space-y-1">
//                       <div className="flex items-center space-x-2 text-sm text-text-secondary">
//                         <Icon name="MapPin" size={14} />
//                         <span>{request.reporter?.location || 'No location'}</span>
//                       </div>
//                       <div className="flex items-center space-x-2 text-sm text-text-secondary">
//                         <Icon name="Calendar" size={14} />
//                         <span>Applied on {request.submittedAt ? new Date(request.submittedAt).toLocaleDateString() : 'Invalid Date'}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex space-x-3">
//                     <Button
//                       variant="primary"
//                       onClick={() => onAcceptRequest(request._id)}
//                       className="px-6"
//                     >
//                       <Icon name="Check" size={16} className="mr-2" />
//                       Accept
//                     </Button>
//                     <Button
//                       variant="outline"
//                       onClick={() => onRejectRequest(request._id)}
//                       className="px-6 border-error text-error hover:bg-error hover:text-white"
//                     >
//                       <Icon name="X" size={16} className="mr-2" />
//                       Reject
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Recent Actions */}
//       <div className="bg-white rounded-lg shadow-card p-6">
//         <h2 className="text-lg font-medium text-text-primary mb-4">
//           Recent Actions
//         </h2>
//         <div className="space-y-3">
//           {requests?.filter(req => req.status !== 'pending').slice(0, 5).map((request) => (
//             <div key={request._id} className="flex items-center justify-between py-2">
//               <div className="flex items-center space-x-3">
//                 <Icon
//                   name={request.status === 'accepted' ? 'UserCheck' : 'UserX'}
//                   size={16}
//                   className={request.status === 'accepted' ? 'text-success' : 'text-error'}
//                 />
//                 <span className="text-sm text-text-primary">
//                   {request.reporter?.name || 'Unknown'}
//                 </span>
//               </div>
//               <span className={`text-xs px-2 py-1 rounded-full ${
//                 request.status === 'accepted' ? 'text-success bg-success/10' : 'text-error bg-error/10'
//               }`}>
//                 {request.status === 'accepted' ? 'Accepted' : 'Rejected'}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReporterRequests;


import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ReporterRequests = ({ requests, onAcceptRequest, onRejectRequest }) => {
  // Handle case where requests is an object { success: true, requests: [...] }
  const requestArray = Array.isArray(requests) ? requests : requests?.requests || [];
  const pendingRequests = requestArray.filter(req => req.status === 'pending') || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-semibold text-text-primary">
          Reporter Requests
        </h1>
        <p className="text-text-secondary">
          Review and manage new reporter applications
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-card">
        {pendingRequests.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="UserCheck" size={48} className="mx-auto text-text-secondary mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">
              No Pending Requests
            </h3>
            <p className="text-text-secondary">
              All reporter requests have been processed.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border-light">
            {pendingRequests.map((request) => (
              <div key={request._id} className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                        <Icon name="User" size={20} color="white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-text-primary">
                          {request.userId?.name || 'Unknown'}
                        </h3>
                        <p className="text-text-secondary">
                          {request.userId?.email || 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div className="ml-13 space-y-1">
                      <div className="flex items-center space-x-2 text-sm text-text-secondary">
                        <Icon name="MapPin" size={14} />
                        <span>
                          {request.userId?.location?.district && request.userId?.location?.state
                            ? `${request.userId.location.district}, ${request.userId.location.state}`
                            : 'No location'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-text-secondary">
                        <Icon name="Calendar" size={14} />
                        <span>
                          Applied on {request.submittedAt
                            ? new Date(request.submittedAt).toLocaleDateString()
                            : 'Invalid Date'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      variant="primary"
                      onClick={() => onAcceptRequest(request.userId._id)}
                      className="px-6"
                    >
                      <Icon name="Check" size={16} className="mr-2" />
                      Accept
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => onRejectRequest(request.userId._id)}
                      className="px-6 border-error text-error hover:bg-error hover:text-white"
                    >
                      <Icon name="X" size={16} className="mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Actions */}
      {/* <div className="bg-white rounded-lg shadow-card p-6">
        <h2 className="text-lg font-medium text-text-primary mb-4">
          Recent Actions
        </h2>
        <div className="space-y-3">
          {requestArray
            .filter(req => req.status !== 'pending')
            .slice(0, 5)
            .map((request) => (
              <div key={request._id} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <Icon
                    name={request.status === 'accepted' ? 'UserCheck' : 'UserX'}
                    size={16}
                    className={request.status === 'accepted' ? 'text-success' : 'text-error'}
                  />
                  <span className="text-sm text-text-primary">
                    {request.userId?.name || 'Unknown'}
                  </span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  request.status === 'accepted' ? 'text-success bg-success/10' : 'text-error bg-error/10'
                }`}>
                  {request.status === 'accepted' ? 'Accepted' : 'Rejected'}
                </span>
              </div>
            ))}
        </div>
      </div> */}
    </div>
  );
};

export default ReporterRequests;