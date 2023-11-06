import axios from "axios";
const baseURL = 'http://localhost:3001/persons'

const getAll =() => {
    return axios.get(baseURL)
}

const create = newObject => {
    return axios.post(baseURL, newObject)
}

const delete_ = id => {
    return axios.delete(`http://localhost:3001/persons/${id}`)
}

const update = (id, newObject) => {
    console.log(id)
    return axios.put(`http://localhost:3001/persons/${id}`, newObject.number)
}

export default {
    getAll: getAll,
    create: create,
    delete_: delete_,
    update: update
}
