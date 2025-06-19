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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AddIcon from '@mui/icons-material/Add';
import { SelectChangeEvent } from '@mui/material/Select';

interface ObservationLog {
  id: number;
  userId: number;
  userName: string;
  objectId: number;
  objectName: string;
  telescope: string;
  dateObserved: string;
  notes?: string;
}

const sampleData: ObservationLog[] = [
  {
    id: 1,
    userId: 1,
    userName: "John Doe",
    objectId: 1,
    objectName: "M31 - Andromeda Galaxy",
    telescope: "Celestron EdgeHD 14",
    dateObserved: "2024-03-15",
    notes: "Clear skies, excellent seeing conditions",
  },
  {
    id: 2,
    userId: 2,
    userName: "Jane Smith",
    objectId: 2,
    objectName: "M45 - Pleiades",
    telescope: "Meade LX200 12\"",
    dateObserved: "2024-03-14",
    notes: "Some cloud cover",
  },
  {
    id: 3,
    userId: 1,
    userName: "John Doe",
    objectId: 3,
    objectName: "Jupiter",
    telescope: "Celestron EdgeHD 14",
    dateObserved: "2024-03-13",
    notes: "Great view of the Great Red Spot",
  },
];

const ObservationLogs = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [telescopeFilter, setTelescopeFilter] = useState('all');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleTelescopeFilterChange = (event: SelectChangeEvent) => {
    setTelescopeFilter(event.target.value);
  };

  const filteredData = sampleData.filter((log) => {
    const matchesSearch = 
      log.objectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTelescope = telescopeFilter === 'all' || log.telescope === telescopeFilter;
    const matchesDateRange = (!startDate || new Date(log.dateObserved) >= startDate) &&
      (!endDate || new Date(log.dateObserved) <= endDate);
    return matchesSearch && matchesTelescope && matchesDateRange;
  });

  const uniqueTelescopes = Array.from(new Set(sampleData.map(log => log.telescope)));

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Observation Logs</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          New Observation
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Card sx={{ flexGrow: 1 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Observations
            </Typography>
            <Typography variant="h4">{sampleData.length}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flexGrow: 1 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Unique Objects
            </Typography>
            <Typography variant="h4">
              {new Set(sampleData.map(log => log.objectId)).size}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flexGrow: 1 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Active Observers
            </Typography>
            <Typography variant="h4">
              {new Set(sampleData.map(log => log.userId)).size}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Search objects or observers"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Telescope</InputLabel>
          <Select
            value={telescopeFilter}
            label="Telescope"
            onChange={handleTelescopeFilterChange}
          >
            <MenuItem value="all">All Telescopes</MenuItem>
            {uniqueTelescopes.map((telescope) => (
              <MenuItem key={telescope} value={telescope}>
                {telescope}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
          />
        </LocalizationProvider>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Observer</TableCell>
              <TableCell>Object</TableCell>
              <TableCell>Telescope</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.dateObserved}</TableCell>
                  <TableCell>{log.userName}</TableCell>
                  <TableCell>{log.objectName}</TableCell>
                  <TableCell>{log.telescope}</TableCell>
                  <TableCell>{log.notes}</TableCell>
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

      {/* New Observation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>New Observation</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Object Name" fullWidth />
            <TextField label="Telescope" fullWidth />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Observation Date"
                onChange={(newValue) => {}}
                value={null}
              />
            </LocalizationProvider>
            <TextField
              label="Notes"
              multiline
              rows={4}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ObservationLogs; 