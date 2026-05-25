'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { grievanceFormSchema, GrievanceFormData } from '@/lib/zodSchemas';

interface GrievanceFormProps {
  onSubmitStart: (data: GrievanceFormData) => Promise<void>;
  onCancel: () => void;
}

export default function GrievanceForm({ onSubmitStart, onCancel }: GrievanceFormProps) {
  const [submitting, setSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GrievanceFormData>({
    resolver: zodResolver(grievanceFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      category: 'Complaint',
      priority: 'Medium',
      description: '',
    },
  });

  const handleFormSubmit = async (data: GrievanceFormData) => {
    setSubmitting(true);
    try {
      await onSubmitStart(data);
      reset();
    } catch (err) {
      console.error('Submission failed in form component:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      {/* 100% compile-safe Box CSS Grid Layout */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2.5,
        }}
      >
        {/* Full Name */}
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.8, color: 'text.primary' }}>
            Full Name <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="e.g. Ramesh Kumar"
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
                fullWidth
              />
            )}
          />
        </Box>

        {/* Email Address */}
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.8, color: 'text.primary' }}>
            Email Address <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="email"
                placeholder="e.g. name@email.com"
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
              />
            )}
          />
        </Box>

        {/* Phone Number */}
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.8, color: 'text.primary' }}>
            Phone Number (Optional)
          </Typography>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="e.g. 9876543210"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                fullWidth
              />
            )}
          />
        </Box>

        {/* Subject */}
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.8, color: 'text.primary' }}>
            Subject / Short Title <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Briefly state what the issue is"
                error={!!errors.subject}
                helperText={errors.subject?.message}
                fullWidth
              />
            )}
          />
        </Box>

        {/* Category */}
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.8, color: 'text.primary' }}>
            Type of Submission <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                error={!!errors.category}
                helperText={errors.category?.message}
                fullWidth
              >
                <MenuItem value="Complaint">Complaint (Report a problem)</MenuItem>
                <MenuItem value="Feedback">Feedback (Share your experience)</MenuItem>
                <MenuItem value="Suggestion">Suggestion (Recommend an improvement)</MenuItem>
              </TextField>
            )}
          />
        </Box>

        {/* Priority */}
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.8, color: 'text.primary' }}>
            Priority Level <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                error={!!errors.priority}
                helperText={errors.priority?.message}
                fullWidth
              >
                <MenuItem value="Low">Low (General suggestion)</MenuItem>
                <MenuItem value="Medium">Medium (Standard request)</MenuItem>
                <MenuItem value="High">High (Urgent attention required)</MenuItem>
              </TextField>
            )}
          />
        </Box>

        {/* Description */}
        <Box sx={{ gridColumn: { sm: 'span 2' } }}>
          <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.8, color: 'text.primary' }}>
            Detailed Description <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Provide complete details, dates, and locations if applicable."
                multiline
                rows={5}
                error={!!errors.description}
                helperText={errors.description?.message}
                fullWidth
              />
            )}
          />
        </Box>
      </Box>

      {/* Form Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
        <Button
          variant="outlined"
          color="inherit"
          disabled={submitting}
          onClick={onCancel}
          sx={{
            px: 3,
            fontSize: '0.95rem',
            color: 'text.secondary',
            borderColor: 'divider',
            borderRadius: 1,
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={submitting}
          startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : <SendIcon sx={{ fontSize: 18 }} />}
          sx={{
            px: 4,
            fontSize: '0.95rem',
            borderRadius: 1,
            boxShadow: 'none',
          }}
        >
          {submitting ? 'Submitting...' : 'Submit Grievance'}
        </Button>
      </Box>
    </form>
  );
}
