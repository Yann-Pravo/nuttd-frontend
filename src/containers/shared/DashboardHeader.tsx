import { Link } from '@tanstack/react-router';
import ROUTES from 'constants/paths';
import { useAuth } from 'contexts/auth';
import nutLogo from '../../assets/images/nut_64.png';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import {
  HamburgerMenuIcon,
  BellIcon,
  Cross2Icon,
  PlusCircledIcon,
} from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CreateNut from './CreateNut';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Home', href: ROUTES.HOME, current: true },
  { name: 'Maps', href: '#', current: false },
  { name: 'Guilds', href: ROUTES.GUILDS, current: false },
];

const DashboardHeader = () => {
  const { user, logout } = useAuth();

  const userNavigation = [
    { name: 'Your Profile', onClick: () => ({}) },
    { name: 'Sign out', onClick: () => logout() },
  ];

  return (
    <Disclosure as="nav" className="border-b border-gray-200 bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex shrink-0 items-center">
                  <img className="mr-2 size-8" src={nutLogo} alt="Nuttd logo" />
                </div>
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {({ isActive }) => (
                        <div
                          className={cn(
                            isActive
                              ? 'border-pink-600 text-gray-900'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                            'inline-flex h-full items-center border-b-2 px-1 pt-1 text-sm font-medium',
                          )}
                        >
                          {item.name}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <CreateNut>
                  <Button variant="ghost-secondary" size="icon-secondary">
                    <PlusCircledIcon className="size-8" />
                  </Button>
                </CreateNut>
                <button
                  type="button"
                  className="relative ml-3 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="size-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <Avatar>
                        <AvatarImage
                          src={user?.profile?.avatar}
                          alt="user image"
                        />
                        <AvatarFallback>ME</AvatarFallback>
                      </Avatar>
                    </MenuButton>
                  </div>
                  <Transition
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          {({ focus }) => (
                            <a
                              onClick={item.onClick}
                              className={cn(
                                focus ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700',
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <Cross2Icon className="block size-6" aria-hidden="true" />
                  ) : (
                    <HamburgerMenuIcon
                      className="block size-6"
                      aria-hidden="true"
                    />
                  )}
                </DisclosureButton>
              </div>
              <div className="absolute bottom-4 right-4 sm:hidden">
                <CreateNut>
                  <Button variant="ghost-secondary" size="icon-secondary">
                    <PlusCircledIcon className="size-8" />
                  </Button>
                </CreateNut>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  aria-current={item.current ? 'page' : undefined}
                  className="block text-base font-medium"
                >
                  <Link to={item.href}>
                    {({ isActive }) => (
                      <div
                        className={cn(
                          isActive
                            ? 'border-pink-600 bg-indigo-50 text-indigo-700'
                            : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800',
                          'border-l-4 py-2 pl-3 pr-4',
                        )}
                      >
                        {item.name}
                      </div>
                    )}
                  </Link>
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="flex items-center px-4">
                <div className="shrink-0">
                  <Avatar>
                    <AvatarImage src={user?.profile?.avatar} alt="user image" />
                    <AvatarFallback>ME</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user?.profile?.displayName}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {user?.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="size-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 space-y-1">
                {userNavigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    onClick={item.onClick}
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};

export default DashboardHeader;
