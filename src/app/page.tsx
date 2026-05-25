'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/AddCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ErrorIcon from '@mui/icons-material/Error';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HelpIcon from '@mui/icons-material/Help';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { grievanceService } from '@/services/grievanceService';
import { GrievanceStats } from '@/types/grievance';
import { useColorMode } from '@/components/ThemeRegistry';

export default function Dashboard() {
  const router = useRouter();
  const { mode } = useColorMode();
  const [stats, setStats] = useState<GrievanceStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await grievanceService.getStats();
        setStats(data);
      } catch (err) {
        console.error('Failed to load stats:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 10, flexGrow: 1 }}>
        <CircularProgress size={48} sx={{ mb: 2 }} />
        <Typography variant="body1" color="text.secondary">
          Loading portal metrics...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 1 }}>
      {/* 🏛️ Welcome Banner Section (Horizontal Layout with Symbol/Illustration Icon) */}
      <Card
        sx={{
          mb: 4,
          p: { xs: 2.5, sm: 3.5 },
          backgroundColor: mode === 'light' ? '#F5F7FA' : '#1F2937',
          borderColor: mode === 'light' ? '#D8DEE6' : '#374151',
          borderRadius: 1,
        }}
      >
        <CardContent sx={{ p: '0px !important' }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, gap: 3.5 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                backgroundColor: mode === 'light' ? 'rgba(11, 78, 162, 0.1)' : 'rgba(144, 202, 249, 0.1)',
                color: mode === 'light' ? '#0B4EA2' : '#90CAF9',
                flexShrink: 0,
              }}
            >
              <AccountBalanceIcon sx={{ fontSize: '2.5rem' }} />
            </Box>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '1.45rem', sm: '1.75rem' },
                  color: mode === 'light' ? '#0B4EA2' : '#90CAF9',
                  mb: 1.2,
                }}
              >
                Public Care Grievance & Feedback Portal
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.02rem', lineHeight: 1.55 }}>
                This is an official public service utility platform where citizens can file local complaints, register feedback, or share public suggestions. Every request is strictly tracked, categorized, and addressed in public interest.
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* 🚀 Main Action Button Section (Large, centered, high touch target) */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddIcon sx={{ fontSize: '1.8rem !important' }} />}
          onClick={() => router.push('/submit')}
          sx={{
            fontSize: '1.15rem',
            py: 2,
            px: { xs: 4, sm: 6 },
            borderRadius: 1,
            width: { xs: '100%', sm: 'auto' },
            boxShadow: '0px 4px 6px rgba(11, 78, 162, 0.15)',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          Submit New Grievance
        </Button>
      </Box>

      {/* 📊 Stat Overview Title */}
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 800, fontSize: '1.3rem', color: mode === 'light' ? '#0B4EA2' : '#90CAF9' }}>
        Portal Statistics & Activity
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* 📈 Simple Rectangular Statistics Cards with icons and accents */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
          gap: 3,
        }}
      >
        {/* Total Filed */}
        <Card sx={{ borderRadius: 1, position: 'relative', overflow: 'hidden', borderLeft: '4px solid #4B5563' }}>
          <CardContent sx={{ p: 2.5, display: 'flex', gap: 2, alignItems: 'center' }}>
            <AssignmentIcon sx={{ fontSize: '2.5rem', color: 'text.secondary', opacity: 0.8 }} />
            <Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Total Grievances
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 900, mt: 0.2, fontSize: '2.2rem' }}>
                {stats?.total ?? 0}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
                All filed registrations
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Open / New */}
        <Card sx={{ borderRadius: 1, position: 'relative', overflow: 'hidden', borderLeft: '4px solid #E65100' }}>
          <CardContent sx={{ p: 2.5, display: 'flex', gap: 2, alignItems: 'center' }}>
            <ErrorIcon sx={{ fontSize: '2.5rem', color: '#E65100', opacity: 0.85 }} />
            <Box>
              <Typography variant="caption" sx={{ color: '#E65100', fontWeight: 700, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Open / Awaiting
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 900, mt: 0.2, color: '#E65100', fontSize: '2.2rem' }}>
                {stats?.open ?? 0}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
                Awaiting public review
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* In Progress */}
        <Card sx={{ borderRadius: 1, position: 'relative', overflow: 'hidden', borderLeft: '4px solid #0B4EA2' }}>
          <CardContent sx={{ p: 2.5, display: 'flex', gap: 2, alignItems: 'center' }}>
            <AutorenewIcon sx={{ fontSize: '2.5rem', color: '#0B4EA2', opacity: 0.85 }} />
            <Box>
              <Typography variant="caption" sx={{ color: '#0B4EA2', fontWeight: 700, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                In Progress
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 900, mt: 0.2, color: '#0B4EA2', fontSize: '2.2rem' }}>
                {stats?.inProgress ?? 0}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
                Under active investigation
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Resolved */}
        <Card sx={{ borderRadius: 1, position: 'relative', overflow: 'hidden', borderLeft: '4px solid #2E7D32' }}>
          <CardContent sx={{ p: 2.5, display: 'flex', gap: 2, alignItems: 'center' }}>
            <TaskAltIcon sx={{ fontSize: '2.5rem', color: '#2E7D32', opacity: 0.85 }} />
            <Box>
              <Typography variant="caption" sx={{ color: '#2E7D32', fontWeight: 700, display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Resolved
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 900, mt: 0.2, color: '#2E7D32', fontSize: '2.2rem' }}>
                {stats?.resolved ?? 0}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
                Successfully closed
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* 📘 "How to Use" Box (Clean Numbered Layout) */}
      <Box sx={{ mt: 5, p: { xs: 2.5, sm: 3.5 }, backgroundColor: mode === 'light' ? '#FFFFFF' : '#1F2937', borderRadius: 1, border: mode === 'light' ? '1px solid #D8DEE6' : '1px solid #374151' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <HelpIcon sx={{ color: mode === 'light' ? '#0B4EA2' : '#90CAF9' }} />
          <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.15rem' }}>
            Official Citizens Instructions (How to Use):
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.2 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <Typography sx={{ fontWeight: 800, color: mode === 'light' ? '#0B4EA2' : '#90CAF9', fontSize: '1.25rem', lineHeight: 1 }}>1.</Typography>
            <Typography variant="body2" sx={{ fontSize: '0.98rem', lineHeight: 1.45 }}>
              Tap the **"Submit New Grievance"** button above to launch the secure ticket registration form. Provide your authentic contact details to receive verification.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <Typography sx={{ fontWeight: 800, color: mode === 'light' ? '#0B4EA2' : '#90CAF9', fontSize: '1.25rem', lineHeight: 1 }}>2.</Typography>
            <Typography variant="body2" sx={{ fontSize: '0.98rem', lineHeight: 1.45 }}>
              Upon successful registration, write down or copy the generated **Ticket ID Code** (e.g. <code>GRV-8172</code>). You will need this code to reference your grievance.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <Typography sx={{ fontWeight: 800, color: mode === 'light' ? '#0B4EA2' : '#90CAF9', fontSize: '1.25rem', lineHeight: 1 }}>3.</Typography>
            <Typography variant="body2" sx={{ fontSize: '0.98rem', lineHeight: 1.45 }}>
              Visit the **"View Grievances"** portal from the top menu. Enter your Ticket ID in the search field to inspect its status, details, priority, and official remarks.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

