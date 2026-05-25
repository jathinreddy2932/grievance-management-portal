'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onActionClick?: () => void;
}

export default function EmptyState({
  title = 'No Grievances Found',
  description = 'There are no items matching your criteria. Try changing your search query or filters.',
  actionLabel,
  onActionClick,
}: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: 6,
        px: 2,
        backgroundColor: '#ffffff',
        borderRadius: 1,
        border: '1px dashed #cbd5e1',
        width: '100%',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, fontSize: '1.15rem' }}>
        {title}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ maxW: '400px', mb: 3, fontSize: '0.95rem', lineHeight: 1.5 }}
      >
        {description}
      </Typography>
      {actionLabel && onActionClick && (
        <Button
          variant="contained"
          color="primary"
          onClick={onActionClick}
          sx={{
            py: 1,
            px: 3,
            fontSize: '0.95rem',
            borderRadius: 1,
            boxShadow: 'none',
          }}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}
