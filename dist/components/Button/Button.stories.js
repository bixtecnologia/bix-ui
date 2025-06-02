var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
        shape: {
            control: 'select',
            options: ['rectangular', 'rounded', 'circular'],
            description: 'The shape of the button',
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
};
export default meta;
// Variants
export const Primary = {
    args: {
        children: 'Primary Button',
        variant: 'primary',
    },
};
export const Secondary = {
    args: {
        children: 'Secondary Button',
        variant: 'secondary',
    },
};
export const Destructive = {
    args: {
        children: 'Destructive Button',
        variant: 'destructive',
    },
};
export const Outlined = {
    args: {
        children: 'Outlined Button',
        variant: 'outlined',
    },
};
export const Text = {
    args: {
        children: 'Text Button',
        variant: 'text',
    },
};
// Sizes
export const Small = {
    args: {
        children: 'Small Button',
        size: 'small',
    },
};
export const Large = {
    args: {
        children: 'Large Button',
        size: 'large',
    },
};
// With Icons
export const WithLeftIcon = {
    args: {
        children: 'Button',
        leftIcon: _jsx(Mail, { size: 16 }),
    },
};
export const WithRightIcon = {
    args: {
        children: 'Button',
        rightIcon: _jsx(Mail, { size: 16 }),
    },
};
export const IconOnly = {
    args: {
        children: _jsx(Mail, { size: 16 }),
        iconOnly: true,
        'aria-label': 'Button',
        shape: 'circular',
    },
};
// States
export const Loading = {
    args: {
        children: 'Loading',
        loading: true,
    },
};
export const Disabled = {
    args: {
        children: 'Disabled Button',
        disabled: true,
    },
};
export const AsyncClick = {
    args: {
        children: 'Async Action',
        onClick: () => __awaiter(void 0, void 0, void 0, function* () {
            yield new Promise(resolve => setTimeout(resolve, 1000));
        }),
    },
};
export const SizeComparison = {
    render: () => (_jsxs("div", Object.assign({ className: "flex flex-col gap-4" }, { children: [_jsxs("div", Object.assign({ className: "flex items-center gap-2" }, { children: [_jsx(Button, Object.assign({ size: "small" }, { children: "Small Button" })), _jsx(Button, Object.assign({ size: "small", iconOnly: true }, { children: _jsx(Mail, { size: 16 }) }))] })), _jsxs("div", Object.assign({ className: "flex items-center gap-2" }, { children: [_jsx(Button, Object.assign({ size: "medium" }, { children: "Medium Button" })), _jsx(Button, Object.assign({ size: "medium", iconOnly: true }, { children: _jsx(Mail, { size: 20 }) }))] })), _jsxs("div", Object.assign({ className: "flex items-center gap-2" }, { children: [_jsx(Button, Object.assign({ size: "large" }, { children: "Large Button" })), _jsx(Button, Object.assign({ size: "large", iconOnly: true }, { children: _jsx(Mail, { size: 24 }) }))] }))] })))
};
