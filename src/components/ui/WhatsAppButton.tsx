'use client';

import React from 'react';
import { useCursor } from '@/context/CursorContext';
import { Magnetic } from '@/components/ui/Magnetic';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '919754137138',
  message = 'Hi Mahendra, I visited your portfolio and would like to connect!',
  className = '',
}) => {
  const { setCursorVariant, resetCursor } = useCursor();
  const encodedMsg = encodeURIComponent(message);
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMsg}`;

  return (
    <div className={`fixed bottom-6 left-6 z-40 ${className}`}>
      <Magnetic strength={0.3}>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Mahendra Rajput on WhatsApp"
          className="group flex items-center gap-2.5 rounded-full bg-[#25D366] text-white px-4 py-3 shadow-xl hover:bg-[#20bd5a] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20 select-none"
          onMouseEnter={() => setCursorVariant('hover')}
          onMouseLeave={resetCursor}
        >
          {/* WhatsApp SVG Icon */}
          <svg
            className="w-5 h-5 fill-current transition-transform duration-300 group-hover:rotate-12"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.599 2.679-.702c.97.531 1.93.813 2.781.814h.005c3.179 0 5.767-2.586 5.768-5.766 0-1.54-.599-2.989-1.688-4.079-1.09-1.089-2.54-1.689-4.085-1.689zm7.397 1.636c1.55 1.55 2.404 3.611 2.404 5.798 0 4.514-3.673 8.187-8.188 8.187-.001 0-.003 0-.004 0-1.378-.001-2.727-.37-3.916-1.07l-4.364 1.144 1.164-4.252c-.767-1.233-1.173-2.658-1.173-4.12 0-4.514 3.673-8.188 8.188-8.188 2.187 0 4.248.854 5.798 2.404l.095.107zm-7.397 13.568c1.234 0 2.433-.332 3.486-.961l.25-.15 2.593.68-.692-2.527.163-.26c.691-1.101 1.056-2.38 1.056-3.69 0-3.791-3.084-6.875-6.876-6.875-1.836 0-3.562.716-4.861 2.015s-2.015 3.025-2.015 4.86c0 3.792 3.084 6.876 6.875 6.876l.024.032zm3.765-5.143c-.206-.103-1.22-.602-1.409-.671-.189-.069-.327-.103-.464.103-.138.206-.533.671-.653.809-.12.138-.241.155-.447.052-.206-.103-.872-.321-1.66-1.024-.614-.547-1.028-1.222-1.148-1.428-.12-.206-.013-.318.09-.42.093-.092.206-.241.31-.361.103-.12.138-.206.206-.344.069-.138.034-.258-.017-.361-.052-.103-.464-1.118-.636-1.531-.168-.403-.339-.348-.464-.354l-.396-.007c-.138 0-.361.052-.55.258-.189.206-.723.706-.723 1.721 0 1.015.74 1.996.843 2.134.103.138 1.456 2.223 3.528 3.117.493.213.878.34 1.178.435.495.157.946.135 1.302.082.397-.059 1.22-.499 1.392-.98.172-.482.172-.895.12-1.033-.051-.137-.189-.206-.395-.309z" />
          </svg>
          <span className="hidden sm:inline-block text-xs font-mono font-semibold tracking-wider">
            WhatsApp
          </span>
        </a>
      </Magnetic>
    </div>
  );
};
