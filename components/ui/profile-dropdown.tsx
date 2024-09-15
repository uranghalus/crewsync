import { auth, signOut } from '@/lib/auth';
import React from 'react';

import { RiLogoutBoxLine, RiUser2Line } from 'react-icons/ri';
// import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { getInitials } from '@/lib/utils';
const ProfileDropdown = async () => {
  const session = await auth();
  const signoutHandler = async () => {
    'use server';
    await signOut();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          {session?.user.profileImage === null ? (
            <AvatarFallback>
              {getInitials(session?.user.name as string)}
            </AvatarFallback>
          ) : (
            <AvatarImage src={session?.user.profileImage} />
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="bg-gray-100">
          {/* My Account */}
          <p className="text-sm text-gray-500 dark:text-neutral-500">
            Signed in as
          </p>
          <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">
            {session?.user.name}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <RiUser2Line className="mr-2 h-4 w-4" />
            <Link href={'/profile'}>
              <span>Profile</span>
            </Link>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <RiLogoutBoxLine className="mr-2 h-4 w-4" />
          <form action={signoutHandler}>
            <button type="submit">Log out</button>
          </form>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
