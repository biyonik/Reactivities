import React, {useState, useEffect, Fragment} from 'react';
import {ActivityModel} from '../Models/ActivityModel';
import {Container} from 'semantic-ui-react';
import NavBar from './NavBar/NavBar';
import ActivityDashboardComponent from '../Features/Activities/Dashboard/ActivityDashboard.Component';
import {v4 as uuid} from 'uuid';
import agent from '../Api/Agent';
import LoadingComponent from '../Components/LoadingComponent/Loading.Component';

const App: React.FC = () => {
    const [activities, setActivities] = useState<ActivityModel[]>([] as ActivityModel[]);
    const [selectedActivity, setSelectedActivity] = useState<ActivityModel | undefined>(undefined);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        agent.Activities.list()
            .then((response: ActivityModel[]) => {
                let activities: ActivityModel[] = [];
                response.forEach(act => {
                    act.date = act.date.split('T')[0];
                    activities.push(act);
                })
                setActivities(activities);
                setLoading(false);
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
        setSubmitting(true);
        if (activity.id) {
            agent.Activities.update(activity).then(() => {
                setActivities([...activities.filter(x => x.id !== activity.id), activity]);
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);
            })
        } else {
            activity.id = uuid();
            agent.Activities.create(activity).then(() => {
                setActivities([...activities, activity]);
            });
            setSelectedActivity(activity);
            setEditMode(false);
            setSubmitting(false);
        }
    }
    
    const handleDeleteActivity = (id: string) => {
        setSubmitting(true);
        agent.Activities.delete(id).then(() => {
            setActivities([
                ...activities.filter(x => x.id !== id)]);
            setSubmitting(false);
        });
        
        
    }

    if (loading) return <LoadingComponent content='Loading App...' inverted={false} />
    
    return (
        <Fragment>
            <NavBar openForm={handleFormOpen}/>
            <Container style={{
                marginTop: '7em'
            }}>
                <ActivityDashboardComponent
                    activities={activities}
                    selectedActivity={selectedActivity}
                    setSelectedActivity={setSelectedActivity}
                    selectActivity={handleSelectActivity}
                    cancelSelectActivity={handleCancelSelectedActivity}
                    editMode={editMode}
                    openForm={handleFormOpen}
                    closeForm={handleFormClose}
                    createOrEdit={handleCreateOrEditActivity}
                    deleteActivity={handleDeleteActivity}
                    submitting={submitting}
                />
            </Container>
        </Fragment>
    );
}

export default App;
