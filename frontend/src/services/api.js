import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getAppointments = () => axios.get(`${API_URL}/appointments`);
export const createAppointment = (appointment) => axios.post(`${API_URL}/appointments`, appointment);
