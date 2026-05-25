// ============================================================
// Route: /grievance/[id]  (singular)
//
// Redirects to the canonical plural route /grievances/[id]
// so both URL formats work correctly.
// ============================================================

import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function GrievanceSingularRedirect({ params }: PageProps) {
  const { id } = await params;
  redirect(`/grievances/${id}`);
}
