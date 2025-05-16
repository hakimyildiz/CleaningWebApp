import React from 'react';
import Card from '../../components/ui/Card';
import { DataTable } from '../../components/ui/DataTable';

const AgenciesPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Agencies Management</h1>
      <Card>
        <DataTable 
          columns={[
            { header: 'Agency Name', accessorKey: 'name' },
            { header: 'Contact Person', accessorKey: 'contactPerson' },
            { header: 'Email', accessorKey: 'email' },
            { header: 'Phone', accessorKey: 'phone' },
            { header: 'Status', accessorKey: 'status' }
          ]}
          data={[]}
        />
      </Card>
    </div>
  );
};

export default AgenciesPage;