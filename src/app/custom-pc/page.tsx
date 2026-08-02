import React from 'react';
import type { Metadata } from 'next';
import CustomPcClient from '@/components/CustomPcClient';

export const metadata: Metadata = {
  title: 'Custom PC Builder — SA IT Solutions',
  description: 'Configure your custom gaming, editing, or workstation PC. Select processor, motherboard, GPU, RAM, storage, and get instant wholesale WhatsApp quotation.',
};

export default function CustomPcPage() {
  return <CustomPcClient />;
}
