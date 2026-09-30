import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="flex items-center text-xs text-slate-500 mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1.5 md:space-x-2">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-slate-500 hover:text-emerald-700 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>MEIL Portal</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="inline-flex items-center">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 mx-1 shrink-0" />
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className="text-slate-500 hover:text-emerald-700 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={`font-semibold ${isLast ? 'text-slate-800' : 'text-slate-600'}`}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
