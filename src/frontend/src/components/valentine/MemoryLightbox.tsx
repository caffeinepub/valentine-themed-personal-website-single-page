import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MemoryLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  caption?: string;
}

export function MemoryLightbox({ isOpen, onClose, imageSrc, caption }: MemoryLightboxProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-[95vw] p-0 bg-black/95 border-none">
        <DialogClose asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 rounded-full"
          >
            <X className="w-6 h-6" />
          </Button>
        </DialogClose>
        
        <div className="relative flex items-center justify-center min-h-[60vh] max-h-[90vh] p-8">
          <img
            src={imageSrc}
            alt={caption || 'Memory'}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
          {caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-white text-center text-lg font-medium">
                {caption}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
