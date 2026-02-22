import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const radii = [
  { name: 'xs', css: 'var(--radius-xs)', value: '6px' },
  { name: 'sm', css: 'var(--radius-sm)', value: '8px' },
  { name: 'md', css: 'var(--radius-md)', value: '12px' },
  { name: 'lg', css: 'var(--radius-lg)', value: '16px' },
  { name: 'xl', css: 'var(--radius-xl)', value: '20px' },
];

function RadiusShowcase() {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '32px',
        padding: '32px',
      }}
    >
      {radii.map((r) => (
        <div
          key={r.name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: r.css,
              backgroundColor: 'var(--color-primary-500)',
            }}
          />
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              fontFamily: 'monospace',
            }}
          >
            radius-{r.name}
          </span>
          <span
            style={{
              fontSize: '11px',
              color: '#656b78',
              fontFamily: 'monospace',
            }}
          >
            {r.value}
          </span>
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: 'FSC Core/Border Radius',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const AllRadii: Story = {
  render: () => <RadiusShowcase />,
};
