import type { Meta, StoryObj } from '@storybook/react-vite';
import { SwitchButton } from './index';

const meta = {
  title: 'Form/SwitchButton',
  component: SwitchButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A versatile switch/toggle button component that follows accessibility best practices. Supports both controlled and uncontrolled modes with smooth animations.

## Features
- Smooth transition animations
- Multiple size variants (sm, md, lg)
- Multiple color themes (primary, secondary, success, warning, danger)
- Disabled state support
- Controlled and uncontrolled modes
- Full accessibility support with ARIA attributes
- Keyboard navigation
- Focus indicators

## Usage
\`\`\`jsx
import { SwitchButton } from 'bix-ui';
import { useState } from 'react';

// Controlled mode
function ControlledExample() {
  const [isEnabled, setIsEnabled] = useState(false);
  
  return (
    <SwitchButton
      checked={isEnabled}
      onChange={setIsEnabled}
      size="md"
      color="primary"
    />
  );
}

// Uncontrolled mode
function UncontrolledExample() {
  return (
    <SwitchButton
      defaultChecked={true}
      onChange={(checked) => console.log('Switch toggled:', checked)}
      size="lg"
      color="success"
    />
  );
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    checked: {
      description: 'Controls the switch state (controlled mode)',
      control: 'boolean',
    },
    defaultChecked: {
      description: 'Initial state for uncontrolled mode',
      control: 'boolean',
    },
    onChange: {
      description: 'Callback fired when the switch state changes',
      control: false,
    },
    size: {
      description: 'Size variant of the switch',
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      description: 'Color theme of the switch',
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
    },
    disabled: {
      description: 'Disables the switch and prevents interaction',
      control: 'boolean',
    },
    name: {
      description: 'Name attribute for the input element',
      control: 'text',
    },
    id: {
      description: 'ID attribute for the input element',
      control: 'text',
    },
    'aria-label': {
      description: 'Accessible label for the switch',
      control: 'text',
    },
    'aria-labelledby': {
      description: 'ID of element that labels the switch',
      control: 'text',
    },
    'aria-describedby': {
      description: 'ID of element that describes the switch',
      control: 'text',
    },
    className: {
      description: 'CSS class for custom styling',
      control: 'text',
    },
    onFocus: {
      description: 'Callback fired when the switch receives focus',
      control: false,
    },
    onBlur: {
      description: 'Callback fired when the switch loses focus',
      control: false,
    },
  },
} satisfies Meta<typeof SwitchButton>;

export default meta;
type Story = StoryObj<typeof SwitchButton>;

const baseArgs = {
  onChange: (checked: boolean) => console.log('Switch toggled:', checked),
};

export const Default: Story = {
  args: {
    ...baseArgs,
    defaultChecked: false,
  },
};

export const Checked: Story = {
  args: {
    ...baseArgs,
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    ...baseArgs,
    defaultChecked: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    ...baseArgs,
    defaultChecked: true,
    disabled: true,
  },
};

// Size variants
export const SmallSize: Story = {
  args: {
    ...baseArgs,
    defaultChecked: true,
    size: 'sm',
  },
};

export const MediumSize: Story = {
  args: {
    ...baseArgs,
    defaultChecked: true,
    size: 'md',
  },
};

export const LargeSize: Story = {
  args: {
    ...baseArgs,
    defaultChecked: true,
    size: 'lg',
  },
};

// Color variants
export const PrimaryColor: Story = {
  args: {
    ...baseArgs,
    defaultChecked: true,
    color: 'primary',
  },
};

export const SecondaryColor: Story = {
  args: {
    ...baseArgs,
    defaultChecked: true,
    color: 'secondary',
  },
};

export const SuccessColor: Story = {
  args: {
    ...baseArgs,
    defaultChecked: true,
    color: 'success',
  },
};

export const WarningColor: Story = {
  args: {
    ...baseArgs,
    defaultChecked: true,
    color: 'warning',
  },
};

export const DangerColor: Story = {
  args: {
    ...baseArgs,
    defaultChecked: true,
    color: 'danger',
  },
};

// Combined examples
export const LargeSuccess: Story = {
  args: {
    ...baseArgs,
    defaultChecked: true,
    size: 'lg',
    color: 'success',
  },
};

export const SmallWarning: Story = {
  args: {
    ...baseArgs,
    defaultChecked: false,
    size: 'sm',
    color: 'warning',
  },
};

export const WithCustomStyling: Story = {
  args: {
    ...baseArgs,
    defaultChecked: true,
    className: 'p-4 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300',
    color: 'primary',
    size: 'lg',
  },
};

export const WithAccessibilityLabels: Story = {
  args: {
    ...baseArgs,
    defaultChecked: false,
    'aria-label': 'Enable notifications',
    name: 'notifications-toggle',
    id: 'notifications-switch',
  },
};

export const KitchenSink: Story = {
  args: {
    ...baseArgs,
    defaultChecked: false,
    size: 'md',
    color: 'primary',
    disabled: false,
    name: 'demo-switch',
    id: 'demo-switch-id',
    'aria-label': 'Toggle demo feature',
    className: '',
  },
};
