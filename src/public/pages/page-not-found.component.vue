<script>
export default {
  name: "page-not-found",
  title: "Page Not Found",
  data() {
    return {
      unavailable: null,
    }
  },
  created() {
    this.unavailable = "rutapordefecto";
  }
}
</script>
<template>
  <div class="w-full">
    <h1>Page not found</h1>
    <p>The path {{this.unavailable}} is not available</p>
  </div>
</template>
