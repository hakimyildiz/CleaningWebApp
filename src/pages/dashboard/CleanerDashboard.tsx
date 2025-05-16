import { useState } from 'react';
import { Calendar, Clock, Check, Clipboard, MapPin } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

const CleanerDashboard = () => {
  // Mock data for a cleaner dashboard
  const [activeJobs, setActiveJobs] = useState([
    {
      id: '1',
      customerName: 'David Wilson',
      address: '123 Maple Street, Apt 12B',
      date: '2025-01-10',
      time: '10:00 - 12:00',
      status: 'scheduled', // scheduled, in-progress, completed
      workingTimeStarted: false,
      bedrooms: 2,
      bathrooms: 1,
      options: [
        { id: '1', name: 'Oven Cleaning', fee: 3, selected: false },
        { id: '2', name: 'Washing Machine', fee: 0, selected: false },
        { id: '3', name: 'Hallway', fee: 0, selected: false },
      ]
    },
    {
      id: '2',
      customerName: 'Tech Solutions Inc.',
      address: '456 Business Ave, Suite 300',
      date: '2025-01-12',
      time: '09:00 - 14:00',
      status: 'scheduled',
      workingTimeStarted: false,
      bedrooms: 0,
      bathrooms: 2,
      options: [
        { id: '1', name: 'Oven Cleaning', fee: 3, selected: false },
        { id: '2', name: 'Washing Machine', fee: 0, selected: false },
        { id: '3', name: 'Hallway', fee: 0, selected: false },
      ]
    },
  ]);

  const events = [
    { 
      title: 'Apartment 12B Cleaning', 
      start: '2025-01-10T10:00:00', 
      end: '2025-01-10T12:00:00',
      backgroundColor: '#1E88E5',
      borderColor: '#1565C0'
    },
    { 
      title: 'Office Suite Cleaning', 
      start: '2025-01-12T09:00:00', 
      end: '2025-01-12T14:00:00',
      backgroundColor: '#1E88E5',
      borderColor: '#1565C0'
    },
    { 
      title: 'Residential Deep Clean', 
      start: '2025-01-14T13:00:00', 
      end: '2025-01-14T17:00:00',
      backgroundColor: '#1E88E5',
      borderColor: '#1565C0'
    },
  ];

  const handleStartWork = (id: string) => {
    setActiveJobs(prev => prev.map(job => 
      job.id === id ? { ...job, status: 'in-progress', workingTimeStarted: true } : job
    ));
  };

  const handleEndWork = (id: string) => {
    setActiveJobs(prev => prev.map(job => 
      job.id === id ? { ...job, status: 'completed', workingTimeStarted: false } : job
    ));
  };

  const handleToggleOption = (jobId: string, optionId: string) => {
    setActiveJobs(prev => prev.map(job => 
      job.id === jobId 
        ? {
            ...job,
            options: job.options.map(opt => 
              opt.id === optionId ? { ...opt, selected: !opt.selected } : opt
            )
          } 
        : job
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Scheduled</span>;
      case 'in-progress':
        return <span className="px-2 py-1 text-xs rounded-full bg-secondary-100 text-secondary-800">In Progress</span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs rounded-full bg-success-100 text-success-800">Completed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Cleaner Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage your cleaning schedule and track your work</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="Upcoming Schedule">
            <div className="h-96">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                events={events}
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
          <Card title="Today's Summary" className="mb-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-primary-100 mr-3">
                  <Calendar size={20} className="text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Schedule</p>
                  <p className="font-medium">{activeJobs.length} cleaning jobs today</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-secondary-100 mr-3">
                  <Clock size={20} className="text-secondary-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Working Hours</p>
                  <p className="font-medium">5 hours scheduled</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-success-50 mr-3">
                  <Check size={20} className="text-success-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completed</p>
                  <p className="font-medium">0 of {activeJobs.length} jobs complete</p>
                </div>
              </div>
            </div>
          </Card>
          
          <Card title="Quick Stats">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-primary-600">24</p>
                <p className="text-xs text-gray-500 mt-1">Jobs This Month</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-secondary-600">45</p>
                <p className="text-xs text-gray-500 mt-1">Hours Worked</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-accent-600">4.9</p>
                <p className="text-xs text-gray-500 mt-1">Rating</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-success-600">100%</p>
                <p className="text-xs text-gray-500 mt-1">On-Time Rate</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <Card title="Active Jobs">
        <div className="space-y-6">
          {activeJobs.map(job => (
            <div key={job.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <div>
                  <h3 className="font-medium text-gray-900">{job.customerName}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin size={16} className="mr-1" />
                    {job.address}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar size={16} className="mr-1" />
                    {job.date} • {job.time}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="text-xs px-2 py-1 bg-primary-50 text-primary-700 rounded-md">
                      {job.bedrooms} Bedrooms
                    </div>
                    <div className="text-xs px-2 py-1 bg-primary-50 text-primary-700 rounded-md">
                      {job.bathrooms} Bathrooms
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  {getStatusBadge(job.status)}
                  
                  {job.status === 'scheduled' && (
                    <Button 
                      size="sm"
                      onClick={() => handleStartWork(job.id)}
                      icon={<Clock size={16} />}
                    >
                      Start Work
                    </Button>
                  )}
                  
                  {job.status === 'in-progress' && (
                    <Button 
                      size="sm"
                      variant="success"
                      onClick={() => handleEndWork(job.id)}
                      icon={<Check size={16} />}
                    >
                      End Work
                    </Button>
                  )}
                </div>
              </div>
              
              {job.status === 'in-progress' && (
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <Clipboard size={16} className="mr-2" />
                    Service Options
                  </h4>
                  <div className="mt-2 space-y-2">
                    {job.options.map(option => (
                      <div key={option.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`option-${job.id}-${option.id}`}
                          checked={option.selected}
                          onChange={() => handleToggleOption(job.id, option.id)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`option-${job.id}-${option.id}`} className="ml-2 block text-sm text-gray-700">
                          {option.name} {option.fee > 0 && `(£${option.fee})`}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CleanerDashboard;