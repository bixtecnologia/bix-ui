import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonUpload } from './index';

const meta = {
  title: 'Form/FileUpload/ButtonUpload',
  component: ButtonUpload,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A simple file upload component with a button interface and file list display.

## Features
- Simple button-based file selection
- File validation (size, type, count)
- File list with preview and removal
- Error handling and display
- Accessible design with proper ARIA labels
- Disabled state support
- Customizable styling

## Usage
\`\`\`jsx
import { ButtonUpload } from 'bix-ui';
import { useState } from 'react';

function MyForm() {
  const [files, setFiles] = useState([]);
  
  return (
    <ButtonUpload
      onFilesChange={setFiles}
      accept=".pdf"
      maxFiles={3}
      maxSize={25 * 1024 * 1024} // 25MB
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
      description: 'Disable the file upload button',
      control: 'boolean',
    },
    className: {
      description: 'CSS class for the root component element',
      control: 'text',
    },
    buttonClassName: {
      description: 'CSS class for the upload button',
      control: 'text',
    },
    showFileList: {
      description: 'Show the list of uploaded files',
      control: 'boolean',
    },
    buttonText: {
      description: 'Text displayed on the upload button',
      control: 'text',
    },
    description: {
      description: 'Description text shown below the button',
      control: 'text',
    },
  },
} satisfies Meta<typeof ButtonUpload>;

export default meta;
type Story = StoryObj<typeof ButtonUpload>;

const baseArgs = {
  onFilesChange: (files: File[]) => console.log('Files changed:', files.map(f => f.name)),
};

export const Default: Story = {
  args: {
    ...baseArgs,
  },
};

export const PDFOnly: Story = {
  args: {
    ...baseArgs,
    accept: ".pdf",
    maxFiles: 3,
    maxSize: 25 * 1024 * 1024, // 25MB
  },
};

export const ImagesOnly: Story = {
  args: {
    ...baseArgs,
    accept: "image/*",
    maxFiles: 5,
    maxSize: 2 * 1024 * 1024, // 2MB
    buttonText: "Upload Images",
  },
};

export const SingleFile: Story = {
  args: {
    ...baseArgs,
    multiple: false,
    maxFiles: 1,
    buttonText: "Select File",
  },
};

export const DocumentsOnly: Story = {
  args: {
    ...baseArgs,
    accept: ".pdf,.doc,.docx,.txt",
    maxFiles: 10,
    buttonText: "Upload Documents",
  },
};

export const LargeFiles: Story = {
  args: {
    ...baseArgs,
    maxSize: 100 * 1024 * 1024, // 100MB
    maxFiles: 2,
    buttonText: "Upload Large Files",
  },
};

export const SmallFiles: Story = {
  args: {
    ...baseArgs,
    maxSize: 1024 * 1024, // 1MB
    maxFiles: 20,
    buttonText: "Upload Small Files",
  },
};

export const Disabled: Story = {
  args: {
    ...baseArgs,
    disabled: true,
    buttonText: "Upload Disabled",
  },
};

export const WithoutFileList: Story = {
  args: {
    ...baseArgs,
    showFileList: false,
    buttonText: "Upload (No List)",
  },
};

export const CustomButtonText: Story = {
  args: {
    ...baseArgs,
    buttonText: "📁 Choose Your Files",
    description: "Custom button text and description",
  },
};

export const CustomDescription: Story = {
  args: {
    ...baseArgs,
    description: "Please upload your resume and cover letter in PDF format.",
    accept: ".pdf",
    maxFiles: 2,
    buttonText: "Upload Resume",
  },
};

export const StyledButton: Story = {
  args: {
    ...baseArgs,
    buttonClassName: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-base",
    buttonText: "Custom Styled Button",
  },
};

export const ManyFiles: Story = {
  args: {
    ...baseArgs,
    maxFiles: 50,
    buttonText: "Upload Many Files",
    description: "Upload up to 50 files of any type.",
  },
};

export const StrictValidation: Story = {
  args: {
    ...baseArgs,
    accept: ".jpg,.jpeg,.png",
    maxFiles: 3,
    maxSize: 512 * 1024, // 512KB
    buttonText: "Upload Photos",
    description: "Only JPG/PNG images under 512KB allowed.",
  },
};

export const VideoFiles: Story = {
  args: {
    ...baseArgs,
    accept: "video/*",
    maxFiles: 1,
    maxSize: 500 * 1024 * 1024, // 500MB
    buttonText: "Upload Video",
    description: "Upload one video file (max 500MB).",
  },
};

export const KitchenSink: Story = {
  args: {
    ...baseArgs,
    accept: "*/*",
    multiple: true,
    maxFiles: 5,
    maxSize: 25 * 1024 * 1024, // 25MB
    disabled: false,
    showFileList: true,
    buttonText: "Click to upload",
    description: "Experiment with all the controls!",
    className: "",
    buttonClassName: "",
  },
}; 