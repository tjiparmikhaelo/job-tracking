/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/app/components/ui/accordion';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/app/components/ui/alert-dialog';
import { Trash2, ExternalLink, Edit, Calendar, MapPin, DollarSign, Mail, FileText } from 'lucide-react';
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
      return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    case 'interview':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    case 'offer':
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    case 'rejected':
      return 'bg-red-100 text-red-800 hover:bg-red-200';
    case 'withdrawn':
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
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

  // Sort jobs by application date (newest first)
  const sortedJobs = [...jobs].sort((a, b) => 
    new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime()
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Job Applications ({jobs.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full pb">
            {sortedJobs.map((job, index) => (
              <AccordionItem key={job.id} value={`job-${job.id}`} className="border rounded-lg mb-2 last:mb-0">
                <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-50 rounded-t-lg relative">
                  <div className="flex items-center justify-between w-full mr-4">
                    <div className="flex items-center gap-3">
                      <div className="text-left">
                        <h3 className="font-semibold text-lg">{job.position}</h3>
                        <p className="text-gray-600 font-medium">{job.company}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Calendar className="w-3 h-3" />
                            {format(parseISO(job.applicationDate), 'MMM dd, yyyy')}
                          </div>
                          {job.location && (
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <MapPin className="w-3 h-3" />
                              {job.location}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      {job.status && (
                        <div className="absolute top-4 right-9">
                          <Badge className={`${getStatusColor(job.status)}`}>
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-4">
                    {/* Job Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {job.salary && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-gray-600" />
                          <div>
                            <p className="text-sm text-gray-500">Expected Salary</p>
                            <p className="font-medium">{job.salary}</p>
                          </div>
                        </div>
                      )}
                      
                      {job.contactEmail && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-600" />
                          <div>
                            <p className="text-sm text-gray-500">Contact Email</p>
                            <p className="font-medium">{job.contactEmail}</p>
                          </div>
                        </div>
                      )}
                      
                      {job.followUpDate && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-600" />
                          <div>
                            <p className="text-sm text-gray-500">Follow-up Date</p>
                            <p className="font-medium">
                              {format(parseISO(job.followUpDate), 'MMM dd, yyyy')}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Notes Section */}
                    {job.notes && (
                      <div className="bg-gray-50 rounded-lg flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-600" />
                        <div>
                          <p className="text-sm text-gray-500">Notes</p>
                          <p className="text-sm">{job.notes}</p>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center pt-2 border-t">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(job)}
                          className="flex items-center gap-1"
                        >
                          <Edit className="w-3 h-3" />
                          Edit
                        </Button>
                        {job.jobUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(job.jobUrl, '_blank')}
                            className="flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View Job
                          </Button>
                        )}
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant='destructive'
                            size='sm'
                            className="flex items-center gap-1 bg-[#FDE8E7]"
                          >
                            <Trash2 className="w-3 h-3 text-[#F15D5A]" />
                            <p className='text-[#F15D5A]'>Delete</p>
                          </Button>                        
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to delete this?</AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction asChild>
                              <Button
                                size='sm'
                                onClick={() => onDelete(job.id)}
                                className="flex items-center gap-1 bg-[#FDE8E7] hover:bg-red-600"
                              >
                                <Trash2 className="w-3 h-3 text-[#F15D5A]" />
                                <p className='text-[#F15D5A]'>Delete</p>
                              </Button>
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>

                    {/* Timestamps */}
                    <div className="text-xs text-gray-400 pt-2 border-t">
                      <p>Created: {format(parseISO(job.createdAt), 'MMM dd, yyyy HH:mm')}</p>
                      {job.updatedAt !== job.createdAt && (
                        <p>Updated: {format(parseISO(job.updatedAt), 'MMM dd, yyyy HH:mm')}</p>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}