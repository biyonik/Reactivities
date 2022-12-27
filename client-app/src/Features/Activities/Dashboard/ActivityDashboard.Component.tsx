import React from 'react';
import {Grid, List} from 'semantic-ui-react';
import {ActivityModel} from '../../../Models/ActivityModel';
import ActivityListComponent from './ActivityList/ActivityList.Component';
import ActivityDetailComponent from '../Details/ActivityDetail.Component';
import ActivityFormComponent from '../Form/ActivityForm.Component';

interface Props {
    activities: ActivityModel[];
    selectedActivity: ActivityModel | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id?: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: ActivityModel) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

const ActivityDashboardComponent: React.FC<Props> = ({
                                                         activities,
                                                         selectedActivity,
                                                         selectActivity,
                                                         cancelSelectActivity,
                                                         editMode,
                                                         openForm,
                                                         closeForm,
                                                         createOrEdit,
                                                         deleteActivity,
                                                         submitting
                                                     }: Props) => {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityListComponent
                    activities={activities}
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}
                    submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {
                    selectedActivity &&
                    <ActivityDetailComponent
                        activity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm}
                        closeForm={closeForm}
                    />
                }
                {
                    editMode &&
                    <ActivityFormComponent
                        closeForm={closeForm}
                        activity={selectedActivity}
                        createOrEdit={createOrEdit}
                        submitting={submitting}
                    />
                }

            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboardComponent;