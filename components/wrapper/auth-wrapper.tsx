import { MontserratFont, ValeraFont } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { ChildrenProps } from '@/types/childrenprops';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import SocialMedia from '../social-media';

interface CardWrapper extends ChildrenProps {
  backButtonLabel: string;
  backButtonHeader: string;
  backButtonHref: string;
  showSocial?: boolean;
  className: string;
}
const AuthWrapper: React.FC<CardWrapper> = ({
  backButtonHref,
  backButtonLabel,
  backButtonHeader,
  children,
  className,
}) => {
  return (
    <section className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen bg-gray-100 p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-montserrat)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Card className={cn('shadow-lg bg-white m-auto mx-auto', className)}>
          <CardHeader className="flex justify-center items-center mx-auto">
            <div className="flex justify-center items-center mx-auto">
              <Image
                src={
                  'https://utfs.io/f/Law7qW5D9VWFiJA3T6XDUwICKtoSTeBzqAVc80MsFHa5O9nG'
                }
                alt={'Logo'}
                className=" p-2 items-center justify-center bg-white rounded-lg shadow-md w-12"
                width={100}
                height={100}
                unoptimized
              />
              <div className="ml-2 flex items-start flex-col flex-wrap">
                <span
                  className={cn(
                    'font-extrabold text-gray-700 text-2xl ',
                    ValeraFont.variable
                  )}
                >
                  Crew<span className="text-primer-700">Sync</span>
                </span>
                <div className="text-xs font-medium text-gray-600">
                  Powered by Tata Optima Properti
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {children}
            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

              <Link
                href="#"
                className={cn(
                  'text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline font-medium',
                  MontserratFont.className
                )}
              >
                or continue with
              </Link>

              <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
            </div>
            <SocialMedia />

            <p className="mt-8 text-xs font-medium text-center text-gray-600">
              {backButtonHeader}
              <Link
                href={backButtonHref as string}
                className="font-semibold text-primer-700 dark:text-gray-200 hover:underline"
              >
                {backButtonLabel}
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </section>
  );
};

export default AuthWrapper;
