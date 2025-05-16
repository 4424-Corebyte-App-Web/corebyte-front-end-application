<template>
  <div class="container">
    <h2>Contraseña Recuperada</h2>
    <p>Ahora puedes volver a iniciar sesión.</p>
    <router-link to="/login" class="btn">Volver al Login</router-link>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
  margin-top: 100px;
  color: white;
}
.btn {
  color: #ffcc33;
  border: 1px solid #ffcc33;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  display: inline-block;
  margin-top: 20px;
}
</style>
