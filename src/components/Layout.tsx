'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Paper,
  IconButton,
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useColorMode } from './ThemeRegistry';
import { useAdmin } from '../hooks/useAdmin';
import { SignInButton, SignOutButton } from '@clerk/nextjs';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { toggleColorMode, mode } = useColorMode();
  const { isAdmin, isLoaded, isSignedIn } = useAdmin();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'background.default',
        color: 'text.primary',
      }}
    >
      {/* Official Government Style Header Banner - Fixed position */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: mode === 'light' ? '#0B4EA2' : '#1F2937',
          color: '#FFFFFF',
          borderBottom: '4px solid #E65100', // Solid Gold/Orange bottom accent
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              minHeight: '70px',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              py: { xs: 1.5, md: 0 },
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* Logo, Title & Subtitle Area */}
            <Box
              onClick={() => handleNavigation('/')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              <AccountBalanceIcon sx={{ fontSize: '2rem', color: '#FFFFFF' }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.1, fontSize: '1.2rem' }}>
                  Public Care Portal
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.85)', display: 'block', fontSize: '0.75rem', fontWeight: 500 }}>
                  Grievance Management System
                </Typography>
              </Box>
            </Box>

            {/* Navigation & Theme Toggle Area */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 1, sm: 1.5 },
                mt: { xs: 1.5, md: 0 },
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <Button
                color="inherit"
                onClick={() => handleNavigation('/')}
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: pathname === '/' ? 800 : 500,
                  backgroundColor: pathname === '/' ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                }}
              >
                Dashboard
              </Button>
              <Button
                color="inherit"
                onClick={() => handleNavigation('/submit')}
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: pathname.startsWith('/submit') ? 800 : 500,
                  backgroundColor: pathname.startsWith('/submit') ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                }}
              >
                Submit Grievance
              </Button>
              <Button
                color="inherit"
                onClick={() => handleNavigation('/grievances')}
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: pathname.startsWith('/grievances') ? 800 : 500,
                  backgroundColor: pathname.startsWith('/grievances') ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                }}
              >
                View Grievances
              </Button>
              
              {/* Subtle Administrator Badge */}
              {isLoaded && isAdmin && (
                <Box
                  sx={{
                    backgroundColor: '#E65100',
                    color: '#FFFFFF',
                    px: 1.2,
                    py: 0.5,
                    borderRadius: '3px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    height: '28px',
                  }}
                >
                  Administrator
                </Box>
              )}

              {/* Clerk Sign In / Sign Out Trigger Buttons */}
              {isLoaded && (
                !isSignedIn ? (
                  <SignInButton mode="modal">
                    <Button
                      variant="outlined"
                      color="inherit"
                      sx={{
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        borderColor: 'rgba(255, 255, 255, 0.4)',
                        color: '#FFFFFF',
                        px: 1.5,
                        minHeight: '36px',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          borderColor: '#FFFFFF',
                        },
                      }}
                    >
                      Admin Login
                    </Button>
                  </SignInButton>
                ) : (
                  <SignOutButton>
                    <Button
                      variant="outlined"
                      sx={{
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        borderColor: '#E57373',
                        color: '#FFCDD2',
                        px: 1.5,
                        minHeight: '36px',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          borderColor: '#EF9A9A',
                        },
                      }}
                    >
                      Admin Logout
                    </Button>
                  </SignOutButton>
                )
              )}

              {/* Theme Toggle Button */}
              <IconButton
                onClick={toggleColorMode}
                color="inherit"
                title={mode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                sx={{ ml: 0.5, p: 0.8 }}
              >
                {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Page Content - Spacer for Fixed Navbar */}
      <Box sx={{ pt: { xs: '145px', md: '85px' } }} />

      {/* Main Page Container */}
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          py: { xs: 3, md: 5 },
          px: { xs: 2, sm: 3 },
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '1200px !important', // Strictly centered 1200px max width container
        }}
      >
        {children}
      </Container>

      {/* Simple Official Footer */}
      <Paper
        elevation={0}
        sx={{
          py: 3,
          backgroundColor: mode === 'light' ? '#E2E8F0' : '#1F2937',
          borderTop: mode === 'light' ? '1px solid #cbd5e1' : '1px solid #374151',
          color: mode === 'light' ? '#4B5563' : '#9CA3AF',
          textAlign: 'center',
          mt: 'auto',
          borderRadius: 0,
        }}
      >
        <Typography variant="body2" sx={{ fontSize: '0.85rem', fontWeight: 500 }}>
          Official Grievance Management System Portal © {new Date().getFullYear()} — Designed for normal citizens & elderly users.
        </Typography>
      </Paper>
    </Box>
  );
}


