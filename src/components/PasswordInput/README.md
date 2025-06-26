# PasswordInput Component

A secure and accessible password input component for React applications.

## Installation

```bash
npm install bix-ui
```

## Features

- 🔒 Toggle password visibility
- 💪 Password strength indicator (optional)
- ✅ Password criteria checklist (optional)
- ♿️ Fully accessible with proper ARIA labels
- 🎨 Customizable styling with Tailwind CSS
- 📱 Responsive design
- ⌨️ Keyboard navigation support

## Usage

```jsx
import { PasswordInput } from 'bix-ui';
import { useState } from 'react';

function LoginForm() {
  const [password, setPassword] = useState('');

  return (
    <PasswordInput
      value={password}
      onChange={setPassword}
      placeholder="Enter your password"
      name="userPassword"
      showStrengthBar={true}
      showCriteria={true}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | _required_ | The current value of the password input. |
| `onChange` | `(value: string) => void` | _required_ | Callback fired when the password value changes. |
| `placeholder` | `string` | `'Enter your password'` | Placeholder text displayed when the input is empty. |
| `name` | `string` | `undefined` | Name attribute for the input element (useful for forms). |
| `disabled` | `boolean` | `false` | If `true`, disables the input and the visibility toggle button. |
| `required` | `boolean` | `false` | If `true`, adds the `required` attribute to the input element. |
| `className` | `string` | `undefined` | CSS class name to apply to the root component element for custom styling. |
| `inputClassName` | `string` | `undefined` | CSS class name to apply specifically to the `<input>` element. |
| `showStrengthBar` | `boolean` | `true` | If `true`, displays the password strength indicator bar and text. |
| `showCriteria` | `boolean` | `true` | If `true`, displays the list of password criteria. |

## Accessibility

- Uses semantic HTML elements
- Includes proper ARIA labels for the visibility toggle button
- Supports keyboard navigation
- High contrast visual indicators

## Contributing

Please read our [Contributing Guide](../../CONTRIBUTING.md) before submitting a Pull Request to the project.

## License

MIT © [Bix UI](https://github.com/bix-ui) 