<script>
export default {
  name: "PasswordRecover",
};
</script>

<template>
  <div class="container">
    <h2>{{ $t("password-recover.title") }}</h2>
    <p>{{ $t("password-recover.text") }}</p>
    <router-link to="/login" class="btn">{{
      $t("password-recover.button")
    }}</router-link>
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