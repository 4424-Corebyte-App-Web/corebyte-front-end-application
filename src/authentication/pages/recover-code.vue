<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const errorMessage = ref('')
const router = useRouter()

function handleSubmit() {
  if (!email.value.includes('@')) {
    errorMessage.value = 'Correo electrónico inválido'
    return
  }
  localStorage.setItem('recoveryCode', '123456')
  localStorage.setItem('recoveryEmail', email.value)
  router.push('/recuperar-codigo')
}
</script>

<template>
  <div class="recover-container">
    <div class="overlay">
      <h2>{{ $t("recover.title") }}</h2>
      <p>{{ $t("recover.text") }}</p>
      <input
          type="email"
          v-model="email"
          placeholder="mgonzales@example.com"
          class="email-input"
      />
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <button @click="handleSubmit" class="submit-btn">{{$t("recover.button") }}</button>
    </div>
  </div>
</template>

<style scoped>
.recover-container {
  width: 100vw;
  height: 100vh;
  background-image: url('/src/assets/recover-bg.png'); 
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.overlay {
  background-color: rgba(0, 0, 0, 0.75);
  padding: 2rem;
  border-radius: 20px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  color: white;
}
.email-input {
  width: 100%;
  padding: 0.6rem;
  margin: 1rem 0;
  border-radius: 10px;
  border: none;
  font-size: 1rem;
}
.submit-btn {
  background: none;
  border: 2px solid #ffc107;
  color: #ffc107;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}
.submit-btn:hover {
  background-color: #ffc107;
  color: black;
}
.error {
  color: #ff4d4d;
  margin-top: 0.5rem;
}
</style>
