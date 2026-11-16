import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Leadership } from './pages/Leadership';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { NotFound } from './pages/NotFound';

// Admin Imports
import { AdminLogin } from './admin/pages/AdminLogin';
import { AdminLayout } from './admin/layouts/AdminLayout';
import { AdminProtectedRoute } from './admin/components/AdminProtectedRoute';
import { AdminDashboard } from './admin/pages/AdminDashboard';
import { AdminInquiries } from './admin/pages/AdminInquiries';
import { AdminProducts } from './admin/pages/AdminProducts';
import { AdminLeadership } from './admin/pages/AdminLeadership';
import { AdminSettings } from './admin/pages/AdminSettings';

export const App = () => {
  return (
    <Routes>
      {/* Public Corporate Website */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:slug" element={<ProductDetail />} />
        <Route path="leadership" element={<Leadership />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin Login Route */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Suite Routes */}
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="inquiries" element={<AdminInquiries />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="leadership" element={<AdminLeadership />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
};

export default App;
