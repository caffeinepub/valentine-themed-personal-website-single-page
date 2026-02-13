import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DeploymentHealthOverlayProps {
  failedGroups: string[];
  failedAssets: string[];
}

export function DeploymentHealthOverlay({ failedGroups, failedAssets }: DeploymentHealthOverlayProps) {
  const hasFailedGroups = failedGroups.length > 0;
  const hasFailedAssets = failedAssets.length > 0;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 dark:from-rose-950 dark:via-pink-950 dark:to-red-950">
      <Card className="max-w-2xl w-full shadow-romantic">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <div>
              <CardTitle className="text-2xl">Deployment Health Check Failed</CardTitle>
              <CardDescription className="mt-1">
                Some critical assets could not be loaded from the deployed origin.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {hasFailedGroups && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Asset Loading Error</AlertTitle>
              <AlertDescription>
                The following asset groups failed to load: <strong>{failedGroups.join(', ')}</strong>
              </AlertDescription>
            </Alert>
          )}

          {hasFailedAssets && (
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-muted-foreground">Failed Assets:</h3>
              <ScrollArea className="h-48 rounded-md border p-3">
                <ul className="space-y-1 text-sm font-mono">
                  {failedAssets.map((asset, idx) => (
                    <li key={idx} className="text-destructive break-all">
                      {asset}
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
          )}

          {!hasFailedGroups && !hasFailedAssets && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Unknown Error</AlertTitle>
              <AlertDescription>
                The deployment health check failed, but no specific asset failures were reported.
              </AlertDescription>
            </Alert>
          )}

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              This page is intentionally blocked to prevent a partially broken experience. 
              Please verify that all static assets are correctly deployed and accessible from the site root.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
