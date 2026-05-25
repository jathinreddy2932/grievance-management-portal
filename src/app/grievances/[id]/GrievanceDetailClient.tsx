'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  CircularProgress,
  Divider,
  Snackbar,
  Alert,
  Stack,
} from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBack';
import DateIcon from '@mui/icons-material/CalendarToday';
import CategoryIcon from '@mui/icons-material/Category';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import { grievanceService } from '@/services/grievanceService';
import { Grievance, GrievanceStatus } from '@/types/grievance';
import StatusUpdateCard from '@/components/StatusUpdateCard';
import SubmitterDetailsCard from '@/components/SubmitterDetailsCard';

interface GrievanceDetailClientProps {
  id: string;
}

export default function GrievanceDetailClient({ id }: GrievanceDetailClientProps) {
  const router = useRouter();

  const [grievance, setGrievance] = useState<Grievance | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [statusVal, setStatusVal] = useState<GrievanceStatus>('Open');
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    async function loadGrievance() {
      try {
        const item = await grievanceService.getGrievanceById(id);
        if (item) {
          setGrievance(item);
          setStatusVal(item.status);
        }
      } catch (err) {
        console.error('Failed to load grievance detail:', err);
      } finally {
        setLoading(false);
      }
    }
    loadGrievance();
  }, [id]);

  const handleStatusChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextStatus = event.target.value as GrievanceStatus;
    setStatusVal(nextStatus);
    setUpdating(true);

    try {
      const updated = await grievanceService.updateGrievanceStatus(id, nextStatus);
      if (updated) {
        setGrievance(updated);
        setToastMessage(`Status has been changed to "${nextStatus}" successfully!`);
        setToastOpen(true);
      }
    } catch (err) {
      console.error('Failed to update status:', err);
      setToastMessage('Failed to update status. Please try again.');
      setToastOpen(true);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'success';
      case 'In Progress':
        return 'info';
      case 'Open':
      default:
        return 'warning';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'error';
      case 'Medium':
        return 'warning';
      case 'Low':
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 10, flexGrow: 1 }}>
        <CircularProgress size={64} thickness={4} sx={{ mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          Loading ticket details, please wait...
        </Typography>
      </Box>
    );
  }

  if (!grievance) {
    return (
      <Box sx={{ py: 5, textAlign: 'center' }}>
        <InfoIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
          Grievance Not Found
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          We could not find a ticket with ID "{id}". It may have been deleted or the link is incorrect.
        </Typography>
        <Button variant="contained" onClick={() => router.push('/grievances')}>
          Back to All Grievances
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 1, md: 3 } }}>
      {/* Navigation Buttons */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button
          variant="text"
          startIcon={<BackIcon />}
          onClick={() => router.push('/grievances')}
          sx={{
            fontSize: '1rem',
            fontWeight: 600,
            color: 'text.secondary',
          }}
        >
          Back to List
        </Button>
      </Stack>

      {/* Ticket Header Banner */}
      <Card
        sx={{
          mb: 4,
          borderRadius: 3,
          p: { xs: 2.5, sm: 3 },
          borderLeft: '8px solid',
          borderColor: `${getStatusColor(grievance.status)}.main`,
          boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main', mb: 0.5 }}>
              Ticket ID: {grievance.id}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.75rem', sm: '2.25rem' },
                lineHeight: 1.3,
              }}
            >
              {grievance.subject}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mt: { xs: 1, sm: 0 } }}>
            <Chip
              label={grievance.status}
              color={getStatusColor(grievance.status) as any}
              sx={{ fontWeight: 700, fontSize: '1rem', py: 2.2, px: 2, borderRadius: 2 }}
            />
            <Chip
              label={`${grievance.priority} Priority`}
              color={getPriorityColor(grievance.priority) as any}
              variant="outlined"
              sx={{ fontWeight: 700, fontSize: '1rem', py: 2.2, px: 1.5, borderRadius: 2 }}
            />
          </Box>
        </Box>
      </Card>

      {/* Main Split Layout */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '8fr 4fr' },
          gap: 4,
        }}
      >
        {/* Left Side: Ticket Details */}
        <Box>
          <Card sx={{ borderRadius: 3, mb: 4, border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2.5 }}>
                Issue Description
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  whiteSpace: 'pre-wrap',
                  fontSize: '1.15rem',
                  lineHeight: 1.7,
                  color: 'text.primary',
                }}
              >
                {grievance.description}
              </Typography>

              <Divider sx={{ my: 3.5 }} />

              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2.5 }}>
                Ticket Details
              </Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                  <CategoryIcon sx={{ color: 'text.secondary', fontSize: 24 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                      Submission Category
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700, fontSize: '1.05rem' }}>
                      {grievance.category}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                  <DateIcon sx={{ color: 'text.secondary', fontSize: 24 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                      Submitted On
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700, fontSize: '1.05rem' }}>
                      {new Date(grievance.createdAt).toLocaleString(undefined, {
                        dateStyle: 'long',
                        timeStyle: 'short',
                      })}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Right Side: Status Updates & Contact Information */}
        <Box>
          <StatusUpdateCard
            statusVal={statusVal}
            updating={updating}
            onStatusChange={handleStatusChange}
          />

          <SubmitterDetailsCard
            fullName={grievance.fullName}
            email={grievance.email}
            phone={grievance.phone}
          />
        </Box>
      </Box>

      {/* Action Update Success Toast Notification */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={4000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setToastOpen(false)} severity="success" sx={{ width: '100%', fontSize: '1.05rem' }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
