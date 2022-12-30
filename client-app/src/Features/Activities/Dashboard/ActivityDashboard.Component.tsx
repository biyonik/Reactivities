import React, {useEffect} from 'react';
import {Grid, List} from 'semantic-ui-react';
import ActivityListComponent from './ActivityList/ActivityList.Component';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../Components/LoadingComponent/Loading.Component';
import { useStore } from '../../../Stores/Store';


const ActivityDashboardComponent: React.FC = () => {
    const {activityStore} = useStore();
    const {loadingInitial} = activityStore;
    
    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);


    if (loadingInitial) return <LoadingComponent content='Loading App...' inverted={false} />

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityListComponent />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Activity Filters</h2>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboardComponent);