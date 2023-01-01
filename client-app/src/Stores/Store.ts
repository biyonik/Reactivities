import ActivityStore from "./Activity.Store";
import {createContext, useContext} from "react";
import CommonStore from "./Common.Store";

interface Store {
    activityStore: ActivityStore;
    commonStore: CommonStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}