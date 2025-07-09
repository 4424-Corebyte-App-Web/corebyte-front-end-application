import axios from "axios";

// Use relative path in development (will be proxied by Vite)
// Use full URL in production
const API_URL = import.meta.env.DEV 
  ? "/api/v1/batch-management" 
  : "https://corebyte-backendapplication.azurewebsites.net/api/v1/batch-management";

// Crea un nuevo lote en el backend .NET
export const createBatch = async (batchData) => {
  try {
    const response = await axios.post(API_URL, batchData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el lote:", error);
    throw error;
  }
};


export const getAllBatches = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener todos los lotes:", error);
    throw error;
  }
};

export const getBatchById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateBatch = async (id, batchData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, batchData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el lote:", error);
    throw error;
  }
};