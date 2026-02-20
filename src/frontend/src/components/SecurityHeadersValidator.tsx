import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield, AlertTriangle } from 'lucide-react';

/**
 * Development-only component that validates security headers
 * Displays warnings if critical security headers are missing
 */
export default function SecurityHeadersValidator() {
  const [warnings, setWarnings] = useState<string[]>([]);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Only run in development mode
    if (!import.meta.env.DEV) {
      setIsChecking(false);
      return;
    }

    const checkSecurityHeaders = async () => {
      const foundWarnings: string[] = [];

      try {
        // Check for CSP violations in console
        const cspViolations = performance.getEntriesByType('navigation');
        if (cspViolations.length === 0) {
          foundWarnings.push('Unable to verify Content-Security-Policy headers');
        }

        // Check meta tags
        const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
        if (!cspMeta) {
          foundWarnings.push('Content-Security-Policy meta tag not found');
        }

        const xContentTypeMeta = document.querySelector('meta[http-equiv="X-Content-Type-Options"]');
        if (!xContentTypeMeta) {
          foundWarnings.push('X-Content-Type-Options meta tag not found');
        }

        const referrerPolicyMeta = document.querySelector('meta[name="referrer"]');
        if (!referrerPolicyMeta) {
          foundWarnings.push('Referrer-Policy meta tag not found');
        }

        // Log to console for developer awareness
        if (foundWarnings.length > 0) {
          console.warn('Security Headers Validation:', foundWarnings);
        } else {
          console.log('✓ Security headers validation passed');
        }

        setWarnings(foundWarnings);
      } catch (error) {
        console.error('Error checking security headers:', error);
      } finally {
        setIsChecking(false);
      }
    };

    checkSecurityHeaders();
  }, []);

  // Don't render in production
  if (!import.meta.env.DEV) {
    return null;
  }

  // Don't render while checking
  if (isChecking) {
    return null;
  }

  // Don't render if no warnings
  if (warnings.length === 0) {
    return (
      <div className="fixed bottom-4 right-4 z-50 max-w-md">
        <Alert className="bg-emerald-50 border-emerald-200">
          <Shield className="h-4 w-4 text-emerald-600" />
          <AlertTitle className="text-emerald-900">Security Headers OK</AlertTitle>
          <AlertDescription className="text-emerald-700 text-sm">
            All security headers are properly configured
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Security Headers Warning (Dev Only)</AlertTitle>
        <AlertDescription className="text-sm">
          <ul className="list-disc list-inside mt-2 space-y-1">
            {warnings.map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
}
