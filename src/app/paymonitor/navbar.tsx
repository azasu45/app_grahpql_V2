'use client';

import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import { usePathname } from 'next/navigation';
import { Button, Text } from '@tremor/react';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { User } from 'next-auth/core/types';
import { Fragment } from 'react';
import Link from 'next/link';
import DarkModeButton from '@app/components/general/darkModeButton';

const navigation = [
  { name: 'Mis Pagos', href: '/paymonitor/' },
  { name: 'Mis Cobros', href: '/paymonitor/cobros' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = ({ user }: { user: User | undefined }) => {
  const pathname = usePathname();

  return (
    <Disclosure as='nav' className='bg-white dark:bg-gray-800/25 w-full z-50'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div className='relative flex h-16 justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>

              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8'>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={{
                        pathname: item.href,
                      }}
                      className={classNames(
                        pathname === item.href
                          ? 'border-tremor-content-emphasis text-tremor-content dark:text-dark-tremor-content dark:border-dark-tremor-content-emphasis'
                          : 'border-transparent hover:border-tremor-content-emphasis text-tremor-content-strong dark:text-dark-tremor-content-strong hover:dark:border-dark-tremor-content-emphasis',
                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                      )}
                      aria-current={pathname === item.href ? 'page' : undefined}>
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <DarkModeButton />
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                {/* Profile dropdown */}
                {user ? (
                  <Menu as='div' className='relative ml-3'>
                    <div>
                      <Menu.Button className='overflow-hidden flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                        <span className='sr-only'>Open user menu</span>
                        <Image
                          alt={'avatar-image'}
                          height={32}
                          width={32}
                          src={user.image ? user.image : ''}
                          className='text-white h-8 w-8'></Image>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'>
                      <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                          <div className='block px-4 py-2 text-sm text-gray-700 '>
                            <Text className='p-auto'>{user.email}</Text>
                          </div>
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => signOut()}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}>
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Button onClick={() => signIn()}>Login</Button>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='space-y-1 px-2 pb-3 pt-2'>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as='a'
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? 'bg-slate-50 border-slate-500 text-slate-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}>
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
