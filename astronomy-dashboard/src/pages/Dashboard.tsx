import React from 'react';
import { Box, Card, CardContent, CardHeader, Typography, Paper, Grid } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const chartData = {
    labels: ['Stars', 'Galaxies', 'Exoplanets', 'Asteroids'],
    datasets: [
      {
        label: 'Number of Objects',
        data: [1250, 450, 780, 890],
        backgroundColor: [
          'rgba(124, 77, 255, 0.8)',
          'rgba(255, 64, 129, 0.8)',
          'rgba(0, 176, 255, 0.8)',
          'rgba(29, 233, 182, 0.8)',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Celestial Objects Distribution',
      },
    },
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Welcome to Astronomy Data Management System
          </Typography>
        </Grid>
        
        {/* Summary Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Users
              </Typography>
              <Typography variant="h4">150</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Observations Today
              </Typography>
              <Typography variant="h4">24</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Objects
              </Typography>
              <Typography variant="h4">3,370</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Spectral Data Points
              </Typography>
              <Typography variant="h4">12.5K</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Bar options={chartOptions} data={chartData} />
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Recent Activity" />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                • New exoplanet discovered - 2 hours ago
              </Typography>
              <Typography variant="body2" color="textSecondary">
                • Spectral analysis completed - 4 hours ago
              </Typography>
              <Typography variant="body2" color="textSecondary">
                • New user registration - 5 hours ago
              </Typography>
              <Typography variant="body2" color="textSecondary">
                • Galaxy data updated - 6 hours ago
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 