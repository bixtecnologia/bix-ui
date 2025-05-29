# PasswordInput Component

A secure and accessible password input component for React applications.

## Installation

```bash
npm install bix-ui
```

## Features

- 🔒 Toggle password visibility
- ♿️ Fully accessible with proper ARIA labels
- 🎨 Customizable styling with Tailwind CSS
- 📱 Responsive design
- ⌨️ Keyboard navigation support

## Usage

```jsx
import { PasswordInput } from 'bix-ui';

function LoginForm() {
  const [password, setPassword] = useState('');

  return (
    <PasswordInput
      value={password}
      onChange={setPassword}
      placeholder="Enter your password"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string | required | The current value of the password input |
| onChange | (value: string) => void | required | Callback fired when the password value changes |
| placeholder | string | 'Enter your password' | Placeholder text displayed when the input is empty |

## Accessibility

- Uses semantic HTML elements
- Includes proper ARIA labels for the visibility toggle button
- Supports keyboard navigation
- High contrast visual indicators

## Contributing

Please read our [Contributing Guide](../../CONTRIBUTING.md) before submitting a Pull Request to the project.

## License

MIT © [Bix UI](https://github.com/bix-ui) 