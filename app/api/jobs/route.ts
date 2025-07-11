/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { getModels } from '../../lib/db';

export async function GET() {
  try {
    const { Job } = await getModels();

    const jobs = await Job.findAll({
      order: [['createdAt', 'DESC']],
    });
    return NextResponse.json(jobs);
  } catch (error: any) {
    console.error('GET /api/jobs error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { Job } = await getModels();

    const body = await request.json();
    
    if (!body.followUpDate || body.followUpDate === '' || body.followUpDate === 'Invalid date') {
      body.followUpDate = null;
    }
    
    const job = await Job.create(body);

    return NextResponse.json(job, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/jobs error:', error);
    return NextResponse.json(
      { error: 'Failed to create job', details: error.message },
      { status: 500 }
    );
  }
}