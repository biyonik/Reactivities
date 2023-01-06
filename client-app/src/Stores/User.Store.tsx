import { makeAutoObservable } from "mobx";
import agent from "../Api/Agent";
import {UserFormValues, UserModel } from "../Models/UserModel";

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
            console.log(user);
        } catch (error) {
            throw error;
        }
    }
}