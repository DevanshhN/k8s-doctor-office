import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Paper 
} from '@mui/material';
import { getAppointments, createAppointment } from './services/api';

function App() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    patientName: '',
    doctorName: '',
    date: ''
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data } = await getAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createAppointment(form);
      console.log("Hete")
      setAppointments([...appointments, data]);
      setForm({ patientName: '', doctorName: '', date: '' });
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Doctor's Office Appointments
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
              <TextField
                name="patientName"
                label="Patient Name"
                value={form.patientName}
                onChange={handleChange}
                required
              />
              <TextField
                name="doctorName"
                label="Doctor Name"
                value={form.doctorName}
                onChange={handleChange}
                required
              />
              <TextField
                name="date"
                type="datetime-local"
                label="Appointment Date"
                value={form.date}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
              />
              <Button variant="contained" type="submit">
                Book Appointment
              </Button>
            </Box>
          </form>
        </Paper>

        <List>
          {appointments.map((appt) => (
            <ListItem key={appt._id} divider>
              <ListItemText
                primary={`${appt.patientName} with Dr. ${appt.doctorName}`}
                secondary={new Date(appt.date).toLocaleString()}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default App;