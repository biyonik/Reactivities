import { observer } from 'mobx-react-lite';
import React from 'react';
import {Button, Card, Image} from 'semantic-ui-react';
import DateFormattedViewer from '../../../Components/DateFormattedViewer';
import {ActivityModel} from '../../../Models/ActivityModel';
import { useStore } from '../../../Stores/Store';



const ActivityDetailComponent: React.FC = () => {
    const {activityStore} = useStore();
    const {selectedActivity: activity, cancelSelectedActivity, closeForm, openForm} = activityStore;

    const handleCancelSelectActivity = () => {
        cancelSelectedActivity();
        closeForm();
    }
    
    
    if (!activity) return (
        <></>
    );
    
    
    return (
        <Card fluid>
            <Image wrapped ui={false} src={`assets/categoryImages/${activity.category}.jpg`} alt=''/>
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>
                        <DateFormattedViewer date={activity.date}/>
                    </span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(activity.id)} basic color='blue' content='Edit'/>
                    <Button onClick={() => handleCancelSelectActivity()} basic color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default observer(ActivityDetailComponent);