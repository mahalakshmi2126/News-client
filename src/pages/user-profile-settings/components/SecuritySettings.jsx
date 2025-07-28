// import React, { useState } from 'react';
// import Icon from '../../../components/AppIcon';
// import Button from '../../../components/ui/Button';
// import Input from '../../../components/ui/Input';

// const SecuritySettings = ({ settings, onUpdateSettings }) => {
//   const [localSettings, setLocalSettings] = useState(settings);
//   const [showPasswordForm, setShowPasswordForm] = useState(false);
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });

//   const loginHistory = [
//     {
//       id: 1,
//       device: 'Chrome on Windows',
//       location: 'New York, NY',
//       timestamp: '2024-01-15 14:30:00',
//       current: true
//     },
//     {
//       id: 2,
//       device: 'Safari on iPhone',
//       location: 'New York, NY',
//       timestamp: '2024-01-15 09:15:00',
//       current: false
//     },
//     {
//       id: 3,
//       device: 'Firefox on MacOS',
//       location: 'Boston, MA',
//       timestamp: '2024-01-14 16:45:00',
//       current: false
//     },
//     {
//       id: 4,
//       device: 'Chrome on Android',
//       location: 'Philadelphia, PA',
//       timestamp: '2024-01-13 11:20:00',
//       current: false
//     }
//   ];

//   const connectedDevices = [
//     {
//       id: 1,
//       name: 'iPhone 15 Pro',
//       type: 'Mobile',
//       lastActive: '2024-01-15 14:30:00',
//       current: true
//     },
//     {
//       id: 2,
//       name: 'MacBook Pro',
//       type: 'Desktop',
//       lastActive: '2024-01-15 10:15:00',
//       current: false
//     },
//     {
//       id: 3,
//       name: 'iPad Air',
//       type: 'Tablet',
//       lastActive: '2024-01-14 18:30:00',
//       current: false
//     }
//   ];

//   const toggleSetting = (setting) => {
//     const updatedSettings = {
//       ...localSettings,
//       [setting]: !localSettings[setting]
//     };
//     setLocalSettings(updatedSettings);
//     onUpdateSettings(updatedSettings);
//   };

//   const handlePasswordChange = (field, value) => {
//     setPasswordData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handlePasswordSubmit = (e) => {
//     e.preventDefault();
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       alert('New passwords do not match');
//       return;
//     }
//     if (passwordData.newPassword.length < 8) {
//       alert('Password must be at least 8 characters long');
//       return;
//     }
//     // Mock password change
//     console.log('Password changed successfully');
//     setShowPasswordForm(false);
//     setPasswordData({
//       currentPassword: '',
//       newPassword: '',
//       confirmPassword: ''
//     });
//   };

//   const handleDeviceLogout = (deviceId) => {
//     console.log(`Logging out device ${deviceId}`);
//     // Mock device logout
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleString();
//   };

//   const getDeviceIcon = (type) => {
//     switch (type) {
//       case 'Mobile': return 'Smartphone';
//       case 'Tablet': return 'Tablet';
//       case 'Desktop': return 'Monitor';
//       default: return 'Monitor';
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Two-Factor Authentication */}
//       <div>
//         <h3 className="text-sm font-medium text-text-primary mb-3">
//           Two-Factor Authentication
//         </h3>
//         <p className="text-xs text-text-secondary mb-3">
//           Add an extra layer of security to your account.
//         </p>
//         <div className="space-y-3">
//           <Button
//             variant="ghost"
//             onClick={() => toggleSetting('twoFactorEnabled')}
//             className="w-full flex items-center justify-between p-3 border border-border rounded-lg"
//           >
//             <div className="flex items-center space-x-3">
//               <Icon name="Shield" size={20} className="text-accent" />
//               <div className="text-left">
//                 <div className="text-sm font-medium">Enable 2FA</div>
//                 <div className="text-xs text-text-secondary">
//                   Use authenticator app for additional security
//                 </div>
//               </div>
//             </div>
//             <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
//               localSettings.twoFactorEnabled ? 'bg-accent' : 'bg-border'
//             }`}>
//               <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 mt-0.5 ${
//                 localSettings.twoFactorEnabled ? 'translate-x-6 ml-0.5' : 'translate-x-0.5'
//               }`} />
//             </div>
//           </Button>

//           {localSettings.twoFactorEnabled && (
//             <div className="ml-11 space-y-2">
//               <Button variant="ghost" className="text-sm text-accent">
//                 View Recovery Codes
//               </Button>
//               <Button variant="ghost" className="text-sm text-accent">
//                 Reconfigure Authenticator
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Password Management */}
//       <div>
//         <h3 className="text-sm font-medium text-text-primary mb-3">
//           Password
//         </h3>
//         <div className="space-y-3">
//           <div className="flex items-center justify-between p-3 border border-border rounded-lg">
//             <div className="flex items-center space-x-3">
//               <Icon name="Key" size={20} className="text-accent" />
//               <div className="text-left">
//                 <div className="text-sm font-medium">Password</div>
//                 <div className="text-xs text-text-secondary">
//                   Last changed 30 days ago
//                 </div>
//               </div>
//             </div>
//             <Button
//               variant="ghost"
//               onClick={() => setShowPasswordForm(!showPasswordForm)}
//               className="text-sm"
//             >
//               Change Password
//             </Button>
//           </div>

//           {showPasswordForm && (
//             <form onSubmit={handlePasswordSubmit} className="space-y-3 p-4 bg-surface rounded-lg">
//               <Input
//                 type="password"
//                 placeholder="Current Password"
//                 value={passwordData.currentPassword}
//                 onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
//                 required
//               />
//               <Input
//                 type="password"
//                 placeholder="New Password"
//                 value={passwordData.newPassword}
//                 onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
//                 required
//               />
//               <Input
//                 type="password"
//                 placeholder="Confirm New Password"
//                 value={passwordData.confirmPassword}
//                 onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
//                 required
//               />
//               <div className="flex space-x-2">
//                 <Button type="submit" variant="primary" className="text-sm">
//                   Update Password
//                 </Button>
//                 <Button
//                   type="button"
//                   variant="ghost"
//                   onClick={() => setShowPasswordForm(false)}
//                   className="text-sm"
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>

//       {/* Login Alerts */}
//       <div className="space-y-4">
//         <h3 className="text-sm font-medium text-text-primary">Login Alerts</h3>
        
//         <div className="space-y-3">
//           <Button
//             variant="ghost"
//             onClick={() => toggleSetting('loginAlerts')}
//             className="w-full flex items-center justify-between p-3 border border-border rounded-lg"
//           >
//             <div className="flex items-center space-x-3">
//               <Icon name="AlertTriangle" size={20} className="text-accent" />
//               <div className="text-left">
//                 <div className="text-sm font-medium">Email login alerts</div>
//                 <div className="text-xs text-text-secondary">
//                   Get notified of new login attempts
//                 </div>
//               </div>
//             </div>
//             <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
//               localSettings.loginAlerts ? 'bg-accent' : 'bg-border'
//             }`}>
//               <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 mt-0.5 ${
//                 localSettings.loginAlerts ? 'translate-x-6 ml-0.5' : 'translate-x-0.5'
//               }`} />
//             </div>
//           </Button>

//           <Button
//             variant="ghost"
//             onClick={() => toggleSetting('suspiciousActivityAlerts')}
//             className="w-full flex items-center justify-between p-3 border border-border rounded-lg"
//           >
//             <div className="flex items-center space-x-3">
//               <Icon name="ShieldAlert" size={20} className="text-accent" />
//               <div className="text-left">
//                 <div className="text-sm font-medium">Suspicious activity alerts</div>
//                 <div className="text-xs text-text-secondary">
//                   Alert for unusual account activity
//                 </div>
//               </div>
//             </div>
//             <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
//               localSettings.suspiciousActivityAlerts ? 'bg-accent' : 'bg-border'
//             }`}>
//               <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 mt-0.5 ${
//                 localSettings.suspiciousActivityAlerts ? 'translate-x-6 ml-0.5' : 'translate-x-0.5'
//               }`} />
//             </div>
//           </Button>
//         </div>
//       </div>

//       {/* Login History */}
//       <div>
//         <h3 className="text-sm font-medium text-text-primary mb-3">
//           Recent Login Activity
//         </h3>
//         <div className="space-y-2">
//           {loginHistory.map((login) => (
//             <div key={login.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
//               <div className="flex items-center space-x-3">
//                 <Icon name="Monitor" size={20} className="text-text-secondary" />
//                 <div className="text-left">
//                   <div className="text-sm font-medium flex items-center space-x-2">
//                     <span>{login.device}</span>
//                     {login.current && (
//                       <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full">
//                         Current
//                       </span>
//                     )}
//                   </div>
//                   <div className="text-xs text-text-secondary">
//                     {login.location} • {formatDate(login.timestamp)}
//                   </div>
//                 </div>
//               </div>
//               {!login.current && (
//                 <Button variant="ghost" className="text-xs text-error">
//                   Revoke
//                 </Button>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Connected Devices */}
//       <div>
//         <h3 className="text-sm font-medium text-text-primary mb-3">
//           Connected Devices
//         </h3>
//         <div className="space-y-2">
//           {connectedDevices.map((device) => (
//             <div key={device.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
//               <div className="flex items-center space-x-3">
//                 <Icon name={getDeviceIcon(device.type)} size={20} className="text-text-secondary" />
//                 <div className="text-left">
//                   <div className="text-sm font-medium flex items-center space-x-2">
//                     <span>{device.name}</span>
//                     {device.current && (
//                       <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full">
//                         This device
//                       </span>
//                     )}
//                   </div>
//                   <div className="text-xs text-text-secondary">
//                     {device.type} • Last active {formatDate(device.lastActive)}
//                   </div>
//                 </div>
//               </div>
//               {!device.current && (
//                 <Button
//                   variant="ghost"
//                   onClick={() => handleDeviceLogout(device.id)}
//                   className="text-xs text-error"
//                 >
//                   Remove
//                 </Button>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SecuritySettings;