import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios';
import {ActivityModel} from '../Models/ActivityModel';
import {Container} from 'semantic-ui-react';
import NavBar from './NavBar/NavBar';
import ActivityDashboardComponent from '../Features/Activities/Dashboard/ActivityDashboard.Component';
import {v4 as uuid} from 'uuid';

const App: React.FC = () => {
    const [activities, setActivities] = useState<ActivityModel[]>([] as ActivityModel[]);
    const [selectedActivity, setSelectedActivity] = useState<ActivityModel | undefined>(undefined);
    const [editMode, setEditMode] = useState<boolean>(false);

    useEffect(() => {
        axios.get('http://localhost:5247/Activities')
            .then((response: { data: React.SetStateAction<ActivityModel[]>; }) => {
                setActivities(response.data);
            });
    }, []);


    const handleSelectActivity = (id: string) => {
        setSelectedActivity(activities.find(a => a.id === id));
    }

    const handleCancelSelectedActivity = () => setSelectedActivity(undefined);
    
    const handleFormOpen = (id?: string) => {
        id ? handleSelectActivity(id) : handleCancelSelectedActivity();
        setEditMode(true);
    }
    
    const handleFormClose = () => {
        setEditMode(false);
    }
    
    const handleCreateOrEditActivity = (activity: ActivityModel) => {
        activity.id 
            ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
            : setActivities([...activities, {...activity, id: uuid()}]);
        setEditMode(false);
        setSelectedActivity(activity);
    }
    
    const handleDeleteActivity = (id: string) => {
        setActivities([
            ...activities.filter(x => x.id !== id)
        ]);
    }

    return (
        <Fragment>
            <NavBar openForm={handleFormOpen}/>
            <Container style={{
                marginTop: '7em'
            }}>
                <ActivityDashboardComponent
                    activities={activities}
                    selectedActivity={selectedActivity}
                    selectActivity={handleSelectActivity}
                    cancelSelectActivity={handleCancelSelectedActivity}
                    editMode={editMode}
                    openForm={handleFormOpen}
                    closeForm={handleFormClose}
                    createOrEdit={handleCreateOrEditActivity}
                    deleteActivity={handleDeleteActivity}
                />
            </Container>
        </Fragment>
    );
}

export default App;
