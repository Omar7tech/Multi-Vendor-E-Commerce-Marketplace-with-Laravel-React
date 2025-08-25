import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { SharedData } from '@/types';

export default function NavBar() {
  const { auth } = usePage<SharedData>().props;
  const { user } = auth;

  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cleanup = useMobileNavigation();

  const handleLogout = () => {
    cleanup();
    router.flushAll();
  };

  // Nav items depend on auth
  const navItems = user
    ? [

      { title: 'Profile', href: '/settings/profile' },
      { title: 'Settings', href: '/settings' },
    ]
    : [
      // public
    ];

  return (
    <nav className="backdrop-blur-lg navbar  fixed top-0 left-0 right-0 z-50 bg-base-100/10 shadow-sm px-4 md:px-8">
      {/* Left - Logo and main nav */}
      <div className="flex-1 flex items-center gap-4">
        {/* Mobile toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-ghost btn-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Logo */}
        <Link href="/" className="btn btn-ghost text-xl normal-case">
          MyApp
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="btn btn-ghost btn-sm normal-case">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right - Cart & Auth/Profile */}
      <div className="flex-none flex items-center gap-2">
        {/* Cart (only for logged in users) */}
        {user && (
          <div className="dropdown dropdown-end">
            <button
              onClick={() => setCartOpen(!cartOpen)}
              className="btn btn-ghost btn-circle relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item absolute -top-1 -right-1">8</span>
            </button>
            <div
              className={`dropdown-content mt-3 w-52 shadow-lg bg-base-100 rounded-md ${cartOpen ? 'block' : 'hidden'
                }`}
            >
              <div className="card card-compact bg-base-100 p-4">
                <span className="text-lg font-semibold">8 Items</span>
                <span className="text-info block mt-1">Subtotal: $999</span>
                <button className="btn btn-primary btn-block mt-3">View cart</button>
              </div>
            </div>
          </div>
        )}

        {/* Auth Section */}
        {user ? (
          // If logged in: Profile menu
          <div className="dropdown dropdown-end">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt={user.name}
                  src={user.avatar ?? 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'}
                />
              </div>
            </button>
            <ul
              className={`menu menu-sm dropdown-content mt-3 w-52 p-2 shadow-lg rounded-md bg-base-100 ${profileOpen ? 'block' : 'hidden'
                }`}
            >
              <li className="px-2 py-1 font-semibold">{user.name}</li>
              <li>
                <Link href="/settings/profile">Profile</Link>
              </li>
              <li>
                <Link href="/settings">Settings</Link>
              </li>
              <li>
                <Link
                  href={route('logout')}
                  method="post"
                  as="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-500"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          // If guest: Auth buttons
          <div className="flex gap-2">
            <Link href={route('login')} className="btn btn-ghost">
              Sign in
            </Link>
            <Link href={route('register')} className="btn btn-primary">
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-base-100 shadow-md p-4 flex flex-col gap-2 z-50 md:hidden">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="btn btn-ghost w-full text-left">
              {item.title}
            </Link>
          ))}

          {user ? (
            <Link
              href={route('logout')}
              method="post"
              as="button"
              onClick={handleLogout}
              className="btn btn-error btn-soft w-full text-left flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" /> Logout
            </Link>
          ) : (
            <>
              <Link href={route('login')} className="btn btn-ghost w-full text-left">
                Sign in
              </Link>
              <Link href={route('register')} className="btn btn-primary w-full text-left">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
