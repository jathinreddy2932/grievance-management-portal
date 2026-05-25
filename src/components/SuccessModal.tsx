'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Button,
} from '@mui/material';

interface SuccessModalProps {
  open: boolean;
  ticketId: string;
  onClose: (destination: 'dashboard' | 'list' | 'detail') => void;
}

export default function SuccessModal({ open, ticketId, onClose }: SuccessModalProps) {
  return (
    <Dialog
      open={open}
      onClose={() => onClose('dashboard')}
      aria-labelledby="success-dialog-title"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 1, // flat corners
            p: 1.5,
            maxWidth: '480px',
            textAlign: 'center',
            border: '1px solid #cbd5e1',
          },
        },
      }}
    >
      <DialogTitle id="success-dialog-title" sx={{ fontWeight: 800, fontSize: '1.35rem', pb: 1, color: 'success.main' }}>
        Submission Completed Successfully
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
          Thank you. Your grievance file has been received and logged into our system database.
        </Typography>
        
        <Box
          sx={{
            backgroundColor: '#f1f5f9',
            p: 2.5,
            borderRadius: 1,
            mb: 3,
            border: '1.5px solid #cbd5e1',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase' }}>
            Unique Grievance ID
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 900, color: 'primary.main', mt: 0.5, letterSpacing: '0.05em', fontSize: '2.25rem' }}>
            {ticketId}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
          Please note down this registration number. You can search this ID to track updates.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ flexDirection: 'column', gap: 1.5, px: 2, pb: 1.5 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => onClose('detail')}
          sx={{ py: 1.2, fontSize: '1rem', borderRadius: 1 }}
        >
          View Ticket Details
        </Button>
        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => onClose('list')}
            sx={{ py: 1, fontSize: '0.9rem', borderRadius: 1 }}
          >
            View All Tickets
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => onClose('dashboard')}
            sx={{ py: 1, fontSize: '0.9rem', borderRadius: 1 }}
          >
            Go to Dashboard
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
