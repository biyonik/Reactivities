import React, { useState } from 'react';
import {ActivityModel} from '../../../../Models/ActivityModel';
import {Button, Item, Label, List, Segment} from "semantic-ui-react";
import DateFormattedViewer from '../../../../Components/DateFormattedViewer';

interface Props {
    activities: ActivityModel[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

const ActivityListComponent: React.FC<Props> = ({activities, selectActivity, deleteActivity, submitting}: Props) => {
    const [target, setTarget] = useState('');
    
    const handleActivityDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
        setTarget(event.currentTarget.name);
        deleteActivity(id);
    }
    
    return (
        <Segment>
            <Item.Group divided>
                {
                    activities.map((activity: ActivityModel) => (
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
                                    <Button onClick={() => selectActivity(activity.id)} floated='right' content='View'
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

export default ActivityListComponent;