# ButtonUpload Component

A simple and accessible file upload component with a button interface for React applications.

## Installation

```bash
npm install bix-ui
```

## Features

- 📤 Simple button-based file selection
- 🔢 Single or multiple file support
- ✅ File validation (size, type, count)
- 📋 File list with preview and removal
- ♿️ Fully accessible with proper ARIA labels
- 🎨 Customizable styling with Tailwind CSS
- 📱 Responsive design
- ⌨️ Keyboard navigation support

## Usage

```jsx
import { ButtonUpload } from 'bix-ui';
import { useState } from 'react';

function UploadForm() {
  const [files, setFiles] = useState([]);

  return (
    <ButtonUpload
      onFilesChange={setFiles}
      accept=".pdf"
      maxFiles={3}
      maxSize={25 * 1024 * 1024} // 25MB
      buttonText="Click to upload"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onFilesChange` | `(files: File[]) => void` | _required_ | Callback fired when files are added or removed. |
| `accept` | `string` | `"*/*"` | File types to accept (e.g., "image/*", ".pdf,.doc"). |
| `multiple` | `boolean` | `true` | If `true`, allows multiple file selection. |
| `maxFiles` | `number` | `3` | Maximum number of files allowed. |
| `maxSize` | `number` | `26214400` | Maximum file size in bytes (25MB default). |
| `disabled` | `boolean` | `false` | If `true`, disables the upload button. |
| `className` | `string` | `undefined` | CSS class name to apply to the root component element for custom styling. |
| `buttonClassName` | `string` | `undefined` | CSS class name to apply specifically to the upload button. |
| `showFileList` | `boolean` | `true` | If `true`, displays the list of uploaded files. |
| `buttonText` | `string` | `"Click to upload"` | Text displayed on the upload button. |
| `description` | `string` | `undefined` | Custom description text shown below the button. |

## Accessibility

- Uses semantic HTML elements
- Includes proper ARIA labels for screen readers
- Supports keyboard navigation
- Visual status indicators for file states
- Error announcements for file validation

## Contributing

Please read our [Contributing Guide](../../CONTRIBUTING.md) before submitting a Pull Request to the project.

## License

MIT © [Bix UI](https://github.com/bix-ui) 