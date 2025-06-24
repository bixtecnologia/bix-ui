# SwitchButton Component

A versatile and accessible switch/toggle button component for React applications.

## Installation

```bash
npm install bix-ui
```

## Features

- 🎯 **Smooth Animations** - Fluid transition animations with 200ms duration
- 📏 **Multiple Sizes** - Three size variants: small, medium, and large
- 🎨 **Color Themes** - Five color options: primary, secondary, success, warning, and danger
- 🚫 **Disabled State** - Visual and functional disabled state support
- 🎛️ **Controlled/Uncontrolled** - Supports both controlled and uncontrolled modes
- ♿️ **Fully Accessible** - Complete ARIA support and keyboard navigation
- 🔍 **Focus Indicators** - Clear focus rings for keyboard users
- 📱 **Responsive** - Works seamlessly across different screen sizes

## Usage

### Controlled Mode

```jsx
import { SwitchButton } from 'bix-ui';
import { useState } from 'react';

function SettingsPanel() {
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor="notifications">Enable Notifications</label>
        <SwitchButton
          id="notifications"
          checked={notifications}
          onChange={setNotifications}
          color="primary"
          size="md"
        />
      </div>
      
      <div className="flex items-center justify-between">
        <label htmlFor="dark-mode">Dark Mode</label>
        <SwitchButton
          id="dark-mode"
          checked={darkMode}
          onChange={setDarkMode}
          color="secondary"
          size="lg"
        />
      </div>
    </div>
  );
}
```

### Uncontrolled Mode

```jsx
import { SwitchButton } from 'bix-ui';

function SimpleToggle() {
  return (
    <SwitchButton
      defaultChecked={true}
      onChange={(checked) => {
        console.log('Switch toggled:', checked);
        // Handle the change
      }}
      color="success"
      size="md"
      aria-label="Enable feature"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `undefined` | Controls the switch state (controlled mode). When provided, component operates in controlled mode. |
| `defaultChecked` | `boolean` | `false` | Initial checked state for uncontrolled mode. Only used when `checked` is not provided. |
| `onChange` | `(checked: boolean) => void` | `undefined` | Callback fired when the switch state changes. Receives the new checked state. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant of the switch. |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Color theme of the switch. |
| `disabled` | `boolean` | `false` | If `true`, disables the switch and prevents user interaction. |
| `name` | `string` | `undefined` | Name attribute for the underlying input element (useful for forms). |
| `id` | `string` | `undefined` | ID attribute for the underlying input element. |
| `aria-label` | `string` | `undefined` | Accessible label for the switch when no visible label is present. |
| `aria-labelledby` | `string` | `undefined` | ID of element that labels the switch. |
| `aria-describedby` | `string` | `undefined` | ID of element that describes the switch. |
| `className` | `string` | `undefined` | CSS class name to apply to the root element for custom styling. |
| `onFocus` | `(event: React.FocusEvent<HTMLInputElement>) => void` | `undefined` | Callback fired when the switch receives focus. |
| `onBlur` | `(event: React.FocusEvent<HTMLInputElement>) => void` | `undefined` | Callback fired when the switch loses focus. |

## Size Variants

### Small (`sm`)
- Track: 36px × 20px
- Thumb: 12px × 12px
- Best for: Compact interfaces, table rows, mobile layouts

### Medium (`md`) - Default
- Track: 44px × 24px  
- Thumb: 16px × 16px
- Best for: General use, forms, settings panels

### Large (`lg`)
- Track: 56px × 28px
- Thumb: 20px × 20px
- Best for: Primary actions, accessibility needs, touch interfaces

## Color Themes

- **Primary** (`primary`) - Blue theme for main actions
- **Secondary** (`secondary`) - Gray theme for secondary actions  
- **Success** (`success`) - Green theme for positive actions
- **Warning** (`warning`) - Yellow theme for caution states
- **Danger** (`danger`) - Red theme for destructive actions

## Accessibility

The SwitchButton component follows WAI-ARIA guidelines:

- Uses a checkbox input with `role="switch"` semantics
- Supports keyboard navigation (Space/Enter to toggle)
- Provides clear focus indicators
- Supports screen readers with proper ARIA attributes
- Maintains proper color contrast ratios
- Includes visual disabled state indicators

### Keyboard Navigation

- **Tab**: Focus the switch
- **Space/Enter**: Toggle the switch state
- **Tab**: Move to next focusable element

## Examples

### Form Integration

```jsx
function UserPreferences() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    autoSave: true,
  });

  const handleSettingChange = (key: string) => (checked: boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  return (
    <form>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="email-notifications">Email Notifications</label>
          <SwitchButton
            id="email-notifications"
            name="emailNotifications"
            checked={settings.emailNotifications}
            onChange={handleSettingChange('emailNotifications')}
            color="primary"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <label htmlFor="push-notifications">Push Notifications</label>
          <SwitchButton
            id="push-notifications"
            name="pushNotifications"
            checked={settings.pushNotifications}
            onChange={handleSettingChange('pushNotifications')}
            color="success"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <label htmlFor="auto-save">Auto Save</label>
          <SwitchButton
            id="auto-save"
            name="autoSave"
            checked={settings.autoSave}
            onChange={handleSettingChange('autoSave')}
            color="warning"
            disabled={!settings.emailNotifications}
          />
        </div>
      </div>
    </form>
  );
}
```

## Contributing

Please read our [Contributing Guide](../../CONTRIBUTING.md) before submitting a Pull Request to the project.

## License

MIT © [Bix UI](https://github.com/bix-ui) 