import axios, { AxiosResponse } from 'axios';
import { ActivityModel } from '../Models/ActivityModel';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

axios.defaults.baseURL = 'http://localhost:5247/api/v1';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
    list: () => requests.get<ActivityModel[]>(`/Activities`),
    details: (id: string) => requests.get<ActivityModel>(`/Activities/${id}`),
    create: (activity: ActivityModel) => axios.post<void>(`/Activities`, activity),
    update: (activity: ActivityModel) => axios.put<void>(`/Activities`, activity),
    delete: (id: string) => requests.delete<void>(`/Activities/${id}`)
}

const agent = {
    Activities
}

export default agent;