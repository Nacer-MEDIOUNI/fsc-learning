import type { Preview } from '@storybook/nextjs-vite';
import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      codePanel: true,
      canvas: {
        sourceState: 'shown',
      },
    },
    options: {
      storySort: {
        order: ['FSC Core', ['Colors'], '*'],
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      const isDark = context.globals['theme'] === 'dark';
      document.documentElement.classList.toggle('dark', isDark);
      return Story();
    },
  ],
  globalTypes: {
    theme: {
      description: 'Theme mode',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
};

export default preview;
