import { UserModel } from "./UserModel";

export interface ProfileModel {
    username: string;
    displayName: string;
    image?: string | null;
    bio?: string;
}
