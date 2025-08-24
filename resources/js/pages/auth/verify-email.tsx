// Components
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import TextLink from '@/components/App/text-link';
import { Button } from '@/components/Core/button';
import AuthLayout from '@/layouts/auth-layout';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <AuthLayout title="Verify your email address" description="We've sent you a verification link to secure your account and get started.">
            <Head title="Email verification" />

            <div className="w-full max-w-md mx-auto space-y-8">
                {/* Main Verification Card */}
                <div className="card bg-base-100 shadow-2xl border border-base-200">
                    <div className="card-body p-8 text-center space-y-6">
                        {/* Icon Header */}
                        <div className="flex justify-center mb-2">
                            <div className="p-4 bg-primary/10 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M12 12v7" />
                                </svg>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h1 className="text-2xl font-bold text-base-content">Check your email</h1>
                            <p className="text-base-content/70 leading-relaxed">
                                We've sent a verification link to your email address. Please click the link to verify your account and continue.
                            </p>
                        </div>

                        {/* Success Message */}
                        {status === 'verification-link-sent' && (
                            <div className="alert alert-success bg-success/10 border-success/30 text-success rounded-xl p-4">
                                <div className="flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div className="text-left">
                                        <div className="font-semibold">Email sent successfully!</div>
                                        <div className="text-sm opacity-80">A new verification link has been sent to your email address.</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action Form */}
                        <Form method="post" action={route('verification.send')} className="space-y-4">
                            {({ processing }) => (
                                <>
                                    <Button
                                        disabled={processing}
                                        className={`btn btn-primary btn-wide h-12 gap-3 ${processing ? 'loading' : ''}`}
                                    >
                                        {processing ? (
                                            <>
                                                <LoaderCircle className="h-5 w-5 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                                Resend verification email
                                            </>
                                        )}
                                    </Button>

                                    <div className="divider text-base-content/40 text-xs">or</div>

                                    <TextLink
                                        href={route('logout')}
                                        method="post"
                                        className="btn btn-ghost btn-sm gap-2 hover:bg-base-200"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Log out
                                    </TextLink>
                                </>
                            )}
                        </Form>
                    </div>
                </div>

                {/* Help Section */}
                <div className="card bg-base-100/50 shadow-lg border border-base-200/50">
                    <div className="card-body p-6">
                        <h3 className="font-semibold text-base-content mb-3 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Didn't receive the email?
                        </h3>
                        <ul className="text-sm text-base-content/70 space-y-2 leading-relaxed">
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold">•</span>
                                Check your spam or junk mail folder
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold">•</span>
                                Make sure you entered the correct email address
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold">•</span>
                                Wait a few minutes as emails can sometimes be delayed
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary font-bold">•</span>
                                Try clicking the "Resend" button above
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Security Notice */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 text-xs text-base-content/50 bg-base-200/50 px-4 py-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Your email verification helps keep your account secure
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
