export default function ({ store, redirect }) {
  // Проверяем, авторизован ли пользователь
  if (!store.state.auth.isAuthenticated) {
    // Если не авторизован, перенаправляем на страницу логина
    return redirect("/login");
  }
}
