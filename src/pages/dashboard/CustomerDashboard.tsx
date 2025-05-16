import { FileText, Home, Calendar, DollarSign, Clock, Star } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const CustomerDashboard = () => {
  // Mock data for a customer dashboard
  const customerData = {
    name: 'David Wilson',
    address: '123 Maple Street, Apt 12B',
    upcomingServiceCount: 3,
    pendingInvoiceCount: 1,
    totalSpent: 850,
    invoices: [
      {
        id: 'INV-001',
        date: '2025-01-02',
        amount: 120,
        status: 'paid'
      },
      {
        id: 'INV-002',
        date: '2025-01-15',
        amount: 150,
        status: 'pending'
      }
    ],
    scheduledServices: [
      { 
        title: 'Regular Cleaning', 
        start: '2025-01-10T10:00:00', 
        end: '2025-01-10T12:00:00',
        backgroundColor: '#1E88E5',
        borderColor: '#1565C0'
      },
      { 
        title: 'Deep Cleaning', 
        start: '2025-01-24T09:00:00', 
        end: '2025-01-24T13:00:00',
        backgroundColor: '#1E88E5',
        borderColor: '#1565C0'
      },
      { 
        title: 'Regular Cleaning', 
        start: '2025-02-07T10:00:00', 
        end: '2025-02-07T12:00:00',
        backgroundColor: '#1E88E5',
        borderColor: '#1565C0'
      },
    ],
    serviceHistory: [
      {
        id: '1',
        date: '2024-12-20',
        type: 'Regular Cleaning',
        cleaners: ['John Smith'],
        rating: 5,
        notes: 'Excellent work as always!'
      },
      {
        id: '2',
        date: '2024-12-06',
        type: 'Regular Cleaning',
        cleaners: ['Maria Garcia'],
        rating: 4,
        notes: 'Good job, but missed dusting the top shelves.'
      },
      {
        id: '3',
        date: '2024-11-22',
        type: 'Deep Cleaning',
        cleaners: ['John Smith', 'Ana Rodriguez'],
        rating: 5,
        notes: 'The place looks amazing. Very thorough cleaning.'
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {customerData.name}</h1>
        <p className="text-gray-600 mt-1">Manage your cleaning services and invoices</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="flex flex-col items-center justify-center py-6">
          <div className="p-3 rounded-full bg-primary-100 mb-2">
            <Calendar size={24} className="text-primary-600" />
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900">{customerData.upcomingServiceCount}</h3>
            <p className="text-sm text-gray-600 mt-1">Upcoming Services</p>
          </div>
        </Card>
        
        <Card className="flex flex-col items-center justify-center py-6">
          <div className="p-3 rounded-full bg-accent-100 mb-2">
            <FileText size={24} className="text-accent-600" />
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900">{customerData.pendingInvoiceCount}</h3>
            <p className="text-sm text-gray-600 mt-1">Pending Invoices</p>
          </div>
        </Card>
        
        <Card className="flex flex-col items-center justify-center py-6">
          <div className="p-3 rounded-full bg-secondary-100 mb-2">
            <DollarSign size={24} className="text-secondary-600" />
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900">${customerData.totalSpent}</h3>
            <p className="text-sm text-gray-600 mt-1">Total Spent</p>
          </div>
        </Card>
        
        <Card className="flex flex-col items-center justify-center py-6">
          <div className="p-3 rounded-full bg-success-50 mb-2">
            <Star size={24} className="text-success-600" />
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900">4.7</h3>
            <p className="text-sm text-gray-600 mt-1">Average Rating</p>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="Upcoming Service Schedule">
            <div className="h-96">
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,listMonth'
                }}
                events={customerData.scheduledServices}
                height="100%"
                eventTimeFormat={{
                  hour: '2-digit',
                  minute: '2-digit',
                  meridiem: false,
                  hour12: false
                }}
              />
            </div>
          </Card>
        </div>
        
        <div>
          <Card 
            title="Recent Invoices" 
            titleAction={<Button size="sm" variant="outline">View All</Button>}
            className="mb-6"
          >
            <div className="space-y-4">
              {customerData.invoices.map(invoice => (
                <div key={invoice.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{invoice.id}</p>
                    <p className="text-sm text-gray-500">{invoice.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${invoice.amount}</p>
                    <p className={`text-xs ${invoice.status === 'paid' ? 'text-success-600' : 'text-warning-600'}`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                Pay Now
              </Button>
            </div>
          </Card>
          
          <Card 
            title="Service Information" 
            titleAction={<Button size="sm" variant="outline">Request Service</Button>}
          >
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-full bg-gray-100">
                  <Home size={18} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Service Address</p>
                  <p className="text-sm text-gray-600">{customerData.address}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-full bg-gray-100">
                  <Clock size={18} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Next Service</p>
                  <p className="text-sm text-gray-600">January 10, 2025 • 10:00 - 12:00</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-full bg-gray-100">
                  <Star size={18} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Preferred Cleaner</p>
                  <p className="text-sm text-gray-600">John Smith</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <Card 
        title="Service History" 
        titleAction={<Button size="sm" variant="outline">View All</Button>}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cleaner(s)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customerData.serviceHistory.map((service) => (
                <tr key={service.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {service.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {service.cleaners.join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          size={16}
                          className={index < service.rating ? 'text-accent-500 fill-accent-500' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {service.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default CustomerDashboard;