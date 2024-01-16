import type { Meta, StoryObj } from '@storybook/react';

import { Table } from './Table';

const meta = {
  title: 'Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    items: [
      {
        id: '1',
        name: 'Product 1',
        price: '$10.00',
        quantity: 1,
      },
    ],
    columns: [
      {
        id: 'name',
        title: 'Name',
        sortable: true,
      },
      {
        id: 'price',
        title: 'Price',
      },
      {
        id: 'quantity',
        title: 'Quantity',
      },
    ],
    selectedIds: [],
  },
};
