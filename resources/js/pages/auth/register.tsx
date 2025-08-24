import { Form, Head } from '@inertiajs/react'
import { LoaderCircle } from 'lucide-react'

import InputError from '@/components/App/input-error'
import TextLink from '@/components/App/text-link'
import { Button } from '@/components/Core/button'
import { Input } from '@/components/Core/ui/input'
import { Label } from '@/components/Core/ui/label'
import AuthLayout from '@/layouts/auth-layout'

export default function Register() {
  return (
    <AuthLayout
      title="Create an account"
      description="Enter your details below to create your account"
    >
      <Head title="Register" />

      <Form
        method="post"
        action={route('register')}
        resetOnSuccess={['password', 'password_confirmation']}
        disableWhileProcessing
        className="flex flex-col gap-6"
      >
        {({ processing, errors }) => (
          <>
            <div className="grid gap-6">
              {/* Name */}
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  required
                  autoFocus
                  autoComplete="name"
                  placeholder="Full name"
                  tabIndex={1}
                  className="w-full"
                />
                <InputError message={errors.name} className="mt-1" />
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="email@example.com"
                  tabIndex={2}
                  className="w-full"
                />
                <InputError message={errors.email} className="mt-1" />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  autoComplete="new-password"
                  placeholder="Password"
                  tabIndex={3}
                  className="w-full"
                />
                <InputError message={errors.password} className="mt-1" />
              </div>

              {/* Confirm Password */}
              <div className="grid gap-2">
                <Label htmlFor="password_confirmation">Confirm password</Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  name="password_confirmation"
                  required
                  autoComplete="new-password"
                  placeholder="Confirm password"
                  tabIndex={4}
                  className="w-full"
                />
                <InputError
                  message={errors.password_confirmation}
                  className="mt-1"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="mt-2 w-full"
                tabIndex={5}
                disabled={processing}
              >
                {processing && (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                )}
                Create account
              </Button>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-muted">
              Already have an account?{' '}
              <TextLink href={route('login')} tabIndex={6}>
                Log in
              </TextLink>
            </div>
          </>
        )}
      </Form>
    </AuthLayout>
  )
}
