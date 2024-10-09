/* eslint-disable @typescript-eslint/no-explicit-any */
import { department, users } from '@/lib/data/seeder';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/utils';

import { createHash } from 'crypto';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Seed Departments
    await prisma.department.createMany({
      data: department,
      skipDuplicates: true, // Skips inserting if the department already exists
    });

    // Seed Users
    for (const user of users) {
      const { password, departmentId, email, name } = user; // Extract password separately
      const { hash, salt } = await hashPassword(password);

      // Create a Gravatar URL based on the user's email hash
      const emailHash = createHash('md5')
        .update(user.email.trim().toLowerCase())
        .digest('hex');
      const profileImage = `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;

      await prisma.user.create({
        data: {
          name,
          email,
          role: 'ADMIN',
          departmentId,
          hash,
          salt,
          image: profileImage,
        },
      });
    }

    return NextResponse.json({ message: 'Seeding successful' });
  } catch (error: any) {
    console.error('Seeding error:', error.message); // Log the error message
    console.error('Error details:', error); // Log the full error object for more details
    return NextResponse.json({ error: 'Seeding failed' }, { status: 500 });
  }
}
