/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0A1B2A',
          800: '#102A43', // Primary Deep Navy
          700: '#163A5F', // Secondary Dark Blue
          600: '#244E7A',
          500: '#336699',
          100: '#E8F0F8',
          50: '#F4F7FB',
        },
        gold: {
          700: '#9E7E38',
          600: '#B38E46',
          500: '#C6A15B', // Accent Elegant Gold
          400: '#D8B878',
          300: '#EAD3A2',
          100: '#F9F4EA',
          50: '#FDFBF7',
        },
        surface: {
          warm: '#FAFAF8', // Background Warm White
          light: '#F1F4F6', // Secondary Background Light Gray
          white: '#FFFFFF',
          card: '#FFFFFF',
          border: '#E4E7EC',
          borderDark: '#1E3A5F',
        },
        content: {
          main: '#1D2939', // Main Text
          muted: '#667085', // Muted Text
          light: '#98A2B3',
          inverted: '#F8FAFC',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(16, 42, 67, 0.05), 0 1px 2px 0 rgba(16, 42, 67, 0.03)',
        'premium': '0 4px 20px -2px rgba(16, 42, 67, 0.08), 0 2px 6px -1px rgba(16, 42, 67, 0.04)',
        'premium-hover': '0 12px 30px -4px rgba(16, 42, 67, 0.12), 0 4px 12px -2px rgba(16, 42, 67, 0.06)',
        'gold-glow': '0 0 20px rgba(198, 161, 91, 0.25)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
};
