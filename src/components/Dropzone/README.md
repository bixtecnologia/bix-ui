# Dropzone Component

A flexible and accessible file upload component with drag and drop support for React applications.

## Installation

```bash
npm install bix-ui
```

## Features

- 📤 Drag & drop file upload
- 📁 Click to select files
- 🔢 Single or multiple file support
- ✅ File validation (size, type, count)
- 📋 File list with preview and removal
- ♿️ Fully accessible with proper ARIA labels
- 🎨 Customizable styling with Tailwind CSS
- 📱 Responsive design
- ⌨️ Keyboard navigation support

## Usage

```jsx
import { Dropzone } from 'bix-ui';
import { useState } from 'react';

function UploadForm() {
  const [files, setFiles] = useState([]);

  return (
    <Dropzone
      onFilesChange={setFiles}
      accept=".pdf"
      multiple={true}
      maxFiles={3}
      maxSize={25 * 1024 * 1024} // 25MB
      placeholder="Click or drag files to this area to upload"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onFilesChange` | `(files: File[]) => void` | _required_ | Callback fired when files are added or removed. |
| `accept` | `string` | `"*/*"` | File types to accept (e.g., "image/*", ".pdf,.doc"). |
| `multiple` | `boolean` | `false` | If `true`, allows multiple file selection. |
| `maxFiles` | `number` | `1` | Maximum number of files allowed. |
| `maxSize` | `number` | `10485760` | Maximum file size in bytes (10MB default). |
| `disabled` | `boolean` | `false` | If `true`, disables the file upload area. |
| `className` | `string` | `undefined` | CSS class name to apply to the root component element for custom styling. |
| `children` | `React.ReactNode` | `undefined` | Custom content to display in the upload area. |
| `showFileList` | `boolean` | `true` | If `true`, displays the list of uploaded files. |
| `placeholder` | `string` | `"Click or drag files to this area to upload"` | Placeholder text displayed in the upload area. |

## Accessibility

- Uses semantic HTML elements
- Includes proper ARIA labels for screen readers
- Supports keyboard navigation
- Visual feedback for drag and drop states
- Error announcements for file validation

## Contributing

Please read our [Contributing Guide](../../CONTRIBUTING.md) before submitting a Pull Request to the project.

## License

MIT © [Bix UI](https://github.com/bix-ui) 