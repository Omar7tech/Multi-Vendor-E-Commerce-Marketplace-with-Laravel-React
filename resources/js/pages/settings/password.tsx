import InputError from '@/components/App/input-error';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head } from '@inertiajs/react';
import { useRef, useState } from 'react';

import { Button } from '@/components/Core/button';
import { Input } from '@/components/Core/ui/input';
import { Label } from '@/components/Core/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Password settings', href: '/settings/password' },
];

export default function Password() {
  const passwordInput = useRef<HTMLInputElement>(null);
  const currentPasswordInput = useRef<HTMLInputElement>(null);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordValue, setPasswordValue] = useState('');

  const togglePassword = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['bg-error', 'bg-warning', 'bg-info', 'bg-success', 'bg-primary'];

    return {
      strength,
      label: labels[strength - 1] || '',
      color: colors[strength - 1] || 'bg-base-300'
    };
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Password settings" />

      <SettingsLayout>
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-warning/10 via-warning/5 to-transparent rounded-2xl p-6 border border-warning/20">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-warning/20 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-base-content mb-2">Password Security</h1>
                <p className="text-base-content/70 text-sm leading-relaxed">
                  Keep your account secure with a strong password. We recommend using a unique password that you don't use elsewhere.
                </p>
              </div>
            </div>
          </div>

          {/* Password Form Card */}
          <div className="card bg-base-100 shadow-xl border border-base-200">
            <div className="card-body p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-base-content">Update Password</h2>
                  <p className="text-base-content/60 text-sm">Change your current password to a new one</p>
                </div>
              </div>

              <Form
                method="put"
                action={route('password.update')}
                options={{ preserveScroll: true }}
                resetOnError={['password', 'password_confirmation', 'current_password']}
                resetOnSuccess
                onError={(errors) => {
                  if (errors.password) passwordInput.current?.focus();
                  if (errors.current_password) currentPasswordInput.current?.focus();
                }}
                className="space-y-6"
              >
                {({ errors, processing, recentlySuccessful }) => (
                  <>
                    {/* Current Password */}
                    <div className="form-control space-y-2">
                      <Label htmlFor="current_password" className="label p-0">
                        <span className="label-text font-semibold text-base-content flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          Current Password
                        </span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="current_password"
                          ref={currentPasswordInput}
                          name="current_password"
                          type={showPasswords.current ? "text" : "password"}
                          className={`input input-bordered w-full h-12 text-base pr-12 bg-base-50 focus:input-primary transition-all duration-200 ${errors.current_password ? 'input-error' : ''}`}
                          autoComplete="current-password"
                          placeholder="Enter your current password"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/50 hover:text-base-content transition-colors"
                          onClick={() => togglePassword('current')}
                        >
                          {showPasswords.current ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                      <InputError className="label-text-alt text-error font-medium" message={errors.current_password} />
                    </div>

                    <div className="divider opacity-50"></div>

                    {/* New Password */}
                    <div className="form-control space-y-2">
                      <Label htmlFor="password" className="label p-0">
                        <span className="label-text font-semibold text-base-content flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          New Password
                        </span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          ref={passwordInput}
                          name="password"
                          type={showPasswords.new ? "text" : "password"}
                          className={`input input-bordered w-full h-12 text-base pr-12 bg-base-50 focus:input-primary transition-all duration-200 ${errors.password ? 'input-error' : ''}`}
                          autoComplete="new-password"
                          placeholder="Create a strong new password"
                          onChange={(e) => setPasswordValue(e.target.value)}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/50 hover:text-base-content transition-colors"
                          onClick={() => togglePassword('new')}
                        >
                          {showPasswords.new ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>

                      {/* Password Strength Indicator */}
                      {passwordValue && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-base-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrength(passwordValue).color}`}
                                style={{ width: `${(getPasswordStrength(passwordValue).strength / 5) * 100}%` }}
                              ></div>
                            </div>
                            <span className={`text-xs font-medium ${getPasswordStrength(passwordValue).strength >= 4 ? 'text-success' : getPasswordStrength(passwordValue).strength >= 3 ? 'text-info' : 'text-warning'}`}>
                              {getPasswordStrength(passwordValue).label}
                            </span>
                          </div>
                        </div>
                      )}

                      <InputError className="label-text-alt text-error font-medium" message={errors.password} />
                    </div>

                    {/* Confirm Password */}
                    <div className="form-control space-y-2">
                      <Label htmlFor="password_confirmation" className="label p-0">
                        <span className="label-text font-semibold text-base-content flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Confirm New Password
                        </span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="password_confirmation"
                          name="password_confirmation"
                          type={showPasswords.confirm ? "text" : "password"}
                          className={`input input-bordered w-full h-12 text-base pr-12 bg-base-50 focus:input-primary transition-all duration-200 ${errors.password_confirmation ? 'input-error' : ''}`}
                          autoComplete="new-password"
                          placeholder="Confirm your new password"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/50 hover:text-base-content transition-colors"
                          onClick={() => togglePassword('confirm')}
                        >
                          {showPasswords.confirm ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                      <InputError className="label-text-alt text-error font-medium" message={errors.password_confirmation} />
                    </div>

                    {/* Password Requirements */}
                    <div className="bg-base-50 rounded-xl p-4 border border-base-200">
                      <h4 className="font-medium text-base-content mb-3 text-sm">Password requirements:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${passwordValue?.length >= 8 ? 'bg-success' : 'bg-base-300'}`}></div>
                          <span className={passwordValue?.length >= 8 ? 'text-success' : 'text-base-content/60'}>At least 8 characters</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${/[A-Z]/.test(passwordValue || '') ? 'bg-success' : 'bg-base-300'}`}></div>
                          <span className={/[A-Z]/.test(passwordValue || '') ? 'text-success' : 'text-base-content/60'}>One uppercase letter</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${/[a-z]/.test(passwordValue || '') ? 'bg-success' : 'bg-base-300'}`}></div>
                          <span className={/[a-z]/.test(passwordValue || '') ? 'text-success' : 'text-base-content/60'}>One lowercase letter</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${/[0-9]/.test(passwordValue || '') ? 'bg-success' : 'bg-base-300'}`}></div>
                          <span className={/[0-9]/.test(passwordValue || '') ? 'text-success' : 'text-base-content/60'}>One number</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="bg-base-50 rounded-xl p-6 border border-base-200">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <Button
                            className="btn btn-primary h-12 px-8 gap-2"
                            disabled={processing}
                          >
                            {processing && (
                              <span className="loading loading-spinner loading-xs"></span>
                            )}
                            Update password
                          </Button>

                          <Transition
                            show={recentlySuccessful}
                            enter="transition-all duration-500 ease-out"
                            enterFrom="opacity-0 scale-95 translate-y-2"
                            enterTo="opacity-100 scale-100 translate-y-0"
                            leave="transition-all duration-300 ease-in"
                            leaveFrom="opacity-100 scale-100 translate-y-0"
                            leaveTo="opacity-0 scale-95 translate-y-2"
                          >
                            <div className="flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-lg border border-success/20">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="text-sm font-semibold">Password updated successfully!</span>
                            </div>
                          </Transition>
                        </div>

                        <div className="text-xs text-base-content/50 flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          Your password is encrypted and secure
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </Form>
            </div>
          </div>
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
