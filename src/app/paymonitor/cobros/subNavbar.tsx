'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function classNames(...classes: string[]) {
   return classes.filter(Boolean).join(' ');
}

type typeNavLikns = {
   name: string;
   href: string;
};

const SubNavbar = ({ navlinks }: { navlinks: typeNavLikns[] }) => {
   const pathname = usePathname();

   return (
      <div className='mt-2 p-0 border-b border-gray-200'>
         <div className='flex flex-1 items-stretch sm:justify-start'>
            <div className='-my-px flex space-x-1 md:space-x-2 justify-start mr-auto flex-wrap'>
               {navlinks.map((item) => (
                  <Link
                     key={item.name}
                     href={{
                        pathname: item.href,
                     }}
                     className={classNames(
                        pathname === item.href
                           ? 'border-blue-500 text-blue-500'
                           : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                        'inline-flex items-center px-1 border-b-2 font-medium h-12 text-xs md:text-sm',
                     )}
                     aria-current={pathname === item.href ? 'page' : undefined}
                  >
                     {item.name}
                  </Link>
               ))}
            </div>
         </div>
      </div>
   );
};

export default SubNavbar;
