import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth/auth';
import { logoutService } from '@/lib/services/auth-services';
import React from 'react';

const Settings = async () => {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}

      <form action={logoutService}>
        <Button>Logout</Button>
      </form>
    </div>
  );
};

export default Settings;
