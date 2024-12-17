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
import './index.css'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div>
    <div className="background">
  {/* Your content goes here */}


    <div style={{ width: '100%'}}>
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center', // Horizontally centers the container
      alignItems: 'center', // Vertically centers the container
      // height: '100vh', // Full viewport height
      width:'100%',
    }}
  >
    <Container maxWidth="md" 
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        // Add any other styles you need here
      }}
    >
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Doctor's Office Appointments
        </Typography>

        <Paper sx={{ p: 3, mb: 3,backgroundColor: 'rgba(255, 255, 255, 0.1)' }} >
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
              <Button variant="contained" type="submit" 
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black with 50% opacity
                color: 'white', // Change text color to white for contrast
                transition: 'background-color 0.3s ease', // Smooth transition for background color
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker on hover
                },
                '&:active': {
                  backgroundColor: 'rgba(0, 0, 0, 0.9)', // Even darker on click
                }
              }}
              
              
              >
                Book Appointment
              </Button>
            </Box>
          </form>
        </Paper>

        <List>
          {appointments.map((appt) => (
            <ListItem key={appt._id} divider
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)', // Darker background on hover
              },
            }}>
              <ListItemText
                primary={`${appt.patientName} with Dr. ${appt.doctorName}`}
                secondary={new Date(appt.date).toLocaleString()}

              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
    </Box>
    </div>
    </div>
    </div>
  );
}

export default App;