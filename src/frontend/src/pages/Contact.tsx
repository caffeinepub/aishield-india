import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSubmitContactForm } from '@/hooks/useQueries';
import { toast } from 'sonner';
import { Mail, MapPin, Phone, AlertCircle } from 'lucide-react';
import { sanitizeText, validateEmail, validateTextLength } from '@/utils/inputSanitization';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const submitForm = useSubmitContactForm();

  const handleFieldChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors({ ...validationErrors, [field]: '' });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Validate name
    const nameValidation = validateTextLength(formData.name, 2, 100, 'Name');
    if (!nameValidation.isValid) {
      errors.name = nameValidation.error!;
    } else if (sanitizeText(formData.name) !== formData.name) {
      errors.name = 'Invalid characters in name';
    }

    // Validate email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.error!;
    }

    // Validate company (optional but if provided, must be valid)
    if (formData.company) {
      const companyValidation = validateTextLength(formData.company, 1, 100, 'Company');
      if (!companyValidation.isValid) {
        errors.company = companyValidation.error!;
      } else if (sanitizeText(formData.company) !== formData.company) {
        errors.company = 'Invalid characters in company name';
      }
    }

    // Validate message
    const messageValidation = validateTextLength(formData.message, 10, 2000, 'Message');
    if (!messageValidation.isValid) {
      errors.message = messageValidation.error!;
    } else if (sanitizeText(formData.message) !== formData.message) {
      errors.message = 'Invalid characters detected in message';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix validation errors before submitting');
      return;
    }

    try {
      // Sanitize all inputs before submission
      const sanitizedData = {
        name: sanitizeText(formData.name),
        email: formData.email.trim().toLowerCase(),
        company: sanitizeText(formData.company),
        message: sanitizeText(formData.message),
      };

      await submitForm.mutateAsync(sanitizedData);
      setSubmitted(true);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12">
        <div className="container max-w-2xl">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl text-navy">Thank You!</CardTitle>
              <CardDescription className="text-lg">We've received your message.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Our team will review your inquiry and get back to you within 24-48 hours.
              </p>
              <Button asChild>
                <a href="/">Back to Home</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600">
              Have questions about our products or need security guidance? We're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-navy">Send Us a Message</CardTitle>
                <CardDescription>Fill out the form and we'll get back to you soon.</CardDescription>
              </CardHeader>
              <CardContent>
                {Object.keys(validationErrors).length > 0 && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Please fix the validation errors highlighted below.
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">
                      Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                      className={validationErrors.name ? 'border-red-500' : ''}
                      required
                    />
                    {validationErrors.name && (
                      <p className="text-sm text-red-600 mt-1">{validationErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      className={validationErrors.email ? 'border-red-500' : ''}
                      required
                    />
                    {validationErrors.email && (
                      <p className="text-sm text-red-600 mt-1">{validationErrors.email}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleFieldChange('company', e.target.value)}
                      className={validationErrors.company ? 'border-red-500' : ''}
                    />
                    {validationErrors.company && (
                      <p className="text-sm text-red-600 mt-1">{validationErrors.company}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="message">
                      Message <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleFieldChange('message', e.target.value)}
                      className={validationErrors.message ? 'border-red-500' : ''}
                      required
                    />
                    {validationErrors.message && (
                      <p className="text-sm text-red-600 mt-1">{validationErrors.message}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">10-2000 characters</p>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-600"
                    disabled={submitForm.isPending}
                  >
                    {submitForm.isPending ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-emerald-500 mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-navy mb-1">Email</h3>
                      <p className="text-gray-600">support@aishieldindia.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-emerald-500 mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-navy mb-1">Location</h3>
                      <p className="text-gray-600">Serving startups across India</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-emerald-500 mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-navy mb-1">Response Time</h3>
                      <p className="text-gray-600">We typically respond within 24-48 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
