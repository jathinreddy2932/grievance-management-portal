import { NextResponse } from 'next/server';
import { GrievanceStatus } from '@/types/grievance';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  // Return a static mock item matching the ID
  return NextResponse.json({
    id,
    fullName: 'Ramesh Kumar',
    email: 'ramesh.kumar@email.com',
    phone: '9876543210',
    subject: 'Street light not working in Sector 4',
    category: 'Complaint',
    priority: 'High',
    description: 'The street light near House 412 has been broken for over two weeks.',
    status: 'Open',
    createdAt: new Date().toISOString(),
  });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  try {
    const body = await request.json();
    const { status } = body;
    
    return NextResponse.json({
      id,
      fullName: 'Ramesh Kumar',
      email: 'ramesh.kumar@email.com',
      phone: '9876543210',
      subject: 'Street light not working in Sector 4',
      category: 'Complaint',
      priority: 'High',
      description: 'The street light near House 412 has been broken for over two weeks.',
      status: (status as GrievanceStatus) || 'Open',
      createdAt: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update grievance' }, { status: 500 });
  }
}
