// import React, { useState } from 'react';
// import Icon from '../../../components/AppIcon';
// import Button from '../../../components/ui/Button';
// import Input from '../../../components/ui/Input';

// const FolderSidebar = ({
//   folders,
//   selectedFolder,
//   onFolderSelect,
//   onCreateFolder,
//   onDeleteFolder,
//   onRenameFolder,
// }) => {
//   const [isCreating, setIsCreating] = useState(false);
//   const [newFolderName, setNewFolderName] = useState('');
//   const [editingFolder, setEditingFolder] = useState(null);
//   const [editName, setEditName] = useState('');

//   const handleCreateFolder = () => {
//     if (newFolderName.trim()) {
//       onCreateFolder(newFolderName.trim());
//       setNewFolderName('');
//       setIsCreating(false);
//     }
//   };

//   const handleRenameFolder = (folderId) => {
//     if (editName.trim()) {
//       onRenameFolder(folderId, editName.trim());
//       setEditingFolder(null);
//       setEditName('');
//     }
//   };

//   const startEditing = (folder) => {
//     setEditingFolder(folder.id);
//     setEditName(folder.name);
//   };

//   const cancelEditing = () => {
//     setEditingFolder(null);
//     setEditName('');
//   };

//   return (
//     <div className="w-full h-full bg-surface border-r border-border">
//       <div className="p-4 border-b border-border">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg font-heading font-semibold text-text-primary">Folders</h2>
//           <Button
//             variant="ghost"
//             onClick={() => setIsCreating(true)}
//             className="p-2"
//             title="Create new folder"
//           >
//             <Icon name="Plus" size={16} />
//           </Button>
//         </div>

//         {isCreating && (
//           <div className="space-y-2">
//             <Input
//               type="text"
//               placeholder="Folder name"
//               value={newFolderName}
//               onChange={(e) => setNewFolderName(e.target.value)}
//               className="text-sm"
//               onKeyPress={(e) => {
//                 if (e.key === 'Enter') {
//                   handleCreateFolder();
//                 }
//               }}
//               autoFocus
//             />
//             <div className="flex space-x-2">
//               <Button
//                 variant="primary"
//                 onClick={handleCreateFolder}
//                 className="text-xs px-3 py-1"
//                 disabled={!newFolderName.trim()}
//               >
//                 Create
//               </Button>
//               <Button
//                 variant="ghost"
//                 onClick={() => {
//                   setIsCreating(false);
//                   setNewFolderName('');
//                 }}
//                 className="text-xs px-3 py-1"
//               >
//                 Cancel
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="p-2 space-y-1 overflow-y-auto">
//         <button
//           onClick={() => onFolderSelect('all')}
//           className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors duration-150 ${
//             selectedFolder === 'all' ? 'bg-accent text-accent-foreground' : 'text-text-primary hover:bg-background'
//           }`}
//         >
//           <div className="flex items-center space-x-3">
//             <Icon name="Bookmark" size={18} />
//             <span className="font-medium">All Bookmarks</span>
//           </div>
//           <span className="text-sm opacity-75">{folders.reduce((total, f) => total + (f.count || 0), 0)}</span>
//         </button>

//         {folders.map((folder) => (
//           <div key={folder.id} className="group">
//             {editingFolder === folder.id ? (
//               <div className="p-2 space-y-2">
//                 <Input
//                   type="text"
//                   value={editName}
//                   onChange={(e) => setEditName(e.target.value)}
//                   className="text-sm"
//                   onKeyPress={(e) => {
//                     if (e.key === 'Enter') {
//                       handleRenameFolder(folder.id);
//                     } else if (e.key === 'Escape') {
//                       cancelEditing();
//                     }
//                   }}
//                   autoFocus
//                 />
//                 <div className="flex space-x-2">
//                   <Button
//                     variant="primary"
//                     onClick={() => handleRenameFolder(folder.id)}
//                     className="text-xs px-3 py-1"
//                     disabled={!editName.trim()}
//                   >
//                     Save
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     onClick={cancelEditing}
//                     className="text-xs px-3 py-1"
//                   >
//                     Cancel
//                   </Button>
//                 </div>
//               </div>
//             ) : (
//               <button
//                 onClick={() => onFolderSelect(folder.id)}
//                 className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors duration-150 ${
//                   selectedFolder === folder.id ? 'bg-accent text-accent-foreground' : 'text-text-primary hover:bg-background'
//                 }`}
//               >
//                 <div className="flex items-center space-x-3">
//                   <Icon name="Folder" size={18} />
//                   <span className="font-medium">{folder.name}</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span className="text-sm opacity-75">{folder.count || 0}</span>
//                   <div className="opacity-0 group-hover:opacity-100 flex space-x-1">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         startEditing(folder);
//                       }}
//                       className="p-1 hover:bg-background/50 rounded"
//                       title="Rename folder"
//                     >
//                       <Icon name="Edit2" size={12} />
//                     </button>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         onDeleteFolder(folder.id);
//                       }}
//                       className="p-1 hover:bg-error/20 text-error rounded"
//                       title="Delete folder"
//                     >
//                       <Icon name="Trash2" size={12} />
//                     </button>
//                   </div>
//                 </div>
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FolderSidebar;