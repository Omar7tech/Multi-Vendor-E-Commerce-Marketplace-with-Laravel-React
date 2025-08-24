import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword({ status }: { status?: string }) {
  return (
    <AuthLayout
      title="Forgot password"
      description="Enter your email to receive a password reset link"
    >
      <Head title="Forgot password" />

      <Form
        method="post"
        action={route('password.email')}
        resetOnSuccess={['email']}
        disableWhileProcessing
        className="flex flex-col gap-6"
      >
        {({ processing, errors }) => (
          <>
            {status && (
              <div className="alert alert-success alert-soft text-xs text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>

                {status}
              </div>
            )}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email address</legend>
              <input
                type="email"
                name="email"
                required
                autoFocus
                tabIndex={1}
                placeholder="email@example.com"
                className="input input-bordered w-full"
                autoComplete="email"
              />
              {errors.email && (
                <p className="label text-error text-sm">{errors.email}</p>
              )}
            </fieldset>

            <button
              type="submit"
              className="btn w-full mt-2"
              disabled={processing}
              tabIndex={2}
            >
              {processing && (
                <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
              )}
              Email password reset link
            </button>

            <div className="text-center text-sm text-base-content/70">
              Or, return to{' '}
              <a href={route('login')} tabIndex={3} className="link">
                log in
              </a>
            </div>
          </>
        )}
      </Form>
    </AuthLayout>
  );
}
