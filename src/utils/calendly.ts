/**
 * Opens the Calendly popup widget.
 * To change your booking link, replace the URL below.
 */
export const openCalendly = () => {
  if ((window as any).Calendly) {
    (window as any).Calendly.initPopupWidget({
      url: 'https://calendly.com/jjpropertyseo'
    });
  } else {
    console.error('Calendly script not loaded yet.');
    // Fallback: search for the script or try again in 100ms
    setTimeout(openCalendly, 100);
  }
};
