import axios from "axios";
const reques = axios.create({
    baseURL: 'https://localhost:7257/api/',
    timeout: 10000,
    headers: {'X-Custom-Header': 'foobar'}
})

//params
export const getAPI = async(path,options={})=>{
    const response = await reques.get(path,options);
    return response;
}
export const postAPI = async(path,options={})=>{
    const response = await reques.post(path,options);
    return response;
}
export const deleteAPI = async(path,options={})=>{
    const response = await reques.delete(path,options);
    return response;
}
export const putAPI = async(path,options={})=>{
    const response = await reques.put(path,options);
    return response;
}
export default reques;