<template>
  <div class="container">
    <h1 class="header">Admin: Manage Cars</h1>

    <!-- Список машин -->
    <div class="cars-list">
      <h2 class="sub-header">Available Cars</h2>
      <ul>
        <li v-for="car in cars" :key="car.id" class="car-card">
          <div class="car-info">
            <h3>{{ car.make }} {{ car.model }}</h3>
            <p><strong>Year:</strong> {{ car.year }}</p>
            <p><strong>Condition:</strong> {{ car.condition }}</p>
            <p><strong>Status:</strong>
              <span :class="car.availability ? 'available' : 'unavailable'">
                {{ car.availability ? 'Available' : 'Unavailable' }}
              </span>
            </p>
          </div>
          <div class="actions">
            <button @click="editCar(car)" class="edit-button">Edit</button>
            <button @click="deleteCar(car.id)" class="delete-button">Delete</button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Форма добавления/редактирования автомобиля -->
    <div class="form-container">
      <h2 class="sub-header">{{ isEditing ? "Edit Car" : "Add New Car" }}</h2>
      <form @submit.prevent="isEditing ? updateCar() : addCar()">
        <input v-model="currentCar.make" placeholder="Make" class="input-field" required />
        <input v-model="currentCar.model" placeholder="Model" class="input-field" required />
        <input v-model.number="currentCar.year" placeholder="Year" type="number" class="input-field" required />
        <input v-model="currentCar.condition" placeholder="Condition" class="input-field" required />
        <div class="checkbox-container">
          <label>
            <input v-model="currentCar.availability" type="checkbox" />
            <span>Available</span>
          </label>
        </div>
        <button type="submit" class="submit-button">
          {{ isEditing ? "Save Changes" : "Add Car" }}
        </button>
        <button v-if="isEditing" @click="cancelEdit" class="cancel-button">Cancel</button>
      </form>
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
      currentCar: {
        id: null as number | null,
        make: '',
        model: '',
        year: new Date().getFullYear(),
        condition: '',
        availability: true,
      },
      isEditing: false,
    };
  },
  async mounted() {
    try {
      this.cars = await this.$api.getCars();
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  },
  methods: {
    async addCar() {
      try {
        const addedCar = await this.$api.createCar(this.currentCar);
        this.cars.push(addedCar);
        this.resetForm();
      } catch (error) {
        console.error('Error adding car:', error);
      }
    },
    async updateCar() {
      try {
        const updatedCar = await this.$api.updateCar(this.currentCar.id, this.currentCar);
        const index = this.cars.findIndex(car => car.id === this.currentCar.id);
        if (index !== -1) this.cars.splice(index, 1, updatedCar);
        this.resetForm();
      } catch (error) {
        console.error('Error updating car:', error);
      }
    },
    async deleteCar(id: number) {
      try {
        await this.$api.deleteCar(id);
        this.cars = this.cars.filter(car => car.id !== id);
      } catch (error) {
        console.error('Error deleting car:', error);
      }
    },
    editCar(car: { id: number; make: string; model: string; year: number; condition: string; availability: boolean }) {
      this.currentCar = { ...car };
      this.isEditing = true;
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.currentCar = {
        id: null,
        make: '',
        model: '',
        year: new Date().getFullYear(),
        condition: '',
        availability: true,
      };
      this.isEditing = false;
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
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
}

.sub-header {
  font-size: 1.8rem;
  color: #34495e;
  margin-bottom: 20px;
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

.car-info h3 {
  font-size: 1.5rem;
  color: #2c3e50;
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

.actions {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}

.edit-button,
.delete-button {
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, transform 0.2s;
}

.edit-button {
  background-color: #3498db;
  color: white;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
}

.edit-button:hover {
  background-color: #2980b9;
  transform: scale(1.05);
}

.delete-button:hover {
  background-color: #c0392b;
  transform: scale(1.05);
}

.form-container {
  background-color: #fdfdfd;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin-top: 30px;
}

.input-field {
  display: block;
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.checkbox-container {
  margin-bottom: 15px;
}

.submit-button,
.cancel-button {
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-right: 10px;
}

.submit-button {
  background-color: #2ecc71;
  color: white;
}

.cancel-button {
  background-color: #95a5a6;
  color: white;
}

.submit-button:hover {
  background-color: #27ae60;
}

.cancel-button:hover {
  background-color: #7f8c8d;
}
</style>
