import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Функции для работы с машинами
export const getCars = async () => {
  const response = await axios.get(`${API_BASE_URL}/cars`);
  return response.data;
};

export const createCar = async (car: { make: string; model: string; year: number; condition: string; availability: boolean }) => {
  const response = await axios.post(`${API_BASE_URL}/cars`, car);
  return response.data;
};

export const deleteCar = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/cars/${id}`);
  return response.data;
};

export const updateCar = async (id: number, car: { make: string; model: string; year: number; condition: string; availability: boolean }) => {
  const response = await axios.put(`${API_BASE_URL}/cars/${id}`, car);
  return response.data;
};

// Функции для работы с клиентами
export const getClients = async () => {
  const response = await axios.get(`${API_BASE_URL}/clients`);
  return response.data;
};

export const createClient = async (client: { name: string; contactInfo: string; bookingHistory: string }) => {
  const response = await axios.post(`${API_BASE_URL}/clients`, client);
  return response.data;
};

export const deleteClient = async (id: number) => {
  await axios.delete(`${API_BASE_URL}/clients/${id}`);
};

// Функции для работы с бронированиями
export const getBookings = async () => {
  const response = await axios.get(`${API_BASE_URL}/bookings`);
  return response.data;
};

export const createBooking = async (booking: { carId: number; startDate: string; endDate: string; status: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/bookings`, {
      car: { id: booking.carId }, // Передача ID автомобиля в формате объекта
      startDate: booking.startDate, // Дата начала бронирования
      endDate: booking.endDate, // Дата окончания бронирования
      status: booking.status, // Статус бронирования
    });
    return response.data; // Возвращаем результат с сервера
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error; // Прокидываем ошибку для обработки на уровне интерфейса
  }
};
export const deleteBooking = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/bookings/${id}`);
  return response.data;
};
