import { ImageResponse } from 'next/og';

export const alt = 'Mahendra Rajput — Full Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#0e0d12',
        padding: '72px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 85% 15%, rgba(212,175,55,0.18) 0%, rgba(14,13,18,0) 55%)',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          style={{
            display: 'flex',
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: '#D4AF37',
            color: '#0e0d12',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 700,
          }}
        >
          MR
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '26px', color: '#f1eee8', letterSpacing: '0.02em' }}>
            Mahendra Rajput
          </div>
          <div style={{ fontSize: '15px', color: '#8d8a95', letterSpacing: '0.14em' }}>
            INDORE, INDIA · AVAILABLE WORLDWIDE
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            fontSize: '104px',
            lineHeight: 1,
            color: '#f1eee8',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            display: 'flex',
          }}
        >
          FULL STACK
        </div>
        <div
          style={{
            fontSize: '104px',
            lineHeight: 1.05,
            color: '#D4AF37',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            display: 'flex',
          }}
        >
          DEVELOPER
        </div>
        <div style={{ fontSize: '26px', color: '#c9c5bd', marginTop: '28px', display: 'flex' }}>
          Drupal · Laravel · React · Next.js · Linux Servers
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid #25232d',
          paddingTop: '24px',
          fontSize: '18px',
          color: '#8d8a95',
        }}
      >
        <span>mahiweb.in</span>
        <span style={{ color: '#D4AF37' }}>ma02raj@gmail.com</span>
      </div>
    </div>,
    { ...size }
  );
}
