import { useEffect, useRef } from 'react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Download, Mail } from 'lucide-react';
import { trackLinkedInConversion } from '@/lib/tracking';

export default function PaymentSuccess() {
  const hasTracked = useRef(false);

  useEffect(() => {
    // Fire LinkedIn conversion tracking only once
    if (!hasTracked.current) {
      // Extract order value from URL parameters if available
      const urlParams = new URLSearchParams(window.location.search);
      const orderValue = urlParams.get('amount') ? parseFloat(urlParams.get('amount')!) : undefined;
      
      trackLinkedInConversion('XXXXXXX', orderValue);
      hasTracked.current = true;
    }
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12">
      <div className="container max-w-2xl">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-20 w-20 text-emerald-500" />
            </div>
            <CardTitle className="text-3xl text-navy">Payment Successful!</CardTitle>
            <CardDescription className="text-lg">Thank you for your purchase.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p className="text-gray-700">
                Your order has been confirmed and is being processed. You will receive an email with download links and
                access instructions shortly.
              </p>
              
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <Download className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <p className="text-sm text-emerald-800 font-medium mb-2">Instant Download Access:</p>
                    <p className="text-sm text-emerald-700">
                      Your digital products are ready for immediate download. Check your email for the download links.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Mail className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <p className="text-sm text-emerald-800 font-medium mb-2">Next Steps:</p>
                    <ul className="text-sm text-emerald-700 space-y-1">
                      <li>• Check your email (including spam folder) for download links</li>
                      <li>• Access your digital products immediately</li>
                      <li>• Review the implementation guide included with your purchase</li>
                      <li>• Contact support if you need any assistance</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> All digital products are non-refundable as per our{' '}
                  <Link to="/refund-policy" className="text-blue-600 hover:underline">
                    Refund Policy
                  </Link>
                  . If you experience any technical issues with your download, please contact us immediately.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                  <Link to="/">Back to Home</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/contact">Contact Support</Link>
                </Button>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                Need help? Email us at{' '}
                <a href="mailto:Contact@AIshield.com" className="text-emerald-600 hover:underline">
                  Contact@AIshield.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
