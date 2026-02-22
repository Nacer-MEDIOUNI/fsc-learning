import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const palettes = {
  Primary: [
    { token: 'primary-50', tw: 'bg-primary-50', hex: '#f4f7f6' },
    { token: 'primary-100', tw: 'bg-primary-100', hex: '#e5ebea' },
    { token: 'primary-200', tw: 'bg-primary-200', hex: '#a9beb8' },
    { token: 'primary-300', tw: 'bg-primary-300', hex: '#6d9a8d' },
    { token: 'primary-400', tw: 'bg-primary-400', hex: '#3a7b67' },
    { token: 'primary-500', tw: 'bg-primary-500', hex: '#285c4d' },
    { token: 'primary-550', tw: 'bg-primary-550', hex: '#246b58' },
    { token: 'primary-600', tw: 'bg-primary-600', hex: '#1f4a3d' },
    { token: 'primary-700', tw: 'bg-primary-700', hex: '#17382e' },
    { token: 'primary-800', tw: 'bg-primary-800', hex: '#0f261f' },
    { token: 'primary-900', tw: 'bg-primary-900', hex: '#0b1b16' },
  ],
  Accent: [
    { token: 'accent-50', tw: 'bg-accent-50', hex: '#eff7e4' },
    { token: 'accent-100', tw: 'bg-accent-100', hex: '#dff0c9' },
    { token: 'accent-200', tw: 'bg-accent-200', hex: '#c9e5a6' },
    { token: 'accent-300', tw: 'bg-accent-300', hex: '#a3d462' },
    { token: 'accent-400', tw: 'bg-accent-400', hex: '#8dc93e' },
    { token: 'accent-500', tw: 'bg-accent-500', hex: '#78be20' },
    { token: 'accent-600', tw: 'bg-accent-600', hex: '#609819' },
    { token: 'accent-700', tw: 'bg-accent-700', hex: '#487213' },
    { token: 'accent-900', tw: 'bg-accent-900', hex: '#1a2e08' },
  ],
  Amber: [
    { token: 'amber-50', tw: 'bg-amber-50', hex: '#faefe1' },
    { token: 'amber-100', tw: 'bg-amber-100', hex: '#f5dfc3' },
    { token: 'amber-400', tw: 'bg-amber-400', hex: '#f59e0b' },
    { token: 'amber-500', tw: 'bg-amber-500', hex: '#d97706' },
    { token: 'amber-600', tw: 'bg-amber-600', hex: '#b45f05' },
    { token: 'amber-900', tw: 'bg-amber-900', hex: '#451a03' },
  ],
  Red: [
    { token: 'red-50', tw: 'bg-red-50', hex: '#fbe5e5' },
    { token: 'red-100', tw: 'bg-red-100', hex: '#f7cccc' },
    { token: 'red-400', tw: 'bg-red-400', hex: '#f87171' },
    { token: 'red-500', tw: 'bg-red-500', hex: '#dc2626' },
    { token: 'red-600', tw: 'bg-red-600', hex: '#b91c1c' },
    { token: 'red-900', tw: 'bg-red-900', hex: '#450a0a' },
  ],
  Blue: [
    { token: 'blue-50', tw: 'bg-blue-50', hex: '#e5ecfd' },
    { token: 'blue-100', tw: 'bg-blue-100', hex: '#ccd9fb' },
    { token: 'blue-400', tw: 'bg-blue-400', hex: '#60a5fa' },
    { token: 'blue-500', tw: 'bg-blue-500', hex: '#2563eb' },
    { token: 'blue-600', tw: 'bg-blue-600', hex: '#1d4ed8' },
    { token: 'blue-900', tw: 'bg-blue-900', hex: '#1e1b4b' },
  ],
  Neutral: [
    { token: 'neutral-50', tw: 'bg-neutral-50', hex: '#f8f8f9' },
    { token: 'neutral-100', tw: 'bg-neutral-100', hex: '#f0f1f2' },
    { token: 'neutral-200', tw: 'bg-neutral-200', hex: '#dadcdf' },
    { token: 'neutral-300', tw: 'bg-neutral-300', hex: '#c4c7cc' },
    { token: 'neutral-400', tw: 'bg-neutral-400', hex: '#a6aab3' },
    { token: 'neutral-500', tw: 'bg-neutral-500', hex: '#656b78' },
    { token: 'neutral-600', tw: 'bg-neutral-600', hex: '#4b5563' },
    { token: 'neutral-700', tw: 'bg-neutral-700', hex: '#374151' },
    { token: 'neutral-800', tw: 'bg-neutral-800', hex: '#1f2937' },
    { token: 'neutral-900', tw: 'bg-neutral-900', hex: '#111827' },
    { token: 'neutral-950', tw: 'bg-neutral-950', hex: '#0c1714' },
  ],
  'Gold & Dark': [
    { token: 'gold', tw: 'bg-gold', hex: '#f2a900' },
    { token: 'dark', tw: 'bg-dark', hex: '#0b1b16' },
  ],
};

function Swatch({
  token,
  hex,
  light,
}: {
  token: string;
  hex: string;
  light: boolean;
}) {
  const isLight =
    token.includes('-50') ||
    token.includes('-100') ||
    token.includes('-200') ||
    token.includes('-300');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        width: '88px',
      }}
    >
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '12px',
          backgroundColor: hex,
          border: isLight ? '1px solid #dadcdf' : 'none',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      />
      <span
        style={{
          fontSize: '11px',
          fontWeight: 600,
          color: light ? '#111827' : '#f0f1f2',
          fontFamily: 'monospace',
        }}
      >
        {token}
      </span>
      <span
        style={{
          fontSize: '10px',
          color: light ? '#656b78' : '#a6aab3',
          fontFamily: 'monospace',
        }}
      >
        {hex}
      </span>
    </div>
  );
}

function PaletteGrid({ light }: { light: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        padding: '32px',
        backgroundColor: light ? '#ffffff' : '#0c1714',
        borderRadius: '16px',
      }}
    >
      {Object.entries(palettes).map(([name, swatches]) => (
        <div key={name}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: light ? '#111827' : '#f0f1f2',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {name}
          </h3>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            {swatches.map((s) => (
              <Swatch key={s.token} token={s.token} hex={s.hex} light={light} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: 'FSC Core/Colors',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const LightBackground: Story = {
  render: () => <PaletteGrid light />,
};

export const DarkBackground: Story = {
  render: () => <PaletteGrid light={false} />,
};
