import { NavLink } from 'react-router-dom';
import { 
  Home, Users, UserCheck, Building2, Calendar, FileText, Settings, 
  ClipboardList, DollarSign, ArrowRightCircle 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { user } = useAuth();

  const roleBasedLinks = () => {
    switch (user?.role) {
      case 'admin':
        return (
          <>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm transition-colors ${
                  isActive 
                    ? 'text-primary-700 bg-primary-50 font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <Home size={18} className="mr-3" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/cleaners"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm transition-colors ${
                  isActive 
                    ? 'text-primary-700 bg-primary-50 font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <UserCheck size={18} className="mr-3" />
              <span>Cleaners</span>
            </NavLink>
            <NavLink
              to="/customers"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm transition-colors ${
                  isActive 
                    ? 'text-primary-700 bg-primary-50 font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <Users size={18} className="mr-3" />
              <span>Customers</span>
            </NavLink>
            <NavLink
              to="/agencies"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm transition-colors ${
                  isActive 
                    ? 'text-primary-700 bg-primary-50 font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <Building2 size={18} className="mr-3" />
              <span>Agencies</span>
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm transition-colors ${
                  isActive 
                    ? 'text-primary-700 bg-primary-50 font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <ClipboardList size={18} className="mr-3" />
              <span>Services</span>
            </NavLink>
            <NavLink
              to="/invoices"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm transition-colors ${
                  isActive 
                    ? 'text-primary-700 bg-primary-50 font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <FileText size={18} className="mr-3" />
              <span>Invoices</span>
            </NavLink>
          </>
        );
      case 'cleaner':
        return (
          <>
            <NavLink
              to="/cleaner"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm transition-colors ${
                  isActive 
                    ? 'text-primary-700 bg-primary-50 font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <Home size={18} className="mr-3" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/cleaner/schedule"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm transition-colors ${
                  isActive 
                    ? 'text-primary-700 bg-primary-50 font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <Calendar size={18} className="mr-3" />
              <span>My Schedule</span>
            </NavLink>
            <NavLink
              to="/cleaner/services"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm transition-colors ${
                  isActive 
                    ? 'text-primary-700 bg-primary-50 font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <ClipboardList size={18} className="mr-3" />
              <span>My Services</span>
            </NavLink>
          </>
        );
      case 'customer':
      case 'agency':
        return (
          <>
            <NavLink
              to="/customer"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm transition-colors ${
                  isActive 
                    ? 'text-primary-700 bg-primary-50 font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <Home size={18} className="mr-3" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/customer/services"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm transition-colors ${
                  isActive 
                    ? 'text-primary-700 bg-primary-50 font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <ClipboardList size={18} className="mr-3" />
              <span>My Services</span>
            </NavLink>
            <NavLink
              to="/customer/invoices"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm transition-colors ${
                  isActive 
                    ? 'text-primary-700 bg-primary-50 font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <DollarSign size={18} className="mr-3" />
              <span>Invoices</span>
            </NavLink>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <aside 
      className={`fixed left-0 top-16 bottom-0 bg-white border-r border-gray-200 w-64 z-20 transition-transform duration-300 ease-in-out transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className="flex flex-col h-full overflow-y-auto">
        <div className="flex-1 py-6 space-y-1">
          {roleBasedLinks()}
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm transition-colors ${
                isActive 
                  ? 'text-primary-700 bg-primary-50 font-medium' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            <Settings size={18} className="mr-3" />
            <span>Settings</span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;