<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <nuxt-link to="/">
<!--          <img src="/logo.png" alt="Логотип" class="logo-img" />-->
<!--          <span class="logo-text">Автопрокат</span>-->
        </nuxt-link>
      </div>
      <nav class="navigation">
        <ul>
          <li><nuxt-link exact to="/" active-class="active-link">Главная</nuxt-link></li>
          <li><nuxt-link to="/cars" active-class="active-link">Автомобили</nuxt-link></li>
          <li><nuxt-link to="/bookings" active-class="active-link">Бронирования</nuxt-link></li>
          <li><nuxt-link to="/login" active-class="active-link">Админская панель</nuxt-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  //background-color: #34495e;
  //color: white;
  //box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
  border-radius: 20px;
  background-color: #34495e;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 40px;
  margin-right: 10px;
}

.logo-text {
  font-size: 1.8rem;
  font-weight: bold;
  color: black;
}

.navigation ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navigation li {
  margin: 0 15px;
}

.navigation a {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.3s;
}

.navigation a:hover,
.navigation .active-link {
  color: #1abc9c;
  font-weight: bold;
}
</style>
