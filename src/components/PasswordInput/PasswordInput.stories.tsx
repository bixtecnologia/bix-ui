import type { Meta, StoryObj } from '@storybook/react';
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
A secure password input component that follows accessibility best practices.

## Features
- Toggle password visibility
- Accessible button with proper aria-label
- Customizable placeholder
- Controlled input with value/onChange props

## Usage
\`\`\`jsx
import { PasswordInput } from 'bix-ui';

function MyForm() {
  const [password, setPassword] = useState('');
  
  return (
    <PasswordInput
      value={password}
      onChange={setPassword}
      placeholder="Enter your password"
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
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {
    value: '',
    placeholder: 'Enter your password',
    onChange: (value) => console.log('Password changed:', value),
  },
};

export const WithValue: Story = {
  args: {
    value: 'MySecurePassword123',
    placeholder: 'Enter your password',
    onChange: (value) => console.log('Password changed:', value),
  },
};

export const CustomPlaceholder: Story = {
  args: {
    value: '',
    placeholder: 'Type your secret password here',
    onChange: (value) => console.log('Password changed:', value),
  },
}; 