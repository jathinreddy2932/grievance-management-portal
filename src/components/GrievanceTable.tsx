'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
} from '@mui/material';
import OpenIcon from '@mui/icons-material/Launch';
import { Grievance } from '@/types/grievance';

interface GrievanceTableProps {
  grievances: Grievance[];
  onRowClick: (id: string) => void;
  getStatusChipColor: (status: string) => any;
  getPriorityChipColor: (priority: string) => any;
}

export default function GrievanceTable({
  grievances,
  onRowClick,
  getStatusChipColor,
  getPriorityChipColor,
}: GrievanceTableProps) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 1, // flat corners
        boxShadow: 'none',
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      <Table aria-label="grievances table">
        <TableHead sx={{ backgroundColor: (theme) => theme.palette.mode === 'light' ? '#f1f5f9' : '#1F2937' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 700, fontSize: '0.95rem', py: 1.5 }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 700, fontSize: '0.95rem', py: 1.5 }}>Subject</TableCell>
            <TableCell sx={{ fontWeight: 700, fontSize: '0.95rem', py: 1.5 }}>Category</TableCell>
            <TableCell sx={{ fontWeight: 700, fontSize: '0.95rem', py: 1.5 }}>Priority</TableCell>
            <TableCell sx={{ fontWeight: 700, fontSize: '0.95rem', py: 1.5 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 700, fontSize: '0.95rem', py: 1.5 }}>Created Date</TableCell>
            <TableCell sx={{ fontWeight: 700, fontSize: '0.95rem', py: 1.5, textAlign: 'center' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {grievances.map((g) => (
            <TableRow
              key={g.id}
              hover
              onClick={() => onRowClick(g.id)}
              sx={{
                cursor: 'pointer',
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <TableCell sx={{ py: 1.8, fontSize: '0.95rem', fontWeight: 800, color: 'primary.main' }}>
                {g.id}
              </TableCell>
              <TableCell sx={{ py: 1.8, fontSize: '0.95rem', fontWeight: 600, maxWidth: '280px' }}>
                {g.subject}
              </TableCell>
              <TableCell sx={{ py: 1.8, fontSize: '0.95rem' }}>
                <Chip label={g.category} variant="outlined" size="small" sx={{ fontWeight: 600, borderRadius: 1 }} />
              </TableCell>
              <TableCell sx={{ py: 1.8 }}>
                <Chip
                  label={g.priority}
                  color={getPriorityChipColor(g.priority)}
                  variant="outlined"
                  size="small"
                  sx={{ fontWeight: 600, borderRadius: 1 }}
                />
              </TableCell>
              <TableCell sx={{ py: 1.8 }}>
                <Chip
                  label={g.status}
                  color={getStatusChipColor(g.status)}
                  size="small"
                  sx={{ fontWeight: 750, borderRadius: 1, px: 0.5 }}
                />
              </TableCell>
              <TableCell sx={{ py: 1.8, fontSize: '0.9rem', color: 'text.secondary' }}>
                {new Date(g.createdAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </TableCell>
              <TableCell sx={{ py: 1.8, textAlign: 'center' }}>
                <Button
                  variant="text"
                  color="primary"
                  startIcon={<OpenIcon sx={{ fontSize: 16 }} />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRowClick(g.id);
                  }}
                  sx={{ fontWeight: 750, fontSize: '0.85rem', p: 0.5 }}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

