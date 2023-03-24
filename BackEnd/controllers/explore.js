// Controller de la page Explore


// ! Enlever async storage
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { mainUrl } from './userData';
// const route = mainUrl + "/explore";


// export async function getAllSchools() {
//     AsyncStorage.getItem("userToken").then((userToken)=>{
//         userToken = JSON.parse(userToken);
//         fetch(route + "/allSchools", {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'authorization': 'Bearer ' + userToken.token
//             },
//         })
//             .then(response => {
//                 response = response.json();
//                 return response;
//             }).catch((error)=> {throw error})
//     }).catch((error)=> {throw error});
// };

// export async function getSchool(ecoleId) {
//     AsyncStorage.getItem("userToken").then((userToken)=>{
//         userToken = JSON.parse(userToken);
//         fetch(route + `/school/${ecoleId}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'authorization': 'Bearer ' + userToken.token
//             },
//         })
//             .then((response) => {
//                 response = response.json();
//                 return response;
//             })
//             .then((response)=>{return response})
//             .catch((error)=> {throw error})
//     }).catch((error)=> {throw error});
// };
