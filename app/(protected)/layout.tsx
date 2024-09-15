import Navbar from '@/components/ui/navbar';
import Sidebar from '@/components/ui/sidebar';
import { ChildrenProps } from '@/types/childrenprops';
import React from 'react';

const AdminLayout: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
