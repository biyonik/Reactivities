import React, {useState, useEffect, Fragment} from 'react';
import {Container} from 'semantic-ui-react';
import NavBar from './NavBar/NavBar';
import ActivityDashboardComponent from '../Features/Activities/Dashboard/ActivityDashboard.Component';
import {v4 as uuid} from 'uuid';
import LoadingComponent from '../Components/LoadingComponent/Loading.Component';
import { useStore } from '../Stores/Store';
import { observer } from 'mobx-react-lite';

const App: React.FC = () => {
    const {activityStore} = useStore();
    const {loadingInitial} = activityStore;

    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);

    
    if (activityStore.loadingInitial) return <LoadingComponent content='Loading App...' inverted={false} />
    
    return (
        <Fragment>
            <NavBar />
            <Container style={{
                marginTop: '7em'
            }}>
                <ActivityDashboardComponent />
            </Container>
        </Fragment>
    );
}

export default observer(App);
