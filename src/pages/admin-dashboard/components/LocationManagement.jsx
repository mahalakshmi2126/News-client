import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LocationManagement = () => {
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [isAddingDistrict, setIsAddingDistrict] = useState(false);
  const [isAddingTaluk, setIsAddingTaluk] = useState(false);
  const [newDistrict, setNewDistrict] = useState({ name: '', state: '' });
  const [newTaluk, setNewTaluk] = useState('');

  const fetchDistricts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/location/districts');
      setDistricts(res.data.districts);      
    } catch (err) {
      console.error('Error fetching districts', err);
    }
  };

  useEffect(() => {
    fetchDistricts();
  }, []);

  const handleAddDistrict = async () => {
    try {
      if (!newDistrict.name || !newDistrict.state) return;
      await axios.post('http://localhost:5000/api/location/add/districts', newDistrict);
      setNewDistrict({ name: '', state: '' });
      setIsAddingDistrict(false);
      fetchDistricts();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add district');
    }
  };

  const handleDeleteDistrict = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/location/add/districts/${id}`);
      if (selectedDistrict?._id === id) setSelectedDistrict(null);
      fetchDistricts();
    } catch (err) {
      alert('Failed to delete district');
    }
  };

  const handleAddTaluk = async (districtId) => {
    try {
      if (!newTaluk.trim()) return;
      await axios.post(`http://localhost:5000/api/location/districts/${districtId}/taluks`, { taluk: newTaluk });
      setNewTaluk('');
      setIsAddingTaluk(false);
      fetchDistricts();
    } catch (err) {
      alert('Failed to add taluk');
    }
  };

  const handleDeleteTaluk = async (districtId, talukName) => {
    try {
      await axios.delete(`http://localhost:5000/api/location/districts/${districtId}/taluks/${talukName}`);
      fetchDistricts();
    } catch (err) {
      alert('Failed to delete taluk');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-text-primary">Location Management</h1>
          <p className="text-text-secondary">Manage districts and taluks for news coverage areas</p>
        </div>
        <Button variant="primary" onClick={() => setIsAddingDistrict(true)}>
          <Icon name="Plus" size={16} className="mr-2" />
          Add District
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Districts List */}
        <div className="bg-white rounded-lg shadow-card">
          <div className="p-4 border-b border-border-light">
            <h2 className="text-lg font-medium text-text-primary">Districts</h2>
          </div>
          <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
            {districts.map((district) => (
              <div
                key={district._id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${selectedDistrict?._id === district._id
                  ? 'border-accent bg-accent/5'
                  : 'border-border-light hover:bg-surface'
                  }`}
                onClick={() => setSelectedDistrict(district)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-text-primary">{district.name}</h3>
                    <p className="text-sm text-text-secondary">{district.state}</p>
                    <p className="text-xs text-text-secondary mt-1">{district.taluks.length} taluks</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteDistrict(district._id);
                    }}
                    className="text-error hover:bg-error/10"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Taluks List */}
        <div className="bg-white rounded-lg shadow-card">
          <div className="p-4 border-b border-border-light flex items-center justify-between">
            <h2 className="text-lg font-medium text-text-primary">
              Taluks {selectedDistrict && `- ${selectedDistrict.name}`}
            </h2>
            {selectedDistrict && (
              <Button variant="ghost" size="sm" onClick={() => setIsAddingTaluk(true)}>
                <Icon name="Plus" size={16} className="mr-1" />
                Add Taluk
              </Button>
            )}
          </div>
          <div className="p-4">
            {!selectedDistrict ? (
              <div className="text-center py-8">
                <Icon name="MapPin" size={48} className="mx-auto text-text-secondary mb-3" />
                <p className="text-text-secondary">Select a district to view taluks</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {selectedDistrict.taluks.map((taluk, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded border border-border-light">
                    <span className="text-text-primary">{taluk}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTaluk(selectedDistrict._id, taluk)}
                      className="text-error hover:bg-error/10 p-1"
                    >
                      <Icon name="X" size={14} />
                    </Button>
                  </div>
                ))}
                {selectedDistrict.taluks.length === 0 && (
                  <p className="text-text-secondary text-center py-4">No taluks added yet</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add District Modal */}
      {isAddingDistrict && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
          <div className="bg-white rounded-lg shadow-modal w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-heading font-semibold text-text-primary mb-4">Add New District</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">District Name</label>
                  <Input
                    placeholder="Enter district name"
                    value={newDistrict.name}
                    onChange={(e) => setNewDistrict((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">State</label>
                  <Input
                    placeholder="Enter state name"
                    value={newDistrict.state}
                    onChange={(e) => setNewDistrict((prev) => ({ ...prev, state: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <Button variant="primary" onClick={handleAddDistrict} className="flex-1">
                  Add District
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddingDistrict(false);
                    setNewDistrict({ name: '', state: '' });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Taluk Modal */}
      {isAddingTaluk && selectedDistrict && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
          <div className="bg-white rounded-lg shadow-modal w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-heading font-semibold text-text-primary mb-4">
                Add Taluk to {selectedDistrict.name}
              </h2>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Taluk Name</label>
                <Input
                  placeholder="Enter taluk name"
                  value={newTaluk}
                  onChange={(e) => setNewTaluk(e.target.value)}
                />
              </div>
              <div className="flex space-x-3 mt-6">
                <Button variant="primary" onClick={() => handleAddTaluk(selectedDistrict._id)} className="flex-1">
                  Add Taluk
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddingTaluk(false);
                    setNewTaluk('');
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationManagement;