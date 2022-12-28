import React from 'react';
import {Grid, List} from 'semantic-ui-react';
import ActivityListComponent from './ActivityList/ActivityList.Component';
import ActivityDetailComponent from '../Details/ActivityDetail.Component';
import ActivityFormComponent from '../Form/ActivityForm.Component';
import {useStore} from '../../../Stores/Store';
import { observer } from 'mobx-react-lite';


const ActivityDashboardComponent: React.FC = () => {

    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityListComponent />
            </Grid.Column>
            <Grid.Column width='6'>
                {
                    selectedActivity && !editMode &&
                    <ActivityDetailComponent />
                }
                {
                    editMode &&
                    <ActivityFormComponent />
                }

            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboardComponent);