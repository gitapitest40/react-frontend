/* eslint-disable eqeqeq */
import apiUrl,{getApiUrl,reportUrls} from '../config/urls'

const headers = {
  "Content-Type": "application/x-www-form-urlencoded",
  Platform: "spa",
  Accept: "application/json",
};

const headersWithToken = (clientAccessToken) => ({
  "Content-Type": "application/x-www-form-urlencoded",
  Platform: "spa",
  Authorization: `Bearer ${clientAccessToken}`,
  Accept: "application/json",
});

const headersWithTokenJson = (clientAccessToken) => ({
  "Content-Type": "application/json",
  Platform: "spa",
  Authorization: `Bearer ${clientAccessToken}`,
  Accept: "application/json",
});

const headersWithTokenFormData = (clientAccessToken) => ({
  Platform: "spa",
  Authorization: `Bearer ${clientAccessToken}`,
  Accept: "application/json",  
});
const headersJson = () => ({
  "Content-Type": "application/json",
  Platform: "spa",
  Accept: "application/json",
});

export const postApi = (url, body) => {
  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json",
    Platform: "spa",
    Accept: "application/json",},
    body: body,
  };

  return fetch(url, requestOptions);
};

export const postApiToken = (url, clientAccessToken, body) => {
  const requestOptions = {
    method: "POST",
    headers: headersWithToken(clientAccessToken),
    body: body,
  };

  return fetch(url, requestOptions);
};

export const postApiTokenJson = (url, clientAccessToken, body) => {
  const requestOptions = {
    method: "POST",
    headers: headersWithTokenJson(clientAccessToken),
    body: body,
  };

  return fetch(url, requestOptions);
};

export const postApiTokenFormData = (url, clientAccessToken, body) => {
  const requestOptions = {
    method: "POST",
    headers: headersWithTokenFormData(clientAccessToken),
    body: body,
  };

  return fetch(url, requestOptions);
};

export const postApiTokenSlash = (url, clientAccessToken, id) => {
  const requestOptions = {
    method: "POST",
    headers: headersWithToken(clientAccessToken),
  };

  return fetch(url+'/'+id, requestOptions);
};

export const getApi = (url, params) => {
  console.log('url, params',url, params)
  const requestOptions = {
    method: "GET",
    headers: { Accept: "application/json"},
  };

  let requestUrl = url;

  if (params !== null) {
    requestUrl = `${url}?${params}`;
  }

  return fetch(requestUrl, requestOptions);
};

export const getApiToken = (url, params, clientAccessToken) => {
  const requestOptions = {
    method: "GET",
    headers: headersWithToken(clientAccessToken),
  };

  let requestUrl = url;

  if (params !== null) {
    requestUrl = `${url}?${params}`;
  }

  return fetch(requestUrl, requestOptions);
};

export const getApiTokenSlash = (url, params, clientAccessToken) => {
  const requestOptions = {
    method: "GET",
    headers: headersWithToken(clientAccessToken),
  };

  let requestUrl = url;

  if (params !== null) {
    requestUrl = `${url}/${params}`;
  }

  return fetch(requestUrl, requestOptions);
};

export const putApiToken = (url, body, clientAccessToken) => {
  const requestOptions = {
    method: "PUT",
    headers: headersWithToken(clientAccessToken),
    body: body,
  };

  return fetch(url, requestOptions);
};

export const putApiTokenJson = (url, body, clientAccessToken) => {
  const requestOptions = {
    method: "PUT",
    headers: headersWithTokenJson(clientAccessToken),
    body: body,
  };

  return fetch(url, requestOptions);
};

export const deleteApiToken = (url, clientAccessToken, body) => {
  const requestOptions = {
    method: "DELETE",
    headers: headersWithToken(clientAccessToken),
    body: body,
  };

  return fetch(url, requestOptions);
};

export const deleteApiTokenSlash  = (url, clientAccessToken, params) => {
  const requestOptions = {
    method: "DELETE",
    headers: headersWithToken(clientAccessToken),
  };
  let requestUrl = url;

  if (params !== null) {
    requestUrl = `${url}/${params}`;
  }

  return fetch(requestUrl, requestOptions);
};

export const fetchDoorDetails = (url,doorId,clientAccessToken)=>{
  const requestOptions = {
    method: "GET",
    headers: headersWithToken(clientAccessToken),
  };

  let finalUrl = `${url}${doorId}`;

  return fetch(finalUrl, requestOptions);
}