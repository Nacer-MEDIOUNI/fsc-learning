import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const spacingScale = [
  { name: '1', px: 4 },
  { name: '2', px: 8 },
  { name: '3', px: 12 },
  { name: '4', px: 16 },
  { name: '5', px: 20 },
  { name: '6', px: 24 },
  { name: '7', px: 28 },
  { name: '8', px: 32 },
  { name: '9', px: 36 },
  { name: '10', px: 40 },
  { name: '11', px: 44 },
  { name: '12', px: 48 },
  { name: '14', px: 56 },
  { name: '16', px: 64 },
];

function SpacingScale() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '32px',
      }}
    >
      <h3
        style={{
          fontSize: '14px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '8px',
        }}
      >
        Spacing Scale (Tailwind defaults)
      </h3>
      {spacingScale.map((s) => (
        <div
          key={s.name}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              fontFamily: 'monospace',
              color: '#656b78',
              width: '40px',
              textAlign: 'right',
              flexShrink: 0,
            }}
          >
            {s.name}
          </span>
          <div
            style={{
              height: '20px',
              width: `${s.px}px`,
              backgroundColor: 'var(--color-accent-500)',
              borderRadius: '4px',
              minWidth: '4px',
            }}
          />
          <span
            style={{
              fontSize: '11px',
              fontFamily: 'monospace',
              color: '#656b78',
              flexShrink: 0,
            }}
          >
            {s.px}px
          </span>
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: 'FSC Core/Spacing',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Scale: Story = {
  render: () => <SpacingScale />,
};
