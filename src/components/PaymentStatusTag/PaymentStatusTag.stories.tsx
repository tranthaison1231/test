import type { Meta, StoryObj } from '@storybook/react';

import { PaymentStatusTag } from './PaymentStatusTag';

const meta = {
  title: 'PaymentStatusTag',
  component: PaymentStatusTag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      defaultValue: 'pending',
      type: "string",
    },
  }
} satisfies Meta<typeof PaymentStatusTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    status: 'pending',
  },
};
