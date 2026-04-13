/**
 * Dynamically loads the Calendly scripts and styles.
 * This prevents the heavy Calendly assets from blocking the initial page load.
 */
const loadCalendlyAssets = (): Promise<void> => {
  return new Promise((resolve) => {
    if ((window as any).Calendly) {
      resolve();
      return;
    }

    // Load CSS
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Load JS
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
};

/**
 * Opens the Calendly popup widget.
 * Ensures the script is loaded before attempting to open.
 */
export const openCalendly = async () => {
  await loadCalendlyAssets();
  
  if ((window as any).Calendly) {
    (window as any).Calendly.initPopupWidget({
      url: 'https://calendly.com/jjpropertyseo'
    });
  }
};

/**
 * Initializes the inline Calendly widget for a specific element.
 */
export const initInlineCalendly = async (elementId: string) => {
  await loadCalendlyAssets();
  
  const element = document.getElementById(elementId);
  if (element && (window as any).Calendly) {
    (window as any).Calendly.initInlineWidget({
      url: 'https://calendly.com/jjpropertyseo?hide_landing_page_details=1&hide_gdpr_banner=1',
      parentElement: element,
      prefill: {},
      utm: {}
    });
  }
};
