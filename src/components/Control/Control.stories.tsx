import type { Meta, StoryObj } from '@storybook/react';

import { Control } from './Control';

const meta = {
  title: 'Control',
  component: Control,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Control>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onArchive: () => {
      console.log('Archive');
    }
  }
};
