import React, { useState, useEffect } from 'react';
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  AlertCircle,
  X,
  Phone,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export const AdminLeadership = () => {
  const { authFetch } = useAdminAuth();
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalMode, setModalMode] = useState(null); // 'create' | 'edit'
  const [activeLeader, setActiveLeader] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    companyTitle: 'Alhisan General Trading Company',
    bio: '',
    photoUrl: '',
    phone: '',
    email: '',
    order: 1,
    active: true,
  });

  const fetchLeaders = async () => {
    try {
      setLoading(true);
      const res = await authFetch('/admin/leadership');
      const json = await res.json();
      if (json.success) {
        setLeaders(json.data);
      }
    } catch (err) {
      alert('Error fetching leaders: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaders();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const openCreateModal = () => {
    setFormData({
      name: '',
      role: 'Executive Officer',
      companyTitle: 'Alhisan General Trading Company',
      bio: '',
      photoUrl: '/assets/leadership/naser-almazrouie.jpg',
      phone: '',
      email: '',
      order: leaders.length + 1,
      active: true,
    });
    setModalMode('create');
  };

  const openEditModal = (leader) => {
    setActiveLeader(leader);
    setFormData({
      name: leader.name || '',
      role: leader.role || '',
      companyTitle: leader.companyTitle || 'Alhisan General Trading Company',
      bio: leader.bio || '',
      photoUrl: leader.photoUrl || '',
      phone: leader.phone || '',
      email: leader.email || '',
      order: leader.order ?? 1,
      active: leader.active ?? true,
    });
    setModalMode('edit');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === 'create') {
        const res = await authFetch('/admin/leadership', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.message);
        showToast('Leadership profile created successfully.');
      } else {
        const res = await authFetch(`/admin/leadership/${activeLeader._id}`, {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.message);
        showToast('Leadership profile updated successfully.');
      }

      setModalMode(null);
      fetchLeaders();
    } catch (err) {
      alert('Error saving leader: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await authFetch(`/admin/leadership/${id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setLeaders((prev) => prev.filter((l) => l._id !== id));
      setDeleteConfirmId(null);
      showToast('Leader profile deleted.');
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-navy-900 border border-gold-500/40 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fadeIn">
          <CheckCircle className="w-5 h-5 text-gold-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-6 rounded-2xl shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-navy-900 dark:text-white">
            Executive Leadership Management
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage corporate board members, photos, designations, and biographies.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-sm shadow-gold-glow transition-all duration-200 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Executive Leader</span>
        </button>
      </div>

      {/* Leadership Cards */}
      {loading ? (
        <div className="p-16 text-center">
          <div className="w-8 h-8 border-4 border-gold-500/30 border-t-gold-500 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-400">Loading leadership records from MongoDB Atlas...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leaders.map((leader) => (
            <div
              key={leader._id}
              className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold-500/60 shadow-md shrink-0 bg-navy-950">
                    <img
                      src={leader.photoUrl || '/assets/leadership/naser-almazrouie.jpg'}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/assets/logo.jpg';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-navy-900 dark:text-white">
                      {leader.name}
                    </h3>
                    <p className="text-xs font-semibold text-gold-600 dark:text-gold-400">
                      {leader.role}
                    </p>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {leader.companyTitle || 'Alhisan General Trading Company'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {leader.bio}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-navy-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Priority Order: #{leader.order || 1}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(leader)}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-slate-600 dark:text-slate-200 transition-colors"
                    title="Edit Profile"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(leader._id)}
                    className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                    title="Delete Profile"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Create or Edit Leader */}
      {modalMode && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-navy-800">
              <h3 className="text-lg font-bold text-navy-900 dark:text-white">
                {modalMode === 'create' ? 'Add Executive Leader' : `Edit ${formData.name}`}
              </h3>
              <button
                onClick={() => setModalMode(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Naser Almazrouie"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Designation / Role *
                </label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. Chairman / CEO / General Manager"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Company Title
                </label>
                <input
                  type="text"
                  value={formData.companyTitle}
                  onChange={(e) => setFormData({ ...formData, companyTitle: e.target.value })}
                  placeholder="Alhisan General Trading Company"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Photo Path / URL *
                </label>
                <input
                  type="text"
                  required
                  value={formData.photoUrl}
                  onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                  placeholder="/assets/leadership/naser-almazrouie.jpg"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Executive Biography *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Describe leadership responsibilities, commercial background, and strategic oversight..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="w-4 h-4 text-gold-500 rounded focus:ring-gold-500"
                    />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Active on Website
                    </span>
                  </label>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-navy-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-navy-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold shadow-gold-glow transition-all"
                >
                  {modalMode === 'create' ? 'Save Leader' : 'Update Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-fadeIn">
            <h3 className="text-lg font-bold text-red-500 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>Confirm Leader Removal</span>
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              Are you sure you want to remove this executive leader profile from the corporate website?
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
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
