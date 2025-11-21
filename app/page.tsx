'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Container,
  Typography,
  Box,
  Button,
  AppBar,
  Toolbar,
  CircularProgress,
  Avatar,
  Chip,
  Paper,
} from '@mui/material';
import { portfolioAPI } from '@/lib/api';
import { User } from '@/types/user';

export default function Home() {
  const [portfolios, setPortfolios] = useState<User[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const response = await portfolioAPI.getAll();
      setPortfolios(response.portfolios);
      if (response.portfolios.length > 0) {
        setSelectedProfile(response.portfolios[0]);
      }
    } catch (error) {
      console.error('Failed to fetch portfolios:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#0f0f1a' }}>
      <AppBar 
        position="static" 
        sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Portfolio Gallery
          </Typography>
          <Button 
            color="inherit" 
            component={Link} 
            href="/login"
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.2)', 
              '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
              borderRadius: 2,
              px: 3
            }}
          >
            Admin Login
          </Button>
        </Toolbar>
      </AppBar>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <CircularProgress size={60} sx={{ color: '#667eea' }} />
        </Box>
      ) : portfolios.length === 0 ? (
        <Box textAlign="center" py={12}>
          <Typography variant="h4" sx={{ color: '#fff', mb: 2 }}>
            No portfolios available yet.
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)' }}>
            Check back soon for amazing portfolios!
          </Typography>
        </Box>
      ) : (
        <>
          {/* Profile Selector */}
          <Container maxWidth="lg" sx={{ pt: 4 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                color: '#fff', 
                mb: 3, 
                fontWeight: 700,
                textAlign: 'center',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}
            >
              Select a Profile
            </Typography>
            <Box 
              sx={{ 
                display: 'flex', 
                gap: 2, 
                mb: 4, 
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}
            >
              {portfolios.map((user) => (
                <Button
                  key={user._id}
                  onClick={() => setSelectedProfile(user)}
                  variant={selectedProfile?._id === user._id ? 'contained' : 'outlined'}
                  sx={{
                    background: selectedProfile?._id === user._id 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'transparent',
                    color: '#fff',
                    borderColor: 'rgba(255,255,255,0.3)',
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1rem',
                    '&:hover': {
                      borderColor: '#667eea',
                      bgcolor: selectedProfile?._id === user._id 
                        ? undefined
                        : 'rgba(102, 126, 234, 0.1)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {user.name}
                </Button>
              ))}
            </Box>
          </Container>

          {/* Bento Grid Layout */}
          {selectedProfile && (
            <Container maxWidth="lg" sx={{ pb: 6 }}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                  },
                  gap: 3,
                  gridAutoRows: 'minmax(150px, auto)',
                }}
              >
                {/* Profile Card */}
                <Paper
                  elevation={8}
                  sx={{
                    gridColumn: { xs: 'span 1', sm: 'span 2', md: 'span 2' },
                    gridRow: 'span 2',
                    p: 4,
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    animation: 'fadeIn 0.5s ease-in',
                    '@keyframes fadeIn': {
                      from: { opacity: 0, transform: 'translateY(20px)' },
                      to: { opacity: 1, transform: 'translateY(0)' },
                    },
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
                    },
                  }}
                >
                  <Avatar
                    src={selectedProfile.profileImage}
                    alt={selectedProfile.name}
                    sx={{
                      width: 150,
                      height: 150,
                      mb: 3,
                      border: '4px solid rgba(255,255,255,0.2)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                    }}
                  />
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      color: '#fff', 
                      fontWeight: 700, 
                      mb: 1,
                      textAlign: 'center'
                    }}
                  >
                    {selectedProfile.name}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.7)',
                      textAlign: 'center'
                    }}
                  >
                    {selectedProfile.email}
                  </Typography>
                </Paper>

                {/* Bio Card */}
                <Paper
                  elevation={8}
                  sx={{
                    gridColumn: { xs: 'span 1', md: 'span 1' },
                    gridRow: 'span 2',
                    p: 3,
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 4,
                    transition: 'all 0.3s ease',
                    animation: 'fadeIn 0.6s ease-in',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 20px 40px rgba(118, 75, 162, 0.3)',
                    },
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: '#fff', 
                      fontWeight: 700, 
                      mb: 2,
                      borderBottom: '2px solid rgba(102, 126, 234, 0.5)',
                      pb: 1
                    }}
                  >
                    About
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.8)',
                      lineHeight: 1.8
                    }}
                  >
                    {selectedProfile.bio || 'No bio available.'}
                  </Typography>
                </Paper>

                {/* Skills Card */}
                <Paper
                  elevation={8}
                  sx={{
                    gridColumn: { xs: 'span 1', sm: 'span 2' },
                    p: 3,
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 4,
                    transition: 'all 0.3s ease',
                    animation: 'fadeIn 0.7s ease-in',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
                    },
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: '#fff', 
                      fontWeight: 700, 
                      mb: 2,
                      borderBottom: '2px solid rgba(118, 75, 162, 0.5)',
                      pb: 1
                    }}
                  >
                    Skills & Expertise
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedProfile.skills && selectedProfile.skills.length > 0 ? (
                      selectedProfile.skills.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          sx={{
                            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)',
                            color: '#fff',
                            fontWeight: 600,
                            border: '1px solid rgba(255,255,255,0.2)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.5) 0%, rgba(118, 75, 162, 0.5) 100%)',
                            },
                          }}
                        />
                      ))
                    ) : (
                      <Typography sx={{ color: 'rgba(255,255,255,0.6)' }}>
                        No skills listed yet.
                      </Typography>
                    )}
                  </Box>
                </Paper>

                {/* Portfolio Items Card */}
                <Paper
                  elevation={8}
                  sx={{
                    gridColumn: { xs: 'span 1', sm: 'span 2', md: 'span 1' },
                    gridRow: { md: 'span 2' },
                    p: 3,
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 4,
                    transition: 'all 0.3s ease',
                    animation: 'fadeIn 0.8s ease-in',
                    overflow: 'auto',
                    maxHeight: '500px',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 20px 40px rgba(118, 75, 162, 0.3)',
                    },
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: '#fff', 
                      fontWeight: 700, 
                      mb: 2,
                      borderBottom: '2px solid rgba(102, 126, 234, 0.5)',
                      pb: 1
                    }}
                  >
                    Portfolio
                  </Typography>
                  {selectedProfile.portfolioItems && selectedProfile.portfolioItems.length > 0 ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {selectedProfile.portfolioItems.map((item, index) => (
                        <Box
                          key={index}
                          sx={{
                            p: 2,
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: 2,
                            border: '1px solid rgba(255,255,255,0.1)',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              background: 'rgba(255, 255, 255, 0.08)',
                              borderColor: 'rgba(102, 126, 234, 0.5)',
                            },
                          }}
                        >
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              color: '#fff', 
                              fontWeight: 600, 
                              mb: 1 
                            }}
                          >
                            {item.title}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: 'rgba(255,255,255,0.7)',
                              mb: 1
                            }}
                          >
                            {item.description}
                          </Typography>
                          {item.projectUrl && (
                            <Button
                              component="a"
                              href={item.projectUrl}
                              target="_blank"
                              size="small"
                              sx={{
                                mt: 1,
                                color: '#667eea',
                                textTransform: 'none',
                                '&:hover': {
                                  background: 'rgba(102, 126, 234, 0.1)',
                                },
                              }}
                            >
                              View Project →
                            </Button>
                          )}
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Typography sx={{ color: 'rgba(255,255,255,0.6)' }}>
                      No portfolio items yet.
                    </Typography>
                  )}
                </Paper>
              </Box>
            </Container>
          )}
        </>
      )}
    </Box>
  );
}
