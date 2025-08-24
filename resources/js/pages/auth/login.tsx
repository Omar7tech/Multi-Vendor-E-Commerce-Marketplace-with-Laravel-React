import InputError from '@/components/App/input-error'
import TextLink from '@/components/App/text-link'
import { Button } from '@/components/Core/button'
import { Checkbox } from '@/components/Core/ui/checkbox'
import { Input } from '@/components/Core/ui/input'
import { Label } from '@/components/Core/ui/label'
import AuthLayout from '@/layouts/auth-layout'
import { Form, Head } from '@inertiajs/react'
import { LoaderCircle } from 'lucide-react'

interface LoginProps {
  status?: string
  canResetPassword: boolean
}

export default function Login({ status, canResetPassword }: LoginProps) {
  return (
    <AuthLayout
      title="Log in to your account"
      description="Enter your email and password below to log in"
    >
      <Head title="Log in" />

      {status && (
        <div className="mb-4 text-center text-sm font-medium text-success">
          {status}
        </div>
      )}

      <Form
        method="post"
        action={route('login')}
        resetOnSuccess={['password']}
        className="flex flex-col gap-6"
      >
        {({ processing, errors }) => (
          <>
            <div className="grid gap-6">
              {/* Email field */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  autoFocus
                  tabIndex={1}
                  autoComplete="email"
                  placeholder="email@example.com"
                  className="w-full"
                />
                <InputError message={errors.email} />
              </div>

              {/* Password field */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {canResetPassword && (
                    <TextLink
                      href={route('password.request')}
                      className="ml-auto text-sm"
                      tabIndex={5}
                    >
                      Forgot password?
                    </TextLink>
                  )}
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  tabIndex={2}
                  autoComplete="current-password"
                  placeholder="Password"
                  className="w-full"
                />
                <InputError message={errors.password} />
              </div>

              {/* Remember me */}
              <div className="flex items-center space-x-3">
                <Checkbox id="remember" name="remember" tabIndex={3} />
                <Label htmlFor="remember">Remember me</Label>
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                className="mt-4 w-full"
                tabIndex={4}
                disabled={processing}
              >
                {processing && (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                )}
                Log in
              </Button>
            </div>

            {/* Sign up link */}
            <div className="text-center text-sm text-muted">
              Don&apos;t have an account?{' '}
              <TextLink prefetch href={route('register')} tabIndex={5}>
                Sign up
              </TextLink>
            </div>
          </>
        )}
      </Form>
    </AuthLayout>
  )
}
