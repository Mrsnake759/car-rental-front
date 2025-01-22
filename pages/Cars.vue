<template>
  <div class="container">
    <h1 class="header">Available Cars</h1>

    <div class="cars-list">
      <ul>
        <li v-for="car in cars" :key="car.id" class="car-card">
          <div class="car-info">
            <h2>{{ car.make }} {{ car.model }}</h2>
            <p><strong>Year:</strong> {{ car.year }}</p>
            <p><strong>Condition:</strong> {{ car.condition }}</p>
            <p>
              <strong>Status:</strong>
              <span :class="car.availability ? 'available' : 'unavailable'">
                {{ car.availability ? 'Available' : 'Unavailable' }}
              </span>
            </p>
          </div>
          <button
            v-if="car.availability"
            @click="openBookingModal(car)"
            class="book-button">
            Book Now
          </button>
        </li>
      </ul>
    </div>

    <!-- Модальное окно для бронирования -->
    <div v-if="showBookingModal" class="modal">
      <div class="modal-content">
        <h2>Book {{ selectedCar.make }} {{ selectedCar.model }}</h2>
        <form @submit.prevent="createBooking">
          <label>Start Date:</label>
          <input v-model="booking.startDate" type="date" required />

          <label>End Date:</label>
          <input v-model="booking.endDate" type="date" required />

          <button type="submit" class="submit-button">Confirm Booking</button>
          <button @click="closeBookingModal" class="cancel-button">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  data() {
    return {
      cars: [] as Array<{
        id: number;
        make: string;
        model: string;
        year: number;
        condition: string;
        availability: boolean;
      }>,
      showBookingModal: false,
      selectedCar: null as { id: number; make: string; model: string } | null,
      booking: {
        startDate: '',
        endDate: '',
      },
    };
  },
  async mounted() {
    try {
      this.cars = await this.$api.getCars(); // Получение списка машин
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  },
  methods: {
    openBookingModal(car: { id: number; make: string; model: string }) {
      this.selectedCar = car;
      this.showBookingModal = true;
    },
    closeBookingModal() {
      this.selectedCar = null;
      this.showBookingModal = false;
      this.booking.startDate = '';
      this.booking.endDate = '';
    },
    async createBooking() {
      if (!this.selectedCar) return;

      if (new Date(this.booking.endDate) < new Date(this.booking.startDate)) {
        alert("End date cannot be earlier than start date.");
        return;
      }

      try {
        await this.$api.createBooking({
          carId: this.selectedCar.id,
          startDate: this.booking.startDate,
          endDate: this.booking.endDate,
          status: "Active",
        });

        const car = this.cars.find(car => car.id === this.selectedCar?.id);
        if (car) car.availability = false;

        this.closeBookingModal();
        alert("Booking successful!");
      } catch (error) {
        if (error.response && error.response.data) {
          alert(`Error: ${error.response.data.message || "Booking failed."}`);
        } else {
          alert("An unknown error occurred. Please try again.");
        }
      }
    }
  },
});
</script>

<style>
/* Стили для модального окна */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

input {
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.submit-button {
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #27ae60;
}

.cancel-button:hover {
  background-color: #c0392b;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f9f9f9;
}

.header {
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 30px;
}

.cars-list ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  list-style: none;
  padding: 0;
}

.car-card {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.car-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.car-info h2 {
  font-size: 1.5rem;
  color: #34495e;
  margin-bottom: 10px;
}

.car-info p {
  margin: 5px 0;
}

.available {
  color: #27ae60;
  font-weight: bold;
}

.unavailable {
  color: #e74c3c;
  font-weight: bold;
}

.book-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, transform 0.2s;
  margin-top: 15px;
}

.book-button:hover {
  background-color: #2980b9;
  transform: scale(1.05);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}
</style>
