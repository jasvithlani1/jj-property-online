import { ChevronRight } from 'lucide-react';
import Link from './Link';

export interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** 'dark' = white text for navy hero sections; 'light' = dark text for light sections */
  variant?: 'dark' | 'light';
  className?: string;
}

export default function Breadcrumb({ items, variant = 'dark', className = '' }: BreadcrumbProps) {
  const textBase = variant === 'dark' ? 'text-white/50' : 'text-black/40';
  const textActive = variant === 'dark' ? 'text-gold hover:text-white' : 'text-gold hover:text-black';
  const textCurrent = variant === 'dark' ? 'text-white/80' : 'text-black/70';
  const chevronColor = variant === 'dark' ? 'text-white/30' : 'text-black/30';

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center ${className}`}>
      <ol className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] ${textBase}`}>
        <li>
          <Link href="/" className={`transition-colors duration-200 ${textActive}`}>
            Home
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.name} className="flex items-center gap-1.5">
              <ChevronRight className={`w-3 h-3 shrink-0 ${chevronColor}`} aria-hidden="true" />
              {isLast || !item.url ? (
                <span className={`${textCurrent} max-w-[140px] sm:max-w-[280px] truncate`} aria-current={isLast ? 'page' : undefined}>
                  {item.name}
                </span>
              ) : (
                <Link href={item.url} className={`transition-colors duration-200 ${textActive}`}>
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
