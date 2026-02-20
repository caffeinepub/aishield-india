import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Loader2, Save, AlertCircle, ExternalLink, FileText } from 'lucide-react';
import { sanitizeText, validateTextLength } from '@/utils/inputSanitization';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function CredentialsManagement() {
  const [isSaving, setIsSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [credentials, setCredentials] = useState({
    soc2Title: 'SOC 2 Type II Audit Experience',
    soc2Description: 'Hands-on experience with SOC 2 Type II audit preparation and implementation',
    soc2Status: 'Verified',
    iso27001Title: 'ISO 27001 Certification Knowledge',
    iso27001Description: 'Deep understanding of ISO 27001 requirements and implementation',
    iso27001Date: '2024',
    expertiseItems: [
      {
        title: 'SIEM & Log Analysis',
        description: 'Experience with security information and event management systems',
      },
      {
        title: 'Incident Investigation',
        description: 'Proven track record in security incident response and investigation',
      },
      {
        title: 'Threat Detection',
        description: 'Expertise in identifying and mitigating security threats',
      },
    ],
  });

  const validateField = (field: string, value: string): string | null => {
    const sanitized = sanitizeText(value);
    
    if (sanitized !== value) {
      return 'HTML tags and scripts are not allowed';
    }

    if (field.includes('Title') || field.includes('Status') || field.includes('Date')) {
      const validation = validateTextLength(sanitized, 1, 100, field);
      return validation.isValid ? null : validation.error!;
    }
    
    if (field.includes('Description')) {
      const validation = validateTextLength(sanitized, 10, 500, field);
      return validation.isValid ? null : validation.error!;
    }
    
    return null;
  };

  const handleFieldChange = (field: string, value: string) => {
    setCredentials({ ...credentials, [field]: value });
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors({ ...validationErrors, [field]: '' });
    }
  };

  const handleExpertiseChange = (index: number, field: 'title' | 'description', value: string) => {
    const newExpertise = [...credentials.expertiseItems];
    newExpertise[index] = { ...newExpertise[index], [field]: value };
    setCredentials({ ...credentials, expertiseItems: newExpertise });
    
    // Clear validation error
    const errorKey = `expertise${index}${field}`;
    if (validationErrors[errorKey]) {
      setValidationErrors({ ...validationErrors, [errorKey]: '' });
    }
  };

  const handleSave = async () => {
    // Validate all fields
    const errors: Record<string, string> = {};
    
    // Validate main credentials
    ['soc2Title', 'soc2Description', 'soc2Status', 'iso27001Title', 'iso27001Description', 'iso27001Date'].forEach(field => {
      const value = credentials[field as keyof typeof credentials] as string;
      const error = validateField(field, value);
      if (error) {
        errors[field] = error;
      }
    });
    
    // Validate expertise items
    credentials.expertiseItems.forEach((item, index) => {
      const titleError = validateField('title', item.title);
      if (titleError) {
        errors[`expertise${index}title`] = titleError;
      }
      
      const descError = validateField('description', item.description);
      if (descError) {
        errors[`expertise${index}description`] = descError;
      }
    });

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast.error('Please fix validation errors before saving');
      return;
    }

    setIsSaving(true);
    try {
      // Sanitize all content
      const sanitizedCredentials = {
        soc2Title: sanitizeText(credentials.soc2Title),
        soc2Description: sanitizeText(credentials.soc2Description),
        soc2Status: sanitizeText(credentials.soc2Status),
        iso27001Title: sanitizeText(credentials.iso27001Title),
        iso27001Description: sanitizeText(credentials.iso27001Description),
        iso27001Date: sanitizeText(credentials.iso27001Date),
        expertiseItems: credentials.expertiseItems.map(item => ({
          title: sanitizeText(item.title),
          description: sanitizeText(item.description),
        })),
      };

      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setCredentials(sanitizedCredentials);
      toast.success('Credentials updated successfully!');
      setValidationErrors({});
    } catch (error) {
      toast.error('Failed to save credentials. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const openAnalyticsSetupDocs = () => {
    window.open('https://github.com/yourusername/yourrepo/blob/main/frontend/ANALYTICS_SETUP.md', '_blank');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-navy mb-2">Credentials Management</h1>
        <p className="text-gray-600">Manage SOC 2, ISO 27001, and expertise credentials</p>
      </div>

      {Object.keys(validationErrors).length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please fix the validation errors highlighted below before saving.
          </AlertDescription>
        </Alert>
      )}

      {/* Analytics & SEO Setup */}
      <Card className="border-emerald-200 bg-emerald-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-emerald-600" />
            Analytics & SEO Setup
          </CardTitle>
          <CardDescription>
            Configure Google Analytics and Search Console access for the project owner
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              View detailed instructions for setting up Google Analytics tracking and Google Search Console verification, 
              including how to grant dashboard access and console permissions to the project owner.
            </p>
            <Button 
              onClick={openAnalyticsSetupDocs}
              variant="outline"
              className="gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              View Setup Documentation
            </Button>
            <div className="text-xs text-gray-500 space-y-1">
              <p>• Google Analytics: Replace measurement ID in index.html</p>
              <p>• Search Console: Replace verification code in index.html</p>
              <p>• Grant access only to the project owner</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SOC 2 Type II */}
      <Card>
        <CardHeader>
          <CardTitle>SOC 2 Type II Audit</CardTitle>
          <CardDescription>Update SOC 2 audit information and status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="soc2Title">Title</Label>
            <Input
              id="soc2Title"
              value={credentials.soc2Title}
              onChange={(e) => handleFieldChange('soc2Title', e.target.value)}
              className={`mt-1 ${validationErrors.soc2Title ? 'border-red-500' : ''}`}
            />
            {validationErrors.soc2Title && (
              <p className="text-sm text-red-600 mt-1">{validationErrors.soc2Title}</p>
            )}
          </div>
          <div>
            <Label htmlFor="soc2Description">Description</Label>
            <Textarea
              id="soc2Description"
              value={credentials.soc2Description}
              onChange={(e) => handleFieldChange('soc2Description', e.target.value)}
              rows={3}
              className={`mt-1 ${validationErrors.soc2Description ? 'border-red-500' : ''}`}
            />
            {validationErrors.soc2Description && (
              <p className="text-sm text-red-600 mt-1">{validationErrors.soc2Description}</p>
            )}
          </div>
          <div>
            <Label htmlFor="soc2Status">Status</Label>
            <Input
              id="soc2Status"
              value={credentials.soc2Status}
              onChange={(e) => handleFieldChange('soc2Status', e.target.value)}
              className={`mt-1 ${validationErrors.soc2Status ? 'border-red-500' : ''}`}
            />
            {validationErrors.soc2Status && (
              <p className="text-sm text-red-600 mt-1">{validationErrors.soc2Status}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ISO 27001 */}
      <Card>
        <CardHeader>
          <CardTitle>ISO 27001 Certification</CardTitle>
          <CardDescription>Update ISO 27001 certification details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="iso27001Title">Title</Label>
            <Input
              id="iso27001Title"
              value={credentials.iso27001Title}
              onChange={(e) => handleFieldChange('iso27001Title', e.target.value)}
              className={`mt-1 ${validationErrors.iso27001Title ? 'border-red-500' : ''}`}
            />
            {validationErrors.iso27001Title && (
              <p className="text-sm text-red-600 mt-1">{validationErrors.iso27001Title}</p>
            )}
          </div>
          <div>
            <Label htmlFor="iso27001Description">Description</Label>
            <Textarea
              id="iso27001Description"
              value={credentials.iso27001Description}
              onChange={(e) => handleFieldChange('iso27001Description', e.target.value)}
              rows={3}
              className={`mt-1 ${validationErrors.iso27001Description ? 'border-red-500' : ''}`}
            />
            {validationErrors.iso27001Description && (
              <p className="text-sm text-red-600 mt-1">{validationErrors.iso27001Description}</p>
            )}
          </div>
          <div>
            <Label htmlFor="iso27001Date">Certification Year</Label>
            <Input
              id="iso27001Date"
              value={credentials.iso27001Date}
              onChange={(e) => handleFieldChange('iso27001Date', e.target.value)}
              className={`mt-1 ${validationErrors.iso27001Date ? 'border-red-500' : ''}`}
            />
            {validationErrors.iso27001Date && (
              <p className="text-sm text-red-600 mt-1">{validationErrors.iso27001Date}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Expertise Items */}
      <Card>
        <CardHeader>
          <CardTitle>SOC Expertise Details</CardTitle>
          <CardDescription>Update specific areas of expertise</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {credentials.expertiseItems.map((item, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <h3 className="font-semibold mb-3">Expertise Item {index + 1}</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor={`expertise-title-${index}`}>Title</Label>
                  <Input
                    id={`expertise-title-${index}`}
                    value={item.title}
                    onChange={(e) => handleExpertiseChange(index, 'title', e.target.value)}
                    className={`mt-1 ${validationErrors[`expertise${index}title`] ? 'border-red-500' : ''}`}
                  />
                  {validationErrors[`expertise${index}title`] && (
                    <p className="text-sm text-red-600 mt-1">{validationErrors[`expertise${index}title`]}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor={`expertise-description-${index}`}>Description</Label>
                  <Textarea
                    id={`expertise-description-${index}`}
                    value={item.description}
                    onChange={(e) => handleExpertiseChange(index, 'description', e.target.value)}
                    rows={2}
                    className={`mt-1 ${validationErrors[`expertise${index}description`] ? 'border-red-500' : ''}`}
                  />
                  {validationErrors[`expertise${index}description`] && (
                    <p className="text-sm text-red-600 mt-1">{validationErrors[`expertise${index}description`]}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          size="lg"
          className="gap-2"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
