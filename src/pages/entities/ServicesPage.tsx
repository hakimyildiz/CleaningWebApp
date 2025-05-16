import React from 'react';
import Card from '../../components/ui/Card';
import { DataTable } from '../../components/ui/DataTable';

const ServicesPage = () => {
  const columns = [
    { header: 'Service Name', accessorKey: 'name' },
    { header: 'Description', accessorKey: 'description' },
    { header: 'Duration (hours)', accessorKey: 'duration' },
    { header: 'Price ($)', accessorKey: 'price' },
    { header: 'Status', accessorKey: 'status' }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Services Management</h1>
      <Card>
        <DataTable 
          columns={columns}
          data={[]}
          isLoading={false}
          onEdit={() => {}}
          onDelete={() => {}}
        />
      </Card>
    </div>
  );
};

export default ServicesPage;