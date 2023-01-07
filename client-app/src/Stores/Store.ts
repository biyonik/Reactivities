import ActivityStore from "./Activity.Store";
import {createContext, useContext} from "react";
import CommonStore from "./Common.Store";
import UserStore from "./User.Store";
import ModalStore from "./Modal.Store";

interface Store {
    activityStore: ActivityStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}