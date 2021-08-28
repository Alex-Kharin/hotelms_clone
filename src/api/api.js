import * as axios from "axios";


const instance = axios.create({
    // baseURL: 'https://my-json-server.typicode.com/Alex-Kharin/hotelms-clone-db',
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
    },

    updateRentInfo(newRentInfo) {
        return instance.patch(`rentInfo/` + newRentInfo.id, newRentInfo)
    },

    createRentInfo(newRentInfo) {
        return instance.post(`rentInfo`, newRentInfo)
    },

    deleteRentInfo(rentInfoId) {
        return instance.delete(`rentInfo/` + rentInfoId)
    }

}