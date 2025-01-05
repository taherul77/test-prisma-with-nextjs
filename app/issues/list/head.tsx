// app/issues/list/head.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues',
};

export default function Head() {
  return (
    <>
      <title>{String(metadata.title) ?? ''}</title>
      <meta name="description" content={metadata.description ?? ''} />
    </>
  );
}
