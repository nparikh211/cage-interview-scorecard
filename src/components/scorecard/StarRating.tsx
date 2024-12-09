import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  category: string;
  rating: number;
  darkMode: boolean;
  onRatingClick: (rating: number) => void;
}

export function StarRating({ category, rating, darkMode, onRatingClick }: StarRatingProps) {
  return (
    <div className="flex gap-1 items-center star-rating flex-nowrap min-w-[150px] justify-end">
      {[1, 2, 3, 4, 5].map((value) => (
        <Button
          key={value}
          variant="ghost"
          size="sm"
          type="button"
          style={{ 
            backgroundColor: 'transparent', 
            boxShadow: 'none',
            border: 'none',
            outline: 'none',
            padding: '4px'
          }}
          onClick={() => onRatingClick(rating === value ? 0 : value)}
          className={cn(
            'hover:bg-transparent border-0 shadow-none min-w-0',
            value <= rating
              ? darkMode
                ? 'text-amber-300'
                : 'text-amber-400'
              : darkMode
              ? 'text-gray-600'
              : 'text-gray-300',
            'focus:ring-0 focus:ring-offset-0 focus:shadow-none'
          )}
        >
          <Star className={`h-4 w-4 md:h-5 md:w-5 ${value <= rating ? 'fill-current' : ''}`} />
        </Button>
      ))}
      <span className="ml-2 text-sm">
        {rating > 0 ? `${rating}/5` : ''}
      </span>
    </div>
  );
}