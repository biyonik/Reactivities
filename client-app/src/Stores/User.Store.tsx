import { makeAutoObservable, runInAction } from "mobx";
import agent from "../Api/Agent";
import {UserFormValues, UserModel } from "../Models/UserModel";
import { router } from "../Router/Routes";
import { store } from "./Store";

export default class UserStore {
    user: UserModel | null = null;
    
    constructor() {
        makeAutoObservable(this)
    }
    
    get isLoggedIn() {
        return !!this.user;
    }
    
    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            router.navigate('/activities');
            console.log(user);
        } catch (error) {
            throw error;
        }
    }
    
    logout = () => {
        store.commonStore.setToken(null);
        localStorage.removeItem('reactivities_jwt');
        this.user = null;
        router.navigate('/');
    }
}