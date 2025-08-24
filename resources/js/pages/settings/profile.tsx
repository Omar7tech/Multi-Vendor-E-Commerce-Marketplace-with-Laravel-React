import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';

import DeleteUser from '@/components/App/delete-user';
import HeadingSmall from '@/components/App/heading-small';
import InputError from '@/components/App/input-error';
import { Button } from '@/components/Core/button';
import { Input } from '@/components/Core/ui/input';
import { Label } from '@/components/Core/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Profile settings', href: '/settings/profile' },
];

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
  const { auth } = usePage<SharedData>().props;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Profile settings" />

      <SettingsLayout>
        <div className="space-y-8">
          {/* Profile Information Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <HeadingSmall
                title="Profile information"
                description="Update your name and email address."
              />

              <Form
                method="patch"
                action={route('profile.update')}
                options={{ preserveScroll: true }}
                className="space-y-6 mt-6"
              >
                {({ processing, recentlySuccessful, errors }) => (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="form-control w-full">
                        <Label htmlFor="name" className="label">
                          <span className="label-text font-semibold text-base-content">Full Name</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          defaultValue={auth.user.name}
                          className="input input-bordered w-full focus:input-primary"
                          placeholder="Enter your full name"
                          required
                          autoComplete="name"
                        />
                        <InputError className="label-text-alt text-error mt-1" message={errors.name} />
                      </div>

                      {/* Email */}
                      <div className="form-control w-full">
                        <Label htmlFor="email" className="label">
                          <span className="label-text font-semibold text-base-content">Email Address</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          name="email"
                          defaultValue={auth.user.email}
                          className="input input-bordered w-full focus:input-primary"
                          placeholder="Enter your email address"
                          required
                          autoComplete="username"
                        />
                        <InputError className="label-text-alt text-error mt-1" message={errors.email} />
                      </div>
                    </div>

                    {/* Email Verification Alert */}
                    {mustVerifyEmail && auth.user.email_verified_at === null && (
                      <div className="alert alert-warning shadow-lg">
                        <div className="flex-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                          <div>
                            <h3 className="font-bold">Email not verified</h3>
                            <div className="text-xs">
                              <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="link link-hover underline"
                              >
                                Click here to resend verification email
                              </Link>
                            </div>
                          </div>
                        </div>
                        {status === 'verification-link-sent' && (
                          <div className="flex-none">
                            <div className="badge badge-success gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                              </svg>
                              Verification link sent
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="card-actions justify-between items-center pt-4 border-t border-base-300">
                      <div className="flex items-center gap-4">
                        <Button
                          className={`btn btn-primary ${processing ? 'loading' : ''}`}
                          disabled={processing}
                        >
                          {processing ? 'Saving...' : 'Save Changes'}
                        </Button>

                        <Transition
                          show={recentlySuccessful}
                          enter="transition-opacity duration-300"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="transition-opacity duration-300"
                          leaveTo="opacity-0"
                        >
                          <div className="flex items-center gap-2 text-success">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-medium">Saved successfully</span>
                          </div>
                        </Transition>
                      </div>
                    </div>
                  </>
                )}
              </Form>
            </div>
          </div>

          {/* Delete User Section */}
          <div className="divider"></div>
          <DeleteUser />
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
