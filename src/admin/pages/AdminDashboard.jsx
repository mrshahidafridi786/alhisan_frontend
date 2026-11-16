import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox,
  Package,
  Users,
  Database,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  RefreshCw,
  Phone,
  Mail,
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminDashboard = () => {
  const { authFetch } = useAdminAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const res = await authFetch('/admin/stats');
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      } else {
        throw new Error(json.message);
      }
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return 'bg-amber-500/20 text-amber-500 border-amber-500/30';
      case 'In Progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Contacted':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Closed':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-10 h-10 border-4 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading administrative metrics...</p>
      </div>
    );
  }

  const stats = data?.stats || {
    totalInquiries: 0,
    newInquiries: 0,
    inProgressInquiries: 0,
    closedInquiries: 0,
    totalProducts: 5,
    totalLeaders: 3,
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-6 rounded-2xl shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-navy-900 dark:text-white">
            Executive Control Overview
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time management for client trade inquiries, catalog, leadership, and company configurations.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-200 text-sm font-semibold transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-4 h-4 text-gold-500 ${refreshing ? 'animate-spin' : ''}`} />
          <span>{refreshing ? 'Updating...' : 'Refresh Metrics'}</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-500 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Total Inquiries */}
        <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-5 rounded-2xl shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Inquiries
            </span>
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-500 flex items-center justify-center">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-navy-900 dark:text-white">
              {stats.totalInquiries}
            </span>
            <span className="text-xs text-slate-500">recorded leads</span>
          </div>
          <Link
            to="/admin/inquiries"
            className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-gold-600 dark:text-gold-400 hover:underline"
          >
            <span>Manage All Inquiries</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Metric 2: New Actionable Leads */}
        <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-5 rounded-2xl shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              New Leads
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-navy-900 dark:text-white">
              {stats.newInquiries}
            </span>
            {stats.newInquiries > 0 ? (
              <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                Needs Review
              </span>
            ) : (
              <span className="text-xs text-emerald-500 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> All Answered
              </span>
            )}
          </div>
          <Link
            to="/admin/inquiries?status=New"
            className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-gold-600 dark:text-gold-400 hover:underline"
          >
            <span>Review New Submissions</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Metric 3: Trading Products */}
        <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-5 rounded-2xl shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Product Categories
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-navy-900 dark:text-white">
              {stats.totalProducts}
            </span>
            <span className="text-xs text-slate-500">active portfolios</span>
          </div>
          <Link
            to="/admin/products"
            className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-gold-600 dark:text-gold-400 hover:underline"
          >
            <span>Manage Product Catalog</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Metric 4: Database Infrastructure */}
        <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-5 rounded-2xl shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Cloud Database
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-lg font-bold text-navy-900 dark:text-white">
              MongoDB Atlas
            </span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Cluster0 Connected (Ready)
            </span>
          </div>
        </div>
      </div>

      {/* Quick Action Hub */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/admin/inquiries"
          className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 hover:border-gold-500/50 transition-all shadow-xs flex items-center gap-4 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Inbox className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-navy-900 dark:text-white">Inquiries Desk</h4>
            <p className="text-xs text-slate-500">Filter, reply & export leads</p>
          </div>
        </Link>

        <Link
          to="/admin/products"
          className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 hover:border-gold-500/50 transition-all shadow-xs flex items-center gap-4 group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-navy-900 dark:text-white">Trading Catalog</h4>
            <p className="text-xs text-slate-500">Add or update specifications</p>
          </div>
        </Link>

        <Link
          to="/admin/leadership"
          className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 hover:border-gold-500/50 transition-all shadow-xs flex items-center gap-4 group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-navy-900 dark:text-white">Leadership Team</h4>
            <p className="text-xs text-slate-500">Manage executive profiles</p>
          </div>
        </Link>

        <Link
          to="/admin/settings"
          className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 hover:border-gold-500/50 transition-all shadow-xs flex items-center gap-4 group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-navy-900 dark:text-white">Company Info</h4>
            <p className="text-xs text-slate-500">Phones, WhatsApp & address</p>
          </div>
        </Link>
      </div>

      {/* Recent Inquiries Table */}
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 dark:border-navy-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-navy-900 dark:text-white">
              Recent Trade Inquiries & Formal Quotes
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Latest client submissions captured via website contact form and quote requests.
            </p>
          </div>
          <Link
            to="/admin/inquiries"
            className="text-xs font-bold text-gold-600 dark:text-gold-400 hover:underline"
          >
            View All ({stats.totalInquiries}) →
          </Link>
        </div>

        {data?.recentInquiries?.length === 0 ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400">
            <Inbox className="w-10 h-10 mx-auto mb-2 text-slate-400 opacity-60" />
            <p className="font-medium text-sm">No inquiries recorded yet.</p>
            <p className="text-xs mt-1">Incoming client quote requests will appear here in real-time.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[620px]">
              <thead className="bg-slate-50 dark:bg-navy-950/60 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-navy-800">
                <tr>
                  <th className="px-6 py-3.5">Client / Contact</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Subject</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-navy-800">
                {data?.recentInquiries?.map((inq) => (
                  <tr key={inq._id} className="hover:bg-slate-50/60 dark:hover:bg-navy-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-navy-900 dark:text-white">
                        {inq.fullName}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                        <span>{inq.email}</span>
                        {inq.phone && <span>• {inq.phone}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300">
                        {inq.productInterest || 'General'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                      {inq.subject || 'Trade Inquiry'}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 whitespace-nowrap">
                      {new Date(inq.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(
                          inq.status
                        )}`}
                      >
                        {inq.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
