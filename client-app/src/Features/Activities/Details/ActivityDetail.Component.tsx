import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import {useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../Components/LoadingComponent/Loading.Component';
import { useStore } from '../../../Stores/Store';
import ActivityDetailedChatComponent from './ActivityDetailedChat/ActivityDetailedChat.Component';
import ActivityDetailedHeaderComponent from './ActivityDetailedHeader/ActivityDetailedHeader.Component';
import ActivityDetailedInfoComponent from './ActivityDetailedInfo/ActivityDetailedInfo.Component';
import ActivityDetailedSidebarComponent from './ActivityDetailedSidebar/ActivityDetailedSidebar.Component';



const ActivityDetailComponent: React.FC = () => {
    const {activityStore} = useStore();
    const {selectedActivity: activity, loadingInitial, loadActivity} = activityStore;
    const {id} = useParams();
    
    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity])
    
    if (loadingInitial  || !activity) return <LoadingComponent content='Loading App...' inverted={false} />

    
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeaderComponent activity={activity} />
                <ActivityDetailedInfoComponent activity={activity} />
                <ActivityDetailedChatComponent />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebarComponent attendees={activity.attendees!} />
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDetailComponent);