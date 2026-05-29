/**
 * Footer link column component
 * @module components/takhton/layout/FooterColumn
 */

import Link from "next/link";

export interface FooterColumnLink {
  label: string;
  href: string;
}

export interface FooterColumnProps {
  title: string;
  links: ReadonlyArray<FooterColumnLink>;
}

export function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-[#dfc38a]">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-[#f3ebd8]/70 transition-colors hover:text-[#dfc38a]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
