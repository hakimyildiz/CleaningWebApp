import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, FileText, DollarSign } from 'lucide-react';
import DataTable from '../../components/ui/DataTable';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Invoice } from '../../types/entities';

const InvoicesPage = () => {
  // Mock data
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      serviceRecordId: 'sr-001',
      invoiceNumber: '001-0001-0225',
      customerId: 1,
      pdfPath: '/invoices/001-0001-0225.pdf',
      total: 120.00,
      status: 'Sent',
      sentDate: '2025-02-01T10:00:00',
    },
    {
      id: '2',
      serviceRecordId: 'sr-002',
      invoiceNumber: '002-0002-0225',
      agencyId: 1,
      agencyStaffId: 1,
      pdfPath: '/invoices/002-0002-0225.pdf',
      total: 250.00,
      status: 'Paid',
      sentDate: '2025-02-02T11:00:00',
      paidDate: '2025-02-03T14:30:00',
    },
  ]);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const columns = [
    {
      header: 'Invoice #',
      accessor: 'invoiceNumber',
      sortable: true,
    },
    {
      header: 'Date',
      accessor: (invoice: Invoice) => new Date(invoice.sentDate).toLocaleDateString(),
      sortable: true,
    },
    {
      header: 'Amount',
      accessor: (invoice: Invoice) => `£${invoice.total.toFixed(2)}`,
      sortable: true,
    },
    {
      header: 'Status',
      accessor: (invoice: Invoice) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            invoice.status === 'Paid'
              ? 'bg-success-100 text-success-800'
              : 'bg-warning-100 text-warning-800'
          }`}
        >
          {invoice.status}
        </span>
      ),
    },
    {
      header: 'Payment Date',
      accessor: (invoice: Invoice) => 
        invoice.paidDate 
          ? new Date(invoice.paidDate).toLocaleDateString()
          : '-',
      sortable: true,
    },
  ];

  const handleView = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsViewModalOpen(true);
  };

  const handleDownloadPDF = (invoice: Invoice) => {
    // In a real application, this would trigger a download of the PDF
    console.log('Downloading PDF for invoice:', invoice.invoiceNumber);
  };

  const actions = (invoice: Invoice) => (
    <div className="flex justify-end space-x-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleView(invoice);
        }}
        className="p-1 text-gray-500 hover:text-primary-600 transition-colors"
        title="View Details"
      >
        <Eye size={18} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDownloadPDF(invoice);
        }}
        className="p-1 text-gray-500 hover:text-primary-600 transition-colors"
        title="Download PDF"
      >
        <FileText size={18} />
      </button>
      {invoice.status === 'Sent' && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setInvoices(prevInvoices =>
              prevInvoices.map(inv =>
                inv.id === invoice.id
                  ? {
                      ...inv,
                      status: 'Paid',
                      paidDate: new Date().toISOString(),
                    }
                  : inv
              )
            );
          }}
          className="p-1 text-gray-500 hover:text-success-600 transition-colors"
          title="Mark as Paid"
        >
          <DollarSign size={18} />
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-600 mt-1">Manage and track all invoices</p>
        </div>
        <Button
          icon={<Plus size={16} />}
          onClick={() => {
            // Handle creating new invoice
          }}
        >
          Generate Invoice
        </Button>
      </div>

      <Card>
        <DataTable
          data={invoices}
          columns={columns}
          keyField="id"
          actions={actions}
          onRowClick={handleView}
          searchable
        />
      </Card>

      {/* View Modal */}
      {isViewModalOpen && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Invoice #{selectedInvoice.invoiceNumber}
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Invoice Details</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Invoice Number:</span>
                      <p className="font-medium">{selectedInvoice.invoiceNumber}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Date Issued:</span>
                      <p className="font-medium">
                        {new Date(selectedInvoice.sentDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Status:</span>
                      <p className="font-medium">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            selectedInvoice.status === 'Paid'
                              ? 'bg-success-100 text-success-800'
                              : 'bg-warning-100 text-warning-800'
                          }`}
                        >
                          {selectedInvoice.status}
                        </span>
                      </p>
                    </div>
                    {selectedInvoice.paidDate && (
                      <div>
                        <span className="text-sm text-gray-500">Payment Date:</span>
                        <p className="font-medium">
                          {new Date(selectedInvoice.paidDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Payment Information</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Total Amount:</span>
                      <p className="font-medium">£{selectedInvoice.total.toFixed(2)}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Service Record ID:</span>
                      <p className="font-medium">{selectedInvoice.serviceRecordId}</p>
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
                onClick={() => handleDownloadPDF(selectedInvoice)}
                icon={<FileText size={16} />}
              >
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicesPage;