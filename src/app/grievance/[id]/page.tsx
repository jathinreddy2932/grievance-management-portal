'use client';

// ============================================================
// Route: /grievance/[id]  (singular form)
//
// This page supports the dynamic routing requirement:
//   app/grievance/[id]/page.tsx
//
// It renders the full grievance detail directly — same as
// /grievances/[id] — so both URL patterns work correctly.
// ============================================================

import React, { useEffect, useState, use } from 'react';
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
import { useAdmin } from '@/hooks/useAdmin';

interface PageProps {
  params: Promise<{ id: string }>;
}

const statusColorMap = {
  Open: 'warning',
  'In Progress': 'info',
  Resolved: 'success',
} as const;

const priorityColorMap = {
  High: 'error',
  Medium: 'warning',
  Low: 'default',
} as const;

export default function GrievanceDetailSingular({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const { isAdmin, isLoaded } = useAdmin();

  const [grievance, setGrievance] = useState<Grievance | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [statusVal, setStatusVal] = useState<GrievanceStatus>('Open');
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const item = await grievanceService.getGrievanceById(id);
        if (item) {
          setGrievance(item);
          setStatusVal(item.status);
        }
      } catch (err) {
        console.error('Failed to load grievance:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleStatusChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextStatus = event.target.value as GrievanceStatus;
    setStatusVal(nextStatus);
    setUpdating(true);
    try {
      const updated = await grievanceService.updateGrievanceStatus(id, nextStatus);
      if (updated) {
        setGrievance(updated);
        setToastMessage(`Status updated to "${nextStatus}" successfully.`);
        setToastOpen(true);
      }
    } catch {
      setToastMessage('Failed to update status. Please try again.');
      setToastOpen(true);
    } finally {
      setUpdating(false);
    }
  };

  if (loading || !isLoaded) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 10 }}>
        <CircularProgress size={48} sx={{ mb: 2 }} />
        <Typography variant="body1" color="text.secondary">Loading ticket details...</Typography>
      </Box>
    );
  }

  if (!grievance) {
    return (
      <Box sx={{ py: 5, textAlign: 'center' }}>
        <InfoIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>Ticket Not Found</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          We could not find a ticket with ID &quot;{id}&quot;.
        </Typography>
        <Button variant="contained" onClick={() => router.push('/grievances')}>
          Back to All Grievances
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 1 }}>
      <Button
        variant="text"
        startIcon={<BackIcon />}
        onClick={() => router.push('/grievances')}
        sx={{ mb: 3, fontSize: '1rem', fontWeight: 700, color: 'text.secondary' }}
      >
        Back to Grievances List
      </Button>

      {/* Ticket Header Banner */}
      <Card sx={{
        mb: 4, borderRadius: 1, p: 2.5,
        borderLeft: '6px solid',
        borderLeftColor: `${statusColorMap[grievance.status]}.main`,
        border: '1px solid', borderColor: 'divider', boxShadow: 'none',
      }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 800, color: 'primary.main', mb: 0.5 }}>
              Grievance ID: {grievance.id}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, fontSize: '1.4rem', lineHeight: 1.3 }}>
              {grievance.subject}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip label={grievance.status} color={statusColorMap[grievance.status]} sx={{ fontWeight: 750, fontSize: '0.9rem', borderRadius: 1 }} />
            <Chip label={`${grievance.priority} Priority`} color={priorityColorMap[grievance.priority]} variant="outlined" sx={{ fontWeight: 750, fontSize: '0.9rem', borderRadius: 1 }} />
          </Box>
        </Box>
      </Card>

      {/* Main Content Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '8fr 4fr' }, gap: 4 }}>
        <Box>
          <Card sx={{ borderRadius: 1, mb: 4, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: 'primary.main' }}>
                Description of Issue
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', fontSize: '1.05rem', lineHeight: 1.6 }}>
                {grievance.description}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: 'primary.main' }}>
                Ticket Details
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <CategoryIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">Category</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>{grievance.category}</Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <DateIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">Submitted On</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      {new Date(grievance.createdAt).toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'short' })}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box>
          {isAdmin ? (
            <StatusUpdateCard statusVal={statusVal} updating={updating} onStatusChange={handleStatusChange} />
          ) : (
            <Card sx={{ borderRadius: 1, mb: 3.5, border: '1.5px dashed', borderColor: 'divider' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                  🔒 Status updates are locked. Only the administrator can update ticket statuses.
                </Typography>
              </CardContent>
            </Card>
          )}
          <SubmitterDetailsCard fullName={grievance.fullName} email={grievance.email} phone={grievance.phone} />
        </Box>
      </Box>

      <Snackbar
        open={toastOpen}
        autoHideDuration={4000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setToastOpen(false)} severity="success" sx={{ width: '100%' }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
