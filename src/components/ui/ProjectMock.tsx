'use client';

import React from 'react';

interface ProjectMockProps {
  url: string;
  accent: string;
  kind: 'crm' | 'jobs' | 'tasks';
  className?: string;
}

const bar = 'h-1.5 rounded-full bg-current opacity-20';
const chip = 'h-4 rounded bg-current opacity-10';

export const ProjectMock: React.FC<ProjectMockProps> = ({ url, accent, kind, className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`flex flex-col overflow-hidden rounded-lg border border-neutral-800 bg-[#0b0b0b] ${className}`}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-neutral-800 bg-[#161616] px-2 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
        <span className="ml-1 truncate rounded bg-neutral-900 px-1.5 py-0.5 font-mono text-[7px] text-neutral-400">
          {url}
        </span>
      </div>

      {/* App surface */}
      <div className="flex-1 p-2 text-neutral-500" style={{ color: accent }}>
        {kind === 'crm' && (
          <div className="space-y-1.5">
            <div className="flex gap-1.5">
              <span className={`${chip} flex-1`} />
              <span className={`${chip} flex-1`} />
              <span className={`${chip} flex-1`} />
            </div>
            <div className="space-y-1">
              {[92, 78, 85, 66].map((w, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-current opacity-40" />
                  <span className={`${bar} flex-1`} style={{ width: `${w}%` }} />
                  <span className="h-1 w-1.5 rounded-full bg-current opacity-50" />
                </div>
              ))}
            </div>
            <div className="flex gap-1 pt-0.5">
              <span className="h-2 flex-1 rounded-sm bg-current opacity-15" />
              <span className="h-2 flex-1 rounded-sm bg-current opacity-10" />
            </div>
          </div>
        )}

        {kind === 'jobs' && (
          <div className="flex gap-1.5">
            <span className="w-1/4 space-y-1">
              <span className={`${chip} block`} />
              <span className={`${bar} block w-4/5`} />
              <span className={`${bar} block w-3/5`} />
              <span className={`${bar} block w-4/6`} />
            </span>
            <span className="flex-1 space-y-1.5">
              {[90, 84, 78].map((w, i) => (
                <span key={i} className="block space-y-1 rounded-sm bg-current opacity-8 p-1">
                  <span className={`${bar} block`} style={{ width: `${w}%` }} />
                  <span className={`${bar} block w-1/3`} />
                </span>
              ))}
            </span>
          </div>
        )}

        {kind === 'tasks' && (
          <div className="flex gap-1.5">
            {[0, 1, 2].map((col) => (
              <span key={col} className="flex-1 space-y-1">
                <span className={`${bar} block w-1/2`} />
                <span className="block space-y-1 rounded-sm bg-current opacity-8 p-1">
                  <span className={`${bar} block w-full`} />
                  <span className={`${bar} block w-2/3`} />
                </span>
                <span className="block rounded-sm bg-current opacity-8 p-1">
                  <span className={`${bar} block w-4/5`} />
                </span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
