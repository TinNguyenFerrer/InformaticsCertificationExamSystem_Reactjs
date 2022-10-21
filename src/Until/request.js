import axios from "axios";
const request = axios.create({
    baseURL: 'https://localhost:7257/api/',
    timeout: 10000,
    headers: {'X-Custom-Header': 'foobar'}
})

//params
export const getAPI = async(path,options={})=>{
    const response = await request.get(path,options);
    return response;
}
export const postAPI = async(path,options={})=>{
    const response = await request.post(path,options);
    return response;
}
export const deleteAPI = async(path,options={})=>{
    const response = await request.delete(path,options);
    return response;
}
export const putAPI = async(path,options={})=>{
    const response = await request.put(path,options);
    return response;
}
export default request;