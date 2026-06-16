import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  to?: string;
  children: React.ReactNode;
  /**
   * Legacy prop — kept for API compatibility.
   * Internal links always stay in tab now regardless of this flag.
   */
  stayInTab?: boolean;
}

/**
 * Global Link component.
 *
 * Routing logic:
 * - Internal paths (start with "/"):  React Router navigate → same tab, scroll to top
 * - External URLs (http/https):       target="_blank" → new tab (social, WhatsApp, maps, etc.)
 * - Hash links (#section):            smooth-scroll in same tab
 * - Functional (mailto:, tel:):       browser-native, same tab
 */
export const Link: React.FC<LinkProps> = ({
  href,
  to,
  children,
  onClick,
  stayInTab: _stayInTab, // consumed so it doesn't land on the <a> element
  ...props
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = href || to || '';

  const isHash =
    path.startsWith('#') ||
    (path.includes('#') && path.split('#')[0] === location.pathname);
  const isFunctional = path.startsWith('mailto:') || path.startsWith('tel:');
  const isExternal = path.startsWith('http://') || path.startsWith('https://');
  const isInternal = !isExternal && !isFunctional && !isHash && path.length > 0;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isFunctional) {
      // Let the browser open the mail client / phone dialer natively.
      if (onClick) onClick(e);
      return;
    }

    if (isHash) {
      e.preventDefault();
      const hash = path.includes('#') ? path.split('#')[1] : path.replace('#', '');
      if (hash) {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (isInternal) {
      e.preventDefault();
      navigate(path);
      window.scrollTo(0, 0);
    }
    // isExternal: browser handles it; target="_blank" is set on the element below.

    if (onClick) onClick(e);
  };

  return (
    <a
      href={path}
      onClick={handleLinkClick}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {children}
    </a>
  );
};

export default Link;
