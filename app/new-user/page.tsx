import { prisma } from '@/utils/db';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const createNewUser = async () => {
  const user = await currentUser();
  console.log('Current user:', user);

  if (!user?.id) {
    throw new Error('User ID is undefined');
  }

  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id as string,
    },
  });

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
      },
    });
  }

  redirect('/notes');
};

export default async function NewUser() {
  await createNewUser();
  return <div>...loading</div>;
}
