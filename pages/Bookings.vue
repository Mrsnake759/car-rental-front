<template>
  <div class="container">
    <h1 class="header">My Bookings</h1>

    <div class="bookings-list">
      <table class="bookings-table">
        <thead>
        <tr>
          <th>Car</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="booking in bookings" :key="booking.id">
          <td>{{ booking.car.make }} {{ booking.car.model }}</td>
          <td>{{ booking.startDate }}</td>
          <td>{{ booking.endDate }}</td>
          <td>{{ booking.status }}</td>
          <td>
            <button v-if="booking.status === 'Active'" @click="cancelBooking(booking.id)" class="cancel-button">
              Cancel
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  data() {
    return {
      bookings: [] as Array<{
        id: number;
        car: { make: string; model: string };
        startDate: string;
        endDate: string;
        status: string;
      }>,
    };
  },
  async mounted() {
    try {
      this.bookings = await this.$api.getBookings(); // Получение списка бронирований
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  },
  methods: {
    async cancelBooking(id: number) {
      try {
        await this.$api.deleteBooking(id); // Отправляем запрос на удаление
        this.bookings = this.bookings.filter(booking => booking.id !== id); // Убираем бронь из списка
        alert('Booking cancelled successfully.');
      } catch (error) {
        console.error('Error cancelling booking:', error);
        alert('Failed to cancel booking. Please try again.');
      }
    },
  },
});
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  padding: 20px;
}

.header {
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 30px;
}

.bookings-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
}

.bookings-table th,
.bookings-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.bookings-table th {
  background-color: #f9f9f9;
  font-weight: bold;
  color: #2c3e50;
}

.cancel-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: #c0392b;
}
</style>
