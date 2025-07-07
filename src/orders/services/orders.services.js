import http from '/src/shared/services/http.instance.js';

export async function getOrders() {
    try {
        return response.data;
    } catch (error) {
        console.error('Error al cargar órdenes:', error);
        return [];
    }
}
export async function addOrder(order) {
    try {
    } catch (error) {
        console.error('Error al agregar la orden:', error);
        throw error;
    }
}


export async function getOrderById(id) {
    try {
        return response.data;
    } catch (error) {
        console.error('Error al obtener la orden por ID:', error);
        throw new Error('No se encontró la orden');
    }
}

export async function deleteOrderById(id) {
    try {
    } catch (error) {
        console.error('Error al eliminar la orden:', error);
        throw error;
    }
}
