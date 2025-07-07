import axios  from "axios";
const http= axios.create({baseURL: 'http://localhost:3000'});

export class ReplenishmentApiService {

    constructor(_resourceEndpoint) {
        this.resourceEndpoint = _resourceEndpoint;
    }

    getAllResources() {
        return http.get(this.resourceEndpoint);
    }
    getResourceById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }
    createResource(resource) {
        return http.post(this.resourceEndpoint, resource);
    }
    updateResource(id, resource) {
        return http.put(`${this.resourceEndpoint}/${id}`, resource);
    }
    deleteResource(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }


}
