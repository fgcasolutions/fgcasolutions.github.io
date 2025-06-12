import type { Meta, StoryObj } from '@storybook/react';
import { SponsorForm } from './SponsorForm';

const meta: Meta<typeof SponsorForm> = {
  component: SponsorForm,
  title: 'Forms/SponsorForm',
};

export default meta;

type Story = StoryObj<typeof SponsorForm>;

export const Default: Story = {};
