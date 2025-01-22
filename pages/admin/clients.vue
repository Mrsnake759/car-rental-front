<template>
  <div class="container">
    <!-- Header -->
    <h1 class="header">Manage Clients</h1>

    <!-- Список клиентов -->
    <div class="clients-list">
      <h2 class="sub-header">Client List</h2>
      <ul>
        <li v-for="client in clients" :key="client.id" class="client-card">
          <div class="client-info">
            <p><span class="label">Name:</span> {{ client.name }}</p>
            <p><span class="label">Contact Info:</span> {{ client.contactInfo }}</p>
            <p><span class="label">Booking History:</span> {{ client.bookingHistory }}</p>
          </div>
          <button @click="deleteClient(client.id)" class="delete-button">Delete</button>
        </li>
      </ul>
    </div>

    <!-- Форма добавления клиента -->
    <div class="form-container">
      <h2 class="sub-header">Add a New Client</h2>
      <form @submit.prevent="addClient">
        <input v-model="newClient.name" placeholder="Name" class="input-field" required />
        <input v-model="newClient.contactInfo" placeholder="Contact Info" class="input-field" required />
        <input v-model="newClient.bookingHistory" placeholder="Booking History" class="input-field" required />
        <button type="submit" class="submit-button">Add Client</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  data() {
    return {
      clients: [] as Array<{
        id: number;
        name: string;
        contactInfo: string;
        bookingHistory: string;
      }>,
      newClient: {
        name: '',
        contactInfo: '',
        bookingHistory: '',
      },
    };
  },
  async mounted() {
    try {
      this.clients = await this.$api.getClients(); // Получение списка клиентов с сервера
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  },
  methods: {
    async addClient() {
      try {
        const addedClient = await this.$api.createClient(this.newClient); // Добавление клиента
        this.clients.push(addedClient); // Добавление клиента в список
        this.newClient = { name: '', contactInfo: '', bookingHistory: '' }; // Сброс формы
      } catch (error) {
        console.error('Error adding client:', error);
      }
    },
    async deleteClient(id: number) {
      try {
        await this.$api.deleteClient(id); // Удаление клиента на сервере
        this.clients = this.clients.filter(client => client.id !== id); // Удаление клиента из списка
      } catch (error) {
        console.error('Error deleting client:', error);
      }
    },
  },
});
</script>

<style>
.container {
  max-width: 900px;
  margin: 0 auto;
  font-family: 'Arial', sans-serif;
  color: #444;
}

.header {
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.sub-header {
  font-size: 1.8rem;
  color: #34495e;
  margin-bottom: 1rem;
}

.clients-list ul {
  list-style: none;
  padding: 0;
}

.client-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ecf0f1;
  border: 1px solid #bdc3c7;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.client-card:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.client-info p {
  margin: 0.3rem 0;
}

.label {
  font-weight: bold;
  color: #2c3e50;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-size: 1rem;
}

.delete-button:hover {
  background-color: #c0392b;
  transform: scale(1.1);
}

.form-container {
  background-color: #fdfdfd;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.input-field {
  display: block;
  width: calc(100% - 1rem);
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.input-field:focus {
  border-color: #3498db;
  outline: none;
}

.submit-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s, transform 0.2s;
}

.submit-button:hover {
  background-color: #2980b9;
  transform: scale(1.05);
}
</style>
