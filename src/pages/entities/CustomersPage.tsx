import React from 'react';
import Card from '../../components/ui/Card';
import { DataTable } from '../../components/ui/DataTable';

const CustomersPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Customers</h1>
      <Card>
        <DataTable
          columns={[
            { header: 'Name', accessorKey: 'name' },
            { header: 'Email', accessorKey: 'email' },
            { header: 'Phone', accessorKey: 'phone' },
            { header: 'Address', accessorKey: 'address' },
            { header: 'Status', accessorKey: 'status' }
          ]}
          data={[]}
        />
      </Card>
    </div>
  );
};

export default CustomersPage;