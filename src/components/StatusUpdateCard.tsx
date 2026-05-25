'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Box,
  CircularProgress,
} from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import { GrievanceStatus } from '@/types/grievance';
import { useColorMode } from '@/components/ThemeRegistry';

interface StatusUpdateCardProps {
  statusVal: GrievanceStatus;
  updating: boolean;
  onStatusChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export default function StatusUpdateCard({
  statusVal,
  updating,
  onStatusChange,
}: StatusUpdateCardProps) {
  const { mode } = useColorMode();
  return (
    <Card
      sx={{
        borderRadius: 1, // flat corners
        mb: 3,
        border: '1.5px solid',
        borderColor: 'primary.main',
        backgroundColor: mode === 'light' ? '#F5F7FA' : '#1F2937',
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1, fontSize: '1.05rem', color: 'primary.main' }}>
          <UpdateIcon sx={{ fontSize: 20 }} /> Update Status (Admin)
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: '0.9rem' }}>
          Change the current stage of this public grievance ticket file.
        </Typography>

        <TextField
          select
          value={statusVal}
          onChange={onStatusChange}
          disabled={updating}
          fullWidth
          sx={{
            mb: 0,
            backgroundColor: 'background.paper',
            borderRadius: 1,
          }}
        >
          <MenuItem value="Open">🟠 Open (New Submission)</MenuItem>
          <MenuItem value="In Progress">🔵 In Progress (Under Review)</MenuItem>
          <MenuItem value="Resolved">🟢 Resolved (Completed)</MenuItem>
        </TextField>

        {updating && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, alignItems: 'center' }}>
            <CircularProgress size={16} />
            <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
              Saving updates...
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

