﻿import {makeAutoObservable, runInAction} from "mobx";
import agent from "../Api/Agent";
import {ActivityModel} from "../Models/ActivityModel";
import {v4 as uuid} from 'uuid';

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
        return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
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
        activity.date = activity.date.split('T')[0];
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

    createActivity = async (activity: ActivityModel) => {
        this.loading = true;
        this.submitting = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
                this.submitting = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
                this.submitting = false;
            })
        }
    }

    updateActivity = async (activity: ActivityModel) => {
        this.loading = true;
        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
                this.submitting = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
                this.submitting = false;
            })
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
}