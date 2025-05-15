import axios from 'axios';

// ✅ Usa la URL de tu fake API
const API_URL = 'http://localhost:3001/batches';

/**
 * Obtener todos los lotes
 */
export const getAllBatches = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener todos los lotes:', error);
    throw error;
  }
};

/**
 * Obtener un lote por ID
 */
export const getBatchById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

/**
 * Actualizar un lote
 */
export const updateBatch = async (id, batchData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, batchData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el lote:', error);
    throw error;
  }
};
