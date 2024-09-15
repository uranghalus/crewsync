'use client';
import React from 'react';
import { Button } from './ui/button';
import { FcGoogle } from 'react-icons/fc';
import { RiGithubFill } from 'react-icons/ri';
import { signIn } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '@/lib/routes';

const SocialMedia = () => {
  const socialsLogin = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex items-center mt-6 gap-3">
      <Button
        variant={'outline'}
        className="w-full"
        onClick={() => socialsLogin('google')}
      >
        <FcGoogle className="w-4 h-4 mx-2 fill-current" /> Sign in with Google
      </Button>
      <Button
        size={'icon'}
        variant={'default'}
        className="bg-[#24292F] hover:bg-[#24292F]/90 text-white"
        onClick={() => socialsLogin('github')}
      >
        <RiGithubFill className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default SocialMedia;
