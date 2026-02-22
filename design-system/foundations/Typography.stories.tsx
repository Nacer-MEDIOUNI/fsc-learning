import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const sizes = [
  { name: 'xs', css: 'var(--text-xs)', value: '12px' },
  { name: 'sm', css: 'var(--text-sm)', value: '13px' },
  { name: 'base', css: 'var(--text-base)', value: '1.0625rem (17px)' },
  { name: 'lg', css: 'var(--text-lg)', value: '1.1875rem (19px)' },
  { name: 'xl', css: 'var(--text-xl)', value: '1.3125rem (21px)' },
  { name: '2xl', css: 'var(--text-2xl)', value: '1.5625rem (25px)' },
  { name: '3xl', css: 'var(--text-3xl)', value: '1.9375rem (31px)' },
];

function TypeScale() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        padding: '32px',
      }}
    >
      <div>
        <h3
          style={{
            fontSize: '14px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '8px',
          }}
        >
          Font Family
        </h3>
        <p
          style={{
            fontSize: '17px',
            fontFamily: 'var(--font-sans)',
          }}
        >
          Inter, ui-sans-serif, system-ui, sans-serif
        </p>
        <p
          style={{
            fontSize: '13px',
            color: '#656b78',
            fontFamily: 'monospace',
            marginTop: '4px',
          }}
        >
          --font-sans
        </p>
      </div>

      <div>
        <h3
          style={{
            fontSize: '14px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '20px',
          }}
        >
          Type Scale
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {sizes.map((s) => (
            <div
              key={s.name}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '24px',
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  color: '#656b78',
                  width: '120px',
                  flexShrink: 0,
                }}
              >
                text-{s.name}
                <br />
                {s.value}
              </span>
              <span
                style={{
                  fontSize: s.css,
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 400,
                }}
              >
                The quick brown fox jumps over the lazy dog
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3
          style={{
            fontSize: '14px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '20px',
          }}
        >
          Font Weights
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { weight: 400, label: 'Regular' },
            { weight: 500, label: 'Medium' },
            { weight: 600, label: 'Semibold' },
            { weight: 700, label: 'Bold' },
          ].map((w) => (
            <div
              key={w.weight}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '24px',
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  color: '#656b78',
                  width: '120px',
                  flexShrink: 0,
                }}
              >
                font-weight: {w.weight}
                <br />
                {w.label}
              </span>
              <span
                style={{
                  fontSize: 'var(--text-xl)',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: w.weight,
                }}
              >
                The quick brown fox jumps over the lazy dog
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const meta = {
  title: 'FSC Core/Typography',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const TypeScaleAndWeights: Story = {
  render: () => <TypeScale />,
};
