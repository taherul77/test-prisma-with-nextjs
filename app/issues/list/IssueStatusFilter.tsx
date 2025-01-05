'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const statuses: { label: string; value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Convert URLSearchParams to a plain object
  const getSearchParams = () => {
    const params: Record<string, string> = {};
    searchParams?.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  };

  const currentParams = getSearchParams();

  return (
    <Select.Root
      defaultValue={searchParams?.get('status') || ''}
      onValueChange={(status) => {
        const params = new URLSearchParams(currentParams);
        if (status) params?.set('status', status);

        const query = params?.toString() ? `?${params?.toString()}` : '';
        router?.push('/issues/list' + query);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses?.map((status,i) => (
          <Select.Item key={i} value={status?.value || ''}>
            {status?.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
