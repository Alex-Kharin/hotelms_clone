import * as axios from "axios";


const instance = axios.create({
    baseURL: 'https://my-json-server.typicode.com/Alex-Kharin/hotelms-clone-db',
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