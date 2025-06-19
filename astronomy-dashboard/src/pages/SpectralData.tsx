import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SpectralData {
  id: number;
  objectId: number;
  objectName: string;
  wavelength: number;
  intensity: number;
  dateRecorded: string;
}

const sampleData: SpectralData[] = [
  {
    id: 1,
    objectId: 1,
    objectName: "Sun",
    wavelength: 400,
    intensity: 0.8,
    dateRecorded: "2024-03-15",
  },
  {
    id: 2,
    objectId: 1,
    objectName: "Sun",
    wavelength: 500,
    intensity: 1.0,
    dateRecorded: "2024-03-15",
  },
  {
    id: 3,
    objectId: 1,
    objectName: "Sun",
    wavelength: 600,
    intensity: 0.9,
    dateRecorded: "2024-03-15",
  },
];

const SpectralData = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = sampleData.filter((data) =>
    data.objectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chartData = {
    labels: sampleData.map(data => data.wavelength),
    datasets: [
      {
        label: 'Spectral Intensity',
        data: sampleData.map(data => data.intensity),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
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
        text: 'Spectral Intensity vs Wavelength',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Wavelength (nm)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Intensity',
        },
      },
    },
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Spectral Data
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Measurements
              </Typography>
              <Typography variant="h4">{sampleData.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Unique Objects
              </Typography>
              <Typography variant="h4">
                {new Set(sampleData.map(data => data.objectId)).size}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Date Range
              </Typography>
              <Typography variant="h4">
                {new Set(sampleData.map(data => data.dateRecorded)).size} days
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Line options={chartOptions} data={chartData} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Search by object name"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Object</TableCell>
                  <TableCell>Wavelength (nm)</TableCell>
                  <TableCell>Intensity</TableCell>
                  <TableCell>Date Recorded</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((data) => (
                    <TableRow key={data.id}>
                      <TableCell>{data.objectName}</TableCell>
                      <TableCell>{data.wavelength}</TableCell>
                      <TableCell>{data.intensity}</TableCell>
                      <TableCell>{data.dateRecorded}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SpectralData; 