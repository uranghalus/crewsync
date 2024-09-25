import AuthWrapper from '@/components/wrapper/auth-wrapper';
import SigninForm from './signin-form';

export default function Page() {
  return (
    <AuthWrapper
      backButtonHeader="Belum Punya Akun ?"
      backButtonLabel="Daftar Disini"
      backButtonHref="/signup"
      className="w-96"
    >
      <SigninForm />
    </AuthWrapper>
  );
}
