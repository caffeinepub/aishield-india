// Input validation and sanitization utilities

/**
 * Sanitizes text input by removing HTML tags and script content
 * Uses a whitelist approach to strip potentially dangerous content
 */
export function sanitizeText(input: string): string {
  if (!input) return '';
  
  // Remove HTML tags
  let sanitized = input.replace(/<[^>]*>/g, '');
  
  // Remove script content
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove event handlers
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
  
  // Trim whitespace
  sanitized = sanitized.trim();
  
  return sanitized;
}

/**
 * Sanitizes HTML content more aggressively
 * Strips all HTML and returns plain text only
 */
export function sanitizeHTML(input: string): string {
  if (!input) return '';
  
  // Create a temporary div to parse HTML
  const temp = document.createElement('div');
  temp.textContent = input;
  return temp.innerHTML.replace(/<[^>]*>/g, '');
}

/**
 * Validates numeric input is within a specified range
 */
export function validateNumericRange(
  value: string | number,
  min: number,
  max: number
): { isValid: boolean; error?: string; value?: number } {
  const numValue = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
  
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Please enter a valid number' };
  }
  
  if (numValue < min) {
    return { isValid: false, error: `Value must be at least ${min.toLocaleString()}` };
  }
  
  if (numValue > max) {
    return { isValid: false, error: `Value must not exceed ${max.toLocaleString()}` };
  }
  
  return { isValid: true, value: numValue };
}

/**
 * Validates email format
 */
export function validateEmail(email: string): { isValid: boolean; error?: string } {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  // Additional checks for common typos
  if (email.includes('..') || email.startsWith('.') || email.endsWith('.')) {
    return { isValid: false, error: 'Invalid email format' };
  }
  
  return { isValid: true };
}

/**
 * Validates text length constraints
 */
export function validateTextLength(
  text: string,
  minLength: number,
  maxLength: number,
  fieldName: string = 'Field'
): { isValid: boolean; error?: string } {
  if (!text) {
    return { isValid: false, error: `${fieldName} is required` };
  }
  
  const length = text.trim().length;
  
  if (length < minLength) {
    return { isValid: false, error: `${fieldName} must be at least ${minLength} characters` };
  }
  
  if (length > maxLength) {
    return { isValid: false, error: `${fieldName} must not exceed ${maxLength} characters` };
  }
  
  return { isValid: true };
}

/**
 * Validates URL format
 */
export function validateURL(url: string): { isValid: boolean; error?: string } {
  if (!url) {
    return { isValid: false, error: 'URL is required' };
  }
  
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    
    // Check for valid protocol
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { isValid: false, error: 'URL must use http or https protocol' };
    }
    
    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Please enter a valid URL' };
  }
}

/**
 * Sanitizes and validates form data
 */
export function sanitizeFormData<T extends Record<string, any>>(data: T): T {
  const sanitized = {} as T;
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key as keyof T] = sanitizeText(value) as T[keyof T];
    } else {
      sanitized[key as keyof T] = value;
    }
  }
  
  return sanitized;
}
