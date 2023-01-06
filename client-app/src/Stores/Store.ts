import ActivityStore from "./Activity.Store";
import {createContext, useContext} from "react";
import CommonStore from "./Common.Store";
import UserStore from "./User.Store";

interface Store {
    activityStore: ActivityStore;
    commonStore: CommonStore;
    userStore: UserStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}