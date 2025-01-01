'use client';

import { createNote } from '@/utils/api';
import { useRouter } from 'next/navigation';

interface NewNoteButtonProps {
  className?: string;
}

const NewNoteButton = ({ className = '' }: NewNoteButtonProps) => {
  const router = useRouter();

  const handleOnClick = async () => {
    const data = await createNote('New Note', 'Start typing...');
    if (data) {
      router.push(`/notes/${data.id}`);
      router.refresh();
    }
  };

  return (
    <div
      onClick={handleOnClick}
      className={`cursor-pointer min-w-[300px] m-2 p-3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700 ${className}`}
    >
      <div className="flex items-center justify-center h-full">
        <span className="text-2xl text-gray-600 dark:text-gray-300">
          + New Note
        </span>
      </div>
    </div>
  );
};

export default NewNoteButton;
