# ImageUpload Component

A modern image upload component that displays uploaded images in a responsive grid layout with preview thumbnails and different upload states.

## Features

- 📱 Responsive grid layout (2-4 columns based on screen size)
- 🖼️ Image preview thumbnails
- 📊 Upload progress indication
- ❌ Error state handling
- 🗑️ Individual file removal
- 🔄 Multiple file support
- 📏 File size validation
- 🎨 Modern UI with hover states

## Usage

```tsx
import { ImageUpload } from '@/components/ImageUpload';

function MyComponent() {
  const handleFilesChange = (files) => {
    console.log('Selected files:', files);
    // Handle the uploaded files
  };

  return (
    <ImageUpload
      onFilesChange={handleFilesChange}
      maxFiles={10}
      maxSize={10 * 1024 * 1024} // 10MB
      accept="image/*"
      multiple={true}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onFilesChange` | `(files: UploadedImageFile[]) => void` | Required | Callback fired when files are added or removed |
| `accept` | `string` | `"image/*"` | File types to accept |
| `multiple` | `boolean` | `true` | Allow multiple file selection |
| `maxFiles` | `number` | `10` | Maximum number of files allowed |
| `maxSize` | `number` | `10485760` | Maximum file size in bytes (10MB) |
| `disabled` | `boolean` | `false` | Disable the component |
| `className` | `string` | `undefined` | Additional CSS classes |
| `showUploadButton` | `boolean` | `true` | Show additional upload button when files are present |

## File States

The component displays different states for uploaded files:

- **Idle**: File is selected and ready
- **Uploading**: File is being processed (shows spinner and progress)
- **Success**: File uploaded successfully
- **Error**: File validation failed (e.g., too large)

## Examples

### Single Image Upload

```tsx
<ImageUpload
  onFilesChange={handleFilesChange}
  multiple={false}
  maxFiles={1}
  showUploadButton={false}
/>
```

### Strict File Size Limit

```tsx
<ImageUpload
  onFilesChange={handleFilesChange}
  maxSize={1 * 1024 * 1024} // 1MB limit
  accept="image/jpeg,image/png"
/>
```

### Compact Layout

```tsx
<ImageUpload
  onFilesChange={handleFilesChange}
  maxFiles={6}
  className="max-w-md"
/>
```

## Styling

The component uses Tailwind CSS classes and can be customized through the `className` prop. The grid automatically adjusts:

- Mobile: 2 columns
- Small screens: 3 columns  
- Medium+ screens: 4 columns

## Accessibility

- Proper ARIA labels for remove buttons
- Keyboard navigation support
- Screen reader friendly error messages
- Focus management for file input 