import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Appearance settings', href: '/settings/appearance' },
];

const themes = ['light', 'dark', 'system'] as const;
type Theme = typeof themes[number];

const themeOptions = {
  light: {
    name: 'Light Mode',
    description: 'Clean and bright interface for daytime use',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    preview: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    textColor: '#1e293b'
  },
  dark: {
    name: 'Dark Mode',
    description: 'Easy on the eyes for low-light environments',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
    preview: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    textColor: '#f1f5f9'
  },
  system: {
    name: 'System Preference',
    description: 'Automatically match your device settings',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    preview: 'linear-gradient(135deg, #ffffff 0%, #1e293b 100%)',
    textColor: '#64748b'
  }
};

export default function Appearance() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Load saved theme from localStorage or default to system
    return (localStorage.getItem('theme') as Theme) || 'system';
  });

  const [isAnimating, setIsAnimating] = useState(false);

  const handleThemeChange = (newTheme: Theme) => {
    setIsAnimating(true);
    setTheme(newTheme);

    // Reset animation after a brief delay
    setTimeout(() => setIsAnimating(false), 300);
  };

  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = (mode: Theme) => {
      if (mode === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.setAttribute('data-theme', isDark ? 'dark' : 'light');
      } else {
        root.setAttribute('data-theme', mode);
      }
    };

    applyTheme(theme);
    localStorage.setItem('theme', theme);

    // Optional: listen to system changes if "system" is selected
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = (e: MediaQueryListEvent) => {
        root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      };
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [theme]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Appearance settings" />

      <SettingsLayout>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 border border-primary/20">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/20 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z" />
                </svg>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-base-content mb-2">Appearance Settings</h1>
                <p className="text-base-content/70 leading-relaxed">
                  Customize your visual experience. Choose between light, dark, or system preference to match your style.
                </p>
              </div>
            </div>
          </div>

          {/* Current Theme Preview */}
          <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {themeOptions[theme].icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-base-content">Current Theme</h2>
                  <p className="text-base-content/60 text-sm">Active: {themeOptions[theme].name}</p>
                </div>
              </div>

              {/* Live Preview */}
              <div className="bg-base-50 rounded-xl p-6 border border-base-200">
                <h3 className="font-semibold text-base-content mb-4">Live Preview</h3>
                <div className="mockup-browser bg-base-200 border">
                  <div className="mockup-browser-toolbar">
                    <div className="input">https://yourapp.com</div>
                  </div>
                  <div className="flex justify-center px-4 py-8 bg-base-100">
                    <div className={`transition-all duration-300 ${isAnimating ? 'scale-105' : 'scale-100'}`}>
                      <div className="text-base-content font-semibold mb-2">Sample Interface</div>
                      <div className="flex gap-2">
                        <div className="btn btn-primary btn-sm">Primary Button</div>
                        <div className="btn btn-secondary btn-sm">Secondary</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Theme Selection */}
          <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-base-content">Choose Your Preference</h2>
                  <p className="text-base-content/60 text-sm">Select the theme that works best for you</p>
                </div>
              </div>

              <div className="space-y-4 max-w-2xl">
                {themes.map((t) => {
                  const option = themeOptions[t];
                  const isSelected = theme === t;

                  return (
                    <div key={t} className="relative">
                      <input
                        type="radio"
                        name="theme"
                        value={t}
                        checked={isSelected}
                        onChange={() => handleThemeChange(t)}
                        className="sr-only"
                        id={`theme-${t}`}
                      />
                      <label
                        htmlFor={`theme-${t}`}
                        className={`block cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-md ${
                          isSelected
                            ? 'border-primary bg-primary/5 shadow-lg'
                            : 'border-base-200 bg-base-50 hover:border-primary/30 hover:bg-primary/5'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          {/* Radio Button Visual */}
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            isSelected ? 'border-primary bg-primary' : 'border-base-300'
                          }`}>
                            {isSelected && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>

                          {/* Theme Icon */}
                          <div className={`p-3 rounded-lg ${isSelected ? 'bg-primary/20 text-primary' : 'bg-base-200 text-base-content/70'}`}>
                            {option.icon}
                          </div>

                          {/* Theme Info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-base-content">{option.name}</h3>
                              {isSelected && (
                                <div className="badge badge-primary badge-sm">Active</div>
                              )}
                            </div>
                            <p className="text-sm text-base-content/70 leading-relaxed">
                              {option.description}
                            </p>
                          </div>

                          {/* Theme Preview */}
                          <div className="flex-shrink-0">
                            <div
                              className="w-16 h-12 rounded-lg border border-base-200 relative overflow-hidden shadow-sm"
                              style={{ background: option.preview }}
                            >
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div
                                  className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/20 backdrop-blur-sm"
                                  style={{ color: option.textColor }}
                                >
                                  Aa
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                  );
                })}
              </div>

              {/* Additional Info */}
              <div className="bg-info/10 border border-info/20 rounded-xl p-4 mt-6">
                <div className="flex items-start gap-3">
                  <div className="text-info mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-info mb-1">About System Preference</h4>
                    <p className="text-info/80 text-sm leading-relaxed">
                      When you select "System Preference", the theme will automatically switch between light and dark modes based on your device's settings. Changes to your system theme will be reflected immediately.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Applied Notice */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-xs text-base-content/50 bg-base-200/50 px-4 py-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Theme changes are saved automatically
            </div>
          </div>
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
