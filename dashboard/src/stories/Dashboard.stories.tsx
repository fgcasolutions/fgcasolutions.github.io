import type { Meta, StoryObj } from '@storybook/react';
import { InvestorDashboard } from '../components/Dashboard';

const meta: Meta<typeof InvestorDashboard> = {
  title: 'Investor Dashboard',
  component: InvestorDashboard,
};
export default meta;

type Story = StoryObj<typeof InvestorDashboard>;

export const Basic: Story = {
  args: {
    deals: [{ id: 'DL-1', fundable: true, updatedAt: '2024-06-01' }],
  },
};
