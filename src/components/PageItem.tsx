
import React from 'react';
import { Page } from '@/types/travel-journal';
import { cn } from '@/lib/utils';
import { File, X, Edit } from 'lucide-react';
import { useJournal } from '@/contexts/JournalContext';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PageItemProps {
  page: Page;
  countryId: string;
  cityId: string;
  onClick?: () => void;
}

const PageItem: React.FC<PageItemProps> = ({ page, countryId, cityId, onClick }) => {
  const { setActivePage, state, deletePage } = useJournal();
  const isActive = state.activePage === page.id;

  const handleClick = () => {
    setActivePage(page.id);
    if (onClick) onClick();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Deseja realmente excluir a memória "${page.title}"?`)) {
      deletePage(countryId, cityId, page.id);
    }
  };

  const updatedTimeAgo = formatDistanceToNow(new Date(page.updatedAt), {
    addSuffix: true,
    locale: ptBR
  });

  // Extract the first few characters of content without HTML tags
  const previewContent = page.content
    ? page.content.replace(/<[^>]*>/g, '').substring(0, 100) + (page.content.length > 100 ? '...' : '')
    : 'Sem conteúdo';

  // Calculate rough word count
  const wordCount = page.content
    ? page.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length
    : 0;

  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-all cursor-pointer group',
        isActive ? 'border-l-4 border-primary-400' : ''
      )}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold group-hover:text-primary-600 transition-colors">{page.title}</h3>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
            onClick={handleDelete}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
      <p className="text-gray-600 text-sm line-clamp-3 mb-3">{previewContent}</p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Atualizado {updatedTimeAgo}</span>
        <span>{wordCount} palavras</span>
      </div>
    </div>
  );
};

export default PageItem;
