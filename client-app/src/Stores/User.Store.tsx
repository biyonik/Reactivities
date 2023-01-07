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
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }
    
    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
        router.navigate('/');
    }
    
    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            router.navigate('/activities');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.error('Get User Error :: => ', error);
        }
    }
}