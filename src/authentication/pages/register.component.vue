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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isNameValid = computed(() => name.value.trim().length > 0);
const isEmailValid = computed(() => emailRegex.test(email.value.trim()));
const isPasswordValid = computed(() => password.value.length >= 8);
const isConfirmPasswordValid = computed(() => password.value === confirmPassword.value);
const isRoleValid = computed(() => role.value !== "");

const isFormValid = computed(() =>
    isNameValid.value &&
    isEmailValid.value &&
    isPasswordValid.value &&
    isConfirmPasswordValid.value &&
    isRoleValid.value
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
    // Obtener todos los usuarios para verificar si ya existe el email
    const existingUsersResponse = await fetch("http://localhost:3000/users");
    const existingUsers = await existingUsersResponse.json();

    const emailExists = existingUsers.some(
        (user) => user.email.toLowerCase() === email.value.trim().toLowerCase()
    );

    if (emailExists) {
      error.value = "El correo electrónico ya está registrado.";
      loading.value = false;
      return;
    }

    // Si no existe, proceder con el registro
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.value.trim(),
        email: email.value.trim(),
        password: password.value,
        role: role.value,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      error.value = data?.error || "Error al registrar usuario.";
    } else {
      alert("Registro exitoso");
      router.push("/login");
    }
  } catch (err) {
    console.error("Error al conectar con el servidor:", err);
    error.value =
        "No se pudo conectar con el servidor. Verifica que esté activo en http://localhost:3000.";
  } finally {
    loading.value = false;
  }
};

const goToLogin = () => router.push("/login");
</script>

<template>
  <div class="register-container">
    <div class="left-panel">
      <h2>{{ $t("register.title") }}</h2>
      <p>{{ $t("register.text") }}</p>
      <button class="secondary-button" @click="goToLogin">{{ $t("register.login") }}</button>
    </div>

    <div class="right-panel">
      <h2>Crear una cuenta</h2>
      <form @submit.prevent="onSubmit" class="form" novalidate>
        <input
            v-model="name"
            type="text"
            placeholder="Nombre"
            :class="{ invalid: !isNameValid && name.length > 0 }"
            required
        />
        <input
            v-model="email"
            type="email"
            placeholder="Correo electrónico"
            :class="{ invalid: !isEmailValid && email.length > 0 }"
            required
        />
        <input
            v-model="password"
            type="password"
            placeholder="Contraseña"
            :class="{ invalid: !isPasswordValid && password.length > 0 }"
            required
            minlength="8"
        />
        <input
            v-model="confirmPassword"
            type="password"
            placeholder="Confirmar contraseña"
            :class="{ invalid: !isConfirmPasswordValid && confirmPassword.length > 0 }"
            required
        />
        <select
            v-model="role"
            class="role-select"
            :class="{ invalid: !isRoleValid && role !== '' }"
            required
        >
          <option disabled value="">Select a role</option>
          <option value="productor">Producer</option>
          <option value="distribuidor">Distributor</option>
        </select>

        <small>Password must have a minimum of 8 characters</small>

        <div v-if="error" class="error" role="alert" aria-live="assertive">{{ error }}</div>

        <button
            type="submit"
            class="primary-button"
            :disabled="loading || !isFormValid"
        >
          {{ loading ? "Registering..." : "Create account" }}
        </button>

        <div class="divider"></div>
        <div class="social-icons" aria-label="Alternativas de registro social">
          <div class="circle" role="button" tabindex="0" aria-label="Registrar con Google"></div>
          <div class="circle" role="button" tabindex="0" aria-label="Registrar con Facebook"></div>
          <div class="circle" role="button" tabindex="0" aria-label="Registrar con Twitter"></div>
        </div>
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
.divider {
  text-align: center;
  margin: 1rem 0;
  border-top: 1px solid #555;
  position: relative;
  font-size: 0.9rem;
  color: #aaa;
}
.divider::before {
  content: "o continuar con";
  position: absolute;
  top: -0.6rem;
  left: 50%;
  transform: translateX(-50%);
  background: #121212;
  padding: 0 1rem;
}
.social-icons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.circle {
  width: 32px;
  height: 32px;
  background-color: white;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.circle:hover,
.circle:focus {
  transform: scale(1.15);
  outline: none;
}
</style>
