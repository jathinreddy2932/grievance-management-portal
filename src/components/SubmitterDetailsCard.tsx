'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
} from '@mui/material';

interface SubmitterDetailsCardProps {
  fullName: string;
  email: string;
  phone?: string;
}

export default function SubmitterDetailsCard({
  fullName,
  email,
  phone,
}: SubmitterDetailsCardProps) {
  return (
    <Card sx={{ borderRadius: 1, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, fontSize: '1.05rem', color: 'primary.main' }}>
          Submitter Information
        </Typography>

        <Stack spacing={2}>
          {/* Submitter Name */}
          <Box sx={{ borderBottom: '1px solid', borderBottomColor: 'divider', pb: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.8rem', display: 'block', mb: 0.2 }}>
              Citizen Name
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 700, fontSize: '1rem' }}>
              {fullName}
            </Typography>
          </Box>

          {/* Submitter Email */}
          <Box sx={{ borderBottom: '1px solid', borderBottomColor: 'divider', pb: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.8rem', display: 'block', mb: 0.2 }}>
              Email Address
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 700, fontSize: '1rem', wordBreak: 'break-all' }}>
              {email}
            </Typography>
          </Box>

          {/* Submitter Phone */}
          {phone && (
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.8rem', display: 'block', mb: 0.2 }}>
                Phone Number
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 700, fontSize: '1rem' }}>
                {phone}
              </Typography>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

