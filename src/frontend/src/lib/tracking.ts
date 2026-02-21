// Centralized tracking type definitions and utilities

declare global {
  interface Window {
    lintrk?: (action: string, data: { conversion_id: string; conversion_value?: number }) => void;
  }
}

// LinkedIn conversion tracking helper
export function trackLinkedInConversion(conversionId: string, conversionValue?: number) {
  if (window.lintrk) {
    const data: { conversion_id: string; conversion_value?: number } = {
      conversion_id: conversionId,
    };
    if (conversionValue !== undefined) {
      data.conversion_value = conversionValue;
    }
    window.lintrk('track', data);
  }
}

// Export empty object to make this a module
export {};
