import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Edit, Plus, Trash2, Upload, RotateCcw, Image as ImageIcon, Rocket } from 'lucide-react';
import { ValentineContent } from '@/valentine/types';
import { useState, useRef, ChangeEvent } from 'react';
import { validateProductionSlug } from '@/utils/validateProductionSlug';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

interface EditPanelProps {
  content: ValentineContent;
  onUpdate: (content: ValentineContent) => void;
  memoryImages: string[];
  onImageChange: (index: number, file: File) => void;
  onImageReset: (index: number) => void;
  isCustomImage: (index: number) => boolean;
}

export function EditPanel({ 
  content, 
  onUpdate, 
  memoryImages, 
  onImageChange, 
  onImageReset,
  isCustomImage 
}: EditPanelProps) {
  const [localContent, setLocalContent] = useState(content);
  const [productionSlug, setProductionSlug] = useState('');
  const [slugError, setSlugError] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Normalize memoryCaptions to always have exactly 6 slots
  const normalizedCaptions = [...localContent.memoryCaptions];
  while (normalizedCaptions.length < 6) {
    normalizedCaptions.push('');
  }
  if (normalizedCaptions.length > 6) {
    normalizedCaptions.length = 6;
  }

  const handleSave = () => {
    onUpdate(localContent);
  };

  const handlePublish = () => {
    const validation = validateProductionSlug(productionSlug);
    
    if (!validation.valid) {
      setSlugError(validation.error);
      return;
    }

    // Clear any previous errors
    setSlugError('');
    setIsPublishing(true);

    // TODO: Implement actual publish logic here
    // For now, just simulate the publish action
    console.log('Publishing to production with slug:', productionSlug);
    
    // Simulate async operation
    setTimeout(() => {
      setIsPublishing(false);
      alert(`Ready to publish Version 9 with slug: ${productionSlug}`);
    }, 1000);
  };

  const handleSlugChange = (value: string) => {
    setProductionSlug(value);
    // Clear error when user starts typing
    if (slugError) {
      setSlugError('');
    }
  };

  const addReason = () => {
    setLocalContent({
      ...localContent,
      reasons: [...localContent.reasons, 'New reason...']
    });
  };

  const removeReason = (index: number) => {
    setLocalContent({
      ...localContent,
      reasons: localContent.reasons.filter((_, i) => i !== index)
    });
  };

  const updateReason = (index: number, value: string) => {
    const newReasons = [...localContent.reasons];
    newReasons[index] = value;
    setLocalContent({ ...localContent, reasons: newReasons });
  };

  const updateCaption = (index: number, value: string) => {
    const newCaptions = [...normalizedCaptions];
    newCaptions[index] = value;
    setLocalContent({ ...localContent, memoryCaptions: newCaptions });
  };

  const handleFileSelect = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageChange(index, file);
    }
  };

  const triggerFileInput = (index: number) => {
    fileInputRefs.current[index]?.click();
  };

  // Ensure we render exactly 6 memory photo rows
  const memorySlots = Array.from({ length: 6 }, (_, i) => i);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          size="lg"
          className="fixed bottom-6 right-6 z-50 rounded-full shadow-romantic hover:shadow-xl transition-all duration-300"
        >
          <Edit className="w-5 h-5 mr-2" />
          Edit Content
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle className="text-2xl font-serif">Personalize Your Valentine</SheetTitle>
          <SheetDescription>
            Edit the content to make this page uniquely yours. Changes are saved automatically.
          </SheetDescription>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-180px)] pr-4 mt-6">
          <div className="space-y-6">
            {/* Publish Section */}
            <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
              <div className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg">Publish Version 9</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Enter a production slug to publish your Valentine site live.
              </p>
              
              <div>
                <Label htmlFor="production-slug">Production Slug</Label>
                <Input
                  id="production-slug"
                  value={productionSlug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="my-valentine-2026"
                  className={slugError ? 'border-destructive' : ''}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  5–50 characters: letters, numbers, and hyphens only
                </p>
              </div>

              {slugError && (
                <Alert variant="destructive">
                  <AlertDescription>{slugError}</AlertDescription>
                </Alert>
              )}

              <Button 
                onClick={handlePublish} 
                disabled={isPublishing}
                className="w-full"
              >
                {isPublishing ? (
                  <>Publishing...</>
                ) : (
                  <>
                    <Rocket className="w-4 h-4 mr-2" />
                    Publish to Production
                  </>
                )}
              </Button>
            </div>

            <Separator />

            {/* Names */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="recipient">Recipient Name</Label>
                <Input
                  id="recipient"
                  value={localContent.recipientName}
                  onChange={(e) => setLocalContent({ ...localContent, recipientName: e.target.value })}
                  placeholder="My Love"
                />
              </div>
              
              <div>
                <Label htmlFor="sender">Your Name</Label>
                <Input
                  id="sender"
                  value={localContent.senderName}
                  onChange={(e) => setLocalContent({ ...localContent, senderName: e.target.value })}
                  placeholder="Your Valentine"
                />
              </div>
            </div>

            {/* Hero Headline */}
            <div>
              <Label htmlFor="headline">Hero Headline</Label>
              <Textarea
                id="headline"
                value={localContent.heroHeadline}
                onChange={(e) => setLocalContent({ ...localContent, heroHeadline: e.target.value })}
                placeholder="Your romantic headline..."
                rows={2}
              />
            </div>

            {/* Love Letter */}
            <div>
              <Label htmlFor="letter">Love Letter</Label>
              <Textarea
                id="letter"
                value={localContent.loveLetterBody}
                onChange={(e) => setLocalContent({ ...localContent, loveLetterBody: e.target.value })}
                placeholder="Write your heartfelt message..."
                rows={12}
                className="font-serif"
              />
            </div>

            {/* Reasons */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label>Reasons I Love You</Label>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={addReason}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
              <div className="space-y-3">
                {localContent.reasons.map((reason, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={reason}
                      onChange={(e) => updateReason(index, e.target.value)}
                      placeholder={`Reason ${index + 1}`}
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeReason(index)}
                      disabled={localContent.reasons.length <= 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Memory Photos */}
            <div>
              <Label className="mb-3 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Memory Photos
              </Label>
              <p className="text-xs text-muted-foreground mb-4">
                Click to replace any photo with your own image
              </p>
              <div className="space-y-4">
                {memorySlots.map((index) => {
                  const src = memoryImages[index] || '/assets/generated/memory-01.dim_1200x800.png';
                  const caption = normalizedCaptions[index] || '';
                  
                  return (
                    <div key={index} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="relative w-20 h-20 rounded overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={src}
                            alt={`Memory ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium mb-1">Photo {index + 1}</p>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => triggerFileInput(index)}
                              className="flex-1"
                            >
                              <Upload className="w-3 h-3 mr-1" />
                              Upload
                            </Button>
                            {isCustomImage(index) && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => onImageReset(index)}
                              >
                                <RotateCcw className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                      <Input
                        placeholder="Add a caption (optional)"
                        value={caption}
                        onChange={(e) => updateCaption(index, e.target.value)}
                        className="text-sm"
                      />
                      <input
                        ref={(el) => {
                          fileInputRefs.current[index] = el;
                        }}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileSelect(index, e)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-background">
          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
