import React, { useState } from 'react';
import {
  X, Send, CheckCircle2, AlertCircle, Loader2, Shield,
  User, AtSign, Phone, Briefcase, FileText, ChevronDown,
} from 'lucide-react';
import { submitContactInquiry } from '../../utils/api';
import { useLanguage } from '../../context/LanguageContext';

const inputBase =
  'w-full bg-white dark:bg-navy-900 border rounded-xl py-3 text-sm text-content-main dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 ' +
  'focus:outline-none focus:ring-2 focus:ring-navy-700/30 dark:focus:ring-gold-500/30 focus:border-navy-700 dark:focus:border-gold-500 ' +
  'transition-all duration-200';
const inputError = 'border-red-400 bg-red-50/30 dark:bg-red-950/20 focus:ring-red-300/40 focus:border-red-400';
const inputNormal = 'border-slate-200 dark:border-navy-700 hover:border-slate-300 dark:hover:border-navy-600';

const FieldLabel = ({ children, required }) => (
  <label className="block text-[11px] font-bold uppercase tracking-widest text-navy-800/80 dark:text-slate-200 mb-1.5">
    {children}
    {required && <span className="text-gold-500 mx-1">*</span>}
  </label>
);

const FieldError = ({ msg }) =>
  msg ? (
    <p className="flex items-center gap-1 mt-1.5 text-red-500 dark:text-red-400 text-xs font-medium">
      <AlertCircle className="w-3 h-3 shrink-0" />
      {msg}
    </p>
  ) : null;

export const QuoteModal = ({ isOpen, onClose, initialProduct = '' }) => {
  const { t, isRTL } = useLanguage();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    subject: initialProduct ? `Quote Request — ${initialProduct}` : 'Commercial Trade Quote Request',
    productInterest: initialProduct || 'Salt',
    message: '',
    website_hp: '',
  });

  const [loading, setLoading] = useState(false);
  const [successResponse, setSuccessResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = t('quoteModal.nameRequired');
    if (!formData.email.trim() || !formData.email.includes('@'))
      errors.email = t('quoteModal.emailRequired');
    if (!formData.phone.trim()) errors.phone = t('quoteModal.phoneRequired');
    if (!formData.productInterest) errors.productInterest = t('quoteModal.productRequired');
    if (!formData.message.trim() || formData.message.trim().length < 10)
      errors.message = t('quoteModal.messageRequired');
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!validateForm()) return;
    setLoading(true);
    const result = await submitContactInquiry(formData);
    setLoading(false);
    if (result.success) {
      setSuccessResponse(result.message);
    } else {
      setErrorMessage(result.message);
      if (result.errors) setFieldErrors(result.errors);
    }
  };

  const padInput = isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white dark:bg-navy-900 rounded-2xl shadow-2xl max-w-2xl w-full border border-surface-border dark:border-navy-700/80 overflow-hidden">

        {/* ── Modal Header ── */}
        <div className="bg-navy-900 px-7 py-5 flex items-center justify-between border-b border-navy-800">
          <div className="flex items-center gap-3.5">
            <img
              src="/assets/logo.jpg"
              alt="Al Hisan Logo"
              className="w-11 h-11 rounded-full border border-gold-500/60 object-cover shrink-0 shadow-subtle"
            />
            <div>
              <span className="text-gold-400 text-[11px] font-bold uppercase tracking-widest block">
                {t('quoteModal.desk')}
              </span>
              <h3 className="font-heading text-lg font-extrabold text-white mt-0.5">
                {t('quoteModal.title')}
              </h3>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Modal Body ── */}
        <div className="p-5 sm:p-7 max-h-[80vh] overflow-y-auto">
          {successResponse ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-heading text-xl font-bold text-navy-800 dark:text-white">{t('quoteModal.successTitle')}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">{successResponse}</p>
              <button onClick={onClose}
                className="mt-4 px-7 py-2.5 rounded-xl bg-navy-800 dark:bg-navy-700 text-white font-semibold text-sm hover:bg-navy-700 dark:hover:bg-navy-600 transition-colors">
                {t('quoteModal.closeWindow')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Honeypot */}
              <input type="text" name="website_hp" value={formData.website_hp}
                onChange={handleChange} style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

              {/* Server error */}
              {errorMessage && (
                <div className="p-3.5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl text-sm flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Row 1: Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <FieldLabel required>{t('quoteModal.fullName')}</FieldLabel>
                  <div className="relative">
                    <div className={`absolute ${isRTL ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none`}>
                      <User className="w-4 h-4" />
                    </div>
                    <input type="text" name="fullName" required
                      value={formData.fullName} onChange={handleChange}
                      placeholder={t('quoteModal.namePlaceholder')}
                      className={`${inputBase} ${padInput} ${fieldErrors.fullName ? inputError : inputNormal}`}
                    />
                  </div>
                  <FieldError msg={fieldErrors.fullName} />
                </div>

                <div>
                  <FieldLabel required>{t('quoteModal.businessEmail')}</FieldLabel>
                  <div className="relative">
                    <div className={`absolute ${isRTL ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none`}>
                      <AtSign className="w-4 h-4" />
                    </div>
                    <input type="email" name="email" required
                      value={formData.email} onChange={handleChange}
                      placeholder={t('quoteModal.emailPlaceholder')}
                      className={`${inputBase} ${padInput} ${fieldErrors.email ? inputError : inputNormal}`}
                    />
                  </div>
                  <FieldError msg={fieldErrors.email} />
                </div>
              </div>

              {/* Row 2: Phone + Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <FieldLabel required>{t('quoteModal.phone')}</FieldLabel>
                  <div className="relative">
                    <div className={`absolute ${isRTL ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none`}>
                      <Phone className="w-4 h-4" />
                    </div>
                    <input type="tel" name="phone" required
                      value={formData.phone} onChange={handleChange}
                      placeholder={t('quoteModal.phonePlaceholder')}
                      className={`${inputBase} ${padInput} ${fieldErrors.phone ? inputError : inputNormal}`}
                    />
                  </div>
                  <FieldError msg={fieldErrors.phone} />
                </div>

                <div>
                  <FieldLabel>{t('quoteModal.company')}</FieldLabel>
                  <div className="relative">
                    <div className={`absolute ${isRTL ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none`}>
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <input type="text" name="companyName"
                      value={formData.companyName} onChange={handleChange}
                      placeholder={t('quoteModal.companyPlaceholder')}
                      className={`${inputBase} ${padInput} ${inputNormal}`}
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Product + Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <FieldLabel required>{t('quoteModal.productInterest')}</FieldLabel>
                  <div className="relative">
                    <div className={`absolute ${isRTL ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none`}>
                      <FileText className="w-4 h-4" />
                    </div>
                    <select name="productInterest" required
                      value={formData.productInterest} onChange={handleChange}
                      className={`${inputBase} ${padInput} ${isRTL ? 'pl-10' : 'pr-10'} appearance-none cursor-pointer ${inputNormal}`}>
                      <option value="Salt">{t('quoteModal.options.salt')}</option>
                      <option value="Soda Ash">{t('quoteModal.options.sodaAsh')}</option>
                      <option value="Calcium Carbonate">{t('quoteModal.options.calciumCarbonate')}</option>
                      <option value="Food Products">{t('quoteModal.options.food')}</option>
                      <option value="Spices">{t('quoteModal.options.spices')}</option>
                      <option value="Other">{t('quoteModal.options.other')}</option>
                    </select>
                    <div className={`absolute ${isRTL ? 'left-3.5' : 'right-3.5'} top-1/2 -translate-y-1/2 pointer-events-none text-slate-400`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div>
                  <FieldLabel required>{t('quoteModal.subject')}</FieldLabel>
                  <input type="text" name="subject" required
                    value={formData.subject} onChange={handleChange}
                    placeholder={t('quoteModal.subjectPlaceholder')}
                    className={`${inputBase} px-4 ${fieldErrors.subject ? inputError : inputNormal}`}
                  />
                  <FieldError msg={fieldErrors.subject} />
                </div>
              </div>

              {/* Row 4: Message */}
              <div>
                <FieldLabel required>{t('quoteModal.message')}</FieldLabel>
                <textarea name="message" rows="3" required
                  value={formData.message} onChange={handleChange}
                  placeholder={t('quoteModal.messagePlaceholder')}
                  className={`${inputBase} px-4 resize-none ${fieldErrors.message ? inputError : inputNormal}`}
                />
                <FieldError msg={fieldErrors.message} />
              </div>

              {/* Footer Row */}
              <div className="flex items-center justify-between pt-1 gap-4">
                <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5 shrink-0">
                  <Shield className="w-3.5 h-3.5 text-gold-500" />
                  {t('quoteModal.confidential')}
                </span>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-navy-800 dark:hover:text-white transition-colors">
                    {t('quoteModal.cancel')}
                  </button>
                  <button type="submit" disabled={loading}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-navy-800 dark:bg-navy-700 text-white hover:bg-navy-700 dark:hover:bg-navy-600 active:bg-navy-900 border border-gold-500/40 disabled:opacity-50 transition-colors shadow-subtle">
                    {loading ? (
                      <><Loader2 className="w-4 h-4 animate-spin text-gold-400" /><span>{t('quoteModal.sending')}</span></>
                    ) : (
                      <><Send className={`w-4 h-4 text-gold-400 ${isRTL ? 'rotate-180' : ''}`} /><span>{t('quoteModal.send')}</span></>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
