/**
 * API Service for Alhisan Frontend
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

export const submitContactInquiry = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Submission failed. Please check your information.',
        errors: data.errors || {},
        status: response.status,
      };
    }

    return {
      success: true,
      message: data.message || 'Your inquiry has been successfully transmitted.',
      inquiryId: data.inquiryId,
      status: response.status,
    };
  } catch (err) {
    console.error('Contact API error:', err);
    return {
      success: false,
      message: 'Unable to reach the server. Please verify your connection or contact our Abu Dhabi office directly via phone or WhatsApp.',
      errors: { network: err.message },
      status: 0,
    };
  }
};

export const checkServerHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) return { healthy: false };
    const data = await response.json();
    return { healthy: true, ...data };
  } catch (err) {
    return { healthy: false, error: err.message };
  }
};
