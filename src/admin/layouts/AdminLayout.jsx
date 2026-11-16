import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Inbox,
  Package,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { ThemeToggle } from '../../components/common/ThemeToggle';

export const AdminLayout = () => {
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
    { name: 'Inquiries & Quotes', path: '/admin/inquiries', icon: Inbox },
    { name: 'Products Portfolio', path: '/admin/products', icon: Package },
    { name: 'Executive Leadership', path: '/admin/leadership', icon: Users },
    { name: 'Site Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-800 dark:text-slate-100 flex flex-col lg:flex-row transition-colors duration-200">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-navy-900 border-r border-navy-800 text-white shrink-0 shadow-xl">
        {/* Brand Header */}
        <div className="p-6 border-b border-navy-800 flex items-center gap-3">
          <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-gold-500/60 shadow-gold-glow shrink-0 bg-black">
            <img
              src="/assets/logo.jpg"
              alt="Alhisan Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-bold text-base tracking-wider text-white">ALHISAN</h2>
            <div className="flex items-center gap-1.5 text-xs text-gold-400 font-semibold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ADMIN PORTAL</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gold-500 text-navy-950 font-bold shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-navy-800/80'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-navy-950' : 'text-gold-400'}`} />
                      <span>{item.name}</span>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4 text-navy-950" />}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Actions & User Profile */}
        <div className="p-4 border-t border-navy-800 bg-navy-900/60 space-y-3">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-navy-800/60 hover:bg-navy-800 border border-navy-700/60 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-gold-400" />
              <span>Live Website</span>
            </span>
            <span className="text-[10px] bg-gold-500/20 text-gold-400 px-1.5 py-0.5 rounded">Tab ↗</span>
          </Link>

          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white truncate max-w-[140px]">
                {user?.name || 'Administrator'}
              </span>
              <span className="text-[11px] text-slate-400 truncate max-w-[140px]">
                {user?.email || 'marwanafridi098@gmail.com'}
              </span>
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-navy-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden bg-navy-900 text-white border-b border-navy-800 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-gold-500/60 shrink-0 bg-black">
            <img src="/assets/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-bold text-sm tracking-wide text-white block leading-tight">Alhisan Admin</span>
            <span className="text-[10px] text-gold-400 font-semibold uppercase tracking-wider">Management Portal</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-navy-800 text-slate-200 hover:text-white focus:outline-none"
            aria-label="Toggle Admin Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-gold-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer & Backdrop */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="lg:hidden fixed top-[57px] left-0 right-0 bg-navy-900 border-b border-navy-800 px-4 py-4 space-y-2 animate-fadeIn z-40 shadow-2xl max-h-[calc(100vh-57px)] overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-gold-500 text-navy-950 font-bold shadow-xs'
                        : 'text-slate-200 hover:bg-navy-800'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-navy-950' : 'text-gold-400'}`} />
                        <span>{item.name}</span>
                      </div>
                      {isActive && <ChevronRight className="w-4 h-4 text-navy-950" />}
                    </>
                  )}
                </NavLink>
              );
            })}

            <div className="pt-4 mt-2 border-t border-navy-800 flex items-center justify-between">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-xs font-semibold text-gold-400 hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View Live Website</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/15 text-red-400 text-xs font-semibold hover:bg-red-500 hover:text-white transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Desktop Bar */}
        <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-white dark:bg-navy-900 border-b border-slate-200 dark:border-navy-800 sticky top-0 z-30 shadow-xs">
          <div>
            <h1 className="text-lg font-bold text-navy-900 dark:text-white">
              Alhisan General Trading Company
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Corporate Administrative Management Suite • Abu Dhabi, UAE
            </p>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle showLabel={true} />
            <div className="h-6 w-px bg-slate-200 dark:bg-navy-700" />
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                MongoDB Live
              </span>
            </div>
          </div>
        </header>

        {/* Page View Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
