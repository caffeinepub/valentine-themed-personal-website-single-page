import { AlertTriangle, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PublishBlockedScreenProps {
  reason?: string;
}

export function PublishBlockedScreen({ reason }: PublishBlockedScreenProps) {
  const defaultReason = 'An internal build or configuration error prevented deployment.';
  const displayReason = reason || defaultReason;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-950 dark:via-orange-950 dark:to-red-950">
      <Card className="max-w-2xl w-full shadow-romantic">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-destructive" />
            <div>
              <CardTitle className="text-2xl">Publish Blocked</CardTitle>
              <CardDescription className="mt-1">
                This application was not published due to a build system error.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Deployment Prevented</AlertTitle>
            <AlertDescription>
              {displayReason}
            </AlertDescription>
          </Alert>

          <div className="space-y-3 pt-2">
            <p className="text-sm text-muted-foreground">
              The deployment process intentionally stopped to prevent a partial or broken publish. 
              No live URL was created for this build.
            </p>
            
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-sm">What happened?</h3>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                <li>A build-time configuration check detected an error</li>
                <li>The publish was blocked before deployment</li>
                <li>No partial or incomplete site was published</li>
              </ul>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-sm">Next steps:</h3>
              <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                <li>Review the build logs for detailed error information</li>
                <li>Verify all required configuration is in place</li>
                <li>Contact support if the issue persists</li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t flex justify-end">
            <Button variant="outline" asChild>
              <a 
                href="https://caffeine.ai/?utm_source=Caffeine-error&utm_medium=referral&utm_content=publish-blocked"
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2"
              >
                Get Help
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
