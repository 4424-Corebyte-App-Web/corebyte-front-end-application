import axios from "axios";


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
const API_URL = "https://localhost:7164/batch-management";

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
