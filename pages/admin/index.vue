<template>
  <div class="admin-container">
    <h1>Admin Panel</h1>
    <div class="cards-container">
      <div class="card" @click="navigateTo('/admin/cars')">
        <h2>Управление машинами</h2>
      </div>
      <div class="card" @click="navigateTo('/admin/clients')">
        <h2>Управление клиентами</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style>
.admin-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
}
h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 30px;
}
.cards-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}
.card {
  width: 300px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}
h2 {
  font-size: 1.5rem;
  color: #34495e;
  margin-bottom: 10px;
}
p {
  font-size: 1rem;
  color: #7f8c8d;
}
</style>
