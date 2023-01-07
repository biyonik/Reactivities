import axios, {AxiosError, AxiosResponse} from 'axios';
import { toast } from 'react-toastify';
import {ActivityModel} from '../Models/ActivityModel';
import {UserFormValues, UserModel } from '../Models/UserModel';
import { router } from '../Router/Routes';
import { store } from '../Stores/Store';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

axios.defaults.baseURL = 'http://localhost:5247/api/v1';

const axiosOnRejectedHandler = (error: AxiosError) => {
    const {data, status, config} = error.response as AxiosResponse;
    
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                router.navigate('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key]);
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error('Unauthorized!');
            break;
        case 403:
            toast.error('Forbidden!');
            break;
        case 404:
            router.navigate('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
    }
    return Promise.reject(error);
}

axios.interceptors.request.use(config => {
   const token = store.commonStore.token;
   if (token && config.headers) {
       config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
});

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, axiosOnRejectedHandler);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
    list: () => requests.get<ActivityModel[]>(`/Activities`),
    details: (id: string) => requests.get<ActivityModel>(`/Activities/${id}`),
    create: (activity: ActivityModel) => axios.post<void>(`/Activities`, activity),
    update: (activity: ActivityModel) => axios.put<void>(`/Activities`, activity),
    delete: (id: string) => requests.delete<void>(`/Activities/${id}`)
}

const Account = {
    current: () => requests.get<UserModel>('/Account/GetCurrentUser'),
    login: (userDto: UserFormValues) => requests.post<UserModel>('/Account/Login', userDto),
    register: (userDto: UserFormValues) => requests.post<UserModel>('/Account/Register', userDto)
}

const agent = {
    Activities,
    Account
}

export default agent;