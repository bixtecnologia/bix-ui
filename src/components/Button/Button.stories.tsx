import type { Meta, StoryObj } from '@storybook/react';
import { Mail } from 'lucide-react';
import { Button } from './index';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A versatile button component that supports various styles, sizes, and states.

## Features
- Multiple variants (primary, secondary, destructive, outlined, text)
- Different sizes (small, medium, large)
- Shape variations (rectangular, rounded, circular)
- Icon support (left, right, icon-only)
- Loading state with spinner
- Async click handler support
- Full accessibility support
- Responsive hover, focus, and active states

## Usage
\`\`\`jsx
import { Button } from 'bix-ui';

function MyComponent() {
  return (
    <Button
      variant="primary"
      size="medium"
      onClick={() => console.log('clicked')}
    >
      Click me
    </Button>
  );
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive', 'outlined', 'text'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive Button',
    variant: 'destructive',
  },
};

export const Outlined: Story = {
  args: {
    children: 'Outlined Button',
    variant: 'outlined',
  },
};

export const Text: Story = {
  args: {
    children: 'Text Button',
    variant: 'text',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'large',
  },
};

export const WithLeftIcon: Story = {
  args: {
    children: 'Button',
    leftIcon: <Mail size={16} />,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'Button',
    rightIcon: <Mail size={16} />,
  },
};

export const IconOnly: Story = {
  args: {
    children: <Mail size={16} />,
    iconOnly: true,
    'aria-label': 'Button',
  },
};

// States
export const Loading: Story = {
  args: {
    children: 'Loading',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const AsyncClick: Story = {
  args: {
    children: 'Async Action',
    onClick: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
    },
  },
};

export const SizeComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button size="small">Small Button</Button>
        <Button size="small" iconOnly><Mail size={16} /></Button>
      </div>
      <div className="flex items-center gap-2">
        <Button size="medium">Medium Button</Button>
        <Button size="medium" iconOnly><Mail size={20} /></Button>
      </div>
      <div className="flex items-center gap-2">
        <Button size="large">Large Button</Button>
        <Button size="large" iconOnly><Mail size={24} /></Button>
      </div>
    </div>
  )
};
