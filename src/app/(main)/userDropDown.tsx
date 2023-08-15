import { Fragment } from 'react';
import Image from 'next/image';
import { signIn, signOut } from 'next-auth/react';
import { classNames } from '@app/libs/className';
import { Text } from '@tremor/react';
import { Menu, Transition } from '@headlessui/react';
import { User } from 'next-auth/core/types';

export default async function UserDropDown({ user }: { user: User }) {
  return (
    <Menu as='div' className='relative ml-3'>
      <div>
        <Menu.Button className='overflow-hidden flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
          <span className='sr-only'>Open user menu</span>
          <Image
            alt={'avatar-image'}
            height={32}
            width={32}
            src={user.image ?? ''}
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
              <Text className='p-auto'>{user.email ?? 'email@gmail.com'}</Text>
            </div>
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => signOut()}
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700 w-full'
                )}>
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export function UserDropDownSkeleton() {
  return (
    <div className='overflow-hidden flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 h-8 w-8 animate-pulse'>
      <span className='sr-only'>User Drop Down Skeleton</span>
    </div>
  );
}
