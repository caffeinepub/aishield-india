import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Save, AlertCircle } from 'lucide-react';
import { validateNumericRange } from '@/utils/inputSanitization';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function PricingManagement() {
  const [isSaving, setIsSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [advisoryPricing, setAdvisoryPricing] = useState({
    minPrice: '49999',
    maxPrice: '150000',
  });
  const [toolkitPricing, setToolkitPricing] = useState({
    basic: '7999',
    pro: '9999',
    proPlus: '14999',
  });

  const validateAdvisoryPricing = (): boolean => {
    const errors: Record<string, string> = {};
    
    const minValidation = validateNumericRange(advisoryPricing.minPrice, 1000, 10000000);
    if (!minValidation.isValid) {
      errors.advisoryMin = minValidation.error!;
    }
    
    const maxValidation = validateNumericRange(advisoryPricing.maxPrice, 1000, 10000000);
    if (!maxValidation.isValid) {
      errors.advisoryMax = maxValidation.error!;
    }
    
    if (minValidation.isValid && maxValidation.isValid) {
      if (minValidation.value! >= maxValidation.value!) {
        errors.advisoryMin = 'Minimum price must be less than maximum price';
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateToolkitPricing = (): boolean => {
    const errors: Record<string, string> = {};
    
    const basicValidation = validateNumericRange(toolkitPricing.basic, 100, 1000000);
    if (!basicValidation.isValid) {
      errors.toolkitBasic = basicValidation.error!;
    }
    
    const proValidation = validateNumericRange(toolkitPricing.pro, 100, 1000000);
    if (!proValidation.isValid) {
      errors.toolkitPro = proValidation.error!;
    }
    
    const proPlusValidation = validateNumericRange(toolkitPricing.proPlus, 100, 1000000);
    if (!proPlusValidation.isValid) {
      errors.toolkitProPlus = proPlusValidation.error!;
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveAdvisory = async () => {
    if (!validateAdvisoryPricing()) {
      toast.error('Please fix validation errors before saving');
      return;
    }

    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Advisory pricing updated successfully!');
      setValidationErrors({});
    } catch (error) {
      toast.error('Failed to save pricing. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveToolkit = async () => {
    if (!validateToolkitPricing()) {
      toast.error('Please fix validation errors before saving');
      return;
    }

    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Toolkit pricing updated successfully!');
      setValidationErrors({});
    } catch (error) {
      toast.error('Failed to save pricing. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const formatCurrency = (value: string) => {
    const num = parseInt(value.replace(/,/g, ''));
    if (isNaN(num)) return value;
    return num.toLocaleString('en-IN');
  };

  const handleFieldChange = (field: string, value: string) => {
    const cleanValue = value.replace(/,/g, '');
    
    if (field.startsWith('advisory')) {
      setAdvisoryPricing({ ...advisoryPricing, [field.replace('advisory', '').toLowerCase()]: cleanValue });
    } else {
      setToolkitPricing({ ...toolkitPricing, [field.replace('toolkit', '').toLowerCase()]: cleanValue });
    }
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors({ ...validationErrors, [field]: '' });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-navy mb-2">Pricing Management</h1>
        <p className="text-gray-600">Update pricing for Security Advisory and Security Toolkit</p>
      </div>

      {Object.keys(validationErrors).length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please fix the validation errors highlighted below before saving.
          </AlertDescription>
        </Alert>
      )}

      {/* Security Advisory Pricing */}
      <Card>
        <CardHeader>
          <CardTitle>Security Advisory Pricing</CardTitle>
          <CardDescription>Set the price range for founder advisory services</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="advisoryMin">Minimum Price (₹)</Label>
              <Input
                id="advisoryMin"
                type="text"
                value={formatCurrency(advisoryPricing.minPrice)}
                onChange={(e) => handleFieldChange('advisoryMin', e.target.value)}
                className={`mt-1 ${validationErrors.advisoryMin ? 'border-red-500' : ''}`}
              />
              {validationErrors.advisoryMin && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.advisoryMin}</p>
              )}
            </div>
            <div>
              <Label htmlFor="advisoryMax">Maximum Price (₹)</Label>
              <Input
                id="advisoryMax"
                type="text"
                value={formatCurrency(advisoryPricing.maxPrice)}
                onChange={(e) => handleFieldChange('advisoryMax', e.target.value)}
                className={`mt-1 ${validationErrors.advisoryMax ? 'border-red-500' : ''}`}
              />
              {validationErrors.advisoryMax && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.advisoryMax}</p>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSaveAdvisory} disabled={isSaving} className="bg-emerald-600 hover:bg-emerald-700">
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Advisory Pricing
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Toolkit Pricing */}
      <Card>
        <CardHeader>
          <CardTitle>Security Toolkit Pricing</CardTitle>
          <CardDescription>Set prices for all three toolkit tiers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="toolkitBasic">Basic Tier (₹)</Label>
              <Input
                id="toolkitBasic"
                type="text"
                value={formatCurrency(toolkitPricing.basic)}
                onChange={(e) => handleFieldChange('toolkitBasic', e.target.value)}
                className={`mt-1 ${validationErrors.toolkitBasic ? 'border-red-500' : ''}`}
              />
              {validationErrors.toolkitBasic && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.toolkitBasic}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">PDF templates only</p>
            </div>
            <div>
              <Label htmlFor="toolkitPro">Pro Tier (₹)</Label>
              <Input
                id="toolkitPro"
                type="text"
                value={formatCurrency(toolkitPricing.pro)}
                onChange={(e) => handleFieldChange('toolkitPro', e.target.value)}
                className={`mt-1 ${validationErrors.toolkitPro ? 'border-red-500' : ''}`}
              />
              {validationErrors.toolkitPro && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.toolkitPro}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">PDF + Editable docs</p>
            </div>
            <div>
              <Label htmlFor="toolkitProPlus">Pro+ Tier (₹)</Label>
              <Input
                id="toolkitProPlus"
                type="text"
                value={formatCurrency(toolkitPricing.proPlus)}
                onChange={(e) => handleFieldChange('toolkitProPlus', e.target.value)}
                className={`mt-1 ${validationErrors.toolkitProPlus ? 'border-red-500' : ''}`}
              />
              {validationErrors.toolkitProPlus && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.toolkitProPlus}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">Complete package with bonus</p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSaveToolkit} disabled={isSaving} className="bg-emerald-600 hover:bg-emerald-700">
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Toolkit Pricing
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
