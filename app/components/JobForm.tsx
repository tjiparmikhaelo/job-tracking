/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';

const jobSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  position: z.string().min(1, 'Position is required'),
  status: z.enum(['applied', 'interview', 'offer', 'rejected', 'withdrawn']),
  applicationDate: z.string().min(1, 'Application date is required'),
  jobUrl: z.string().url().optional().or(z.literal('')),
  notes: z.string().optional(),
  salary: z.string().optional(),
  location: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal('')),
  followUpDate: z.string().optional(),
});

type JobFormData = z.infer<typeof jobSchema>;

interface JobFormProps {
  onSubmit: (data: JobFormData) => void;
  initialData?: Partial<JobFormData>;
  isLoading?: boolean;
}

export default function JobForm({ onSubmit, initialData, isLoading }: JobFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      status: 'applied',
      applicationDate: new Date().toISOString().split('T')[0],
      ...initialData,
    },
  });

  const status = watch('status');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Job Application</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                {...register('company')}
                placeholder="Company name"
              />
              {errors.company && (
                <p className="text-sm text-red-500">{errors.company.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="position">Position *</Label>
              <Input
                id="position"
                {...register('position')}
                placeholder="Job title"
              />
              {errors.position && (
                <p className="text-sm text-red-500">{errors.position.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={status}
                onValueChange={(value: any) => setValue('status', value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="offer">Offer</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="withdrawn">Withdrawn</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="applicationDate">Application Date *</Label>
              <Input
                id="applicationDate"
                type="date"
                {...register('applicationDate')}
              />
              {errors.applicationDate && (
                <p className="text-sm text-red-500">{errors.applicationDate.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                {...register('location')}
                placeholder="City, Country"
              />
            </div>

            <div>
              <Label htmlFor="salary">Salary</Label>
              <Input
                id="salary"
                {...register('salary')}
                placeholder="e.g., $80,000 - $100,000"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="jobUrl">Job URL</Label>
              <Input
                id="jobUrl"
                {...register('jobUrl')}
                placeholder="https://..."
              />
              {errors.jobUrl && (
                <p className="text-sm text-red-500">{errors.jobUrl.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                {...register('contactEmail')}
                placeholder="recruiter@company.com"
              />
              {errors.contactEmail && (
                <p className="text-sm text-red-500">{errors.contactEmail.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="followUpDate">Follow-up Date</Label>
              <Input
                id="followUpDate"
                type="date"
                {...register('followUpDate')}
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                {...register('notes')}
                placeholder="Additional notes about this application..."
                rows={3}
              />
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Saving...' : 'Save Job Application'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}