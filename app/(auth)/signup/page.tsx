import React from 'react';
import SignupForm from './signup-form';
import AuthWrapper from '@/components/wrapper/auth-wrapper';

const SignupPage = () => {
  return (
    <AuthWrapper
      backButtonHeader="Sudah Punya Akun ?"
      backButtonLabel="Masuk Disini"
      backButtonHref="/"
      className="w-96"
    >
      <SignupForm />
    </AuthWrapper>
  );
};

export default SignupPage;
