const FALLBACK_URL = 'https://calendly.com/jjpropertyseo/new-meeting';

// Module-level URL — updated once at app boot from Sanity via setCalendlyUrl()
let calendlyUrl = FALLBACK_URL;

interface CalendlyInstance {
  initPopupWidget: (opts: { url: string }) => void;
  initInlineWidget: (opts: { url: string; parentElement: Element | null; prefill?: object; utm?: object }) => void;
}

declare global {
  interface Window {
    Calendly?: CalendlyInstance;
  }
}

export const setCalendlyUrl = (url: string) => {
  if (url) calendlyUrl = url;
};

/**
 * Dynamically loads the Calendly scripts and styles.
 * This prevents the heavy Calendly assets from blocking the initial page load.
 */
const loadCalendlyAssets = (): Promise<void> => {
  return new Promise((resolve) => {
    if (window.Calendly) {
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
  window.Calendly?.initPopupWidget({ url: calendlyUrl });
};

/**
 * Initializes the inline Calendly widget for a specific element.
 */
export const initInlineCalendly = async (elementId: string) => {
  await loadCalendlyAssets();

  const element = document.getElementById(elementId);
  if (element && window.Calendly) {
    element.innerHTML = ''; // Prevent duplicate iFrames on Strict Mode
    window.Calendly.initInlineWidget({
      url: `${calendlyUrl}?hide_landing_page_details=1&hide_gdpr_banner=1`,
      parentElement: element,
      prefill: {},
      utm: {}
    });
  }
};
