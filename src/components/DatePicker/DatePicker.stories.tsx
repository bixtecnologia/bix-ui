import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./index";

const meta = {
  title: "Form/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: ``,
      },
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    value: null,
    placeholder: "Select a date",
    onChange: (value) => console.log("Date changed:", value),
  },
};

export const WithDate: Story = {
  args: {
    value: new Date(),
    placeholder: "Select a date",
    onChange: (value) => console.log("Date changed:", value),
  },
};

export const WithRange: Story = {
  args: {
    value: [new Date(), new Date()],
    isRange: true,
    placeholder: "Select a date",
    onChange: (value) => console.log("Date changed:", value),
  },
};

export const WithError: Story = {
  args: {
    value: [new Date(), new Date()],
    isRange: true,
    error: true,
    placeholder: "Select a date",
    onChange: (value) => console.log("Date changed:", value),
  },
};
