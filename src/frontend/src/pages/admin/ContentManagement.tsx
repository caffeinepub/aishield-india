import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Loader2, Save, AlertCircle } from 'lucide-react';
import { sanitizeText, validateTextLength } from '@/utils/inputSanitization';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ContentManagement() {
  const [isSaving, setIsSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [content, setContent] = useState({
    capacityMessage: 'Limited to 5 founders per quarter',
    costComparison: 'Equivalent to hiring a full-time security lead at ₹25L+ annually — without the payroll burden.',
    serviceDescription: 'Apply for structured AI governance and cybersecurity advisory tailored to your startup stage.',
  });

  const validateField = (field: string, value: string): string | null => {
    const sanitized = sanitizeText(value);
    
    if (sanitized !== value) {
      return 'HTML tags and scripts are not allowed';
    }

    switch (field) {
      case 'capacityMessage':
        const capacityValidation = validateTextLength(sanitized, 10, 200, 'Capacity message');
        return capacityValidation.isValid ? null : capacityValidation.error!;
      
      case 'costComparison':
        const costValidation = validateTextLength(sanitized, 20, 500, 'Cost comparison');
        return costValidation.isValid ? null : costValidation.error!;
      
      case 'serviceDescription':
        const descValidation = validateTextLength(sanitized, 20, 500, 'Service description');
        return descValidation.isValid ? null : descValidation.error!;
      
      default:
        return null;
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setContent({ ...content, [field]: value });
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors({ ...validationErrors, [field]: '' });
    }
  };

  const handleSave = async () => {
    // Validate all fields
    const errors: Record<string, string> = {};
    
    Object.entries(content).forEach(([field, value]) => {
      const error = validateField(field, value);
      if (error) {
        errors[field] = error;
      }
    });

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast.error('Please fix validation errors before saving');
      return;
    }

    setIsSaving(true);
    try {
      // Sanitize all content before saving
      const sanitizedContent = {
        capacityMessage: sanitizeText(content.capacityMessage),
        costComparison: sanitizeText(content.costComparison),
        serviceDescription: sanitizeText(content.serviceDescription),
      };

      // Simulate save operation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Update state with sanitized content
      setContent(sanitizedContent);
      
      toast.success('Content updated successfully!');
    } catch (error) {
      toast.error('Failed to save content. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-navy mb-2">Content Management</h1>
        <p className="text-gray-600">Update Security Advisory page content and messaging</p>
      </div>

      {Object.keys(validationErrors).length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please fix the validation errors highlighted below before saving.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>Main headline and description for the Security Advisory page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="serviceDescription">Service Description</Label>
            <Textarea
              id="serviceDescription"
              value={content.serviceDescription}
              onChange={(e) => handleFieldChange('serviceDescription', e.target.value)}
              rows={3}
              className={`mt-1 ${validationErrors.serviceDescription ? 'border-red-500' : ''}`}
            />
            {validationErrors.serviceDescription && (
              <p className="text-sm text-red-600 mt-1">{validationErrors.serviceDescription}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">Appears below the main headline (20-500 characters)</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Capacity Messaging</CardTitle>
          <CardDescription>Limited availability message to create urgency</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="capacityMessage">Capacity Limitation Text</Label>
            <Input
              id="capacityMessage"
              value={content.capacityMessage}
              onChange={(e) => handleFieldChange('capacityMessage', e.target.value)}
              className={`mt-1 ${validationErrors.capacityMessage ? 'border-red-500' : ''}`}
            />
            {validationErrors.capacityMessage && (
              <p className="text-sm text-red-600 mt-1">{validationErrors.capacityMessage}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">Displays near the application CTA button (10-200 characters)</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cost Comparison</CardTitle>
          <CardDescription>Value proposition comparing to full-time hire</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="costComparison">Cost Comparison Line</Label>
            <Textarea
              id="costComparison"
              value={content.costComparison}
              onChange={(e) => handleFieldChange('costComparison', e.target.value)}
              rows={2}
              className={`mt-1 ${validationErrors.costComparison ? 'border-red-500' : ''}`}
            />
            {validationErrors.costComparison && (
              <p className="text-sm text-red-600 mt-1">{validationErrors.costComparison}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">Appears below the pricing range (20-500 characters)</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-3">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={isSaving} className="bg-emerald-600 hover:bg-emerald-700">
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
