import http from '/src/shared/services/http.instance.js';


const BASE_URL='https://localhost:7164';

export class OrderService {
    async getAllOrders() {
        try{
            const [orders] = await Promise.all([
                fetch(`${BASE_URL}/api/v1/order`).then(res => res.json())
                
            ]);
            const customersMap = orders.reduce((acc, item) => {
                acc[item.id] = item.customer;
                return acc;
            },{});
            
            return orders.map(order => ({
                id: order.id,
                customer: customersMap[order.id]|| 'N/A',
                date: order.date || 'N/A',
                product: order.product || 'N/A',
                amount: order.amount || 'N/A',
                total: order.total || 'N/A',
                
            }));
        } catch (error) {
            console.error("Error fetching orders:",error);
            return [];
        }
    }
    
}



export async function getOrders() {
    try {
        const response = await http.get(`${BASE_URL}/api/v1/order`);
        return response.data;
    } catch (error) {
        console.error('Error al cargar órdenes:', error);
        return [];
    }
}
export async function addOrder(order) {
    try {
        const response = await http.post(`${BASE_URL}/api/v1/order`, order);
        return response.data; 
    } catch (error) {
        console.error('Error al agregar la orden:', error);
        throw error;
    }
}


export async function getOrderById(id) {
    try {
        const response = await http.get(`${BASE_URL}/api/v1/order/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la orden por ID:', error);
        throw new Error('No se encontró la orden');
    }
}

export async function deleteOrderById(id) {
    try {
        const response = await http.delete(`${BASE_URL}/api/v1/order/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar la orden:', error);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
        throw error;
    }
}


///fin
