'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  Typography,
  Button,
  Box,
  CircularProgress,
  useTheme,
  useMediaQuery,
  TextField,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import AddIcon from '@mui/icons-material/Add';
import { grievanceService } from '@/services/grievanceService';
import { Grievance } from '@/types/grievance';
import EmptyState from '@/components/EmptyState';
import GrievanceTable from '@/components/GrievanceTable';
import GrievanceCardList from '@/components/GrievanceCardList';

export default function GrievanceList() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('newest');

  useEffect(() => {
    async function loadData() {
      try {
        const data = await grievanceService.getAllGrievances();
        setGrievances(data);
      } catch (err) {
        console.error('Failed to load grievances:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleRowClick = (id: string) => {
    router.push(`/grievances/${id}`);
  };

  // Helper for Status color mapping
  const getStatusChipColor = (status: string) => {
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

  const getPriorityChipColor = (priority: string) => {
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

  // Process search, category filters, and sorting
  const filteredGrievances = grievances
    .filter((g) => {
      const query = search.toLowerCase();
      const matchesSearch =
        g.subject.toLowerCase().includes(query) ||
        g.id.toLowerCase().includes(query) ||
        g.fullName.toLowerCase().includes(query);

      const matchesCategory =
        categoryFilter === 'All' || g.category === categoryFilter;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortBy === 'priority') {
        const priorityWeight = { High: 3, Medium: 2, Low: 1 };
        return priorityWeight[b.priority] - priorityWeight[a.priority];
      }
      return 0;
    });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 10, flexGrow: 1 }}>
        <CircularProgress size={64} thickness={4} sx={{ mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          Loading grievances, please wait...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: { xs: 1, md: 3 } }}>
      {/* Page Header */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'stretch', sm: 'center' }, mb: 4, gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, fontSize: { xs: '1.75rem', sm: '2.25rem' } }}>
            All Submitted Grievances
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
            Below is the list of all filed complaints, suggestions, and feedback.
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => router.push('/submit')}
          sx={{ py: 1.5, px: 3, borderRadius: 2, fontSize: '1rem', fontWeight: 700 }}
        >
          New Grievance
        </Button>
      </Box>

      {/* Search & Filter Panel using CSS Grid Box (100% type-safe) */}
      <Card sx={{ mb: 4, p: 2.5, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '5fr 3.5fr 3.5fr' },
            gap: 2.5,
            alignItems: 'center',
          }}
        >
          {/* Search Box */}
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.8 }}>Search</Typography>
            <TextField
              placeholder="Search by subject, name, or ticket ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ mb: 0 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'text.secondary', fontSize: 24 }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          {/* Category Filter */}
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.8 }}>Filter by Category</Typography>
            <TextField
              select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              sx={{ mb: 0 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <FilterIcon sx={{ color: 'text.secondary', fontSize: 22 }} />
                    </InputAdornment>
                  ),
                },
              }}
            >
              <MenuItem value="All">All Categories</MenuItem>
              <MenuItem value="Complaint">Complaint</MenuItem>
              <MenuItem value="Feedback">Feedback</MenuItem>
              <MenuItem value="Suggestion">Suggestion</MenuItem>
            </TextField>
          </Box>

          {/* Sort Controller */}
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.8 }}>Sort by</Typography>
            <TextField
              select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              sx={{ mb: 0 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SortIcon sx={{ color: 'text.secondary', fontSize: 22 }} />
                    </InputAdornment>
                  ),
                },
              }}
            >
              <MenuItem value="newest">Newest First</MenuItem>
              <MenuItem value="oldest">Oldest First</MenuItem>
              <MenuItem value="priority">Highest Priority</MenuItem>
            </TextField>
          </Box>
        </Box>
      </Card>

      {/* Dynamic List Content */}
      {filteredGrievances.length === 0 ? (
        <EmptyState
          title={search ? 'No Matches Found' : 'No Grievances Found'}
          description={
            search
              ? `We couldn't find any results for "${search}". Please double-check your spelling or try adjusting your filters.`
              : 'There are currently no submitted grievances. Tap the button below to submit a new one.'
          }
          actionLabel="Submit Grievance"
          onActionClick={() => router.push('/submit')}
        />
      ) : isMobile ? (
        <GrievanceCardList
          grievances={filteredGrievances}
          onCardClick={handleRowClick}
          getStatusChipColor={getStatusChipColor}
          getPriorityChipColor={getPriorityChipColor}
        />
      ) : (
        <GrievanceTable
          grievances={filteredGrievances}
          onRowClick={handleRowClick}
          getStatusChipColor={getStatusChipColor}
          getPriorityChipColor={getPriorityChipColor}
        />
      )}
    </Box>
  );
}
