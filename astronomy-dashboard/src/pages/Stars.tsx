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

interface Star {
  id: number;
  name: string;
  spectralType: string;
  temperature: number;
  luminosity: number;
  mass: number;
  radius: number;
}

const sampleData: Star[] = [
  {
    id: 1,
    name: "Sun",
    spectralType: "G2V",
    temperature: 5778,
    luminosity: 1,
    mass: 1,
    radius: 1,
  },
  {
    id: 2,
    name: "Sirius A",
    spectralType: "A1V",
    temperature: 9940,
    luminosity: 25.4,
    mass: 2.02,
    radius: 1.71,
  },
  {
    id: 3,
    name: "Betelgeuse",
    spectralType: "M1-2",
    temperature: 3600,
    luminosity: 126000,
    mass: 16.5,
    radius: 370,
  },
];

const Stars = () => {
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

  const filteredData = sampleData.filter((star) =>
    star.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    star.spectralType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scatterData = {
    datasets: [
      {
        label: 'Temperature vs Luminosity (HR Diagram)',
        data: sampleData.map((star) => ({
          x: Math.log10(star.temperature),
          y: Math.log10(star.luminosity),
        })),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
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
        text: 'Hertzsprung-Russell Diagram',
      },
    },
    scales: {
      x: {
        reverse: true,
        title: {
          display: true,
          text: 'Log Temperature (K)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Log Luminosity (L☉)',
        },
      },
    },
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Stars
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Stars
              </Typography>
              <Typography variant="h4">{sampleData.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average Temperature
              </Typography>
              <Typography variant="h4">
                {Math.round(sampleData.reduce((acc, star) => acc + star.temperature, 0) / sampleData.length)} K
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average Mass
              </Typography>
              <Typography variant="h4">
                {(sampleData.reduce((acc, star) => acc + star.mass, 0) / sampleData.length).toFixed(1)} M☉
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Scatter options={scatterOptions} data={scatterData} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Search stars"
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
                  <TableCell>Name</TableCell>
                  <TableCell>Spectral Type</TableCell>
                  <TableCell>Temperature (K)</TableCell>
                  <TableCell>Luminosity (L☉)</TableCell>
                  <TableCell>Mass (M☉)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((star) => (
                    <TableRow key={star.id}>
                      <TableCell>{star.name}</TableCell>
                      <TableCell>{star.spectralType}</TableCell>
                      <TableCell>{star.temperature}</TableCell>
                      <TableCell>{star.luminosity}</TableCell>
                      <TableCell>{star.mass}</TableCell>
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

export default Stars; 