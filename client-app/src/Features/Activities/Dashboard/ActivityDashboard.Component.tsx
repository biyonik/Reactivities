import React, {useEffect} from 'react';
import {Grid} from 'semantic-ui-react';
import ActivityListComponent from './ActivityList/ActivityList.Component';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../Components/LoadingComponent/Loading.Component';
import { useStore } from '../../../Stores/Store';
import ActivityFiltersComponent from './ActivityFilters/ActivityFilters.Component';

const ActivityDashboardComponent: React.FC = () => {
    const {activityStore} = useStore();
    const {loadingInitial, loadActivities, activityRegistry} = activityStore;
    
    useEffect(() => {
        if (activityRegistry.size <= 1) loadActivities();
    }, [loadActivities]);


    if (loadingInitial) return <LoadingComponent content='Loading App...' inverted={false} />

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityListComponent />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFiltersComponent />
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboardComponent);