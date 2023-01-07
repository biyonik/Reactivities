import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../Api/Agent";
import { ServerError } from "../Models/ErrorModel";

export default class CommonStore {
    error: ServerError | null = null;
    token: string | null = localStorage.getItem('reactivities_token');
    appLoaded: boolean = false;
    
    constructor() {
        makeAutoObservable(this);
        
        reaction(
            () => this.token,
            token => {
                if (token) {
                    localStorage.setItem('reactivities_token', token);
                } else {
                    localStorage.removeItem('reactivities_token');
                }
            }
        )
    }
    
    setServerError(error: ServerError) {
        this.error = error;
    }
    
    setToken = (token: string | null) => {
        if (token) localStorage.setItem('reactivities_token', token);
        this.token = token;
    }
    
    setAppLoaded = (value: boolean = true) => {
        this.appLoaded = value;
    }
}