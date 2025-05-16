import { useState, useEffect } from 'react';
import { Users, UserCheck, Calendar, FileText, Building2, DollarSign, Clock, Briefcase } from 'lucide-react';
import Card from '../../components/ui/Card';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {
  // Mock data - would come from API
  const [dashboardData, setDashboardData] = useState({
    totalCustomers: 24,
    totalCleaners: 8,
    totalAgencies: 3,
    pendingInvoices: 7,
    totalRevenue: 5280,
    upcomingServices: 12,
    servicesByType: {
      labels: ['Regular', 'Deep Cleaning', 'Move In/Out', 'Office'],
      data: [45, 25, 15, 15],
    },
    revenueByMonth: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [4200, 3800, 5100, 4900, 5280, 0],
    },
    events: [
      { 
        title: 'Apartment 12B Cleaning', 
        start: '2025-01-10T10:00:00', 
        end: '2025-01-10T12:00:00',
        extendedProps: {
          cleaners: ['John Smith', 'Maria Garcia'],
          customer: 'David Wilson',
          status: 'Scheduled'
        } 
      },
      { 
        title: 'Office Suite Cleaning', 
        start: '2025-01-12T09:00:00', 
        end: '2025-01-12T14:00:00',
        extendedProps: {
          cleaners: ['Ana Rodriguez', 'Michael Johnson'],
          customer: 'Tech Solutions Inc.',
          status: 'Scheduled'
        } 
      },
      { 
        title: 'Residential Deep Clean', 
        start: '2025-01-14T13:00:00', 
        end: '2025-01-14T17:00:00',
        extendedProps: {
          cleaners: ['James Brown'],
          customer: 'Sarah Thompson',
          status: 'Scheduled'
        } 
      },
    ]
  });

  // We'd load real data in useEffect
  useEffect(() => {
    // API call would go here
  }, []);

  const StatCard = ({ icon, title, value, trend, trendValue, bgColor }: any) => (
    <Card className="flex-1 min-w-[240px]">
      <div className="flex items-start">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-1 text-2xl font-semibold text-gray-900">{value}</h3>
          {trend && (
            <p className={`text-xs mt-1 ${trendValue > 0 ? 'text-success-500' : 'text-error-500'}`}>
              {trendValue > 0 ? '↑' : '↓'} {Math.abs(trendValue)}% from last month
            </p>
          )}
        </div>
      </div>
    </Card>
  );

  const serviceTypeChartData = {
    labels: dashboardData.servicesByType.labels,
    datasets: [
      {
        data: dashboardData.servicesByType.data,
        backgroundColor: [
          'rgba(30, 136, 229, 0.8)',
          'rgba(38, 166, 154, 0.8)',
          'rgba(255, 179, 0, 0.8)',
          'rgba(156, 39, 176, 0.8)',
        ],
        borderColor: [
          'rgba(30, 136, 229, 1)',
          'rgba(38, 166, 154, 1)',
          'rgba(255, 179, 0, 1)',
          'rgba(156, 39, 176, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const revenueChartData = {
    labels: dashboardData.revenueByMonth.labels,
    datasets: [
      {
        label: 'Monthly Revenue ($)',
        data: dashboardData.revenueByMonth.data,
        backgroundColor: 'rgba(30, 136, 229, 0.6)',
        borderColor: 'rgba(30, 136, 229, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your cleaning service operations</p>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <StatCard 
          icon={<Users size={24} className="text-primary-600" />}
          title="Total Customers"
          value={dashboardData.totalCustomers}
          trend={true}
          trendValue={8}
          bgColor="bg-primary-100"
        />
        
        <StatCard 
          icon={<UserCheck size={24} className="text-secondary-600" />}
          title="Active Cleaners"
          value={dashboardData.totalCleaners}
          trend={true}
          trendValue={5}
          bgColor="bg-secondary-100"
        />
        
        <StatCard 
          icon={<Building2 size={24} className="text-accent-600" />}
          title="Partner Agencies"
          value={dashboardData.totalAgencies}
          bgColor="bg-accent-100"
        />
        
        <StatCard 
          icon={<DollarSign size={24} className="text-success-600" />}
          title="Monthly Revenue"
          value={`$${dashboardData.totalRevenue}`}
          trend={true}
          trendValue={12}
          bgColor="bg-success-50"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Upcoming Cleaning Schedule">
          <div className="h-96">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              events={dashboardData.events}
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
        
        <div className="grid grid-cols-1 gap-6">
          <Card title="Services by Type">
            <div className="h-64 flex justify-center">
              <Doughnut 
                data={serviceTypeChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                    }
                  }
                }} 
              />
            </div>
          </Card>
          
          <Card title="Revenue Trend">
            <div className="h-64">
              <Bar 
                data={revenueChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: function(value) {
                          return '$' + value;
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="flex flex-col items-center justify-center py-6">
          <div className="p-3 rounded-full bg-primary-100 mb-2">
            <Calendar size={24} className="text-primary-600" />
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900">{dashboardData.upcomingServices}</h3>
            <p className="text-sm text-gray-600 mt-1">Upcoming Services</p>
          </div>
        </Card>
        
        <Card className="flex flex-col items-center justify-center py-6">
          <div className="p-3 rounded-full bg-error-50 mb-2">
            <FileText size={24} className="text-error-600" />
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900">{dashboardData.pendingInvoices}</h3>
            <p className="text-sm text-gray-600 mt-1">Pending Invoices</p>
          </div>
        </Card>
        
        <Card className="flex flex-col items-center justify-center py-6">
          <div className="p-3 rounded-full bg-secondary-100 mb-2">
            <Clock size={24} className="text-secondary-600" />
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900">127</h3>
            <p className="text-sm text-gray-600 mt-1">Hours Cleaned</p>
          </div>
        </Card>
        
        <Card className="flex flex-col items-center justify-center py-6">
          <div className="p-3 rounded-full bg-accent-100 mb-2">
            <Briefcase size={24} className="text-accent-600" />
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900">94%</h3>
            <p className="text-sm text-gray-600 mt-1">Satisfaction Rate</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;