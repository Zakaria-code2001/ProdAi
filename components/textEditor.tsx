import React, { useRef, useEffect } from 'react';

interface TextEditorProps {
  content: string;
  onContentChange: (content: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ content, onContentChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  // Sync the content prop with the editor content
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  const applyFormatting = (command: string, value: string | undefined = undefined) => {
    if (!editorRef.current) return;

    editorRef.current.focus();
    document.execCommand(command, false, value);

    // Ensure we update the content after formatting
    const newContent = editorRef.current.innerHTML;
    onContentChange(newContent);
  };

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.innerHTML;
    onContentChange(newContent);
  };

  return (
    <div className="w-full max-w-xl overflow-hidden rounded-xl border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600">
      <div id="hs-editor-tiptap">
        <div className="m-1 flex items-center gap-1 rounded-lg bg-gray-100 dark:bg-gray-700 p-1">
          {[
            { icon: BoldIcon, command: "bold", label: "Bold" },
            { icon: ItalicIcon, command: "italic", label: "Italic" },
            { icon: UnderlineIcon, command: "underline", label: "Underline" },
            { icon: StrikeIcon, command: "strikeThrough", label: "Strikethrough" },
            { icon: LinkIcon, command: "createLink", label: "Link" },
            { icon: OrderedListIcon, command: "insertOrderedList", label: "Ordered List" },
            { icon: UnorderedListIcon, command: "insertUnorderedList", label: "Unordered List" },
          ].map(({ icon: Icon, command, label }) => (
            <button
              key={label}
              className="relative grid h-10 w-10 select-none place-items-center rounded-lg text-gray-900 dark:text-gray-100 transition hover:bg-gray-900/10 active:bg-gray-900/20 disabled:opacity-50"
              type="button"
              onMouseDown={(e) => e.preventDefault()} // Prevent editor from losing focus
              onClick={() => {
                if (command === 'createLink') {
                  const url = prompt('Enter URL:');
                  if (url) applyFormatting(command, url);
                } else {
                  applyFormatting(command);
                }
              }}
              aria-label={label}
            >
              <Icon />
            </button>
          ))}
        </div>
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          className="w-full p-4 min-h-[200px] focus:outline-none overflow-auto whitespace-pre-wrap text-gray-900 dark:text-gray-100"
          style={{
            width: "1000px", // Set a specific width
            maxWidth: "100%",
            minHeight: "200px",       // Minimum height
            maxHeight: "300px",       // Maximum height for fixed size
            overflowY: "auto",
            direction: 'ltr',
            textAlign: 'left',
            lineHeight: '1.5',
          }}
        />
      </div>
    </div>
  );
};

// Icon components remain exactly the same
const BoldIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor"
  >
    <path
      d="M12 11.6667H8M12 11.6667C12 11.6667 15.3333 11.6667 15.3333 8.33333C15.3333 5.00002 12 5 12 5C12 5 12 5 12 5H8.6C8.26863 5 8 5.26863 8 5.6V11.6667M12 11.6667C12 11.6667 16 11.6667 16 15.3333C16 19 12 19 12 19C12 19 12 19 12 19H8.6C8.26863 19 8 18.7314 8 18.4V11.6667"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const ItalicIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor"
  >
    <path
      d="M19 4h-9M14 20H5M14 4l-4 16"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const UnderlineIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor"
  >
    <path
      d="M12 4v10M12 14c3.314 0 6-2.686 6-6V4M12 14c-3.314 0-6-2.686-6-6V4M4 20h16"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const StrikeIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor"
  >
    <path
      d="M5 12h14M7 6c.4-.582 1.89-2 5-2 3.5 0 5 1.5 5 3M8 18c-.4.582-1.89 2-5 2-3.5 0-5-1.5-5-3"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const LinkIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor"
  >
    <path
      d="M14 10a3 3 0 013-3h1a3 3 0 010 6h-1a3 3 0 01-3-3zM6 14a3 3 0 01-3-3H2a3 3 0 000 6h1a3 3 0 003-3zm2.5-2.5l3.5 3.5M8.5 8l3.5 3.5"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const OrderedListIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor"
  >
    <path
      d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const UnorderedListIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor"
  >
    <path
      d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

export default TextEditor;
