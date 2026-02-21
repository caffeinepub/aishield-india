import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Shield, Clock, Target, Zap, AlertCircle } from 'lucide-react';
import { useSubmitAdvisoryApplication } from '@/hooks/useQueries';
import { toast } from 'sonner';
import { sanitizeText, validateEmail, validateURL, validateTextLength } from '@/utils/inputSanitization';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { trackLinkedInConversion } from '@/lib/tracking';

export default function SecurityAdvisory() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    companyWebsite: '',
    companySize: '',
    industry: '',
    fundingStage: '',
    currentSecuritySetup: '',
    primaryConcern: '',
    estimatedBudgetRange: '',
    consentGiven: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const submitApplication = useSubmitAdvisoryApplication();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Full Name validation
    const nameValidation = validateTextLength(formData.fullName, 2, 100);
    if (!nameValidation.isValid) {
      newErrors.fullName = nameValidation.error || 'Full name is required';
    }

    // Work Email validation
    const emailValidation = validateEmail(formData.workEmail);
    if (!emailValidation.isValid) {
      newErrors.workEmail = emailValidation.error || 'Valid work email is required';
    }

    // Company Name validation
    const companyValidation = validateTextLength(formData.companyName, 2, 100);
    if (!companyValidation.isValid) {
      newErrors.companyName = companyValidation.error || 'Company name is required';
    }

    // Company Size validation
    if (!formData.companySize.trim()) {
      newErrors.companySize = 'Company size is required';
    }

    // Industry validation
    const industryValidation = validateTextLength(formData.industry, 2, 100);
    if (!industryValidation.isValid) {
      newErrors.industry = industryValidation.error || 'Industry is required';
    }

    // Funding Stage validation
    if (!formData.fundingStage) {
      newErrors.fundingStage = 'Funding stage is required';
    }

    // Current Security Setup validation
    const setupValidation = validateTextLength(formData.currentSecuritySetup, 10, 1000);
    if (!setupValidation.isValid) {
      newErrors.currentSecuritySetup = setupValidation.error || 'Please describe your current security setup (minimum 10 characters)';
    }

    // Primary Concern validation
    if (!formData.primaryConcern) {
      newErrors.primaryConcern = 'Primary concern is required';
    }

    // Consent validation
    if (!formData.consentGiven) {
      newErrors.consentGiven = 'You must consent to data collection to submit this form';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      // Sanitize all text inputs
      const sanitizedData = {
        fullName: sanitizeText(formData.fullName),
        workEmail: formData.workEmail.trim().toLowerCase(),
        companyName: sanitizeText(formData.companyName),
        companyWebsite: formData.companyWebsite.trim(),
        companySize: sanitizeText(formData.companySize),
        industry: sanitizeText(formData.industry),
        fundingStage: formData.fundingStage,
        currentSecuritySetup: sanitizeText(formData.currentSecuritySetup),
        primaryConcern: formData.primaryConcern,
        estimatedBudgetRange: sanitizeText(formData.estimatedBudgetRange),
        source: 'Advisory Application Form',
      };

      await submitApplication.mutateAsync(sanitizedData);
      
      // Fire LinkedIn conversion tracking
      trackLinkedInConversion('XXXXXXX');
      
      toast.success('Application submitted successfully!');
      
      // Navigate to confirmation page
      navigate({ to: '/advisory-confirmation' });
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit application. Please try again.');
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-navy to-emerald-900 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-emerald-600">Application-Based Advisory</Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Apply for Founder-Level Security Advisory
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Work directly with us to build and implement structured security systems designed to help improve your security posture. Applications are reviewed within 24-48 hours.
            </p>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-navy mb-8 text-center">What Advisory Includes</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-navy mb-1">Gap Assessment</h3>
                <p className="text-sm text-gray-600">Identify security blind spots</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-navy mb-1">Custom Roadmap</h3>
                <p className="text-sm text-gray-600">Prioritized action plan</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-navy mb-1">Implementation</h3>
                <p className="text-sm text-gray-600">Hands-on guidance</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-navy mb-1">Ongoing Support</h3>
                <p className="text-sm text-gray-600">30-day implementation period</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-navy">Advisory Application Form</CardTitle>
                <CardDescription>
                  Tell us about your company and security needs. We'll review your application and reach out within 24-48 hours if approved.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Your full name"
                      className={errors.fullName ? 'border-red-500' : ''}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Work Email */}
                  <div>
                    <Label htmlFor="workEmail">Work Email *</Label>
                    <Input
                      id="workEmail"
                      type="email"
                      value={formData.workEmail}
                      onChange={(e) => handleInputChange('workEmail', e.target.value)}
                      placeholder="you@company.com"
                      className={errors.workEmail ? 'border-red-500' : ''}
                    />
                    {errors.workEmail && (
                      <p className="text-sm text-red-600 mt-1">{errors.workEmail}</p>
                    )}
                  </div>

                  {/* Company Name */}
                  <div>
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      placeholder="Your company name"
                      className={errors.companyName ? 'border-red-500' : ''}
                    />
                    {errors.companyName && (
                      <p className="text-sm text-red-600 mt-1">{errors.companyName}</p>
                    )}
                  </div>

                  {/* Company Website */}
                  <div>
                    <Label htmlFor="companyWebsite">Company Website (Optional)</Label>
                    <Input
                      id="companyWebsite"
                      type="url"
                      value={formData.companyWebsite}
                      onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
                      placeholder="https://yourcompany.com"
                    />
                  </div>

                  {/* Company Size */}
                  <div>
                    <Label htmlFor="companySize">Company Size *</Label>
                    <Input
                      id="companySize"
                      type="text"
                      value={formData.companySize}
                      onChange={(e) => handleInputChange('companySize', e.target.value)}
                      placeholder="e.g., 1-10, 11-50, 51-200"
                      className={errors.companySize ? 'border-red-500' : ''}
                    />
                    {errors.companySize && (
                      <p className="text-sm text-red-600 mt-1">{errors.companySize}</p>
                    )}
                  </div>

                  {/* Funding Stage */}
                  <div>
                    <Label htmlFor="fundingStage">Funding Stage *</Label>
                    <Select
                      value={formData.fundingStage}
                      onValueChange={(value) => handleInputChange('fundingStage', value)}
                    >
                      <SelectTrigger className={errors.fundingStage ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select funding stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bootstrapped">Bootstrapped</SelectItem>
                        <SelectItem value="Seed">Seed</SelectItem>
                        <SelectItem value="Series A">Series A</SelectItem>
                        <SelectItem value="Series B+">Series B+</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.fundingStage && (
                      <p className="text-sm text-red-600 mt-1">{errors.fundingStage}</p>
                    )}
                  </div>

                  {/* Industry */}
                  <div>
                    <Label htmlFor="industry">Industry *</Label>
                    <Input
                      id="industry"
                      type="text"
                      value={formData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      placeholder="e.g., FinTech, HealthTech, SaaS"
                      className={errors.industry ? 'border-red-500' : ''}
                    />
                    {errors.industry && (
                      <p className="text-sm text-red-600 mt-1">{errors.industry}</p>
                    )}
                  </div>

                  {/* Current Security Setup */}
                  <div>
                    <Label htmlFor="currentSecuritySetup">Current Security Setup *</Label>
                    <Textarea
                      id="currentSecuritySetup"
                      value={formData.currentSecuritySetup}
                      onChange={(e) => handleInputChange('currentSecuritySetup', e.target.value)}
                      placeholder="Describe your current security measures, tools, and processes (minimum 10 characters)"
                      rows={4}
                      className={errors.currentSecuritySetup ? 'border-red-500' : ''}
                    />
                    {errors.currentSecuritySetup && (
                      <p className="text-sm text-red-600 mt-1">{errors.currentSecuritySetup}</p>
                    )}
                  </div>

                  {/* Main Concern */}
                  <div>
                    <Label htmlFor="primaryConcern">Main Concern *</Label>
                    <Select
                      value={formData.primaryConcern}
                      onValueChange={(value) => handleInputChange('primaryConcern', value)}
                    >
                      <SelectTrigger className={errors.primaryConcern ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select your main concern" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AI Risk">AI Risk</SelectItem>
                        <SelectItem value="Compliance">Compliance</SelectItem>
                        <SelectItem value="Incident Response">Incident Response</SelectItem>
                        <SelectItem value="General">General</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.primaryConcern && (
                      <p className="text-sm text-red-600 mt-1">{errors.primaryConcern}</p>
                    )}
                  </div>

                  {/* Budget Range */}
                  <div>
                    <Label htmlFor="estimatedBudgetRange">Estimated Budget Range (Optional)</Label>
                    <Input
                      id="estimatedBudgetRange"
                      type="text"
                      value={formData.estimatedBudgetRange}
                      onChange={(e) => handleInputChange('estimatedBudgetRange', e.target.value)}
                      placeholder="e.g., ₹50,000 - ₹1,00,000"
                    />
                  </div>

                  {/* DPDP Act 2023 Consent */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="consent"
                        checked={formData.consentGiven}
                        onCheckedChange={(checked) =>
                          handleInputChange('consentGiven', checked === true ? 'true' : 'false')
                        }
                        className={errors.consentGiven ? 'border-red-500' : ''}
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor="consent"
                          className="text-sm text-gray-700 cursor-pointer leading-relaxed"
                        >
                          I consent to AIShield India collecting and processing my personal data as described in this
                          form for the purpose of evaluating my advisory application. I understand my rights under the
                          Digital Personal Data Protection Act 2023, including the right to access, correct, and delete
                          my data. *
                        </Label>
                        {errors.consentGiven && (
                          <p className="text-sm text-red-600 mt-2">{errors.consentGiven}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                    disabled={submitApplication.isPending}
                  >
                    {submitApplication.isPending ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
