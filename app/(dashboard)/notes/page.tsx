import { getUserFromClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';

const getEntries = async () => {
  const user = await getUserFromClerkID();
  const entries = await prisma.notesEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return entries;
};

const NotesPage = async () => {
  const entries = await getEntries();
  console.log(entries);
  return (
    <>

    <h2 className="scroll-m-20 p-2 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      Notes
    </h2>
    <div className="max-w-xs m-2 p-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700">
      <a href="#" className="block group">
        <h5 className="mb-1.5 text-lg font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-gray-700">
          Noteworthy technology acquisitions 2021
        </h5>
      </a>
      <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
      </p>
      <a 
        href="#" 
        className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded hover:bg-gray-700 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        Read more
        <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
      </a>
    </div>
    </>
  );
};

export default NotesPage;
