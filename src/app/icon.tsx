import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0e0d12',
        color: '#D4AF37',
        fontSize: '30px',
        fontWeight: 700,
        letterSpacing: '-0.02em',
      }}
    >
      MR
    </div>,
    { ...size }
  );
}
