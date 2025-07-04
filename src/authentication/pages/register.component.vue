<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const role = ref("");
const error = ref("");
const loading = ref(false);

const roles = ["producer", "distributor"];
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isNameValid = computed(() => name.value.trim().length > 0);
const isEmailValid = computed(() => emailRegex.test(email.value.trim()));
const isPasswordValid = computed(() => password.value.length >= 8);
const isConfirmPasswordValid = computed(() => password.value === confirmPassword.value);
const isFormValid = computed(() =>
    isNameValid.value &&
    isEmailValid.value &&
    isPasswordValid.value &&
    isConfirmPasswordValid.value &&
    role.value
);

watch([name, email, password, confirmPassword, role], () => {
  error.value = "";
});

const onSubmit = async () => {
  error.value = "";

  if (!isFormValid.value) {
    error.value = "Por favor, completa todos los campos correctamente.";
    return;
  }

  loading.value = true;

  try {
    const response = await fetch("https://localhost:7164/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: name.value.trim(),
        email: email.value.trim(),
        password: password.value,
        confirmPassword: confirmPassword.value,
        rol: role.value
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      error.value = data?.message || "Error al registrar usuario.";
      return;
    }

    alert("Registro exitoso");
    router.push("/login");
  } catch (err) {
    console.error("Error al conectar con el backend:", err);
    error.value = "No se pudo conectar con el backend.";
  } finally {
    loading.value = false;
  }
};

const goToLogin = () => router.push("/login");
</script>

<template>
  <div class="register-container">
    <div class="left-panel">
      <h2>Bienvenida</h2>
      <p>Crea una cuenta para comenzar</p>
      <button class="secondary-button" @click="goToLogin">Ya tengo cuenta</button>
    </div>

    <div class="right-panel">
      <h2>Crear una cuenta</h2>
      <form @submit.prevent="onSubmit" class="form" novalidate>
        <input v-model="name" type="text" placeholder="Nombre de Usuario" :class="{ invalid: !isNameValid && name.length > 0 }" required />
        <input v-model="email" type="email" placeholder="Correo electrónico" :class="{ invalid: !isEmailValid && email.length > 0 }" required />
        <input v-model="password" type="password" placeholder="Contraseña" :class="{ invalid: !isPasswordValid && password.length > 0 }" required minlength="8" />
        <input v-model="confirmPassword" type="password" placeholder="Confirmar contraseña" :class="{ invalid: !isConfirmPasswordValid && confirmPassword.length > 0 }" required />
        <small>Mínimo 8 caracteres</small>

        <!-- Selector de rol -->
        <select v-model="role" :class="{ invalid: !role && name.length > 0 }" required>
          <option disabled value="">Selecciona tu rol</option>
          <option v-for="r in roles" :key="r" :value="r">
            {{ r === 'producer' ? 'Productor' : 'Distribuidor' }}
          </option>
        </select>

        <div v-if="error" class="error">{{ error }}</div>

        <button type="submit" class="primary-button" :disabled="loading || !isFormValid">
          {{ loading ? "Registrando..." : "Crear cuenta" }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  height: 100vh;
  background-color: #121212;
  color: white;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.left-panel {
  width: 50%;
  background-color: #2b2b2b;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 0 50px 50px 0;
}
.left-panel h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.left-panel p {
  font-size: 1rem;
  margin-bottom: 2rem;
}
.secondary-button {
  padding: 0.6rem 1.5rem;
  border: 1px solid #d1a746;
  background: transparent;
  color: #d1a746;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
  font-weight: 600;
}
.secondary-button:hover {
  background-color: #d1a746;
  color: black;
}
.right-panel {
  width: 50%;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.right-panel h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}
.form input,
.form select {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  border: none;
  background-color: #333;
  color: white;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}
.form input::placeholder,
.form select {
  color: #bbb;
}
.form input.invalid,
.form select.invalid {
  border: 2px solid #ff6b6b;
  background-color: #4b2b2b;
}
.form small {
  display: block;
  margin-bottom: 1rem;
  color: #aaa;
  font-size: 0.9rem;
}
.primary-button {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1a746;
  background-color: transparent;
  color: #d1a746;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
  margin-bottom: 1rem;
  font-weight: 700;
}
.primary-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.primary-button:hover:enabled {
  background-color: #d1a746;
  color: black;
}
.error {
  color: #ff6b6b;
  margin-bottom: 1rem;
  font-weight: 600;
}
</style>
