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

export const refreshTokenSetup = (res) => {

  let refreshTiming = (res.token.Obj.expires_in || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
    console.log('newAuthRes: ', newAuthRes);
    
    console.log('new auth Token: ', newAuthRes.id_token);
    setTimeout(refreshToken, refreshTiming);
  };
  
  setTimeout(refreshToken, refreshTiming);
};