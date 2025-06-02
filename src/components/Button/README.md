# Button Component

A versatile and accessible button component for Bix UI.

## Installation

```bash
npm install bix-ui
```

## Features

- 🎨 Multiple style variants:
  - Primary
  - Secondary
  - Destructive
  - Outlined
  - Text

- 📏 Different sizes:
  - Small
  - Medium (default)
  - Large

- 🖼️ Icon support:
  - Left icon
  - Right icon
  - Icon only

- ⚡ States:
  - Loading with spinner
  - Disabled
  - Hover
  - Focus
  - Active

- ♿ Accessibility:
  - Full ARIA support
  - Keyboard navigation
  - Clear visual states

## Usage

```tsx
import { Button } from 'bix-ui';
import { Mail } from 'lucide-react';

// Basic button
<Button variant="primary">
  Click me
</Button>

// With icon
<Button
  variant="primary"
  leftIcon={<Mail size={16} />}
>
  Send Email
</Button>

// Loading
<Button loading>
  Processing
</Button>

// Async
<Button
  onClick={async () => {
    await saveData();
  }}
>
  Save
</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'destructive' \| 'outlined' \| 'text' | 'primary' | Visual style of the button |
| size | 'small' \| 'medium' \| 'large' | 'medium' | Size of the button |
| disabled | boolean | false | Whether the button is disabled |
| loading | boolean | false | Shows a loading spinner |
| leftIcon | ReactNode | - | Icon to the left of the text |
| rightIcon | ReactNode | - | Icon to the right of the text |
| iconOnly | boolean | false | Removes padding for icon-only buttons |
| onClick | () => void \| Promise<void> | - | Function called when clicked |
| className | string | - | Additional CSS classes |
| aria-label | string | - | Accessibility label |
| fullWidth | boolean | false | Makes the button take 100% width |

## Accessibility

The component follows accessibility best practices:

- Uses semantic elements
- Supports keyboard navigation
- Includes clear visual states
- Supports ARIA labels
- Indicates loading and disabled states

## Contributing

Please read our [Contributing Guide](../../CONTRIBUTING.md) before submitting a Pull Request. 