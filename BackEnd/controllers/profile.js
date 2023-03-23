
import { getUserToken } from "./userData";

import { mainUrl } from './userData';
const route = mainUrl + "/profile";

export async function getLikedSchool() {

    const userToken = await getUserToken();

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + userToken.token
        },
    }

    try {
        const response = await fetch(route +   `/likedSchool`, requestOptions);      
        console.log("passe dans getLikeSchools()")
        console.log(response.status);
        const data = await response.json();
        console.log(data);
        return data   
        
    } catch (error) {
        console.log("echec du bloc try :");
        console.log(error);
        return {error : error}
    }

}