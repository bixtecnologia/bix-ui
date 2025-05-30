import type { Meta, StoryObj } from '@storybook/react-vite';
import { PasswordInput } from './index';

const meta = {
  title: 'Form/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A secure password input component that follows accessibility best practices. Includes optional strength indicator and criteria checklist.

## Features
- Toggle password visibility
- Password strength indicator (optional)
- Password criteria checklist (optional)
- Accessible button with proper aria-label
- Customizable placeholder and class names
- Controlled input with value/onChange props
- Disabled and required states

## Usage
\`\`\`jsx
import { PasswordInput } from 'bix-ui';
import { useState } from 'react'; // Added for example

function MyForm() {
  const [password, setPassword] = useState('');
  
  return (
    <PasswordInput
      value={password}
      onChange={setPassword}
      placeholder="Enter your password"
      name="userPassword"
      showStrengthBar
      showCriteria
    />
  );
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    value: {
      description: 'The current value of the password input',
      control: 'text',
    },
    onChange: {
      description: 'Callback fired when the password value changes',
      control: false,
    },
    placeholder: {
      description: 'Placeholder text displayed when the input is empty',
      control: 'text',
    },
    name: {
      description: 'Name attribute for the input element',
      control: 'text',
    },
    disabled: {
      description: 'Disables the input and toggle button',
      control: 'boolean',
    },
    required: {
      description: 'Adds the required attribute to the input',
      control: 'boolean',
    },
    className: {
      description: 'CSS class for the root component element',
      control: 'text',
    },
    inputClassName: {
      description: 'CSS class for the input element itself',
      control: 'text',
    },
    showStrengthBar: {
      description: 'Controls visibility of the strength indicator',
      control: 'boolean',
    },
    showCriteria: {
      description: 'Controls visibility of the criteria checklist',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof PasswordInput>;

const baseArgs = {
  placeholder: 'Enter your password',
  onChange: (value: string) => console.log('Password changed:', value),
  name: 'passwordField',
};

export const Default: Story = {
  args: {
    ...baseArgs,
    value: '',
  },
};

export const WithValue: Story = {
  args: {
    ...baseArgs,
    value: 'MySecurePassword123',
  },
};

export const CustomPlaceholder: Story = {
  args: {
    ...baseArgs,
    value: '',
    placeholder: 'Type your secret password here',
  },
}; 

export const Disabled: Story = {
  args: {
    ...baseArgs,
    value: 'cantchange',
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    ...baseArgs,
    value: '',
    required: true,
    placeholder: 'This field is required',
  },
};

export const NoStrengthBar: Story = {
  args: {
    ...baseArgs,
    value: 'StrongPass!123',
    showStrengthBar: false,
    showCriteria: true,
  },
};

export const NoCriteria: Story = {
  args: {
    ...baseArgs,
    value: 'AnotherPass@456',
    showStrengthBar: true,
    showCriteria: false,
  },
};

export const Minimal: Story = {
  args: {
    ...baseArgs,
    value: 'MinimalView789#',
    showStrengthBar: false,
    showCriteria: false,
  },
};

export const WithCustomStyling: Story = {
  args: {
    ...baseArgs,
    value: 'StyledInput!A1',
    className: 'p-4 bg-blue-100 border-2 border-blue-500 rounded-xl',
    inputClassName: 'text-blue-700 placeholder-blue-300',
    placeholder: 'Blue styled input'
  },
};

export const KitchenSink: Story = {
  args: {
    ...baseArgs,
    value: 'Test123!@#',
    placeholder: 'Play with controls!',
    name: 'kitchenSinkPassword',
    disabled: false,
    required: false,
    showStrengthBar: true,
    showCriteria: true,
    className: '',
    inputClassName: '',
  },
}; 