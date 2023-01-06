import { makeAutoObservable } from "mobx";
import { ServerError } from "../Models/ErrorModel";

export default class CommonStore {
    error: ServerError | null = null;
    token: string | null = null;
    appLoaded: boolean = false;
    
    constructor() {
        makeAutoObservable(this);
    }
    
    setServerError(error: ServerError) {
        this.error = error;
    }
    
    setToken = (token: string | null) => {
        if (token) localStorage.setItem('reactivities_token', token);
        this.token = token;
    }
    
    setAppLoaded = () => {
        this.appLoaded = true;
    }
}