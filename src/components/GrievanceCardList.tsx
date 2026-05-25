'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
} from '@mui/material';
import { Grievance } from '@/types/grievance';

interface GrievanceCardListProps {
  grievances: Grievance[];
  onCardClick: (id: string) => void;
  getStatusChipColor: (status: string) => any;
  getPriorityChipColor: (priority: string) => any;
}

export default function GrievanceCardList({
  grievances,
  onCardClick,
  getStatusChipColor,
  getPriorityChipColor,
}: GrievanceCardListProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {grievances.map((g) => (
        <Card
          key={g.id}
          onClick={() => onCardClick(g.id)}
          sx={{
            borderRadius: 1, // flat corners
            cursor: 'pointer',
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.paper',
            boxShadow: 'none',
            borderLeft: '5px solid',
            // Set left border color based on status
            borderLeftColor: (theme) => {
              const chipColor = getStatusChipColor(g.status);
              return theme.palette[chipColor as 'warning' | 'info' | 'success']?.main || theme.palette.divider;
            },
          }}
        >
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 800, color: 'primary.main', fontSize: '1rem' }}>
                {g.id}
              </Typography>
              <Chip
                label={g.status}
                color={getStatusChipColor(g.status)}
                size="small"
                sx={{ fontWeight: 750, fontSize: '0.8rem', borderRadius: 1 }}
              />
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5, fontSize: '1.15rem', lineHeight: 1.3 }}>
              {g.subject}
            </Typography>

            <Divider sx={{ my: 1.2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', gap: 0.8 }}>
                <Chip label={g.category} size="small" sx={{ fontWeight: 600, borderRadius: 1 }} />
                <Chip
                  label={`${g.priority}`}
                  color={getPriorityChipColor(g.priority)}
                  size="small"
                  variant="outlined"
                  sx={{ fontWeight: 600, borderRadius: 1 }}
                />
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                {new Date(g.createdAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

