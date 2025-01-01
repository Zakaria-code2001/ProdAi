'use client';

import { useEffect, useState } from 'react';
import { getById, updateNote } from '@/utils/api';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from 'lucide-react';

const NotePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [entry, setEntry] = useState<{
    title: string;
    content: string;
    formatting?: { alignment: 'left' | 'center' | 'right' };
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    params.then((unwrappedParams) => {
      setId(unwrappedParams.id);
    });
  }, [params]);

  const handleFormat = (type: 'bold' | 'italic' | 'underline') => {
    if (!entry) return;

    const textArea = document.getElementById('editor') as HTMLTextAreaElement;
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const selection = entry.content.substring(start, end);

    if (selection) {
      let newContent = entry.content;
      switch (type) {
        case 'bold':
          newContent =
            entry.content.substring(0, start) +
            `**${selection}**` +
            entry.content.substring(end);
          break;
        case 'italic':
          newContent =
            entry.content.substring(0, start) +
            `*${selection}*` +
            entry.content.substring(end);
          break;
        case 'underline':
          newContent =
            entry.content.substring(0, start) +
            `_${selection}_` +
            entry.content.substring(end);
          break;
      }
      setEntry({ ...entry, content: newContent });
    }
  };

  useEffect(() => {
    if (id) {
      const fetchNote = async () => {
        try {
          const fetchedEntry = await getById(id);
          setEntry(fetchedEntry);
        } catch (err) {
          console.error('Error fetching note:', err);
          setError('Nota non trovata.');
        }
      };

      fetchNote();
    }
  }, [id]);

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
          className="text-3xl font-bold w-full border-b-2 border-gray-200 py-2 px-1 mb-6 focus:outline-none focus:border-gray-400 transition-colors"
          placeholder="Untitled Document"
        />

        <div className="flex items-center space-x-4 mb-4 p-2 border-b border-gray-200">
          <button
            onClick={() => handleFormat('bold')}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Bold"
          >
            <Bold size={20} />
          </button>
          <button
            onClick={() => handleFormat('italic')}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Italic"
          >
            <Italic size={20} />
          </button>
          <button
            onClick={() => handleFormat('underline')}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Underline"
          >
            <Underline size={20} />
          </button>
          <div className="h-6 w-px bg-gray-300 mx-2" />
          <button
            onClick={() =>
              setEntry({
                ...entry,
                formatting: { ...entry.formatting!, alignment: 'left' },
              })
            }
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Align Left"
          >
            <AlignLeft size={20} />
          </button>
          <button
            onClick={() =>
              setEntry({
                ...entry,
                formatting: { ...entry.formatting!, alignment: 'center' },
              })
            }
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Align Center"
          >
            <AlignCenter size={20} />
          </button>
          <button
            onClick={() =>
              setEntry({
                ...entry,
                formatting: { ...entry.formatting!, alignment: 'right' },
              })
            }
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Align Right"
          >
            <AlignRight size={20} />
          </button>
        </div>

        <textarea
          id="editor"
          value={entry.content}
          onChange={(e) => setEntry({ ...entry, content: e.target.value })}
          className={`w-full min-h-[700px] p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors resize-none text-${entry.formatting?.alignment}`}
          placeholder="Start typing..."
          style={{ width: '100%', minWidth: '1000px' }}
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
                  alert('Nota salvata con successo!');
                } else {
                  alert('Errore: ID non valido.');
                }
                alert('Nota salvata con successo!');
              } catch (err) {
                console.error('Error saving note:', err);
                alert('Errore durante il salvataggio della nota.');
              }
            }}
            className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Salva
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotePage;
