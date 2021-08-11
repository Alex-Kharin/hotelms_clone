import * as axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3001',
    headers: {
        "Content-Type": "application/json"
    }
})

export const apartmentsApi = {
    getApartments() {
        return instance.get(`apartments`).then(response => response.data)
    },

    getRentInfo() {
        return instance.get(`rentInfo`).then(response => response.data)
    }


}