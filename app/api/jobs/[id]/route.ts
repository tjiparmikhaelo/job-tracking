/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { Job } from '@/app/models';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const [updatedRowsCount] = await Job.update(body, {
      where: { id: params.id },
    });
    
    if (updatedRowsCount === 0) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }
    
    const updatedJob = await Job.findByPk(params.id);
    return NextResponse.json(updatedJob);
  } catch (error: any) {
    console.error('PUT /api/jobs/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update job', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedRowsCount = await Job.destroy({
      where: { id: params.id },
    });
    
    if (deletedRowsCount === 0) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Job deleted successfully' });
  } catch (error: any) {
    console.error('DELETE /api/jobs/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete job', details: error.message },
      { status: 500 }
    );
  }
}