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
  Grid,
  Card,
  CardContent,
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
import { Scatter } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Exoplanet {
  id: number;
  name: string;
  hostStar: string;
  orbitalPeriod: number;
  mass: number;
  radius: number;
  atmosphere: string;
  discoveryDate: string;
}

const sampleData: Exoplanet[] = [
  {
    id: 1,
    name: "Kepler-186f",
    hostStar: "Kepler-186",
    orbitalPeriod: 129.9,
    mass: 1.71,
    radius: 1.17,
    atmosphere: "Unknown",
    discoveryDate: "2014-04-17",
  },
  {
    id: 2,
    name: "TRAPPIST-1e",
    hostStar: "TRAPPIST-1",
    orbitalPeriod: 6.1,
    mass: 0.77,
    radius: 0.92,
    atmosphere: "Potentially rocky",
    discoveryDate: "2017-02-22",
  },
  {
    id: 3,
    name: "Proxima Centauri b",
    hostStar: "Proxima Centauri",
    orbitalPeriod: 11.2,
    mass: 1.27,
    radius: 1.08,
    atmosphere: "Unknown",
    discoveryDate: "2016-08-24",
  },
];

const Exoplanets = () => {
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

  const filteredData = sampleData.filter((planet) =>
    planet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    planet.hostStar.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scatterData = {
    datasets: [
      {
        label: 'Mass vs Orbital Period',
        data: sampleData.map((planet) => ({
          x: planet.orbitalPeriod,
          y: planet.mass,
        })),
        backgroundColor: 'rgba(124, 77, 255, 0.6)',
      },
    ],
  };

  const scatterOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Exoplanet Mass vs Orbital Period',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Orbital Period (days)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Mass (Earth masses)',
        },
      },
    },
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Exoplanets
      </Typography>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Exoplanets
              </Typography>
              <Typography variant="h4">{sampleData.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average Mass
              </Typography>
              <Typography variant="h4">
                {(sampleData.reduce((acc, planet) => acc + planet.mass, 0) / sampleData.length).toFixed(2)} M⊕
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average Orbital Period
              </Typography>
              <Typography variant="h4">
                {(sampleData.reduce((acc, planet) => acc + planet.orbitalPeriod, 0) / sampleData.length).toFixed(1)} days
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Scatter Plot */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Scatter options={scatterOptions} data={scatterData} />
          </Paper>
        </Grid>

        {/* Data Table */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Search planets or host stars"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
            />
          </Box>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Host Star</TableCell>
                  <TableCell>Mass (M⊕)</TableCell>
                  <TableCell>Period (days)</TableCell>
                  <TableCell>Atmosphere</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((planet) => (
                    <TableRow key={planet.id}>
                      <TableCell>{planet.name}</TableCell>
                      <TableCell>{planet.hostStar}</TableCell>
                      <TableCell>{planet.mass}</TableCell>
                      <TableCell>{planet.orbitalPeriod}</TableCell>
                      <TableCell>{planet.atmosphere}</TableCell>
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

export default Exoplanets; 