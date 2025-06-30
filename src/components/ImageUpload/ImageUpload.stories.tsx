import type { Meta, StoryObj } from '@storybook/react';
import { ImageUpload } from './index';

const meta = {
  title: 'Form/FileUpload/ImageUpload',
  component: ImageUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    accept: {
      control: 'text',
      description: 'File types to accept',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file selection',
    },
    maxFiles: {
      control: 'number',
      description: 'Maximum number of files',
    },
    maxSize: {
      control: 'number',
      description: 'Maximum file size in bytes',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the component',
    },
    showUploadButton: {
      control: 'boolean',
      description: 'Show additional upload button when files are present',
    },
    onFilesChange: {
      action: 'files-changed',
      description: 'Callback when files change',
    },
  },
} satisfies Meta<typeof ImageUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onFilesChange: (files) => console.log('Files changed:', files),
    accept: 'image/*',
    multiple: true,
    maxFiles: 10,
    maxSize: 10 * 1024 * 1024, // 10MB
    disabled: false,
    showUploadButton: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'The default image upload component with grid layout.',
      },
    },
  },
};

export const SingleImage: Story = {
  args: {
    ...Default.args,
    multiple: false,
    maxFiles: 1,
    showUploadButton: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Image upload limited to a single image.',
      },
    },
  },
};

export const LimitedFiles: Story = {
  args: {
    ...Default.args,
    maxFiles: 4,
  },
  parameters: {
    docs: {
      description: {
        story: 'Image upload with a limit of 4 files.',
      },
    },
  },
};

export const SmallFileSize: Story = {
  args: {
    ...Default.args,
    maxSize: 1 * 1024 * 1024, // 1MB
  },
  parameters: {
    docs: {
      description: {
        story: 'Image upload with smaller file size limit (1MB) to demonstrate error states.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled image upload component.',
      },
    },
  },
};

export const NoAdditionalUpload: Story = {
  args: {
    ...Default.args,
    showUploadButton: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Image upload without the additional upload button after files are added.',
      },
    },
  },
};

export const CompactGrid: Story = {
  args: {
    ...Default.args,
    maxFiles: 6,
    className: 'max-w-md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Image upload in a more compact container.',
      },
    },
  },
};

export const AllImageTypes: Story = {
  args: {
    ...Default.args,
    accept: 'image/jpeg,image/png,image/gif,image/webp',
  },
  parameters: {
    docs: {
      description: {
        story: 'Image upload accepting specific image formats.',
      },
    },
  },
}; 