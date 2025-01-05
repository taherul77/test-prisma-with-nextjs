"use server";

import Pagination from '@/components/Pagination';
import prisma from '@/prisma/client';
import { Status } from '@prisma/client';

enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}
import IssueActions from './IssueActions';
import IssueTable, { IssueQuery } from './IssueTable';
import { Flex } from '@radix-ui/themes';

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status) as string[];
  const status = statuses.includes(searchParams.status)
    ? (searchParams.status as Status)
    : '';

  const plainSearchParams: IssueQuery = {
    status: status as "" | Status,
    orderBy: (['id', 'title', 'description', 'status', 'createdAt', 'updatedAt', 'assignedToUserId'] as const).includes(searchParams.orderBy as 'id' | 'title' | 'description' | 'status' | 'createdAt' | 'updatedAt' | 'assignedToUserId') ? searchParams.orderBy as 'id' | 'title' | 'description' | 'status' | 'createdAt' | 'updatedAt' | 'assignedToUserId' : 'title',
    page: searchParams.page || '1',
  };

  const where = { status: status || undefined };

  const orderBy = { [plainSearchParams.orderBy]: SortOrder.asc };

  const page = parseInt(plainSearchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={plainSearchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export default IssuesPage;