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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

interface CelestialObject {
  id: number;
  name: string;
  type: string;
  discoveryDate: string;
  distanceLy: number;
}

const sampleData: CelestialObject[] = [
  {
    id: 1,
    name: "Proxima Centauri",
    type: "Star",
    discoveryDate: "2016-08-24",
    distanceLy: 4.2,
  },
  {
    id: 2,
    name: "Andromeda Galaxy",
    type: "Galaxy",
    discoveryDate: "964-01-01",
    distanceLy: 2537000,
  },
  {
    id: 3,
    name: "Kepler-186f",
    type: "Exoplanet",
    discoveryDate: "2014-04-17",
    distanceLy: 582,
  },
];

const CelestialObjects = () => {
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

  const filteredData = sampleData.filter((object) => {
    const matchesSearch = object.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || object.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Celestial Objects
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          label="Search by name"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300 }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={typeFilter}
            label="Type"
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <MenuItem value="all">All Types</MenuItem>
            <MenuItem value="Star">Stars</MenuItem>
            <MenuItem value="Galaxy">Galaxies</MenuItem>
            <MenuItem value="Exoplanet">Exoplanets</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Data Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Discovery Date</TableCell>
              <TableCell>Distance (Light Years)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((object) => (
                <TableRow key={object.id}>
                  <TableCell>{object.name}</TableCell>
                  <TableCell>{object.type}</TableCell>
                  <TableCell>{object.discoveryDate}</TableCell>
                  <TableCell>{object.distanceLy.toLocaleString()}</TableCell>
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
  );
};

export default CelestialObjects; 