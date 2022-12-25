import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import { ActivityModel } from '../../Models/ActivityModel';
import { Header, List } from 'semantic-ui-react';

const App: React.FC = () =>  {
    const [activities, setActivities] = useState<ActivityModel[]>([] as ActivityModel[]);
    
    useEffect(() => {
        axios.get('http://localhost:5247/Activities')
            .then(response => {
                setActivities(response.data);
            });
    }, []);
    
    
    return (
        <div className="App">
            <Header as='h1'>Reactivities App - .NET & React</Header>
            <hr/>
            <List>
                {
                    activities.map((activity: ActivityModel) => (
                        <List.Item key={activity.id}>
                            <List.Content>
                                <List.Header as='a'>{activity.title}</List.Header>
                                <List.Description as='a'>{activity.description}</List.Description>
                            </List.Content>
                        </List.Item>
                    ))
                }
            </List>
        </div>
    );
}

export default App;
