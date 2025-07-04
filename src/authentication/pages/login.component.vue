<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");
const rememberMe = ref(false);
const error = ref("");
const loading = ref(false);
const emit = defineEmits(["login"]);

const isFormValid = computed(() => {
  return username.value.trim() !== "" && password.value.length >= 6;
});

const onSubmit = async () => {
  error.value = "";

  if (!isFormValid.value) {
    error.value = "Completa correctamente todos los campos.";
    return;
  }

  loading.value = true;

  try {
    const response = await fetch("https://localhost:7164/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value.trim(),
        password: password.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      error.value = data?.message || "Credenciales incorrectas.";
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem(
        "user",
        JSON.stringify({
          username: data.user.username,
          email: data.user.email,
          password: data.user.password, 
          rol: data.user.rol,
        })
    );

    emit("login", { user: data.user, rememberMe: rememberMe.value });
    router.push("/profile");
  } catch (err) {
    console.error("Error:", err);
    error.value = "No se pudo conectar con el servidor.";
  } finally {
    loading.value = false;
  }
};

const goToRegister = () => router.push("/register");
const goToRecover = () => router.push("/recover-code");
</script>

<template>
  <div class="login-container">
    <div class="card">
      <div class="left-panel">
        <h2>Iniciar sesión</h2>

        <form @submit.prevent="onSubmit" novalidate>
          <p v-if="error" class="error-message">{{ error }}</p>

          <input v-model="username" type="text" placeholder="Usuario" class="input" required autofocus />
          <input v-model="password" type="password" placeholder="Contraseña" class="input" required minlength="6" />

          <div class="form-field checkbox">
            <input type="checkbox" id="remember" v-model="rememberMe" />
            <label for="remember">Recordarme</label>
          </div>

          <button type="submit" class="submit-button" :disabled="!isFormValid || loading">
            {{ loading ? "Ingresando..." : "Iniciar sesión" }}
          </button>

          <button @click="goToRecover" class="forgot" type="button">
            ¿Olvidaste tu contraseña?
          </button>
        </form>
      </div>

      <div class="right-panel">
        <h3>¿Eres nuevo?</h3>
        <p>Regístrate para crear una cuenta</p>
        <button class="register-button" @click="goToRegister">
          Crear cuenta
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  background-color: #111;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;
}

.card {
  display: flex;
  width: 850px;
  max-width: 100%;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #1e1e1e;
  color: white;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.05);
}

.left-panel,
.right-panel {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.left-panel {
  background-color: #2a2a2a;
}

.right-panel {
  background-color: #3b3b3b;
  text-align: center;
}

h2,
h3 {
  margin-bottom: 1rem;
  font-weight: 600;
}

.input {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  margin-bottom: 1rem;
  background-color: #444;
  color: white;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.input:focus {
  outline: 2px solid #f4c531;
  background-color: #555;
}

.checkbox {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.checkbox label {
  margin-left: 0.5rem;
  font-size: 0.9rem;
  color: #ccc;
  cursor: pointer;
}

.submit-button,
.register-button {
  padding: 0.75rem;
  border: 1px solid #f4c531;
  background-color: transparent;
  color: #f4c531;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.submit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.submit-button:hover:not(:disabled),
.register-button:hover {
  background-color: #f4c531;
  color: #1e1e1e;
}

.forgot {
  font-size: 0.8rem;
  color: #aaa;
  margin-top: 0.5rem;
  cursor: pointer;
  background: none;
  border: none;
  text-decoration: underline;
  padding: 0;
  text-align: left;
}

.error-message {
  background-color: #5a1f1f;
  color: #ffaaaa;
  padding: 0.5rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.warning {
  color: #f4c531;
  font-size: 0.85rem;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
}
</style>
