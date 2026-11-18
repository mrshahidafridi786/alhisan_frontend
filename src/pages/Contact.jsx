import React, { useState } from 'react';
import {
  Phone,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building2,
  ShieldCheck,
  Mail,
  User,
  AtSign,
  Briefcase,
  FileText,
  ChevronDown,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { siteConfig } from '../data/siteConfig';
import { submitContactInquiry } from '../utils/api';
import { useLanguage } from '../context/LanguageContext';

const inputBase =
  'w-full bg-white dark:bg-navy-900 border rounded-xl py-3.5 text-sm text-content-main dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 ' +
  'focus:outline-none focus:ring-2 focus:ring-navy-700/30 dark:focus:ring-gold-500/30 focus:border-navy-700 dark:focus:border-gold-500 ' +
  'transition-all duration-200';

const inputError =
  'border-red-400 bg-red-50/30 dark:bg-red-950/20 focus:ring-red-400/30 focus:border-red-400';

const inputNormal = 'border-slate-200 dark:border-navy-700 hover:border-slate-300 dark:hover:border-navy-600';

const FieldLabel = ({ children, required }) => (
  <label className="block text-[11px] font-bold uppercase tracking-widest text-navy-800/80 dark:text-slate-200 mb-1.5">
    {children}
    {required && <span className="text-gold-500 mx-1">*</span>}
  </label>
);

const FieldError = ({ msg }) =>
  msg ? (
    <p className="flex items-center gap-1.5 mt-1.5 text-red-500 dark:text-red-400 text-xs font-medium">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      {msg}
    </p>
  ) : null;

export const Contact = () => {
  const { t, isRTL } = useLanguage();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    subject: '',
    productInterest: 'Salt',
    message: '',
    website_hp: '',
  });

  const [loading, setLoading] = useState(false);
  const [successResponse, setSuccessResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(siteConfig.contact.email.raw);
    }
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2)
      errors.fullName = t('quoteModal.nameRequired');
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      errors.email = t('quoteModal.emailRequired');
    if (!formData.phone.trim() || formData.phone.replace(/[\s\-\(\)\.]/g, '').length < 7)
      errors.phone = t('quoteModal.phoneRequired');
    if (!formData.subject.trim())
      errors.subject = t('quoteModal.productRequired');
    if (!formData.productInterest)
      errors.productInterest = t('quoteModal.productRequired');
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
      setFormData({
        fullName: '', email: '', phone: '', companyName: '',
        subject: '', productInterest: 'Salt', message: '', website_hp: '',
      });
    } else {
      setErrorMessage(result.message);
      if (result.errors) setFieldErrors(result.errors);
    }
  };

  const padInput = isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4';

  return (
    <div className="bg-surface-warm dark:bg-[#071524] transition-colors duration-300">
      <SEO
        title="Contact Alhisan | Trading Desk & Commercial Inquiries — Abu Dhabi"
        description="Contact Alhisan General Trading Company in Abu Dhabi, UAE. Inquire regarding Salt, Soda Ash, Calcium Carbonate, Food Products, and Spices supply."
        canonical="/contact"
      />

      {/* Page Header */}
      <section className="relative py-20 lg:py-24 bg-navy-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80"
            alt="Corporate towers in Abu Dhabi representing international commerce"
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/90 to-navy-900/70"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-gold-400 uppercase tracking-widest mb-4">
              <span className="w-6 h-[1.5px] bg-gold-400"></span>
              <span>{t('contactPage.heroBadge')}</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              {t('contactPage.heroTitle')}
            </h1>
            <p className="mt-4 text-lg text-slate-300 leading-relaxed">
              {t('contactPage.heroSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* ── Left: Direct Contact Info ── */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-widest block mb-2">
                  {t('contactPage.channelsTitle')}
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-navy-800 dark:text-white">
                  {t('footer.colContact')}
                </h2>
                <p className="mt-3 text-content-muted dark:text-slate-400 text-sm leading-relaxed">
                  {siteConfig.contact.hours}
                </p>
              </div>

              <div className="space-y-4">
                {/* Primary Mobile */}
                <div className="p-5 rounded-xl bg-white dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 shadow-subtle hover:border-gold-500/50 transition-colors flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-navy-50 dark:bg-navy-800 text-gold-600 dark:text-gold-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">{t('contactPage.phoneLines')}</span>
                    <a href={siteConfig.contact.primaryPhone.telLink} className="font-heading text-lg font-bold text-navy-800 dark:text-white hover:text-gold-600 dark:hover:text-gold-400 transition-colors block mt-0.5">
                      {siteConfig.contact.primaryPhone.formatted}
                    </a>
                    <span className="text-xs text-content-muted dark:text-slate-400 mt-1 block">Direct voice calls for priority trade discussions.</span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="p-5 rounded-xl bg-white dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 shadow-subtle hover:border-emerald-500/50 transition-colors flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">{t('contactPage.whatsAppDesk')}</span>
                    <a href={siteConfig.contact.whatsApp.waLink} target="_blank" rel="noopener noreferrer"
                      className="font-heading text-lg font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition-colors block mt-0.5">
                      {siteConfig.contact.whatsApp.formatted}
                    </a>
                    <span className="text-xs text-content-muted dark:text-slate-400 mt-1 block">Instant messaging with our Abu Dhabi trading desk.</span>
                    <a href={siteConfig.contact.whatsApp.waLink} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{t('cta.buttonWhatsApp')}</span>
                    </a>
                  </div>
                </div>

                {/* Corporate Business Email */}
                <div className="p-5 rounded-xl bg-white dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 shadow-subtle hover:border-gold-500/50 transition-colors flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-navy-50 dark:bg-navy-800 text-gold-600 dark:text-gold-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">{t('footer.colContact')}</span>
                    <a
                      href={siteConfig.contact.email.gmailCompose}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-heading text-lg font-bold text-navy-800 dark:text-white hover:text-gold-600 dark:hover:text-gold-400 transition-colors block mt-0.5 break-all sm:break-normal"
                      title="Click to compose direct email"
                    >
                      {siteConfig.contact.email.formatted}
                    </a>
                    <span className="text-xs text-content-muted dark:text-slate-400 mt-1 block">Commercial tenders, RFQs, and formal corporate inquiries.</span>

                    {/* Direct Email Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      {/* Direct Webmail (Gmail) */}
                      <a
                        href={siteConfig.contact.email.gmailCompose}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-navy-800 dark:bg-navy-700 hover:bg-gold-500 hover:text-navy-950 text-white transition-all shadow-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
                        <span>{t('contactPage.directGmail')}</span>
                      </a>

                      {/* Default Mail App (mailto) */}
                      <a
                        href={siteConfig.contact.email.mailto}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 dark:hover:bg-navy-700 text-slate-700 dark:text-slate-200 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        <span>{t('contactPage.emailApp')}</span>
                      </a>

                      {/* Copy Email Button */}
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-navy-700 hover:border-gold-500 text-slate-600 dark:text-slate-300 transition-colors"
                      >
                        {emailCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-emerald-500 font-bold">{t('contactPage.copied')}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-400" />
                            <span>{t('contactPage.copyEmail')}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Landline */}
                <div className="p-5 rounded-xl bg-white dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 shadow-subtle hover:border-gold-500/50 transition-colors flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-navy-50 dark:bg-navy-800 text-gold-600 dark:text-gold-400 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Abu Dhabi Landline</span>
                    <a href={siteConfig.contact.landline.telLink} className="font-heading text-lg font-bold text-navy-800 dark:text-white hover:text-gold-600 dark:hover:text-gold-400 transition-colors block mt-0.5">
                      {siteConfig.contact.landline.formatted}
                    </a>
                    <span className="text-xs text-content-muted dark:text-slate-400 mt-1 block">Headquarters switchboard.</span>
                  </div>
                </div>

                {/* Location */}
                <div className="p-5 rounded-xl bg-white dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 shadow-subtle flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg bg-navy-50 dark:bg-navy-800 text-gold-600 dark:text-gold-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">{t('contactPage.officeAddress')}</span>
                    <h3 className="font-heading text-base font-bold text-navy-800 dark:text-white mt-0.5">{siteConfig.location.fullFormatted}</h3>
                    <p className="text-xs text-content-muted dark:text-slate-400 mt-1">{t('footer.jurisdiction')}</p>
                  </div>
                </div>
              </div>

              {/* Confidentiality note */}
              <div className="p-5 rounded-xl bg-surface-light dark:bg-navy-900 border border-surface-border dark:border-navy-700/80 text-xs text-content-muted dark:text-slate-400 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-navy-800 dark:text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-gold-600 dark:text-gold-400" />
                  <span>{t('quoteModal.confidential')}</span>
                </div>
                <p>All commercial inquiries and partner communications submitted to Alhisan are held in strict business confidence.</p>
              </div>
            </div>

            {/* ── Right: Inquiry Form ── */}
            <div className="lg:col-span-7">
              <div className="bg-white dark:bg-navy-900 rounded-2xl border border-surface-border dark:border-navy-700/80 shadow-premium overflow-hidden">

                {/* Form Header Bar */}
                <div className="bg-navy-900 px-5 sm:px-8 py-5 border-b border-navy-800 flex items-center gap-4">
                  <img
                    src="/assets/logo.jpg"
                    alt="Al Hisan Logo"
                    className="w-12 h-12 rounded-full border border-gold-500/60 object-cover shrink-0 shadow-subtle"
                  />
                  <div>
                    <span className="text-gold-400 text-[11px] font-bold uppercase tracking-widest block mb-0.5">
                      {t('quoteModal.desk')}
                    </span>
                    <h3 className="font-heading text-lg sm:text-xl font-extrabold text-white">
                      {t('contactPage.inquiryFormTitle')}
                    </h3>
                    <p className="text-slate-400 text-xs mt-0.5">
                      {t('contactPage.inquiryFormSubtitle')}
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-8 lg:p-10">
                  {successResponse ? (
                    <div className="py-14 px-4 text-center space-y-5">
                      <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h4 className="font-heading text-2xl font-bold text-navy-800 dark:text-white">{t('contactPage.successTitle')}</h4>
                      <p className="text-content-muted dark:text-slate-400 text-sm max-w-md mx-auto leading-relaxed">{successResponse}</p>
                      <button onClick={() => setSuccessResponse(null)}
                        className="mt-4 px-7 py-2.5 rounded-xl bg-navy-800 dark:bg-navy-700 text-white font-semibold text-sm hover:bg-navy-700 dark:hover:bg-navy-600 transition-colors">
                        {t('quoteModal.closeWindow')}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                      {/* Honeypot */}
                      <input type="text" name="website_hp" value={formData.website_hp}
                        onChange={handleChange} style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

                      {/* Server error banner */}
                      {errorMessage && (
                        <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl text-sm flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
                          <div>
                            <p className="font-semibold">Submission Failed</p>
                            <p className="text-xs mt-0.5">{errorMessage}</p>
                          </div>
                        </div>
                      )}

                      {/* Row 1: Full Name + Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <FieldLabel required>{t('contactPage.formFullName')}</FieldLabel>
                          <div className="relative">
                            <div className={`absolute ${isRTL ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none`}>
                              <User className="w-4 h-4" />
                            </div>
                            <input type="text" name="fullName" required autoComplete="name"
                              value={formData.fullName} onChange={handleChange}
                              placeholder={t('quoteModal.namePlaceholder')}
                              className={`${inputBase} ${padInput} ${fieldErrors.fullName ? inputError : inputNormal}`}
                            />
                          </div>
                          <FieldError msg={fieldErrors.fullName} />
                        </div>

                        <div>
                          <FieldLabel required>{t('contactPage.formEmail')}</FieldLabel>
                          <div className="relative">
                            <div className={`absolute ${isRTL ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none`}>
                              <AtSign className="w-4 h-4" />
                            </div>
                            <input type="email" name="email" required autoComplete="email"
                              value={formData.email} onChange={handleChange}
                              placeholder={t('quoteModal.emailPlaceholder')}
                              className={`${inputBase} ${padInput} ${fieldErrors.email ? inputError : inputNormal}`}
                            />
                          </div>
                          <FieldError msg={fieldErrors.email} />
                        </div>
                      </div>

                      {/* Row 2: Phone + Company */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <FieldLabel required>{t('contactPage.formPhone')}</FieldLabel>
                          <div className="relative">
                            <div className={`absolute ${isRTL ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none`}>
                              <Phone className="w-4 h-4" />
                            </div>
                            <input type="tel" name="phone" required autoComplete="tel"
                              value={formData.phone} onChange={handleChange}
                              placeholder={t('quoteModal.phonePlaceholder')}
                              className={`${inputBase} ${padInput} ${fieldErrors.phone ? inputError : inputNormal}`}
                            />
                          </div>
                          <FieldError msg={fieldErrors.phone} />
                        </div>

                        <div>
                          <FieldLabel>{t('contactPage.formCompany')}</FieldLabel>
                          <div className="relative">
                            <div className={`absolute ${isRTL ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none`}>
                              <Briefcase className="w-4 h-4" />
                            </div>
                            <input type="text" name="companyName" autoComplete="organization"
                              value={formData.companyName} onChange={handleChange}
                              placeholder={t('quoteModal.companyPlaceholder')}
                              className={`${inputBase} ${padInput} ${inputNormal}`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Row 3: Product Interest + Subject */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <FieldLabel required>{t('contactPage.formCommodity')}</FieldLabel>
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
                          <FieldError msg={fieldErrors.productInterest} />
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
                        <FieldLabel required>{t('contactPage.formMessage')}</FieldLabel>
                        <textarea name="message" rows="5" required
                          value={formData.message} onChange={handleChange}
                          placeholder={t('quoteModal.messagePlaceholder')}
                          className={`${inputBase} px-4 resize-none ${fieldErrors.message ? inputError : inputNormal}`}
                        />
                        <FieldError msg={fieldErrors.message} />
                      </div>

                      {/* Submit Row */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-gold-500" />
                          {t('quoteModal.confidential')}
                        </span>
                        <button type="submit" disabled={loading}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-bold tracking-wide bg-navy-800 dark:bg-navy-700 text-white hover:bg-navy-700 dark:hover:bg-navy-600 active:bg-navy-900 border border-gold-500/40 shadow-premium disabled:opacity-50 transition-all duration-300"
                        >
                          {loading ? (
                            <><Loader2 className="w-4 h-4 animate-spin text-gold-400" /><span>{t('contactPage.sending')}</span></>
                          ) : (
                            <><Send className={`w-4 h-4 text-gold-400 ${isRTL ? 'rotate-180' : ''}`} /><span>{t('contactPage.formSubmit')}</span></>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
