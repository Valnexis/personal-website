'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Box,
  Button,
  AppBar,
  Toolbar,
  CircularProgress,
} from '@mui/material';
import { portfolioAPI } from '@/lib/api';
import { User } from '@/types/user';

export default function Home() {
  const [portfolios, setPortfolios] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const response = await portfolioAPI.getAll();
      setPortfolios(response.portfolios);
    } catch (error) {
      console.error('Failed to fetch portfolios:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Portfolio Gallery
          </Typography>
          <Button color="inherit" component={Link} href="/login">
            Admin Login
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Welcome to Our Portfolio Gallery
        </Typography>
        <Typography variant="subtitle1" gutterBottom align="center" color="text.secondary" sx={{ mb: 4 }}>
          Discover talented professionals and their amazing work
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <CircularProgress />
          </Box>
        ) : portfolios.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Typography variant="h5" color="text.secondary">
              No portfolios available yet.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {portfolios.map((user) => (
              <Grid item key={user._id} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {user.profileImage && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={user.profileImage}
                      alt={user.name}
                      sx={{ objectFit: 'cover' }}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {user.name}
                    </Typography>
                    {user.bio && (
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {user.bio}
                      </Typography>
                    )}
                    {user.skills && user.skills.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        {user.skills.slice(0, 5).map((skill, index) => (
                          <Chip
                            key={index}
                            label={skill}
                            size="small"
                            sx={{ mr: 0.5, mb: 0.5 }}
                          />
                        ))}
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
