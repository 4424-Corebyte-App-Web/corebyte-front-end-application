import axios from 'axios';

const API_URL = 'http://localhost:3000';


export const getOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las órdenes:', error);
    throw error;
  }
};


export const getOrderById = async (orderId) => {
  try {
    const response = await axios.get(`${API_URL}/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la orden:', error);
    throw error;
  }
};


export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/orders`, orderData);
    return response.data;
  } catch (error) {
    console.error('Error al crear la orden:', error);
    throw error;
  }
};


export const updateOrder = async (orderId, orderData) => {
  try {
    const response = await axios.put(`${API_URL}/orders/${orderId}`, orderData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la orden:', error);
    throw error;
  }
};


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
