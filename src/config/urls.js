import config from "./config";

export const url = {
    GET_LIST_ITEMS : "profile/list",
    CREATE_PROFILE: "profile",
    DELETE_PROFILE : "profile/delete",
}

export const apiUrl = (name) =>{
    return `${config.API_ENDPOINT}${url[name]}`;
}

export const getApiUrl = (path,params) => `${config.API_ENDPOINT}${path}${params}`

export default apiUrl;