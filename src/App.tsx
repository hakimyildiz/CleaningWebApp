import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import CleanerDashboard from './pages/dashboard/CleanerDashboard';
import CustomerDashboard from './pages/dashboard/CustomerDashboard';
import Layout from './components/layout/Layout';

// Entity management pages
import CleanersPage from './pages/entities/CleanersPage';
import CustomersPage from './pages/entities/CustomersPage';
import AgenciesPage from './pages/entities/AgenciesPage';
import ServicesPage from './pages/entities/ServicesPage';
import InvoicesPage from './pages/entities/InvoicesPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#FFF',
              color: '#363636',
              boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              padding: '16px',
            },
            success: {
              iconTheme: {
                primary: '#4CAF50',
                secondary: '#FFF',
              },
            },
            error: {
              iconTheme: {
                primary: '#F44336',
                secondary: '#FFF',
              },
            },
          }}
        />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            {/* Admin Routes */}
            <Route path="admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="cleaners" element={<ProtectedRoute role="admin"><CleanersPage /></ProtectedRoute>} />
            <Route path="customers" element={<ProtectedRoute role="admin"><CustomersPage /></ProtectedRoute>} />
            <Route path="agencies" element={<ProtectedRoute role="admin"><AgenciesPage /></ProtectedRoute>} />
            <Route path="services" element={<ProtectedRoute role="admin"><ServicesPage /></ProtectedRoute>} />
            <Route path="invoices" element={<ProtectedRoute role="admin"><InvoicesPage /></ProtectedRoute>} />
            
            {/* Cleaner Routes */}
            <Route path="cleaner" element={<ProtectedRoute role="cleaner"><CleanerDashboard /></ProtectedRoute>} />
            
            {/* Customer/Agency Routes */}
            <Route path="customer" element={<ProtectedRoute role="customer"><CustomerDashboard /></ProtectedRoute>} />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;