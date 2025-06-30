import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropzone } from './index';

const meta = {
  title: 'Form/FileUpload/Dropzone',
  component: Dropzone,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A flexible file upload component with drag and drop support, file validation, and clean shadCN-inspired design.

## Features
- Drag and drop file upload
- Click to select files
- Single or multiple file support
- File size validation
- File type validation
- File list with preview and removal
- Error handling and display
- Accessible design with proper ARIA labels
- Disabled state support
- Customizable styling

## Usage
\`\`\`jsx
import { FileUpload } from 'bix-ui';
import { useState } from 'react';

function MyForm() {
  const [files, setFiles] = useState<File[]>([]);
  
  return (
    <FileUpload
      onFilesChange={setFiles}
      accept="image/*"
      multiple={true}
      maxFiles={5}
      maxSize={5 * 1024 * 1024} // 5MB
      placeholder="Upload your images here"
    />
  );
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    onFilesChange: {
      description: 'Callback fired when files are added or removed',
      control: false,
    },
    accept: {
      description: 'File types to accept (e.g., "image/*", ".pdf,.doc")',
      control: 'text',
    },
    multiple: {
      description: 'Allow multiple file selection',
      control: 'boolean',
    },
    maxFiles: {
      description: 'Maximum number of files allowed',
      control: 'number',
    },
    maxSize: {
      description: 'Maximum file size in bytes',
      control: 'number',
    },
    disabled: {
      description: 'Disable the file upload',
      control: 'boolean',
    },
    className: {
      description: 'CSS class for the root component element',
      control: 'text',
    },
    children: {
      description: 'Custom content for the upload area',
      control: false,
    },
    showFileList: {
      description: 'Show the list of uploaded files',
      control: 'boolean',
    },
    placeholder: {
      description: 'Placeholder text for the upload area',
      control: 'text',
    },
  },
} satisfies Meta<typeof Dropzone>;

export default meta;
type Story = StoryObj<typeof Dropzone>;

const baseArgs = {
  onFilesChange: (files: File[]) => console.log('Files changed:', files.map(f => f.name)),
};

export const Default: Story = {
  args: {
    ...baseArgs,
    accept: ".pdf",
    multiple: true,
    maxFiles: 3,
    maxSize: 25 * 1024 * 1024, // 25MB to match the reference
  },
};

export const MultipleFiles: Story = {
  args: {
    ...baseArgs,
    multiple: true,
    maxFiles: 5,
    placeholder: "Upload up to 5 files",
  },
};

export const ImagesOnly: Story = {
  args: {
    ...baseArgs,
    accept: "image/*",
    multiple: true,
    maxFiles: 3,
    maxSize: 2 * 1024 * 1024, // 2MB
    placeholder: "Upload your images (max 2MB each)",
  },
};

export const PDFOnly: Story = {
  args: {
    ...baseArgs,
    accept: ".pdf",
    multiple: true,
    maxFiles: 3,
    maxSize: 25 * 1024 * 1024, // 25MB to match reference
    placeholder: "Click or drag files to this area to upload",
  },
};

export const DocumentsOnly: Story = {
  args: {
    ...baseArgs,
    accept: ".pdf,.doc,.docx,.txt",
    multiple: true,
    maxFiles: 10,
    placeholder: "Upload documents (.pdf, .doc, .docx, .txt)",
  },
};

export const LargeFiles: Story = {
  args: {
    ...baseArgs,
    multiple: false,
    maxSize: 100 * 1024 * 1024, // 100MB
    placeholder: "Upload large files (up to 100MB)",
  },
};

export const SmallFiles: Story = {
  args: {
    ...baseArgs,
    multiple: true,
    maxFiles: 20,
    maxSize: 1024 * 1024, // 1MB
    placeholder: "Upload small files (max 1MB each)",
  },
};

export const Disabled: Story = {
  args: {
    ...baseArgs,
    disabled: true,
    placeholder: "File upload is disabled",
  },
};

export const WithoutFileList: Story = {
  args: {
    ...baseArgs,
    multiple: true,
    showFileList: false,
    placeholder: "Files won't be shown in a list",
  },
};

export const CustomPlaceholder: Story = {
  args: {
    ...baseArgs,
    multiple: true,
    placeholder: "Drag your amazing files here or click to browse",
  },
};

export const WithCustomStyling: Story = {
  args: {
    ...baseArgs,
    multiple: true,
    className: "max-w-md",
    placeholder: "Custom styled upload area",
  },
};

export const SingleFileReplace: Story = {
  args: {
    ...baseArgs,
    multiple: false,
    placeholder: "Upload one file (replaces previous)",
    accept: "image/*",
    maxSize: 5 * 1024 * 1024, // 5MB
  },
};

export const ManyFiles: Story = {
  args: {
    ...baseArgs,
    multiple: true,
    maxFiles: 50,
    placeholder: "Upload many files (up to 50)",
  },
};

export const StrictValidation: Story = {
  args: {
    ...baseArgs,
    accept: ".jpg,.jpeg,.png",
    multiple: true,
    maxFiles: 3,
    maxSize: 512 * 1024, // 512KB
    placeholder: "Only JPG/PNG images under 512KB",
  },
};

export const KitchenSink: Story = {
  args: {
    ...baseArgs,
    accept: "*/*",
    multiple: true,
    maxFiles: 10,
    maxSize: 10 * 1024 * 1024, // 10MB
    disabled: false,
    showFileList: true,
    placeholder: "Experiment with all the controls!",
    className: "",
  },
}; 