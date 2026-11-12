'use client';

import React from 'react';
import Image from 'next/image';

interface CodePanelProps {
  filename?: string;
  portraitSrc?: string;
  showPortrait?: boolean;
  className?: string;
}

const CODE_LINES = [
  '<?php',
  '',
  'namespace App\\Http\\Controllers;',
  '',
  'class LeadController extends Controller',
  '{',
  '    public function store(Request $request): JsonResponse',
  '    {',
  '        $lead = Lead::create($request->validated());',
  '',
  '        return response()->json([',
  "            'status' => 'created',",
  "            'id'     => $lead->id,",
  '        ], 201);',
  '    }',
  '',
  '    public function index(): JsonResponse',
  '    {',
  '        $leads = Lead::latest()->paginate(25);',
  '',
  '        return response()->json($leads);',
  '    }',
  '}',
];

const KEYWORDS = new Set([
  'namespace',
  'class',
  'extends',
  'public',
  'private',
  'protected',
  'static',
  'function',
  'return',
  'new',
  'use',
  'true',
  'false',
  'null',
]);

const TOKEN_PATTERN = /(\/\/.*$|'[^']*'|"[^"]*"|\b\d+\b|\$\w+|\b[A-Za-z_]\w*\b)/g;

const TOKEN_TEST = /(\/\/.*$|'[^']*'|"[^"]*"|\b\d+\b|\$\w+|\b[A-Za-z_]\w*\b)/;

const tokenClass = (token: string): string => {
  if (token.startsWith('//')) return 'text-neutral-400';
  if (token.startsWith("'") || token.startsWith('"')) return 'text-[#A5D6FF]';
  if (token.startsWith('$')) return 'text-[#FFA657]';
  if (/^\d+$/.test(token)) return 'text-[#79C0FF]';
  if (KEYWORDS.has(token.toLowerCase())) return 'text-[#FF7B72]';
  if (/^[A-Z]/.test(token)) return 'text-[#D2A8FF]';
  return 'text-[#C9D1D9]';
};

const highlightLine = (line: string): React.ReactNode[] => {
  const parts = line.split(TOKEN_PATTERN).filter((part) => part !== '');

  return parts.map((part, index) => {
    if (!TOKEN_TEST.test(part)) {
      return (
        <span key={`${part}-${index}`} className="text-[#C9D1D9]">
          {part}
        </span>
      );
    }
    return (
      <span key={`${part}-${index}`} className={tokenClass(part)}>
        {part}
      </span>
    );
  });
};

export const CodePanel: React.FC<CodePanelProps> = ({
  filename = 'LeadController.php',
  portraitSrc,
  showPortrait = false,
  className = '',
}) => {
  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-[#0d1117] shadow-2xl ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-neutral-800 bg-[#161b22] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" aria-hidden="true" />
        <span className="ml-2 truncate font-mono text-[11px] text-neutral-300">{filename}</span>
        <span className="ml-auto rounded bg-[#0d1117] px-2 py-0.5 font-mono text-[10px] text-neutral-400">
          PHP
        </span>
      </div>

      {/* Horizontally scrollable: a scrollable region must be reachable and
          operable by keyboard (WCAG 2.1.1 / axe `scrollable-region-focusable`). */}
      <pre
        tabIndex={0}
        role="region"
        aria-label={`${filename} code sample, horizontally scrollable`}
        className="flex-1 overflow-x-auto px-4 py-5 font-mono text-[11px] leading-[1.85] sm:text-xs focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-gold"
      >
        <code>
          {CODE_LINES.map((line, index) => (
            <span key={index} className="block">
              {highlightLine(line)}
              {line === '' ? ' ' : ''}
            </span>
          ))}
        </code>
      </pre>

      <div className="flex items-center justify-between border-t border-neutral-800 bg-[#161b22] px-4 py-2 font-mono text-[10px] text-neutral-400">
        <span>UTF-8</span>
        <span>PHP 8.2</span>
        <span className="text-brand-gold">Ln 12, Col 9</span>
      </div>

      <div className="absolute -bottom-5 -right-5 h-24 w-24 overflow-hidden rounded-2xl border border-brand-gold/40 bg-[#161b22] shadow-2xl sm:h-28 sm:w-28">
        {showPortrait && portraitSrc ? (
          <Image
            src={portraitSrc}
            alt="Mahendra Rajput, full stack developer and Linux server engineer"
            fill
            sizes="112px"
            className="object-cover object-center"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center font-display text-3xl tracking-tight text-brand-gold sm:text-4xl"
          >
            MR
          </span>
        )}
      </div>
    </div>
  );
};
