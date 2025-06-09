/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import JobForm from '@/app/components/JobForm';
import JobList from '@/app/components/JobList';
import { Button } from '@/app/components/ui/button';
import { Plus, Briefcase } from 'lucide-react';

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

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    }
  };

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const url = editingJob ? `/api/jobs/${editingJob.id}` : '/api/jobs';
      const method = editingJob ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await fetchJobs();
        setShowForm(false);
        setEditingJob(null);
      }
    } catch (error) {
      console.error('Failed to save job:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this job application?')) {
      try {
        const response = await fetch(`/api/jobs/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await fetchJobs();
        }
      } catch (error) {
        console.error('Failed to delete job:', error);
      }
    }
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const getStatusCounts = () => {
    return jobs.reduce((acc, job) => {
      acc[job.status] = (acc[job.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Job Application Tracker</h1>
            </div>
            <Button
              onClick={() => {
                setShowForm(!showForm);
                setEditingJob(null);
              }}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              {showForm ? 'Cancel' : 'Add Application'}
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-2xl font-bold">{jobs.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-blue-600">Applied</p>
              <p className="text-2xl font-bold text-blue-600">{statusCounts.applied || 0}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-yellow-600">Interview</p>
              <p className="text-2xl font-bold text-yellow-600">{statusCounts.interview || 0}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-green-600">Offers</p>
              <p className="text-2xl font-bold text-green-600">{statusCounts.offer || 0}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-red-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{statusCounts.rejected || 0}</p>
            </div>
          </div>
        </div>

        {showForm && (
          <div className="mb-8">
            <JobForm
              onSubmit={handleSubmit}
              initialData={editingJob ? {
                company: editingJob.company,
                position: editingJob.position,
                status: editingJob.status,
                applicationDate: editingJob.applicationDate.split('T')[0],
                jobUrl: editingJob.jobUrl || '',
                notes: editingJob.notes || '',
                salary: editingJob.salary || '',
                location: editingJob.location || '',
                contactEmail: editingJob.contactEmail || '',
                followUpDate: editingJob.followUpDate?.split('T')[0] || '',
              } : undefined}
              isLoading={isLoading}
            />
          </div>
        )}

        <JobList
          jobs={jobs}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
}