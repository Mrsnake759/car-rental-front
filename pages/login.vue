<template>
  <div class="login-container">
    <h1>Вход в админ-панель</h1>
    <form @submit.prevent="login">
      <input v-model="username" type="text" placeholder="Логин" required />
      <input v-model="password" type="password" placeholder="Пароль" required />
      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (this.username === "admin" && this.password === "admin") {
        // Сохраняем статус авторизации
        this.$store.commit("auth/setAuth", true);
        this.$router.push("/admin"); // Переходим в админ-панель
      } else {
        alert("Неверный логин или пароль");
      }
    },
  },
};
</script>

<style>
/* Пример простого оформления */
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
}
input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}
button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
