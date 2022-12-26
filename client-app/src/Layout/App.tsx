import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios';
import { ActivityModel } from '../Models/ActivityModel';
import { Header, List, Container } from 'semantic-ui-react';
import NavBar from './NavBar/NavBar';
import ActivityDashboardComponent from '../Features/Activities/Dashboard/ActivityDashboard.Component';



const App: React.FC = () =>  {
    const [activities, setActivities] = useState<ActivityModel[]>([] as ActivityModel[]);
    
    useEffect(() => {
        axios.get('http://localhost:5247/Activities')
            .then((response: { data: React.SetStateAction<ActivityModel[]>; }) => {
                setActivities(response.data);
            });
    }, []);
    
    
    return (
        <Fragment>
            <NavBar/>
            <Container style={{
                marginTop: '7em'
            }}>
                <ActivityDashboardComponent activities={activities} />
            </Container>
        </Fragment>
    );
}

export default App;
