<script>
export default {
  data() {
    return {
      code: Array(6).fill(""),
      errorMessage: "",
    };
  },
  methods: {
    verifyCode() {
      const enteredCode = this.code.join("");
      const correctCode = localStorage.getItem("recoveryCode");
      if (enteredCode === correctCode) {
        this.$router.push("/password-recovered");
      } else {
        this.errorMessage = "Código incorrecto";
      }
    },
    autoFocus(event, index) {
      const input = event.target;
      if (input.value.length === 1 && index < 5) {
        input.nextElementSibling?.focus();
      }
    },
  },
};
</script>
<template>
  <div class="recover-container">
    <h2 class="title">Recuperar Contraseña</h2>
    <p class="description">
      {{ $t("login.confirmation") }}
    </p>
    <div class="code-inputs">
      <input
        v-for="n in 6"
        :key="n"
        v-model="code[n - 1]"
        maxlength="1"
        class="code-box"
        @input="autoFocus($event, n - 1)"
      />
    </div>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <button class="submit-btn" @click="verifyCode">
      {{ $t("login.send") }}
    </button>
  </div>
</template>

<style scoped>
.recover-container {
  background-color: #1a1a1a;
  color: white;
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.description {
  margin-bottom: 2rem;
  color: #ccc;
}

.code-inputs {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 1.5rem;
}

.code-box {
  width: 45px;
  height: 45px;
  font-size: 1.3rem;
  text-align: center;
  border: none;
  border-radius: 8px;
  outline: none;
  background-color: #2a2a2a;
  color: white;
}

.error {
  color: red;
  margin-bottom: 1rem;
}

.submit-btn {
  background-color: transparent;
  color: #ffcc33;
  border: 1px solid #ffcc33;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #ffcc33;
  color: black;
}
</style>
