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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

interface Asteroid {
  id: number;
  name: string;
  diameter: number;
  composition: string;
  orbitType: string;
  perihelion: number;
  aphelion: number;
  discoveryDate: string;
}

const sampleData: Asteroid[] = [
  {
    id: 1,
    name: "Ceres",
    diameter: 939.4,
    composition: "Rock-ice",
    orbitType: "Main Belt",
    perihelion: 2.557,
    aphelion: 2.987,
    discoveryDate: "1801-01-01",
  },
  {
    id: 2,
    name: "Vesta",
    diameter: 525.4,
    composition: "Basaltic-rock",
    orbitType: "Main Belt",
    perihelion: 2.151,
    aphelion: 2.572,
    discoveryDate: "1807-03-29",
  },
  {
    id: 3,
    name: "Eros",
    diameter: 16.84,
    composition: "S-type",
    orbitType: "Near-Earth",
    perihelion: 1.133,
    aphelion: 1.783,
    discoveryDate: "1898-08-13",
  },
];

const Asteroids = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [orbitFilter, setOrbitFilter] = useState('all');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = sampleData.filter((asteroid) => {
    const matchesSearch = asteroid.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOrbit = orbitFilter === 'all' || asteroid.orbitType === orbitFilter;
    return matchesSearch && matchesOrbit;
  });

  const scatterData = {
    datasets: [
      {
        label: 'Orbital Characteristics',
        data: sampleData.map((asteroid) => ({
          x: asteroid.perihelion,
          y: asteroid.aphelion,
        })),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
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
        text: 'Asteroid Orbital Characteristics',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Perihelion (AU)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Aphelion (AU)',
        },
      },
    },
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Asteroids
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Card sx={{ flexGrow: 1 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Asteroids
            </Typography>
            <Typography variant="h4">{sampleData.length}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flexGrow: 1 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Average Diameter
            </Typography>
            <Typography variant="h4">
              {Math.round(sampleData.reduce((acc, asteroid) => acc + asteroid.diameter, 0) / sampleData.length)} km
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flexGrow: 1 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Average Orbit (AU)
            </Typography>
            <Typography variant="h4">
              {((sampleData.reduce((acc, asteroid) => acc + (asteroid.aphelion + asteroid.perihelion) / 2, 0) / sampleData.length)).toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Scatter options={scatterOptions} data={scatterData} />
          </Paper>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Search asteroids"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ flexGrow: 1 }}
            />
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Orbit Type</InputLabel>
              <Select
                value={orbitFilter}
                label="Orbit Type"
                onChange={(e) => setOrbitFilter(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="Main Belt">Main Belt</MenuItem>
                <MenuItem value="Near-Earth">Near-Earth</MenuItem>
                <MenuItem value="Trojan">Trojan</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Diameter (km)</TableCell>
                  <TableCell>Composition</TableCell>
                  <TableCell>Orbit Type</TableCell>
                  <TableCell>Perihelion (AU)</TableCell>
                  <TableCell>Aphelion (AU)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((asteroid) => (
                    <TableRow key={asteroid.id}>
                      <TableCell>{asteroid.name}</TableCell>
                      <TableCell>{asteroid.diameter.toFixed(1)}</TableCell>
                      <TableCell>{asteroid.composition}</TableCell>
                      <TableCell>{asteroid.orbitType}</TableCell>
                      <TableCell>{asteroid.perihelion}</TableCell>
                      <TableCell>{asteroid.aphelion}</TableCell>
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
        </Box>
      </Box>
    </Box>
  );
};

export default Asteroids; 