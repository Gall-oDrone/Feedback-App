import axios from "axios";
import { endpoint } from "./constants";

let userToken=undefined;
// const userToken = () => {
//   if(JSON.parse(localStorage.user) !== undefined){
//     return (JSON.parse(localStorage.user).token)
//   } else {
//     return undefined
//   }
// }
if(localStorage.user !== undefined){
  userToken = JSON.parse(localStorage.user).token
}
// const userToken = JSON.parse(localStorage.user)
console.log("LET IT GO", userToken)
console.log("LET IT GO", localStorage.user)
export const authAxios = axios.create({
  baseURL: endpoint,
  headers: {
    Authorization: `Token ${userToken !== undefined ? userToken : null}`
  }
});