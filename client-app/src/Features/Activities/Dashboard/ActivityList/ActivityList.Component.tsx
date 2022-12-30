import React, {useState} from 'react';
import {ActivityModel} from '../../../../Models/ActivityModel';
import {Button, Item, Label, List, Segment} from "semantic-ui-react";
import DateFormattedViewer from '../../../../Components/DateFormattedViewer';
import { useStore } from '../../../../Stores/Store';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';


const ActivityListComponent: React.FC= () => {
    const {activityStore} = useStore();
    const {submitting, deleteActivity, activitiesByDate} = activityStore;
    
    const [target, setTarget] = useState('');

    const handleActivityDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
        setTarget(event.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {
                    activitiesByDate.map((activity: ActivityModel) => (
                        <Item key={activity.id}>
                            <Item.Content>
                                <Item.Header as='a'>{activity.title}</Item.Header>
                                <Item.Meta>
                                    <DateFormattedViewer date={activity.date}/>
                                </Item.Meta>
                                <Item.Description>
                                    <div>{activity.description}</div>
                                    <div>
                                        {activity.city},&nbsp;
                                        {activity.venue}
                                    </div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button
                                        name={activity.id}
                                        loading={submitting && target === activity.id}
                                        onClick={(e) => handleActivityDelete(e, activity.id)}
                                        floated='right' content='Delete'
                                        color='red'/>
                                    <Button as={Link} to={`/activities/${activity.id}`} floated='right' content='View'
                                            color='blue'/>
                                    <Label basic content={activity.category}/>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    ))
                }
            </Item.Group>
        </Segment>
    )
}

export default observer(ActivityListComponent);