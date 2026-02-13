import { useRef, useState, useEffect } from 'react';
import { ValentineLayout } from '@/components/valentine/ValentineLayout';
import { HeroSection } from '@/components/valentine/HeroSection';
import { LoveLetterSection } from '@/components/valentine/LoveLetterSection';
import { MemoriesSection } from '@/components/valentine/MemoriesSection';
import { ReasonsSection } from '@/components/valentine/ReasonsSection';
import { FooterSection } from '@/components/valentine/FooterSection';
import { EditPanel } from '@/components/valentine/EditPanel';
import { DeploymentHealthOverlay } from '@/components/valentine/DeploymentHealthOverlay';
import { PublishBlockedScreen } from '@/components/valentine/PublishBlockedScreen';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { useMemoryImages } from '@/hooks/useMemoryImages';
import { defaultContent } from '@/valentine/contentDefaults';
import { ValentineContent } from '@/valentine/types';
import { runAssetSmokeCheck } from '@/utils/assetSmokeCheck';

function App() {
  const [content, setContent] = useLocalStorageState<ValentineContent>(
    'valentine-content',
    defaultContent
  );

  const { images, setImage, resetImage, isCustom } = useMemoryImages();

  const letterRef = useRef<HTMLElement>(null);

  // Check for publish-block flag (injected at build time)
  const publishBlockReason = import.meta.env.VITE_PUBLISH_BLOCK_REASON;

  // Asset smoke-check state
  const [assetCheckComplete, setAssetCheckComplete] = useState(false);
  const [assetCheckPassed, setAssetCheckPassed] = useState(false);
  const [failedAssets, setFailedAssets] = useState<string[]>([]);
  const [failedGroups, setFailedGroups] = useState<string[]>([]);

  useEffect(() => {
    // Skip asset check if publish is blocked
    if (publishBlockReason) {
      return;
    }

    // Run asset smoke-check on mount
    runAssetSmokeCheck().then((result) => {
      setAssetCheckPassed(result.passed);
      setFailedAssets(result.failedAssets);
      setFailedGroups(result.failedGroups);
      setAssetCheckComplete(true);

      if (!result.passed) {
        console.error('Asset smoke-check failed:', {
          failedGroups: result.failedGroups,
          failedAssets: result.failedAssets,
        });
      }
    });
  }, [publishBlockReason]);

  const scrollToLetter = () => {
    letterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Show publish blocked screen if flag is set
  if (publishBlockReason) {
    return <PublishBlockedScreen reason={publishBlockReason} />;
  }

  // Show deployment health overlay if asset check failed
  if (assetCheckComplete && !assetCheckPassed) {
    return <DeploymentHealthOverlay failedGroups={failedGroups} failedAssets={failedAssets} />;
  }

  // Show loading state while checking assets
  if (!assetCheckComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 dark:from-rose-950 dark:via-pink-950 dark:to-red-950">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Render normal Valentine SPA if all checks pass
  return (
    <ValentineLayout>
      <HeroSection 
        headline={content.heroHeadline}
        onScrollToLetter={scrollToLetter}
      />
      
      <LoveLetterSection
        ref={letterRef}
        recipientName={content.recipientName}
        senderName={content.senderName}
        letterBody={content.loveLetterBody}
      />
      
      <MemoriesSection images={images} captions={content.memoryCaptions} />
      
      <ReasonsSection reasons={content.reasons} />
      
      <FooterSection senderName={content.senderName} />
      
      <EditPanel 
        content={content} 
        onUpdate={setContent}
        memoryImages={images}
        onImageChange={setImage}
        onImageReset={resetImage}
        isCustomImage={isCustom}
      />
    </ValentineLayout>
  );
}

export default App;
