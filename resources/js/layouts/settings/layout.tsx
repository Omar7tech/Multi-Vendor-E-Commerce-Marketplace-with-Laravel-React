import Heading from '@/components/App/heading';
import { Button } from '@/components/Core/button';
import { Separator } from '@/components/Core/ui/separator';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

const sidebarNavItems: NavItem[] = [
  { title: 'Profile', href: '/settings/profile', icon: null },
  { title: 'Password', href: '/settings/password', icon: null },
  { title: 'Appearance', href: '/settings/appearance', icon: null },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
  if (typeof window === 'undefined') return null;

  const currentPath = window.location.pathname;

  return (
    <div className="px-4 py-6">
      <Heading title="Settings" description="Manage your profile and account settings" />

      <div className="flex flex-col lg:flex-row lg:space-x-12">
        {/* Sidebar */}
        <aside className="w-full max-w-xl lg:w-48">
          <nav className="flex flex-col space-y-1">
            {sidebarNavItems.map((item, index) => {
              const isActive = currentPath === item.href;
              return (
                <Button
                  key={`${item.href}-${index}`}
                  size="sm"
                  variant="ghost"
                  asChild
                  className={cn(
                    'w-full justify-start rounded-md transition-colors duration-200',
                    isActive
                      ? 'bg-base-300 '
                      : 'text-base-content hover:bg-base-200 focus:bg-base-200'
                  )}
                >
                  <Link href={item.href} prefetch className="flex items-center gap-2 px-2 py-1.5">
                    {item.icon && <item.icon className="h-4 w-4" />}
                    <span>{item.title}</span>
                  </Link>
                </Button>
              );
            })}
          </nav>
        </aside>

        <Separator className="my-6 lg:hidden" />

        {/* Content */}
        <div className="flex-1 md:max-w-2xl">
          <section className="max-w-xl space-y-12">{children}</section>
        </div>
      </div>
    </div>
  );
}
