import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
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
        fontSize: '82px',
        fontWeight: 700,
        letterSpacing: '-0.02em',
      }}
    >
      MR
    </div>,
    { ...size }
  );
}
