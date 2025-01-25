<template>
  <div class="home">
    <section class="hero">
      <h1 class="hero-title">Добро пожаловать в систему автопроката</h1>
      <p class="hero-description">
        Управляйте автомобилями, бронированиями и клиентами легко и удобно!
      </p>
    </section>

    <section class="features">
      <div class="feature">
        <h2>Автомобили</h2>
        <p>Просматривайте доступные автомобили и их характеристики.</p>
        <nuxt-link to="/cars" class="button">Перейти</nuxt-link>
      </div>
      <div class="feature">
        <h2>Бронирования</h2>
        <p>Создавайте и управляйте бронированиями онлайн.</p>
        <nuxt-link to="/bookings" class="button">Перейти</nuxt-link>
      </div>
      <div class="feature">
        <h2>Админская панель</h2>
        <p>Контролируйте данные системы и управляйте информацией.</p>
        <nuxt-link to="/login" class="button">Перейти</nuxt-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  background: linear-gradient(to right, #1abc9c, #16a085);
  color: white;
  text-align: center;
  padding: 50px 20px;
}

.hero-title {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.hero-description {
  font-size: 1.2rem;
}

.features {
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  margin: 40px auto;
  max-width: 1200px;
  gap: 20px;
}

.feature {
  background: #ecf0f1;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  flex: 1;
}

.feature h2 {
  margin-bottom: 10px;
  color: #34495e;
}

.feature p {
  margin-bottom: 20px;
  color: #7f8c8d;
}

.button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #1abc9c;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #16a085;
}
</style>
