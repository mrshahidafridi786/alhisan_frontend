import React, { useState, useEffect } from 'react';
import {
  Inbox,
  Search,
  Filter,
  Download,
  Trash2,
  Eye,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  AlertCircle,
  CheckCircle,
  X,
  ExternalLink,
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminInquiries = () => {
  const { authFetch } = useAdminAuth();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (categoryFilter !== 'all') params.append('category', categoryFilter);
      if (search.trim()) params.append('search', search.trim());

      const res = await authFetch(`/admin/inquiries?${params.toString()}`);
      const json = await res.json();
      if (json.success) {
        setInquiries(json.data);
      } else {
        throw new Error(json.message);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch inquiries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter, categoryFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchInquiries();
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await authFetch(`/admin/inquiries/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setInquiries((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedInquiry?._id === id) {
          setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
        }
        showToast(`Status updated to ${newStatus}`);
      }
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await authFetch(`/admin/inquiries/${id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (json.success) {
        setInquiries((prev) => prev.filter((item) => item._id !== id));
        setDeleteConfirmId(null);
        if (selectedInquiry?._id === id) setSelectedInquiry(null);
        showToast('Inquiry record deleted successfully.');
      }
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const showToast = (msg) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 3500);
  };

  const exportToCSV = () => {
    if (!inquiries.length) return;
    const headers = ['Full Name', 'Email', 'Phone', 'Company', 'Category', 'Subject', 'Status', 'Date', 'Message'];
    const rows = inquiries.map((i) => [
      `"${i.fullName || ''}"`,
      `"${i.email || ''}"`,
      `"${i.phone || ''}"`,
      `"${i.companyName || ''}"`,
      `"${i.productInterest || ''}"`,
      `"${(i.subject || '').replace(/"/g, '""')}"`,
      `"${i.status || ''}"`,
      `"${new Date(i.createdAt).toISOString()}"`,
      `"${(i.message || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Alhisan_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      case 'Spam':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Toast Notification */}
      {actionMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-navy-900 border border-gold-500/40 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fadeIn">
          <CheckCircle className="w-5 h-5 text-gold-400" />
          <span className="text-sm font-medium">{actionMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-6 rounded-2xl shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-navy-900 dark:text-white">
            Client Inquiries & Formal Quotes
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage, respond to, and track incoming commercial trade inquiries.
          </p>
        </div>

        <button
          onClick={exportToCSV}
          disabled={!inquiries.length}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-sm shadow-gold-glow transition-all duration-200 disabled:opacity-50 self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-4 rounded-2xl shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by client, company, email, phone..."
              className="w-full pl-10 pr-20 py-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-gold-500 transition-colors"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-navy-800 text-white dark:bg-gold-500 dark:text-navy-950 font-semibold text-xs rounded-lg hover:opacity-90 transition-opacity"
            >
              Search
            </button>
          </form>

          {/* Category Filter */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
              Category:
            </span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="py-2 px-3 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:border-gold-500"
            >
              <option value="all">All Categories</option>
              <option value="Salt">Salt</option>
              <option value="Soda Ash">Soda Ash</option>
              <option value="Calcium Carbonate">Calcium Carbonate</option>
              <option value="Food Products">Food Products</option>
              <option value="Spices">Spices</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 dark:border-navy-800">
          {['all', 'New', 'Contacted', 'In Progress', 'Closed', 'Spam'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-navy-900 text-gold-400 dark:bg-gold-500 dark:text-navy-950 shadow-xs'
                  : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-700'
              }`}
            >
              {st === 'all' ? 'All Inquiries' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center">
            <div className="w-8 h-8 border-4 border-gold-500/30 border-t-gold-500 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-slate-400">Loading inquiries from MongoDB Atlas...</p>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="p-16 text-center text-slate-500 dark:text-slate-400">
            <Inbox className="w-12 h-12 mx-auto mb-3 opacity-40 text-gold-500" />
            <h4 className="font-semibold text-base text-navy-900 dark:text-white">No inquiries found</h4>
            <p className="text-xs mt-1 max-w-sm mx-auto">
              No inquiries match your current search/filter criteria.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[720px]">
              <thead className="bg-slate-50 dark:bg-navy-950/60 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-navy-800">
                <tr>
                  <th className="px-6 py-4">Client Details</th>
                  <th className="px-6 py-4">Trading Category</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Received Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-navy-800">
                {inquiries.map((inq) => (
                  <tr
                    key={inq._id}
                    className="hover:bg-slate-50/70 dark:hover:bg-navy-800/40 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-navy-900 dark:text-white">
                        {inq.fullName}
                      </div>
                      {inq.companyName && (
                        <div className="text-xs text-gold-600 dark:text-gold-400 font-medium">
                          {inq.companyName}
                        </div>
                      )}
                      <div className="text-xs text-slate-500 space-y-0.5 mt-1">
                        <div>{inq.email}</div>
                        {inq.phone && <div>{inq.phone}</div>}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300">
                        {inq.productInterest || 'General'}
                      </span>
                    </td>

                    <td className="px-6 py-4 max-w-xs">
                      <div className="font-medium text-navy-900 dark:text-slate-200 truncate">
                        {inq.subject || 'Trade Inquiry'}
                      </div>
                      <div className="text-xs text-slate-400 truncate mt-0.5">
                        {inq.message}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-xs text-slate-500 whitespace-nowrap">
                      {new Date(inq.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq._id, e.target.value)}
                        className={`text-xs font-semibold rounded-lg px-2.5 py-1.5 border focus:outline-none cursor-pointer ${getStatusColor(
                          inq.status
                        )} bg-white dark:bg-navy-900`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                        <option value="Spam">Spam</option>
                      </select>
                    </td>

                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {/* Quick View Button */}
                        <button
                          onClick={() => setSelectedInquiry(inq)}
                          title="View Full Message"
                          className="p-2 rounded-lg bg-slate-100 dark:bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-slate-600 dark:text-slate-300 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Direct WhatsApp Client */}
                        {inq.phone && (
                          <a
                            href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Reply on WhatsApp"
                            className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </a>
                        )}

                        {/* Direct Email Client */}
                        {inq.email && (
                          <a
                            href={`mailto:${inq.email}?subject=Re: Inquiry with Alhisan General Trading Company`}
                            title="Send Email"
                            className="p-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                          </a>
                        )}

                        {/* Delete Button */}
                        <button
                          onClick={() => setDeleteConfirmId(inq._id)}
                          title="Delete Record"
                          className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: View Full Inquiry Details */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-navy-800">
              <div>
                <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                  Inquiry Detail Record
                </h3>
                <span className="text-xs text-slate-500">ID: {selectedInquiry._id}</span>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 space-y-6">
              {/* Client Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800">
                <div>
                  <span className="text-xs uppercase text-slate-400 font-semibold">Client Name</span>
                  <p className="font-bold text-navy-900 dark:text-white">{selectedInquiry.fullName}</p>
                </div>
                <div>
                  <span className="text-xs uppercase text-slate-400 font-semibold">Company Name</span>
                  <p className="font-semibold text-gold-500">{selectedInquiry.companyName || 'Not specified'}</p>
                </div>
                <div>
                  <span className="text-xs uppercase text-slate-400 font-semibold">Email Address</span>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{selectedInquiry.email}</p>
                </div>
                <div>
                  <span className="text-xs uppercase text-slate-400 font-semibold">Phone Number</span>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{selectedInquiry.phone || 'N/A'}</p>
                </div>
              </div>

              {/* Inquiry Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs uppercase text-slate-400 font-semibold">Product Interest</span>
                  <p className="font-semibold text-sm text-navy-900 dark:text-white">
                    {selectedInquiry.productInterest || 'General'}
                  </p>
                </div>
                <div>
                  <span className="text-xs uppercase text-slate-400 font-semibold">Status</span>
                  <div className="mt-1">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(
                        selectedInquiry.status
                      )}`}
                    >
                      {selectedInquiry.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Subject & Message Content */}
              <div>
                <span className="text-xs uppercase text-slate-400 font-semibold">Subject</span>
                <p className="font-bold text-base text-navy-900 dark:text-white mt-1">
                  {selectedInquiry.subject || 'Trade Inquiry'}
                </p>
              </div>

              <div>
                <span className="text-xs uppercase text-slate-400 font-semibold">Inquiry Message</span>
                <div className="mt-2 p-4 rounded-xl bg-slate-100 dark:bg-navy-950 text-slate-800 dark:text-slate-200 text-sm leading-relaxed whitespace-pre-wrap border border-slate-200 dark:border-navy-800">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Audit Footer */}
              <div className="pt-4 border-t border-slate-200 dark:border-navy-800 text-xs text-slate-500 flex flex-wrap gap-4 justify-between">
                <div>
                  <span>Submitted: </span>
                  <span className="text-slate-700 dark:text-slate-300">
                    {new Date(selectedInquiry.createdAt).toLocaleString()}
                  </span>
                </div>
                {selectedInquiry.ipAddress && (
                  <div>
                    <span>Origin IP: </span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">
                      {selectedInquiry.ipAddress}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-navy-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {selectedInquiry.phone && (
                  <a
                    href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Client</span>
                  </a>
                )}
                {selectedInquiry.email && (
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=Alhisan General Trading Inquiry`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-semibold text-xs transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Email</span>
                  </a>
                )}
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-navy-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-navy-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-fadeIn">
            <h3 className="text-lg font-bold text-red-500 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>Confirm Inquiry Deletion</span>
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              Are you sure you want to permanently delete this inquiry record from MongoDB Atlas? This action cannot be undone.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-navy-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
