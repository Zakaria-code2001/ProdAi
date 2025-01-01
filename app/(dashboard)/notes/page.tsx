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
      <div className="flex flex-row overflow-x-auto">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="min-w-[300px] m-2 p-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700"
          >
            <a href={`/notes/${entry.id}`} className="block group">
              <h5 className="mb-1.5 text-lg font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-gray-700">
                {entry.title}
              </h5>
            </a>
            <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
              {entry.content}
            </p>
            <a
              href={`/notes/${entry.id}`}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded hover:bg-gray-700 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Read more
              <svg
                className="w-3 h-3 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </>
  );
};
export default NotesPage;
