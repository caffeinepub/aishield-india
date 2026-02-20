import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Clock, Mail } from 'lucide-react';

export default function AdvisoryConfirmation() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-emerald-50 to-white py-12">
      <div className="container max-w-2xl">
        <Card className="text-center border-2 border-emerald-200 shadow-lg">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-12 w-12 text-emerald-600" />
              </div>
            </div>
            <CardTitle className="text-3xl text-navy">Application Submitted Successfully!</CardTitle>
            <CardDescription className="text-lg">
              Thank you for applying for our founder-level security advisory.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
              <div className="flex items-start space-x-3 mb-4">
                <Clock className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-semibold text-navy mb-2">What Happens Next?</h3>
                  <p className="text-gray-700">
                    <strong>If approved, you'll receive a scheduling link within 24–48 hours.</strong>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="h-6 w-6 text-emerald-600 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-semibold text-navy mb-2">Check Your Email</h3>
                  <p className="text-gray-700">
                    We'll send you an email with next steps. Please check your spam folder if you don't see it in your inbox.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> We review all applications carefully to ensure we can provide the best value for your specific security needs. Not all applications may be approved.
              </p>
            </div>

            <div className="pt-4">
              <h3 className="font-semibold text-navy mb-3">While You Wait</h3>
              <p className="text-gray-700 mb-4">
                Explore our resources to start improving your security posture today:
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                  <Link to="/free-checklist">Download Free AI Risk Checklist</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/toolkit">View Security Toolkit</Link>
                </Button>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>

            <p className="text-sm text-gray-600">
              Questions? Contact us at{' '}
              <a href="mailto:Contact@AIshield.com" className="text-emerald-600 hover:underline">
                Contact@AIshield.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
