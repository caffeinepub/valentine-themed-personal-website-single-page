/**
 * Production asset smoke-check utility.
 * Preloads critical static assets and returns pass/fail diagnostics.
 */

interface AssetCheckResult {
  passed: boolean;
  failedAssets: string[];
  failedGroups: string[];
}

const CRITICAL_ASSETS = {
  backgrounds: [
    '/assets/generated/valentine-bg-texture.dim_1920x1080.png',
    '/assets/generated/heart-doodles.dim_1024x1024.png',
  ],
  userPhotos: [
    '/assets/user-photos/IMG_20260102_194134.jpg',
    '/assets/user-photos/IMG_20260214_032137.jpg',
    '/assets/user-photos/IMG_20250220_045805_370.jpg',
    '/assets/user-photos/IMG_20260214_040600.jpg',
    '/assets/user-photos/IMG_20260214_040639.jpg',
    '/assets/user-photos/IMG_20260214_032137-1.jpg',
  ],
  fallbacks: [
    '/assets/generated/memory-01.dim_1200x800.png',
    '/assets/generated/memory-02.dim_1200x800.png',
    '/assets/generated/memory-03.dim_1200x800.png',
    '/assets/generated/memory-04.dim_1200x800.png',
    '/assets/generated/memory-05.dim_1200x800.png',
    '/assets/generated/memory-06.dim_1200x800.png',
  ],
};

/**
 * Attempts to load a single image asset.
 * Returns true if successful, false otherwise.
 */
function checkAsset(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    const timeout = setTimeout(() => {
      img.src = '';
      resolve(false);
    }, 5000); // 5 second timeout

    img.onload = () => {
      clearTimeout(timeout);
      resolve(true);
    };

    img.onerror = () => {
      clearTimeout(timeout);
      resolve(false);
    };

    img.src = url;
  });
}

/**
 * Runs a smoke-check on all critical static assets.
 * Returns a result object with pass/fail status and diagnostics.
 */
export async function runAssetSmokeCheck(): Promise<AssetCheckResult> {
  const failedAssets: string[] = [];
  const failedGroups: string[] = [];

  // Check backgrounds
  const backgroundResults = await Promise.all(
    CRITICAL_ASSETS.backgrounds.map(async (url) => {
      const passed = await checkAsset(url);
      if (!passed) failedAssets.push(url);
      return passed;
    })
  );
  if (backgroundResults.some((r) => !r)) {
    failedGroups.push('Background textures');
  }

  // Check user photos
  const photoResults = await Promise.all(
    CRITICAL_ASSETS.userPhotos.map(async (url) => {
      const passed = await checkAsset(url);
      if (!passed) failedAssets.push(url);
      return passed;
    })
  );
  if (photoResults.some((r) => !r)) {
    failedGroups.push('Memory photos');
  }

  // Check fallback images
  const fallbackResults = await Promise.all(
    CRITICAL_ASSETS.fallbacks.map(async (url) => {
      const passed = await checkAsset(url);
      if (!passed) failedAssets.push(url);
      return passed;
    })
  );
  if (fallbackResults.some((r) => !r)) {
    failedGroups.push('Fallback images');
  }

  const allPassed = failedAssets.length === 0;

  return {
    passed: allPassed,
    failedAssets,
    failedGroups,
  };
}
