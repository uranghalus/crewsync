import Link from 'next/link';
import React from 'react';
import { RiNotification4Line } from 'react-icons/ri';
import { Button } from './button';
import { Menu } from './menu';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ValeraFont } from '@/lib/fonts';

const Sidebar = () => {
  return (
    <aside className="hidden border-r bg-white md:block ">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              src={'/logo/Logo_192x192.png'}
              alt={'Logo'}
              className=" p-2 items-center justify-center bg-white rounded-lg shadow-md w-10"
              width={100}
              height={100}
            />
            <div className="ml-2 flex items-start flex-col flex-wrap">
              <span
                className={cn(
                  'font-extrabold text-gray-700 text-xl ',
                  ValeraFont.variable
                )}
              >
                Crew<span className="text-primer-700">Sync</span>
              </span>
            </div>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <RiNotification4Line className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <Menu isOpen />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
