import axios from "axios";
import { isWindow } from "jquery";
import { useHistory } from "react-router-dom";

let token = localStorage.getItem('tokenICE')
const reques = axios.create({
    baseURL: 'https://localhost:7257/api/',
    timeout: 10000,
    headers: {
        appID: 8,
        version: "1.1.0",
        // Authorization: `Bearer ${token}`
    }
})
// reques.interceptors.response.use(undefined, err => {
//     console.log("looiii")
//     const error = err.response;
//     console.log(error.status)
//     // if error is 401 
//     if (error.status == 401){
//       console.log("JDLhLooooooooooooooooooooooooooooooo")
//       const history = useHistory()
//       window.alert("Lỗi xác thực")
//       history.push("/auth/login")
//       console.log("code 401")

//     }
//   })
//params

reques.interceptors.response.use(
    response => {
      //maybe process here
      return response;
    },
    error => {
      //do some global magic with error and pass back to caller
      console.log("LOOOOOOOOOOOOOOOO")
      console.log(error)
      if (error.response.status === 401){
        console.log(error)
        //const history = useHistory()
        //window.alert("Lỗi xác thực")
        window.location="/auth/login"
        //history.push("/auth/login")
        console.log("code 401")
  
      }
      if (error.response.status === 403){
        console.log(error)
        //const history = useHistory()
        window.alert("Lỗi xác thực 403")
        //window.location="/auth/login"
        //history.push("/auth/login")
        console.log("code 403")
  
      }
      return Promise.reject(error);
    }
  );
reques.interceptors.request.use(function (config) {
    const token = localStorage.getItem('tokenICE');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });
export const getAPI = async (path, options = {}) => {
    const response = await reques.get(path, options);
    return response;
}
export const postAPI = async (path,data, options = {}) => {
    const response = await reques.post(path,data, options);
    return response;
}
export const deleteAPI = async (path, options = {}) => {
    const response = await reques.delete(path, options);
    return response;
}
export const putAPI = async (path, options = {}) => {
    const response = await reques.put(path, options);
    return response;
}
export default reques;