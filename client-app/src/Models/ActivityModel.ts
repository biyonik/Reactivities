import { ProfileModel } from "./ProfileModel";

export interface ActivityModel {
    id: string;
    title: string;
    date: Date | null;
    description: string;
    category: string;
    city: string;
    venue: string;
    hotUserName?: string;
    isCancelled?: boolean;
    isGoing?: boolean;
    isHost?: boolean;
    host?: ProfileModel;
    attendees?: ProfileModel[];
}