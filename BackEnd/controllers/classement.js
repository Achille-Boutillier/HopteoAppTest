// Controller de la page classement

import { getUserToken } from "./userData";

import { mainUrl } from './userData';
const route = mainUrl + "/classement";

// Fournir le classement des écoles
export async function getSchoolRanking() {
   
    const userToken = await getUserToken();

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + userToken.token
        },
        // body: {}
    }

    try {
        const response = await fetch(route + '/allSchoolRanking', requestOptions);      
        // console.log(response.status)
        const data = await response.json();
        // console.log(data);
        return data   
        
    } catch (error) {
        console.log("echec du bloc try :");
        console.log(error);
        return {error}
    }

}

// Afficher une école depuis la page du classement
export async function getSchool(ecoleId) {
    const userToken = await getUserToken();

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + userToken.token
        },
    }

    try {
        const response = await fetch(route +  `/schoolRanking/${ecoleId}`, requestOptions);   
        // console.log(response.status);
        const data = await response.json();
        // console.log(data);
        return data   
        
    } catch (error) {
        console.log("echec du bloc try :");
        console.log(error);
        return {error}
    }
}

export async function onSchoolLike(ecoleId, bool) {

    const userToken = await getUserToken();

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + userToken.token
        },
        body: JSON.stringify({
            bool :  bool,
        })
    }

    try {
        const response = await fetch(route +  `/onSchoolLike/${ecoleId}`, requestOptions);    
        // console.log(response.status);
        const data = await response.json();
        console.log(data);
        return data;   
        
    } catch (error) {
        console.log("echec du bloc try :");
        console.log(error);
        return error
    }
}




export async function getLikeValue(ecoleId) {
    const userToken = await getUserToken();
    console.log("yayyayayayayayayayayayayayayaya")

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + userToken.token
        },
    }

    try {
        const response = await fetch(route +  `/isSchoolLiked/${ecoleId}`, requestOptions);     
        console.log("passe dans isSchoolLiked() -------------------------------------")
        console.log(response.status);
        const data = await response.json();
        console.log(data);
        return data   
        
    } catch (error) {
        console.log("echec du bloc try :");
        console.log(error);
        return {error}
    }


}

// todo : implementer isFocused plutôt que addListener("focus");

// const isFocused = useIsFocused();
 
//   useEffect(() => {
//     // Put Your Code Here Which You Want To Refresh or Reload on Coming Back to This Screen.
//   }, [isFocused]);