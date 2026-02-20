import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle } from 'lucide-react';

export default function PaymentFailure() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12">
      <div className="container max-w-2xl">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <XCircle className="h-20 w-20 text-red-500" />
            </div>
            <CardTitle className="text-3xl text-navy">Payment Failed</CardTitle>
            <CardDescription className="text-lg">We couldn't process your payment.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-700">
                Your payment was not successful. This could be due to insufficient funds, an expired card, or a
                technical issue.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800 font-medium">What to do next:</p>
                <ul className="text-sm text-red-700 mt-2 space-y-1 text-left">
                  <li>• Check your payment details and try again</li>
                  <li>• Try a different payment method</li>
                  <li>• Contact your bank if the issue persists</li>
                  <li>• Reach out to our support team for assistance</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Button asChild className="bg-emerald-500 hover:bg-emerald-600">
                  <Link to="/toolkit">Try Again</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/contact">Contact Support</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
