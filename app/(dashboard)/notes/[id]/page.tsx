// filepath: /Users/zakariamohammadi/Desktop/prodai/app/(dashboard)/notes/[id]/page.tsx
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
  Plus,
} from 'lucide-react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import OrderedList from '@tiptap/extension-ordered-list';

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

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Inizia a scrivere...',
      }),
      OrderedList,
    ],
    content: entry?.content || '',
    onUpdate: ({ editor }) => {
      if (entry) {
        setEntry({ ...entry, content: editor.getHTML() });
      }
    },
  });

  useEffect(() => {
    params.then((unwrappedParams) => {
      setId(unwrappedParams.id);
    });
  }, [params]);

  useEffect(() => {
    if (id) {
      const fetchNote = async () => {
        try {
          const fetchedEntry = await getById(id);
          setEntry(fetchedEntry);
          editor?.commands.setContent(fetchedEntry.content);
        } catch (err) {
          console.error('Error fetching note:', err);
          setError('Note not found.');
        }
      };

      fetchNote();
    }
  }, [id, editor]);

  const addGeneratedContent = () => {
    if (!entry?.continuedContent || !editor) return;

    editor.chain().focus().insertContent(entry.continuedContent).run();
    setEntry({
      ...entry,
      continuedContent: undefined,
    });
    setShowGenerated(false);
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
          className="text-3xl font-bold w-full border-b-2 border-gray-200 py-2 px-1 mb-6 focus:outline-none focus:border-gray-400 transition-colors"
          placeholder="Untitled Document"
        />

        <div className="flex items-center space-x-4 mb-4 p-2 border-b border-gray-200">
          <button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Bold"
          >
            <Bold size={20} />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Italic"
          >
            <Italic size={20} />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleUnderline?.().run()}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Underline"
          >
            <Underline size={20} />
          </button>
          <div className="h-6 w-px bg-gray-300 mx-2" />
          <button
            onClick={() => editor?.chain().focus().setTextAlign('left').run()}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Align Left"
          >
            <AlignLeft size={20} />
          </button>
          <button
            onClick={() => editor?.chain().focus().setTextAlign('center').run()}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Align Center"
          >
            <AlignCenter size={20} />
          </button>
          <button
            onClick={() => editor?.chain().focus().setTextAlign('right').run()}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Align Right"
          >
            <AlignRight size={20} />
          </button>
        </div>

        <EditorContent
          editor={editor}
          className="w-full min-h-[700px] p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors resize-none"
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
          <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Generated Content</h2>
              <button
                onClick={addGeneratedContent}
                className="flex items-center px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                <Plus size={16} className="mr-1" /> Add to Note
              </button>
            </div>
            <p className="whitespace-pre-wrap">{entry.continuedContent}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotePage;
