/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Trash2, ExternalLink, Edit } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface Job {
  id: number;
  company: string;
  position: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected' | 'withdrawn';
  applicationDate: string;
  jobUrl?: string;
  notes?: string;
  salary?: string;
  location?: string;
  contactEmail?: string;
  followUpDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface JobListProps {
  jobs: Job[];
  onDelete: (id: number) => void;
  onEdit: (job: Job) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'applied':
      return 'bg-blue-100 text-blue-800';
    case 'interview':
      return 'bg-yellow-100 text-yellow-800';
    case 'offer':
      return 'bg-green-100 text-green-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    case 'withdrawn':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function JobList({ jobs, onDelete, onEdit }: JobListProps) {
  if (jobs.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <p className="text-gray-500">No job applications yet. Add your first one!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Card key={job.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{job.position}</CardTitle>
                <p className="text-gray-600 font-medium">{job.company}</p>
                {job.location && (
                  <p className="text-sm text-gray-500">{job.location}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(job.status)}>
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Applied Date</p>
                <p className="font-medium">
                  {format(parseISO(job.applicationDate), 'MMM dd, yyyy')}
                </p>
              </div>
              {job.salary && (
                <div>
                  <p className="text-sm text-gray-500">Salary</p>
                  <p className="font-medium">{job.salary}</p>
                </div>
              )}
              {job.contactEmail && (
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="font-medium">{job.contactEmail}</p>
                </div>
              )}
              {job.followUpDate && (
                <div>
                  <p className="text-sm text-gray-500">Follow-up Date</p>
                  <p className="font-medium">
                    {format(parseISO(job.followUpDate), 'MMM dd, yyyy')}
                  </p>
                </div>
              )}
            </div>

            {job.notes && (
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">Notes</p>
                <p className="text-sm bg-gray-50 p-2 rounded">{job.notes}</p>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(job)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                {job.jobUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(job.jobUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    View Job
                  </Button>
                )}
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(job.id)}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}