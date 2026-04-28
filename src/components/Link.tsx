import React from 'react';
import { useLocation } from 'react-router-dom';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  to?: string;
  children: React.ReactNode;
  /**
   * If true, the link will always open in the current tab.
   * Useful for functional triggers like modals, drawers, etc.
   */
  stayInTab?: boolean;
}

/**
 * Global programmatic Link component.
 * 
 * Logic:
 * - Navigational/page-to-page links: Open in a new tab (target="_blank", rel="noopener noreferrer").
 * - Internal hash links (e.g., #section): Stay in current tab.
 * - Functional triggers (mailto:, tel:): Stay in current tab.
 * - "Book Session" or explicit stayInTab: Stay in current tab.
 */
export const Link: React.FC<LinkProps> = ({ 
  href, 
  to,
  children, 
  onClick, 
  stayInTab = false,
  ...props 
}) => {
  const location = useLocation();
  const path = href || to || '';

  const isHash = path.startsWith('#') || (path.includes('#') && path.split('#')[0] === location.pathname);
  const isFunctional = path.startsWith('mailto:') || path.startsWith('tel:');
  
  // Per requirements, navigational links should open in new tab unless they are hash links,
  // functional triggers, or explicitly requested to stay in tab.
  const shouldOpenInNewTab = path && !isHash && !isFunctional && !stayInTab;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHash) {
      // Internal hash links → smooth scroll in same tab
      e.preventDefault();
      const hash = path.includes('#') ? path.split('#')[1] : path.replace('#', '');
      if (hash) {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (shouldOpenInNewTab) {
      // Navigational links → open in new tab
      e.preventDefault();
      window.open(path, '_blank', 'noopener,noreferrer');
    }

    if (onClick) onClick(e);
  };

  const attributes = {
    href: path,
    onClick: handleLinkClick,
    ...(shouldOpenInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
    ...props
  };

  return <a {...attributes}>{children}</a>;
};

export default Link;
