
import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { Bold, Italic, Underline as UnderlineIcon, ListOrdered, List, Heading1, Heading2, Undo, Redo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  placeholder = "Escreva suas memórias de viagem aqui...",
}) => {
  const isMobile = useIsMobile();
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
    ],
    content,
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[200px] prose prose-sm sm:prose lg:prose-lg max-w-none',
        'data-placeholder': placeholder,
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  const toolbarItems = [
    {
      icon: <Bold className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
      tooltip: "Negrito"
    },
    {
      icon: <Italic className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
      tooltip: "Itálico"
    },
    {
      icon: <UnderlineIcon className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive('underline'),
      tooltip: "Sublinhado"
    },
    {
      icon: <Heading1 className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive('heading', { level: 2 }),
      tooltip: "Título"
    },
    {
      icon: <Heading2 className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive('heading', { level: 3 }),
      tooltip: "Subtítulo"
    },
    {
      icon: <List className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
      tooltip: "Lista"
    },
    {
      icon: <ListOrdered className="h-4 w-4" />,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
      tooltip: "Lista Numerada"
    },
    {
      icon: <Undo className="h-4 w-4" />,
      action: () => editor.chain().focus().undo().run(),
      isActive: false,
      tooltip: "Desfazer"
    },
    {
      icon: <Redo className="h-4 w-4" />,
      action: () => editor.chain().focus().redo().run(),
      isActive: false,
      tooltip: "Refazer"
    },
  ];

  return (
    <div className="border rounded-md overflow-hidden shadow-sm bg-white dark:bg-gray-900">
      <div className="bg-muted p-2 flex flex-wrap gap-1 border-b">
        {toolbarItems.map((item, index) => (
          <Button
            key={index}
            type="button"
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 w-8 p-0",
              item.isActive && "bg-accent text-accent-foreground"
            )}
            onClick={item.action}
            title={item.tooltip}
          >
            {item.icon}
          </Button>
        ))}
      </div>
      <EditorContent editor={editor} className="p-4" />
    </div>
  );
};

export default RichTextEditor;
