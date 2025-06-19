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

interface Galaxy {
  id: number;
  name: string;
  type: string;
  redshift: number;
  mass: number;
  distanceLy: number;
}

const sampleData: Galaxy[] = [
  {
    id: 1,
    name: "Andromeda",
    type: "Spiral",
    redshift: -0.001001,
    mass: 1.5e12,
    distanceLy: 2537000,
  },
  {
    id: 2,
    name: "Large Magellanic Cloud",
    type: "Irregular",
    redshift: 0.000927,
    mass: 1.38e11,
    distanceLy: 158200,
  },
  {
    id: 3,
    name: "Messier 87",
    type: "Elliptical",
    redshift: 0.004283,
    mass: 2.4e12,
    distanceLy: 53490000,
  },
];

const Galaxies = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = sampleData.filter((galaxy) => {
    const matchesSearch = galaxy.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || galaxy.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const scatterData = {
    datasets: [
      {
        label: 'Mass vs Distance',
        data: sampleData.map((galaxy) => ({
          x: Math.log10(galaxy.distanceLy),
          y: Math.log10(galaxy.mass),
        })),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
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
        text: 'Galaxy Mass vs Distance',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Log Distance (Light Years)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Log Mass (Solar Masses)',
        },
      },
    },
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Galaxies
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Card sx={{ flexGrow: 1 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Galaxies
            </Typography>
            <Typography variant="h4">{sampleData.length}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flexGrow: 1 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Average Mass
            </Typography>
            <Typography variant="h4">
              {(sampleData.reduce((acc, galaxy) => acc + galaxy.mass, 0) / sampleData.length).toExponential(2)} M☉
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flexGrow: 1 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Average Distance
            </Typography>
            <Typography variant="h4">
              {Math.round(sampleData.reduce((acc, galaxy) => acc + galaxy.distanceLy, 0) / sampleData.length).toLocaleString()} ly
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
              label="Search galaxies"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ flexGrow: 1 }}
            />
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={typeFilter}
                label="Type"
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="Spiral">Spiral</MenuItem>
                <MenuItem value="Elliptical">Elliptical</MenuItem>
                <MenuItem value="Irregular">Irregular</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Redshift</TableCell>
                  <TableCell>Mass (M☉)</TableCell>
                  <TableCell>Distance (ly)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((galaxy) => (
                    <TableRow key={galaxy.id}>
                      <TableCell>{galaxy.name}</TableCell>
                      <TableCell>{galaxy.type}</TableCell>
                      <TableCell>{galaxy.redshift}</TableCell>
                      <TableCell>{galaxy.mass.toExponential(2)}</TableCell>
                      <TableCell>{galaxy.distanceLy.toLocaleString()}</TableCell>
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

export default Galaxies; 