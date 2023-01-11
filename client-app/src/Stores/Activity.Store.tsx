import {makeAutoObservable, runInAction} from "mobx";
import agent from "../Api/Agent";
import {ActivityFormValues, ActivityModel} from "../Models/ActivityModel";
import {v4 as uuid} from 'uuid';
import {format} from "date-fns";
import {store} from "./Store";
import { ProfileModel } from "../Models/ProfileModel";

export default class ActivityStore {
    activityRegistry = new Map<string, ActivityModel>();
    selectedActivity: ActivityModel | undefined = undefined;
    editMode: boolean = false;
    loading: boolean = false;
    loadingInitial: boolean = false;
    submitting: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => a.date!.getTime() - b.date!.getTime());
    }

    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = format(activity.date!, 'dd MMM yyyy');
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as { [key: string]: ActivityModel[] })
        )
    }

    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach(act => {
                    this.setActivity(act);
                });
                this.setLoadingInitial(false);
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.setLoadingInitial(false);
            });
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            try {
                this.setLoadingInitial(true);
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                })
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    private setActivity = (activity: ActivityModel) => {
        const user = store.userStore.user;
        if (user) {
            activity.isGoing = activity.attendees!.some(
                a => a.username === user.username
            );
            activity.isHost = activity.hostUserName === user.username;
            activity.host = activity.attendees?.find(x => x.username === activity.hostUserName);
        }
        activity.date = new Date(activity.date!);
        this.activityRegistry.set(activity.id, activity);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    // selectActivity = (id: string) => this.selectedActivity = this.activityRegistry.get(id);
    //
    // cancelSelectedActivity = () => this.selectedActivity = undefined;
    //
    // openForm = (id?: string) => {
    //     id !== undefined ? this.selectActivity(id) : this.cancelSelectedActivity();
    //     this.editMode = true;
    // }
    //
    // closeForm = () => this.editMode = false;

    createActivity = async (activity: ActivityFormValues) => {
        const user = store.userStore.user;
        const attendee: ProfileModel = {
            username: user!.username,
            displayName: user!.displayName,
            image: user!.image,
            bio: ''
        };
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            const newActivity: ActivityModel = {
                id: activity.id,
                title: activity.title,
                category: activity.category,
                date: activity.date,
                description: activity.description,
                city: activity.city,
                venue: activity.venue,
                hostUserName: user!.username,
                attendees: [attendee],
                isCancelled: false,
                isGoing: true,
                isHost: true
            };
            this.setActivity(newActivity);
            
            runInAction(() => {
                this.selectedActivity = newActivity;
            })
        } catch (error) {
            console.log(error);
        }
    }

    updateActivity = async (activity: ActivityFormValues) => {
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                if (activity.id) {
                    let updatedActivity = {...this.getActivity(activity.id), ...activity};
                    this.activityRegistry.set(activity.id, updatedActivity as ActivityModel);
                    this.selectedActivity = updatedActivity as ActivityModel;
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        this.submitting = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.loading = false;
                this.submitting = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.submitting = false;
                this.loading = false;
            })
        }
    }

    updateAttendance = async () => {
        const user = store.userStore.user;
        this.loading = true;
        try {
            await agent.Activities.attend(this.selectedActivity!.id);
            runInAction(() => {
                if (this.selectedActivity?.isGoing) {
                    this.selectedActivity.attendees = this.selectedActivity.attendees?.filter(a => a.username !== user?.username);
                    this.selectedActivity.isGoing = false;
                } else {
                    const attendee: ProfileModel = {
                        username: user!.username,
                        displayName: user!.displayName,
                        image: user?.image
                    }
                    this.selectedActivity?.attendees?.push(attendee);
                    this.selectedActivity!.isGoing = true;
                }
                this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!);
            });
        } catch (error) {
            console.log(error);

        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }
    
    cancelActivityToggle = async () => {
        this.loading = true;
        try {
            await agent.Activities.attend(this.selectedActivity!.id);
            runInAction(() => {
                this.selectedActivity!.isCancelled = !this.selectedActivity?.isCancelled;
                this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!);
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}