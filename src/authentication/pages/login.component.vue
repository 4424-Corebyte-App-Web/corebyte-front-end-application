<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const error = ref("");
const users = ref([]);
const loading = ref(false);

const showForgot = ref(false);
const emit = defineEmits(["login"]);

const goToRegister = () => {
  router.push("/register");
};

const goToRecover = () => {
  router.push("/recover-code");
};

const toggleForgot = () => {
  showForgot.value = !showForgot.value;
};
onMounted(async () => {
  loading.value = true;
  try {
    const res = await fetch("server/user.json");
    if (!res.ok) throw new Error("Error al cargar usuarios");
    users.value = await res.json();
  } catch (err) {
    console.error(err);
    error.value = "Error cargando usuarios. Intenta recargar la página.";
  } finally {
    loading.value = false;
  }
});

const isEmailValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const isFormValid = computed(() => {
  return (
      email.value.trim() !== "" &&
      isEmailValid(email.value) &&
      password.value.length >= 6
  );
});

const onSubmit = () => {
  error.value = "";

  if (!email.value || !password.value) {
    error.value = "Por favor, complete todos los campos.";
    return;
  }

  if (!isEmailValid(email.value)) {
    error.value = "Por favor, ingrese un correo válido.";
    return;
  }

  if (password.value.length < 6) {
    error.value = "La contraseña debe tener al menos 6 caracteres.";
    return;
  }

  const user = users.value.find(
      (u) => u.email === email.value.trim() && u.password === password.value
  );

  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
    
    alert(`Bienvenido, ${user.email}`);
    emit("login", { user, rememberMe: rememberMe.value });
    router.push("/profile");
  } else {
    error.value = "Correo o contraseña incorrectos.";
  }
};
</script>

<template>
  <div class="login-container" role="main" aria-label="Formulario de inicio de sesión">
    <div class="card">
      <div class="left-panel">
        <h2>Iniciar sesión</h2>

        <form @submit.prevent="onSubmit" novalidate>
          <p
              v-if="error"
              id="error-message"
              class="error-message"
              role="alert"
              aria-live="assertive"
          >
            {{ error }}
          </p>

          <div class="form-field">
            <label for="email" class="sr-only">Correo Electrónico</label>
            <input
                id="email"
                v-model="email"
                type="email"
                placeholder="Correo Electrónico"
                class="input"
                :aria-invalid="error && !isEmailValid(email) ? 'true' : 'false'"
                :aria-describedby="error ? 'error-message' : null"
                autocomplete="email"
                required
                autofocus
            />
          </div>

          <div class="form-field">
            <label for="password" class="sr-only">Contraseña</label>
            <pv-password
                id="password"
                v-model="password"
                type="password"
                placeholder="Contraseña"
                class="input"
                :aria-invalid="error && password.length < 6 ? 'true' : 'false'"
                :aria-describedby="error ? 'error-message' : null"
                autocomplete="current-password"
                required
                toggleMask
            />
          </div>

          <div class="form-field checkbox">
            <input
                type="checkbox"
                id="remember"
                v-model="rememberMe"
                :aria-checked="rememberMe ? 'true' : 'false'"
            />
            <label for="remember">{{ $t("login.forgot") }}</label>
          </div>

          <button
              type="submit"
              class="submit-button"
              :disabled="!isFormValid || loading"
              :aria-busy="loading ? 'true' : 'false'"
          >
            <span v-if="loading" class="spinner" aria-hidden="true"></span>
            {{ $t("login.login") }}
          </button>

          <button
              @click="goToRecover"
              class="forgot"
              type="button"
          >
          Forgot your password?
          </button>

          <div class="social-login" aria-label="Iniciar sesión con ">
            <span>Iniciar sesión con redes sociales</span>
            <div class="dots" role="list">
              <span role="listitem" tabindex="0" aria-label="Google">
                <img src="/google.jpg" alt="Google" width="16" height="16" />
              </span>
              <span role="listitem" tabindex="0" aria-label="Facebook">
                <img src="/facebook.png" alt="Facebook" width="16" height="16" />
              </span>
              <span role="listitem" tabindex="0" aria-label="Twitter">
                <img src="/twitter-icon.png" alt="Twitter" width="16" height="16" />
              </span>
            </div>
          </div>
        </form>
      </div>

      <div class="right-panel">
        <h3>{{ $t("login.user") }}</h3>
        <p>
          {{ $t("login.text") }}
        </p>
        <button class="register-button" @click="goToRegister">
          {{ $t("login.register") }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

body {
  margin: 0;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

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
  outline-offset: 2px;
}

.input:focus {
  outline: 2px solid #f4c531;
  background-color: #555;
}

.input[aria-invalid="true"] {
  border: 2px solid #ff4d4d;
  background-color: #5a1f1f;
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

.forgot:focus {
  outline: 2px solid #f4c531;
  border-radius: 4px;
}

.social-login {
  text-align: center;
  margin-top: 1rem;
  user-select: none;
}

.social-login span {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  color: #ccc;
}

.dots {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.dots span {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dots span:hover,
.dots span:focus {
  background-color: #f4c531;
  outline: none;
}

.spinner {
  border: 3px solid #f4c531;
  border-top: 3px solid transparent;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
