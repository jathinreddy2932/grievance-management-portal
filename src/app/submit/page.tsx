'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBack';
import { GrievanceFormData } from '@/lib/zodSchemas';
import { grievanceService } from '@/services/grievanceService';
import GrievanceForm from '@/components/GrievanceForm';
import SuccessModal from '@/components/SuccessModal';

export default function SubmitGrievance() {
  const router = useRouter();
  const [toastOpen, setToastOpen] = useState(false);
  const [successVal, setSuccessVal] = useState<{ open: boolean; id: string } | null>(null);

  const onSubmitStart = async (data: GrievanceFormData) => {
    try {
      const result = await grievanceService.createGrievance(data);
      setSuccessVal({ open: true, id: result.id });
      setToastOpen(true);
    } catch (err) {
      console.error('Failed to submit grievance:', err);
    }
  };

  const handleCloseToast = () => setToastOpen(false);

  const handleCloseModal = (destination: 'dashboard' | 'list' | 'detail') => {
    const createdId = successVal?.id;
    setSuccessVal(null);
    if (destination === 'dashboard') {
      router.push('/');
    } else if (destination === 'list') {
      router.push('/grievances');
    } else if (destination === 'detail' && createdId) {
      router.push(`/grievances/${createdId}`);
    }
  };

  return (
    <Box sx={{ py: { xs: 1, md: 3 } }}>
      {/* Back Button */}
      <Button
        variant="text"
        startIcon={<BackIcon />}
        onClick={() => router.push('/')}
        sx={{
          mb: 3,
          fontSize: '1rem',
          fontWeight: 600,
          color: 'text.secondary',
        }}
      >
        Back to Dashboard
      </Button>

      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 800, fontSize: { xs: '1.75rem', sm: '2.25rem' } }}
      >
        Submit a Grievance or Feedback
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem' }}>
        Please fill out this form as completely as possible. Your submission will be routed directly to our review team.
      </Typography>

      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <GrievanceForm
            onSubmitStart={onSubmitStart}
            onCancel={() => router.push('/')}
          />
        </CardContent>
      </Card>

      {/* Instant Notification Toast */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseToast} severity="success" sx={{ width: '100%', fontSize: '1.05rem' }}>
          Successfully submitted! Thank you.
        </Alert>
      </Snackbar>

      {/* Success Dialog Modal showing Ticket ID */}
      <SuccessModal
        open={!!successVal?.open}
        ticketId={successVal?.id ?? ''}
        onClose={handleCloseModal}
      />
    </Box>
  );
}
