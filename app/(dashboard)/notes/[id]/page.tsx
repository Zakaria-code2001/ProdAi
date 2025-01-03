'use client';

import { useEffect, useState } from 'react';
import { getById, updateNote } from '@/utils/api';
import TextEditor from '@/components/textEditor'

const NotePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [entry, setEntry] = useState<{
    title: string;
    content: string;
    formatting?: { alignment: 'left' | 'center' | 'right' };
    continuedContent?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [showGenerated, setShowGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const resolveParams = async () => {
      try {
        const unwrappedParams = await params;
        setId(unwrappedParams.id);
      } catch (err) {
        console.error('Error resolving params:', err);
        setError('Invalid page parameters.');
      }
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (id) {
      const fetchNote = async () => {
        try {
          const fetchedEntry = await getById(id);
          setEntry(fetchedEntry);
        } catch (err) {
          console.error('Error fetching note:', err);
          setError('Note not found.');
        }
      };

      fetchNote();
    }
  }, [id]);

  const handleContentChange = (content: string) => {
    if (entry) {
      setEntry({ ...entry, content });
    }
  };

  const addGeneratedContent = () => {
    if (!entry?.continuedContent) return;

    setEntry((prevEntry) =>
      prevEntry
        ? {
            ...prevEntry,
            content: prevEntry.content + prevEntry.continuedContent,
            continuedContent: undefined,
          }
        : null
    );
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!entry) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-9xl p-6">
        <input
          type="text"
          value={entry.title}
          onChange={(e) => setEntry({ ...entry, title: e.target.value })}
          className="text-3xl font-bold w-full border-b-2 border-gray-200 py-2 px-1 mb-6 focus:outline-none focus:border-gray-400 transition-colors dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
          placeholder="Untitled Document"
        />

        <TextEditor
          content={entry.content}
          onContentChange={handleContentChange}
        />

        <div className="flex justify-end mt-4">
          <button
            onClick={async () => {
              try {
                if (id) {
                  await updateNote(id, {
                    title: entry.title,
                    content: entry.content,
                  });
                  alert('Note saved successfully!');
                }
              } catch (err) {
                console.error('Error saving note:', err);
                alert('Error saving note.');
              }
            }}
            className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Save
          </button>
          <button
            onClick={async () => {
              try {
                setIsGenerating(true);
                const response = await fetch('/api/continue-writing', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ content: entry.content }),
                });

                if (!response.ok) {
                  throw new Error('Failed to generate content');
                }

                const data = await response.json();

                if (data.error) {
                  throw new Error(data.error);
                }

                setEntry({
                  ...entry,
                  continuedContent: data.continuedContent,
                });
                setShowGenerated(true);
              } catch (err) {
                console.error('Error continuing generation:', err);
                alert('Error during generation continuation.');
              } finally {
                setIsGenerating(false);
              }
            }}
            disabled={isGenerating}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ml-2 disabled:opacity-50"
          >
            {isGenerating ? 'Generating...' : 'Continue Writing'}
          </button>
        </div>

        {showGenerated && entry.continuedContent && (
          <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Generated Content</h2>
              <button
                onClick={addGeneratedContent}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                Add Generated Text
              </button>
            </div>
            <p className="whitespace-pre-wrap text-gray-900 dark:text-gray-100">{entry.continuedContent}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotePage;
