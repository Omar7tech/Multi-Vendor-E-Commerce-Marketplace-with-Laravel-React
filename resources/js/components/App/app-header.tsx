import { Breadcrumbs } from '@/components/App/breadcrumbs';
import { Icon } from '@/components/App/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Core/ui/avatar';
import { Button } from '@/components/Core/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/Core/ui/dropdown-menu';
import { UserMenuContent } from '@/components/App/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {  LayoutGrid, Menu, Search } from 'lucide-react';
import AppLogo from './app-logo';


const mainNavItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
];

const rightNavItems: NavItem[] = [

];

const activeItemStyles = 'bg-base-300 text-base-content font-semibold';

interface AppHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
  const page = usePage<SharedData>();
  const { auth } = page.props;
  const getInitials = useInitials();

  return (
    <>
      <div className="border-b border-base-300">
        <div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl">

          <div className="lg:hidden">
            <div className="drawer">
              <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content flex items-center">
                <label htmlFor="drawer-toggle" className="btn btn-ghost btn-square">
                  <Menu className="h-5 w-5" />
                </label>
              </div>
              <div className="drawer-side">
                <label htmlFor="drawer-toggle" className="drawer-overlay"></label>
                <ul className="menu w-64 bg-base-100 p-4 space-y-2 border-r border-base-300 h-full">
                  {mainNavItems.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
                          "hover:bg-primary hover:text-primary-content focus:bg-primary focus:text-primary-content",
                          item.isActive ? "bg-primary text-primary-content" : "text-base-content"
                        )}
                      >
                        {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  ))}

                  <div className="border-t border-base-300 mt-4 pt-4"></div>

                  {rightNavItems.map((item) => (
                    <li key={item.title}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-base-content hover:bg-base-200 transition-colors duration-200"
                      >
                        {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                        <span>{item.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* Logo */}
          <Link href="/dashboard" prefetch className="flex items-center ml-2 lg:ml-0">
            <AppLogo />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden ml-6 lg:flex space-x-4">
            {mainNavItems.map(item => (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  'btn btn-ghost btn-sm flex items-center gap-2',
                  page.url === item.href && activeItemStyles
                )}
              >
                {item.icon && <Icon iconNode={item.icon} className="h-4 w-4" />}
                {item.title}
              </Link>
            ))}
          </div>

          <div className="ml-auto flex items-center space-x-2">
            {/* Search Button */}
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>

            {/* Right Nav Links (Desktop) */}
            <div className="hidden lg:flex space-x-2">
              {rightNavItems.map(item => (
                <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-square">
                  {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                </a>
              ))}
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="btn-square rounded-full p-1">
                  <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                    <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                    <AvatarFallback>{getInitials(auth.user.name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <UserMenuContent user={auth.user} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      {breadcrumbs.length > 1 && (
        <div className="flex w-full border-b border-base-300">
          <div className="mx-auto flex h-12 w-full items-center justify-start px-4 md:max-w-7xl text-neutral-500">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
        </div>
      )}
    </>
  );
}
