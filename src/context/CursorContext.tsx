'use client';

import React, { createContext, useContext, useState } from 'react';

type CursorVariant = 'default' | 'hover' | 'project' | 'text' | 'hidden';

interface CursorContextType {
  variant: CursorVariant;
  cursorText: string;
  setCursorVariant: (variant: CursorVariant, text?: string) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextType>({
  variant: 'default',
  cursorText: '',
  setCursorVariant: () => {},
  resetCursor: () => {},
});

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [cursorText, setCursorText] = useState<string>('');

  const setCursorVariant = (newVariant: CursorVariant, text = '') => {
    setVariant(newVariant);
    setCursorText(text);
  };

  const resetCursor = () => {
    setVariant('default');
    setCursorText('');
  };

  return (
    <CursorContext.Provider value={{ variant, cursorText, setCursorVariant, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);
