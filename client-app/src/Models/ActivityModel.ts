import { ProfileModel } from "./ProfileModel";

export interface ActivityModel {
    id: string;
    title: string;
    date: Date | null;
    description: string;
    category: string;
    city: string;
    venue: string;
    hostUsername?: string;
    isCancelled?: boolean;
    attendees?: ProfileModel[];
}