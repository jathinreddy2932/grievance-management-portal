'use client';

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
import { useColorMode } from '@/components/ThemeRegistry';
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

export default function GrievanceDetail({ params }: PageProps) {
  const router = useRouter();
  const { mode } = useColorMode();
  const { id } = use(params);
  const { isAdmin, isLoaded, isSignedIn, email } = useAdmin();

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
        console.error('Failed to load grievance:', err);
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
        setToastMessage(`Ticket status updated to "${nextStatus}" successfully.`);
        setToastOpen(true);
        window.dispatchEvent(new Event('grievance-data-change'));
      }
    } catch (err) {
      console.error('Failed to update status:', err);
      setToastMessage('Failed to update status. Please try again.');
      setToastOpen(true);
    } finally {
      setUpdating(false);
    }
  };

  if (loading || !isLoaded) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 10, flexGrow: 1 }}>
        <CircularProgress size={48} sx={{ mb: 2 }} />
        <Typography variant="body1" color="text.secondary">
          Loading ticket details...
        </Typography>
      </Box>
    );
  }

  if (!grievance) {
    return (
      <Box sx={{ py: 5, textAlign: 'center' }}>
        <InfoIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
          Ticket Not Found
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          We could not find a ticket with ID "{id}".
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
        sx={{
          mb: 3,
          fontSize: '1rem',
          fontWeight: 700,
          color: 'text.secondary',
        }}
      >
        Back to Grievances List
      </Button>

      {/* Ticket Header Banner */}
      <Card
        sx={{
          mb: 4,
          borderRadius: 1,
          p: 2.5,
          borderLeft: '6px solid',
          borderLeftColor: `${statusColorMap[grievance.status]}.main`,
          boxShadow: 'none',
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 800, color: 'primary.main', mb: 0.5 }}>
              Grievance Registration ID: {grievance.id}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, fontSize: '1.45rem', lineHeight: 1.3 }}>
              {grievance.subject}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mt: { xs: 1, sm: 0 } }}>
            <Chip
              label={grievance.status}
              color={statusColorMap[grievance.status]}
              sx={{ fontWeight: 750, fontSize: '0.9rem', py: 1.8, px: 1.5, borderRadius: 1 }}
            />
            <Chip
              label={`${grievance.priority} Priority`}
              color={priorityColorMap[grievance.priority]}
              variant="outlined"
              sx={{ fontWeight: 750, fontSize: '0.9rem', py: 1.8, px: 1.2, borderRadius: 1 }}
            />
          </Box>
        </Box>
      </Card>

      {/* Split Grid Details Layout */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '8fr 4fr' },
          gap: 4,
        }}
      >
        <Box>
          <Card sx={{ borderRadius: 1, mb: 4, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, fontSize: '1.1rem', color: 'primary.main' }}>
                Description of Issue
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', fontSize: '1.05rem', lineHeight: 1.6 }}>
                {grievance.description}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, fontSize: '1.1rem', color: 'primary.main' }}>
                Ticket Details
              </Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                  <CategoryIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                      Submission Category
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
                      {grievance.category}
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                  <DateIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                      Submitted On
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
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

        <Box>
          {/* Temporary Admin Authorization Debug Card (Remove after verification) */}
          {isSignedIn && (
            <Card sx={{ borderRadius: 1, mb: 3.5, p: 2.5, border: '1.5px solid #d32f2f', backgroundColor: mode === 'light' ? 'rgba(211, 47, 47, 0.05)' : 'rgba(239, 83, 80, 0.1)' }}>
              <Typography variant="body2" sx={{ fontWeight: 800, color: mode === 'light' ? '#d32f2f' : '#ef5350', mb: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                🛠️ Admin Authorization Debug Panel
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <strong>Current Email:</strong> <code>{email}</code>
              </Typography>
              <Typography variant="body2">
                <strong>Is Admin Match:</strong> <span style={{ fontWeight: 800, color: isAdmin ? '#2E7D32' : '#C62828' }}>{String(isAdmin)}</span>
              </Typography>
            </Card>
          )}

          {isAdmin ? (
            <StatusUpdateCard
              statusVal={statusVal}
              updating={updating}
              onStatusChange={handleStatusChange}
            />
          ) : (
            <Card sx={{ borderRadius: 1, mb: 3.5, border: '1.5px dashed', borderColor: 'divider', backgroundColor: mode === 'light' ? '#F5F7FA' : '#1F2937' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.9rem', lineHeight: 1.45 }}>
                  🔒 Status updates are locked. Citizens can only view ticket statuses. To update status, please use the <strong>Admin Login</strong> inside the top navigation bar.
                </Typography>
              </CardContent>
            </Card>
          )}

          <SubmitterDetailsCard
            fullName={grievance.fullName}
            email={grievance.email}
            phone={grievance.phone}
          />
        </Box>
      </Box>

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

