import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { sanitizeText, validateTextLength } from '@/utils/inputSanitization';
import { Alert, AlertDescription } from '@/components/ui/alert';

type Testimonial = {
  id: number;
  companyName: string;
  founderName: string;
  founderRole: string;
  testimonialText: string;
};

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: 1,
      companyName: 'TechStartup India',
      founderName: 'Rahul Sharma',
      founderRole: 'Co-Founder & CTO',
      testimonialText: 'The advisory helped us implement proper AI governance before our Series A.',
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    companyName: '',
    founderName: '',
    founderRole: '',
    testimonialText: '',
  });

  const validateField = (field: string, value: string): string | null => {
    const sanitized = sanitizeText(value);
    
    if (sanitized !== value) {
      return 'HTML tags and scripts are not allowed';
    }

    switch (field) {
      case 'companyName':
        const companyValidation = validateTextLength(sanitized, 1, 100, 'Company name');
        return companyValidation.isValid ? null : companyValidation.error!;
      
      case 'founderName':
        const nameValidation = validateTextLength(sanitized, 1, 100, 'Founder name');
        return nameValidation.isValid ? null : nameValidation.error!;
      
      case 'founderRole':
        const roleValidation = validateTextLength(sanitized, 1, 100, 'Founder role');
        return roleValidation.isValid ? null : roleValidation.error!;
      
      case 'testimonialText':
        const textValidation = validateTextLength(sanitized, 10, 1000, 'Testimonial text');
        return textValidation.isValid ? null : textValidation.error!;
      
      default:
        return null;
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors({ ...validationErrors, [field]: '' });
    }
  };

  const handleOpenDialog = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setFormData({
        companyName: testimonial.companyName,
        founderName: testimonial.founderName,
        founderRole: testimonial.founderRole,
        testimonialText: testimonial.testimonialText,
      });
    } else {
      setEditingTestimonial(null);
      setFormData({
        companyName: '',
        founderName: '',
        founderRole: '',
        testimonialText: '',
      });
    }
    setValidationErrors({});
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    // Validate all fields
    const errors: Record<string, string> = {};
    
    Object.entries(formData).forEach(([field, value]) => {
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
      // Sanitize all fields
      const sanitizedData = {
        companyName: sanitizeText(formData.companyName),
        founderName: sanitizeText(formData.founderName),
        founderRole: sanitizeText(formData.founderRole),
        testimonialText: sanitizeText(formData.testimonialText),
      };

      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (editingTestimonial) {
        setTestimonials(testimonials.map(t => 
          t.id === editingTestimonial.id ? { ...t, ...sanitizedData } : t
        ));
        toast.success('Testimonial updated successfully!');
      } else {
        const newTestimonial: Testimonial = {
          id: Math.max(...testimonials.map(t => t.id), 0) + 1,
          ...sanitizedData,
        };
        setTestimonials([...testimonials, newTestimonial]);
        toast.success('Testimonial added successfully!');
      }
      setIsDialogOpen(false);
      setValidationErrors({});
    } catch (error) {
      toast.error('Failed to save testimonial. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setTestimonials(testimonials.filter(t => t.id !== id));
      toast.success('Testimonial deleted successfully!');
      setDeleteId(null);
    } catch (error) {
      toast.error('Failed to delete testimonial. Please try again.');
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy mb-2">Testimonials Management</h1>
          <p className="text-gray-600">Manage client testimonials for the Security Advisory page</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
              <DialogDescription>
                {editingTestimonial ? 'Update the testimonial details below' : 'Fill in the details for the new testimonial'}
              </DialogDescription>
            </DialogHeader>
            
            {Object.keys(validationErrors).length > 0 && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please fix the validation errors highlighted below.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleFieldChange('companyName', e.target.value)}
                  placeholder="e.g., TechStartup India"
                  className={`mt-1 ${validationErrors.companyName ? 'border-red-500' : ''}`}
                />
                {validationErrors.companyName && (
                  <p className="text-sm text-red-600 mt-1">{validationErrors.companyName}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="founderName">Founder Name</Label>
                  <Input
                    id="founderName"
                    value={formData.founderName}
                    onChange={(e) => handleFieldChange('founderName', e.target.value)}
                    placeholder="e.g., Rahul Sharma"
                    className={`mt-1 ${validationErrors.founderName ? 'border-red-500' : ''}`}
                  />
                  {validationErrors.founderName && (
                    <p className="text-sm text-red-600 mt-1">{validationErrors.founderName}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="founderRole">Founder Role</Label>
                  <Input
                    id="founderRole"
                    value={formData.founderRole}
                    onChange={(e) => handleFieldChange('founderRole', e.target.value)}
                    placeholder="e.g., Co-Founder & CTO"
                    className={`mt-1 ${validationErrors.founderRole ? 'border-red-500' : ''}`}
                  />
                  {validationErrors.founderRole && (
                    <p className="text-sm text-red-600 mt-1">{validationErrors.founderRole}</p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="testimonialText">Testimonial Text</Label>
                <Textarea
                  id="testimonialText"
                  value={formData.testimonialText}
                  onChange={(e) => handleFieldChange('testimonialText', e.target.value)}
                  placeholder="Enter the testimonial feedback..."
                  rows={4}
                  className={`mt-1 ${validationErrors.testimonialText ? 'border-red-500' : ''}`}
                />
                {validationErrors.testimonialText && (
                  <p className="text-sm text-red-600 mt-1">{validationErrors.testimonialText}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">10-1000 characters</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving} className="bg-emerald-600 hover:bg-emerald-700">
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Testimonial'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardHeader>
              <CardTitle className="text-lg">{testimonial.companyName}</CardTitle>
              <CardDescription>
                {testimonial.founderName} - {testimonial.founderRole}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4 line-clamp-3">{testimonial.testimonialText}</p>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenDialog(testimonial)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeleteId(testimonial.id)}
                  className="flex-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the testimonial.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
