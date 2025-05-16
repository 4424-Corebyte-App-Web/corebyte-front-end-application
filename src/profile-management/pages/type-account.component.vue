<template>
  <div class="p-8 text-white">
    <h2 class="text-2xl font-bold mb-4">Tipo de cuenta</h2>

    <div class="bg-gray-700 rounded-lg p-4 mb-6 flex justify-between items-center">
      <div>
        <p class="font-semibold">Rol: Dueño de licencia</p>
        <p>Plan actual: Start</p>
      </div>
      <a href="#" class="text-blue-400 hover:underline">¿Deseas cambiar de plan?</a>
    </div>

    <h3 class="text-xl font-semibold mb-4">Planes</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="border border-gray-600 rounded-lg p-4">
        <h4 class="text-lg font-bold mb-2">TraceWine Pro</h4>
        <ul class="list-disc list-inside text-sm text-gray-300 mb-4">
          <li>Gestión de inventario: Control de hasta 500 productos, con actualización de stock bajo supervisión.</li>
          <li>Acceso a reportes de inventario y ventas simplificados.</li>
          <li>Visualización de estadísticas básicas de producto y ventas.</li>
          <li>Soporte técnico por correo electrónico.</li>
        </ul>
        <button class="border border-yellow-400 text-yellow-400 px-4 py-1 rounded hover:bg-yellow-400 hover:text-black transition">Elegir</button>
      </div>

      <div class="border border-gray-600 rounded-lg p-4">
        <h4 class="text-lg font-bold mb-2">TraceWine Premium</h4>
        <ul class="list-disc list-inside text-sm text-gray-300 mb-4">
          <li>Gestión de inventario avanzada con hasta 1000 productos.</li>
          <li>Estadísticas de ventas y análisis comparativos.</li>
          <li>Generación automática de reportes PDF.</li>
          <li>Integración con apps externas.</li>
          <li>Soporte técnico prioritario (correo + chat).</li>
        </ul>
        <button class="border border-yellow-400 text-yellow-400 px-4 py-1 rounded hover:bg-yellow-400 hover:text-black transition">Elegir</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Aquí podrías importar lógica para cambiar plan, etc.
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
