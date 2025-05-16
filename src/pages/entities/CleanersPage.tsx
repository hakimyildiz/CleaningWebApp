import { useState } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import DataTable from '../../components/ui/DataTable';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Cleaner } from '../../types/entities';

const CleanersPage = () => {
  // Mock data
  const [cleaners, setCleaners] = useState<Cleaner[]>([
    {
      id: 1,
      title: 'Mr',
      firstName: 'John',
      sureName: 'Smith',
      email: 'john.smith@example.com',
      mobilePhone: '07123456789',
      addressLine: '123 Baker Street',
      city: 'London',
      postCode: 'W1U 6TY',
      isActive: true,
      rate: 15.50,
      registerDate: '2023-05-14',
      gender: 'Male'
    },
    {
      id: 2,
      title: 'Ms',
      firstName: 'Maria',
      sureName: 'Garcia',
      email: 'maria.garcia@example.com',
      mobilePhone: '07987654321',
      addressLine: '45 High Street',
      city: 'Manchester',
      postCode: 'M1 1AE',
      isActive: true,
      rate: 16.00,
      registerDate: '2023-06-22',
      gender: 'Female'
    },
    {
      id: 3,
      title: 'Mrs',
      firstName: 'Ana',
      sureName: 'Rodriguez',
      email: 'ana.rodriguez@example.com',
      mobilePhone: '07555123456',
      addressLine: '78 Park Lane',
      city: 'Birmingham',
      postCode: 'B1 1AA',
      isActive: false,
      rate: 15.00,
      registerDate: '2023-03-10',
      gender: 'Female'
    },
    {
      id: 4,
      title: 'Mr',
      firstName: 'Michael',
      sureName: 'Johnson',
      email: 'michael.johnson@example.com',
      mobilePhone: '07444987654',
      addressLine: '15 Queen Street',
      city: 'Edinburgh',
      postCode: 'EH2 1JX',
      isActive: true,
      rate: 16.50,
      registerDate: '2023-08-05',
      gender: 'Male'
    },
  ]);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCleaner, setSelectedCleaner] = useState<Cleaner | null>(null);

  const columns = [
    {
      header: 'ID',
      accessor: 'id',
      sortable: true,
      className: 'w-16'
    },
    {
      header: 'Name',
      accessor: (cleaner: Cleaner) => (
        <div>
          <div className="font-medium text-gray-900">
            {cleaner.title} {cleaner.firstName} {cleaner.sureName}
          </div>
          <div className="text-gray-500">{cleaner.email}</div>
        </div>
      ),
    },
    {
      header: 'Contact',
      accessor: 'mobilePhone',
      sortable: true,
    },
    {
      header: 'Location',
      accessor: (cleaner: Cleaner) => (
        <div>
          <div>{cleaner.city}</div>
          <div className="text-gray-500">{cleaner.postCode}</div>
        </div>
      ),
    },
    {
      header: 'Rate',
      accessor: (cleaner: Cleaner) => `£${cleaner.rate.toFixed(2)}`,
      sortable: true,
    },
    {
      header: 'Status',
      accessor: (cleaner: Cleaner) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            cleaner.isActive
              ? 'bg-success-100 text-success-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {cleaner.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ];

  const handleView = (cleaner: Cleaner) => {
    setSelectedCleaner(cleaner);
    setIsViewModalOpen(true);
  };

  const handleEdit = (cleaner: Cleaner) => {
    setSelectedCleaner(cleaner);
    setIsEditModalOpen(true);
  };

  const handleDelete = (cleaner: Cleaner) => {
    setSelectedCleaner(cleaner);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedCleaner) {
      setCleaners(cleaners.filter(c => c.id !== selectedCleaner.id));
      setIsDeleteModalOpen(false);
      setSelectedCleaner(null);
    }
  };

  const actions = (cleaner: Cleaner) => (
    <div className="flex justify-end space-x-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleView(cleaner);
        }}
        className="p-1 text-gray-500 hover:text-primary-600 transition-colors"
      >
        <Eye size={18} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleEdit(cleaner);
        }}
        className="p-1 text-gray-500 hover:text-primary-600 transition-colors"
      >
        <Edit size={18} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(cleaner);
        }}
        className="p-1 text-gray-500 hover:text-error-600 transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cleaners</h1>
          <p className="text-gray-600 mt-1">Manage your cleaning staff</p>
        </div>
        <Button
          icon={<Plus size={16} />}
          onClick={() => {
            setSelectedCleaner(null);
            setIsEditModalOpen(true);
          }}
        >
          Add Cleaner
        </Button>
      </div>

      <Card>
        <DataTable
          data={cleaners}
          columns={columns}
          keyField="id"
          actions={actions}
          onRowClick={handleView}
        />
      </Card>

      {/* View Modal */}
      {isViewModalOpen && selectedCleaner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {selectedCleaner.title} {selectedCleaner.firstName} {selectedCleaner.sureName}
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Personal Information</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Full Name:</span>
                      <p className="font-medium">
                        {selectedCleaner.title} {selectedCleaner.firstName} {selectedCleaner.sureName}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Gender:</span>
                      <p className="font-medium">{selectedCleaner.gender}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Registered:</span>
                      <p className="font-medium">{selectedCleaner.registerDate}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Status:</span>
                      <p className="font-medium">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            selectedCleaner.isActive
                              ? 'bg-success-100 text-success-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {selectedCleaner.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Email:</span>
                      <p className="font-medium">{selectedCleaner.email}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Mobile:</span>
                      <p className="font-medium">{selectedCleaner.mobilePhone}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Address:</span>
                      <p className="font-medium">
                        {selectedCleaner.addressLine}, {selectedCleaner.city}, {selectedCleaner.postCode}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Payment Information</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Hourly Rate:</span>
                      <p className="font-medium">£{selectedCleaner.rate.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsViewModalOpen(false)}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setIsEditModalOpen(true);
                }}
                icon={<Edit size={16} />}
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {selectedCleaner ? 'Edit Cleaner' : 'Add New Cleaner'}
              </h3>
            </div>
            <div className="p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <select 
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      defaultValue={selectedCleaner?.title || ''}
                    >
                      <option value="">Select</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                      <option value="Dr">Dr</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input 
                      type="text" 
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      defaultValue={selectedCleaner?.firstName || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Surname</label>
                    <input 
                      type="text" 
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      defaultValue={selectedCleaner?.sureName || ''}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      defaultValue={selectedCleaner?.email || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Phone</label>
                    <input 
                      type="tel" 
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      defaultValue={selectedCleaner?.mobilePhone || ''}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input 
                      type="text" 
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      defaultValue={selectedCleaner?.addressLine || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input 
                      type="text" 
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      defaultValue={selectedCleaner?.city || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Post Code</label>
                    <input 
                      type="text" 
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      defaultValue={selectedCleaner?.postCode || ''}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select 
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      defaultValue={selectedCleaner?.gender || ''}
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate (£)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      defaultValue={selectedCleaner?.rate || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <div className="mt-2">
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                          defaultChecked={selectedCleaner?.isActive} 
                        />
                        <span className="ml-2 text-sm text-gray-700">Active</span>
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Add logic to save the cleaner data
                  setIsEditModalOpen(false);
                }}
              >
                {selectedCleaner ? 'Save Changes' : 'Add Cleaner'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedCleaner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Cleaner</h3>
              <p className="text-gray-600">
                Are you sure you want to delete {selectedCleaner.firstName} {selectedCleaner.sureName}? This action cannot be undone.
              </p>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={confirmDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CleanersPage;