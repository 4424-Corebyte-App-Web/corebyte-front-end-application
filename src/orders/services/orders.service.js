import axios from 'axios';

const API_URL = 'http://localhost:3000';

/**
 * Obtiene la lista de órdenes
 * @returns {Promise<Array>} Lista de órdenes
 */
export const getOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las órdenes:', error);
    throw error;
  }
};

/**
 * Obtiene una orden por su ID
 * @param {string} orderId - ID de la orden a obtener
 * @returns {Promise<Object>} Orden encontrada
 */
export const getOrderById = async (orderId) => {
  try {
    const response = await axios.get(`${API_URL}/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la orden:', error);
    throw error;
  }
};

/**
 * Crea una nueva orden
 * @param {Object} orderData - Datos de la orden a crear
 * @returns {Promise<Object>} Orden creada
 */
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/orders`, orderData);
    return response.data;
  } catch (error) {
    console.error('Error al crear la orden:', error);
    throw error;
  }
};

/**
 * Actualiza una orden existente
 * @param {string} orderId - ID de la orden a actualizar
 * @param {Object} orderData - Datos actualizados de la orden
 * @returns {Promise<Object>} Orden actualizada
 */
export const updateOrder = async (orderId, orderData) => {
  try {
    const response = await axios.put(`${API_URL}/orders/${orderId}`, orderData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la orden:', error);
    throw error;
  }
};

/**
 * Elimina una orden
 * @param {string} orderId - ID de la orden a eliminar
 * @returns {Promise<void>}
 */
export const deleteOrderById = async (orderId) => {
  try {
    await axios.delete(`${API_URL}/orders/${orderId}`);
  } catch (error) {
    console.error('Error al eliminar la orden:', error);
    throw error;
  }
};

export default {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrderById
};
