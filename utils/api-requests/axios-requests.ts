import axios from "axios";
import { AxiosRequestInterface, Constants } from "../constants";


export const postAxiosRequest = async (value : AxiosRequestInterface) => {
    const {uri, body} = value;
    //console.log(body);
    return await axios.post(Constants.HOST_ADDRESS.concat(uri), body, {
        headers : {
            'Content-Type' : 'application/json'
        }
    });
}

export function getToken(token: any): string {
	if (token !== null) {
		return token;
	}
	return '';
}

export const getAxiosRequest = async (uri : string) => {
    return await axios.get(Constants.HOST_ADDRESS.concat(uri), {
        headers : {
            'Content-Type' : 'application/json'
        }
    });
}

export const postAxiosRequestWithAuthorizationHeader = async (value : AxiosRequestInterface) => {
    const {uri, body} = value;
    return await axios.post(Constants.HOST_ADDRESS.concat(uri), body, {
        headers : {
            'Content-Type' : 'application/json',
            Authorization : 'Bearer '.concat(getToken(window.localStorage.getItem('token')))
        }
    });
}

export const patchAxiosRequestWithAuthorizationHeader = async (value : AxiosRequestInterface) => {
    const {uri, body} = value;
    return await axios.patch(Constants.HOST_ADDRESS.concat(uri), body, {
        headers : {
            'Content-Type' : 'application/json',
            Authorization : 'Bearer '.concat(getToken(window.localStorage.getItem('token')))
        }
    });
}

export const getAxiosRequestWithAuthorizationHeader = async (uri : string) => {
    return await axios.get(Constants.HOST_ADDRESS.concat(uri), {
        headers : {
            'Content-Type' : 'application/json',
            Authorization : 'Bearer '.concat(getToken(window.localStorage.getItem('token')))
        }
    });
}

export const deleteAxiosRequestWithAuthorizationHeader = async (uri : string) => {
    return await axios.delete(Constants.HOST_ADDRESS.concat(uri), {
        headers : {
            'Content-Type' : 'application/json',
            Authorization : 'Bearer '.concat(getToken(window.localStorage.getItem('token')))
        }
    });
}
export const swrFetcher = async (uri: string) => {
	const response = await getAxiosRequestWithAuthorizationHeader(uri);
	return response.data;
};

export const multipleFilePostRequest = async (
	path: string,
	files: FormData
) => {
	return await axios.post(Constants.HOST_ADDRESS.concat(path), files, {
		//upload-files
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
};